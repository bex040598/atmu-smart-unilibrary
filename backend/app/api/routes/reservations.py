from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta
import uuid

from app.core.database import get_session
from app.core.deps import get_current_user
from app.models.user import User, UserRoleEnum
from app.models.reservation import Reservation, ReservationStatus
from app.models.book import Book, BookCopy

router = APIRouter(prefix="/reservations", tags=["reservations"])


class ReservationCreate(BaseModel):
    book_id: int
    pickup_date: Optional[str] = None
    notes: Optional[str] = None


@router.post("")
def create_reservation(
    req: ReservationCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    book = session.get(Book, req.book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    if book.available_copies < 1:
        raise HTTPException(status_code=400, detail="No copies available")

    existing = session.exec(
        select(Reservation).where(
            Reservation.user_id == current_user.id,
            Reservation.book_id == req.book_id,
            Reservation.status.in_([ReservationStatus.pending, ReservationStatus.approved]),
        )
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already reserved this book")

    pickup = datetime.utcnow() + timedelta(days=1)
    if req.pickup_date:
        try:
            pickup = datetime.fromisoformat(req.pickup_date)
        except Exception:
            pass

    reservation = Reservation(
        user_id=current_user.id,
        book_id=req.book_id,
        pickup_date=pickup,
        expiry_date=pickup + timedelta(days=3),
        notes=req.notes,
        qr_code=str(uuid.uuid4()),
    )
    session.add(reservation)
    session.commit()
    session.refresh(reservation)
    return reservation


@router.get("/my")
def my_reservations(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    reservations = session.exec(
        select(Reservation).where(Reservation.user_id == current_user.id)
    ).all()
    result = []
    for r in reservations:
        book = session.get(Book, r.book_id)
        result.append({
            **r.dict(),
            "book": {"id": book.id, "title": book.title, "author": book.author, "cover_url": book.cover_url} if book else None,
        })
    return result


@router.get("")
def all_reservations(
    status: Optional[str] = None,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    query = select(Reservation)
    if status:
        query = query.where(Reservation.status == status)
    return session.exec(query).all()


@router.patch("/{res_id}/approve")
def approve_reservation(
    res_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    r = session.get(Reservation, res_id)
    if not r:
        raise HTTPException(status_code=404, detail="Not found")
    r.status = ReservationStatus.approved
    r.librarian_id = current_user.id
    r.updated_at = datetime.utcnow()
    session.add(r)
    session.commit()
    return {"message": "Approved"}


@router.patch("/{res_id}/reject")
def reject_reservation(
    res_id: int,
    reason: str = "",
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    r = session.get(Reservation, res_id)
    if not r:
        raise HTTPException(status_code=404, detail="Not found")
    r.status = ReservationStatus.rejected
    r.rejection_reason = reason
    r.librarian_id = current_user.id
    r.updated_at = datetime.utcnow()
    session.add(r)
    session.commit()
    return {"message": "Rejected"}


@router.patch("/{res_id}/cancel")
def cancel_reservation(
    res_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    r = session.get(Reservation, res_id)
    if not r or r.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Not found")
    r.status = ReservationStatus.cancelled
    r.updated_at = datetime.utcnow()
    session.add(r)
    session.commit()
    return {"message": "Cancelled"}


@router.patch("/{res_id}/mark-picked-up")
def mark_picked_up(
    res_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    r = session.get(Reservation, res_id)
    if not r:
        raise HTTPException(status_code=404, detail="Not found")
    r.status = ReservationStatus.picked_up
    r.updated_at = datetime.utcnow()
    session.add(r)
    session.commit()
    return {"message": "Marked as picked up"}

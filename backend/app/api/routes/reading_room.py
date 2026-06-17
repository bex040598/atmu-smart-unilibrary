from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
import uuid

from app.core.database import get_session
from app.core.deps import get_current_user
from app.models.user import User, UserRoleEnum
from app.models.reading_room import ReadingRoom, Seat, SeatReservation, SeatStatus

router = APIRouter(tags=["reading-rooms"])


@router.get("/reading-rooms")
def list_reading_rooms(session: Session = Depends(get_session)):
    rooms = session.exec(select(ReadingRoom).where(ReadingRoom.is_active == True)).all()
    result = []
    for room in rooms:
        seats = session.exec(select(Seat).where(Seat.reading_room_id == room.id)).all()
        available = len([s for s in seats if s.status == SeatStatus.available])
        result.append({
            **room.dict(),
            "total_seats": len(seats),
            "available_seats": available,
            "occupied_seats": len(seats) - available,
        })
    return result


@router.get("/reading-rooms/{room_id}/seats")
def get_room_seats(room_id: int, date: Optional[str] = None, session: Session = Depends(get_session)):
    seats = session.exec(select(Seat).where(Seat.reading_room_id == room_id)).all()
    result = []
    for seat in seats:
        reservations = []
        if date:
            reservations = session.exec(
                select(SeatReservation).where(
                    SeatReservation.seat_id == seat.id,
                    SeatReservation.date == date,
                    SeatReservation.status == "confirmed",
                )
            ).all()
        result.append({
            **seat.dict(),
            "is_reserved_today": len(reservations) > 0,
        })
    return result


class SeatReservationCreate(BaseModel):
    seat_id: int
    reading_room_id: int
    date: str
    start_time: str
    end_time: str


@router.post("/seat-reservations")
def create_seat_reservation(
    req: SeatReservationCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    existing = session.exec(
        select(SeatReservation).where(
            SeatReservation.seat_id == req.seat_id,
            SeatReservation.date == req.date,
            SeatReservation.status == "confirmed",
        )
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Seat already reserved for this time")

    reservation = SeatReservation(
        user_id=current_user.id,
        seat_id=req.seat_id,
        reading_room_id=req.reading_room_id,
        date=req.date,
        start_time=req.start_time,
        end_time=req.end_time,
        qr_code=str(uuid.uuid4()),
    )
    session.add(reservation)
    session.commit()
    session.refresh(reservation)
    return reservation


@router.get("/seat-reservations/my")
def my_seat_reservations(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    reservations = session.exec(
        select(SeatReservation).where(SeatReservation.user_id == current_user.id)
    ).all()
    result = []
    for r in reservations:
        seat = session.get(Seat, r.seat_id)
        room = session.get(ReadingRoom, r.reading_room_id)
        result.append({
            **r.dict(),
            "seat": seat.dict() if seat else None,
            "room": {"id": room.id, "name": room.name} if room else None,
        })
    return result


@router.patch("/seat-reservations/{res_id}/check-in")
def check_in(
    res_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    r = session.get(SeatReservation, res_id)
    if not r or r.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Not found")
    r.checked_in_at = datetime.utcnow()
    r.status = "checked_in"
    session.add(r)
    session.commit()
    return {"message": "Checked in"}


@router.patch("/seat-reservations/{res_id}/cancel")
def cancel_seat_reservation(
    res_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    r = session.get(SeatReservation, res_id)
    if not r or r.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Not found")
    r.status = "cancelled"
    session.add(r)
    session.commit()
    return {"message": "Cancelled"}

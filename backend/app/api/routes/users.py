from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.core.database import get_session
from app.core.deps import get_current_user
from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.models.loan import Loan, LoanStatus
from app.models.reservation import Reservation

router = APIRouter(prefix="/users", tags=["users"])


class UpdateProfileRequest(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    course: Optional[int] = None
    semester: Optional[int] = None


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str


@router.get("/me")
def get_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "uuid": current_user.uuid,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "department_id": current_user.department_id,
        "student_id": current_user.student_id,
        "phone": current_user.phone,
        "avatar_url": current_user.avatar_url,
        "bio": current_user.bio,
        "course": current_user.course,
        "semester": current_user.semester,
        "face_registered": current_user.face_registered,
        "is_active": current_user.is_active,
        "created_at": current_user.created_at.isoformat() if current_user.created_at else None,
        "last_login": current_user.last_login.isoformat() if current_user.last_login else None,
    }


@router.patch("/me")
def update_profile(
    req: UpdateProfileRequest,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if req.full_name is not None:
        current_user.full_name = req.full_name
    if req.phone is not None:
        current_user.phone = req.phone
    if req.bio is not None:
        current_user.bio = req.bio
    if req.course is not None:
        current_user.course = req.course
    if req.semester is not None:
        current_user.semester = req.semester
    current_user.updated_at = datetime.utcnow()
    session.add(current_user)
    session.commit()
    session.refresh(current_user)
    return {"message": "Profile updated"}


@router.patch("/me/password")
def change_password(
    req: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if not verify_password(req.current_password, current_user.hashed_password):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    current_user.hashed_password = get_password_hash(req.new_password)
    session.add(current_user)
    session.commit()
    return {"message": "Password changed successfully"}


@router.get("/me/library-summary")
def library_summary(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    active_loans = session.exec(
        select(Loan).where(Loan.user_id == current_user.id, Loan.status == LoanStatus.active)
    ).all()
    overdue_loans = [l for l in active_loans if l.due_at < datetime.utcnow()]
    pending_reservations = session.exec(
        select(Reservation).where(Reservation.user_id == current_user.id, Reservation.status == "pending")
    ).all()
    return {
        "active_loans": len(active_loans),
        "overdue_loans": len(overdue_loans),
        "pending_reservations": len(pending_reservations),
        "total_books_borrowed": len(active_loans),
    }

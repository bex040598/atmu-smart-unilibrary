from fastapi import APIRouter, Depends
from sqlmodel import Session, select, func
from datetime import datetime, timedelta

from app.core.database import get_session
from app.core.deps import get_current_user
from app.models.user import User, UserRoleEnum
from app.models.resource import DepartmentResource, ResourceStatus
from app.models.book import Book
from app.models.loan import Loan, LoanStatus
from app.models.reservation import Reservation
from app.models.reading_room import SeatReservation

router = APIRouter(prefix="/reports", tags=["reports"])


def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    return current_user


@router.get("/library")
def library_report(
    current_user: User = Depends(require_admin),
    session: Session = Depends(get_session),
):
    total_resources = session.exec(
        select(func.count(DepartmentResource.id)).where(
            DepartmentResource.status == ResourceStatus.approved
        )
    ).one()
    total_books = session.exec(select(func.count(Book.id))).one()
    active_loans = session.exec(
        select(func.count(Loan.id)).where(Loan.status == LoanStatus.active)
    ).one()
    overdue_loans = session.exec(
        select(func.count(Loan.id)).where(
            Loan.status == LoanStatus.active,
            Loan.due_at < datetime.utcnow(),
        )
    ).one()
    pending_reservations = session.exec(
        select(func.count(Reservation.id)).where(Reservation.status == "pending")
    ).one()
    today_seat_bookings = session.exec(
        select(func.count(SeatReservation.id)).where(
            SeatReservation.date == datetime.utcnow().strftime("%Y-%m-%d")
        )
    ).one()

    return {
        "total_resources": total_resources,
        "total_books": total_books,
        "active_loans": active_loans,
        "overdue_loans": overdue_loans,
        "pending_reservations": pending_reservations,
        "today_seat_bookings": today_seat_bookings,
        "generated_at": datetime.utcnow().isoformat(),
    }


@router.get("/users")
def users_report(
    current_user: User = Depends(require_admin),
    session: Session = Depends(get_session),
):
    from app.models.user import User as UserModel
    total_users = session.exec(select(func.count(UserModel.id))).one()
    students = session.exec(
        select(func.count(UserModel.id)).where(UserModel.role == "student")
    ).one()
    teachers = session.exec(
        select(func.count(UserModel.id)).where(UserModel.role == "teacher")
    ).one()
    return {
        "total_users": total_users,
        "students": students,
        "teachers": teachers,
    }

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta

from app.core.database import get_session
from app.core.deps import get_current_user
from app.models.user import User, UserRoleEnum
from app.models.loan import Loan, LoanStatus, RenewalRequest
from app.models.book import Book, BookCopy

router = APIRouter(prefix="/loans", tags=["loans"])


class LoanIssue(BaseModel):
    user_id: int
    book_id: int
    book_copy_id: Optional[int] = None
    reservation_id: Optional[int] = None
    due_days: int = 14
    notes: Optional[str] = None


@router.post("/issue")
def issue_loan(
    req: LoanIssue,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    book = session.get(Book, req.book_id)
    if not book or book.available_copies < 1:
        raise HTTPException(status_code=400, detail="Book not available")

    loan = Loan(
        user_id=req.user_id,
        book_id=req.book_id,
        book_copy_id=req.book_copy_id,
        reservation_id=req.reservation_id,
        librarian_id=current_user.id,
        due_at=datetime.utcnow() + timedelta(days=req.due_days),
        notes=req.notes,
    )
    book.available_copies -= 1
    session.add(loan)
    session.add(book)
    session.commit()
    session.refresh(loan)
    return loan


@router.post("/{loan_id}/return")
def return_loan(
    loan_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    loan = session.get(Loan, loan_id)
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    loan.status = LoanStatus.returned
    loan.returned_at = datetime.utcnow()

    book = session.get(Book, loan.book_id)
    if book:
        book.available_copies += 1
        session.add(book)

    session.add(loan)
    session.commit()
    return {"message": "Book returned"}


@router.get("/my")
def my_loans(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    loans = session.exec(
        select(Loan).where(Loan.user_id == current_user.id)
    ).all()
    result = []
    for loan in loans:
        book = session.get(Book, loan.book_id)
        days_remaining = (loan.due_at - datetime.utcnow()).days if loan.status == LoanStatus.active else None
        result.append({
            **loan.dict(),
            "book": {"id": book.id, "title": book.title, "author": book.author, "cover_url": book.cover_url} if book else None,
            "days_remaining": days_remaining,
            "is_overdue": loan.due_at < datetime.utcnow() and loan.status == LoanStatus.active,
        })
    return result


@router.get("/due-today")
def loans_due_today(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    today_end = datetime.utcnow().replace(hour=23, minute=59, second=59)
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0)
    loans = session.exec(
        select(Loan).where(
            Loan.due_at >= today_start,
            Loan.due_at <= today_end,
            Loan.status == LoanStatus.active,
        )
    ).all()
    return loans


@router.get("/overdue")
def overdue_loans(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    loans = session.exec(
        select(Loan).where(
            Loan.due_at < datetime.utcnow(),
            Loan.status == LoanStatus.active,
        )
    ).all()
    return loans


@router.post("/{loan_id}/renew-request")
def renewal_request(
    loan_id: int,
    reason: str = "",
    days: int = 7,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    loan = session.get(Loan, loan_id)
    if not loan or loan.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Loan not found")
    req = RenewalRequest(
        loan_id=loan_id,
        user_id=current_user.id,
        requested_days=days,
        reason=reason,
    )
    session.add(req)
    session.commit()
    return {"message": "Renewal requested"}

from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class LoanStatus(str, Enum):
    active = "active"
    returned = "returned"
    overdue = "overdue"
    lost = "lost"


class Loan(SQLModel, table=True):
    __tablename__ = "loans"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    book_id: int = Field(foreign_key="books.id")
    book_copy_id: Optional[int] = Field(default=None, foreign_key="book_copies.id")
    reservation_id: Optional[int] = Field(default=None, foreign_key="reservations.id")
    librarian_id: int = Field(foreign_key="users.id")
    status: LoanStatus = Field(default=LoanStatus.active)
    issued_at: datetime = Field(default_factory=datetime.utcnow)
    due_at: datetime
    returned_at: Optional[datetime] = Field(default=None)
    renewal_count: int = Field(default=0)
    fine_amount: float = Field(default=0.0)
    fine_paid: bool = Field(default=False)
    notes: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class RenewalRequest(SQLModel, table=True):
    __tablename__ = "renewal_requests"

    id: Optional[int] = Field(default=None, primary_key=True)
    loan_id: int = Field(foreign_key="loans.id")
    user_id: int = Field(foreign_key="users.id")
    requested_days: int = Field(default=7)
    status: str = Field(default="pending")
    reason: Optional[str] = Field(default=None)
    reviewed_by: Optional[int] = Field(default=None, foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    reviewed_at: Optional[datetime] = Field(default=None)

from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class ReservationStatus(str, Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"
    expired = "expired"
    picked_up = "picked_up"
    cancelled = "cancelled"


class Reservation(SQLModel, table=True):
    __tablename__ = "reservations"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    book_id: int = Field(foreign_key="books.id")
    book_copy_id: Optional[int] = Field(default=None, foreign_key="book_copies.id")
    status: ReservationStatus = Field(default=ReservationStatus.pending)
    pickup_date: Optional[datetime] = Field(default=None)
    expiry_date: Optional[datetime] = Field(default=None)
    notes: Optional[str] = Field(default=None)
    qr_code: Optional[str] = Field(default=None)
    librarian_id: Optional[int] = Field(default=None, foreign_key="users.id")
    rejection_reason: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class SeatStatus(str, Enum):
    available = "available"
    occupied = "occupied"
    reserved = "reserved"
    maintenance = "maintenance"


class ReadingRoom(SQLModel, table=True):
    __tablename__ = "reading_rooms"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    floor: Optional[int] = Field(default=None)
    capacity: int = Field(default=30)
    description: Optional[str] = Field(default=None)
    opens_at: str = Field(default="08:00")
    closes_at: str = Field(default="20:00")
    has_wifi: bool = Field(default=True)
    has_power: bool = Field(default=True)
    has_projector: bool = Field(default=False)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Seat(SQLModel, table=True):
    __tablename__ = "seats"

    id: Optional[int] = Field(default=None, primary_key=True)
    reading_room_id: int = Field(foreign_key="reading_rooms.id")
    seat_number: str
    row: Optional[int] = Field(default=None)
    col: Optional[int] = Field(default=None)
    status: SeatStatus = Field(default=SeatStatus.available)
    has_power: bool = Field(default=True)
    is_window: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class SeatReservation(SQLModel, table=True):
    __tablename__ = "seat_reservations"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    seat_id: int = Field(foreign_key="seats.id")
    reading_room_id: int = Field(foreign_key="reading_rooms.id")
    date: str
    start_time: str
    end_time: str
    status: str = Field(default="confirmed")
    qr_code: Optional[str] = Field(default=None)
    checked_in_at: Optional[datetime] = Field(default=None)
    checked_out_at: Optional[datetime] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)

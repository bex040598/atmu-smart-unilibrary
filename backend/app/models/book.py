from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Author(SQLModel, table=True):
    __tablename__ = "authors"

    id: Optional[int] = Field(default=None, primary_key=True)
    full_name: str
    bio: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Book(SQLModel, table=True):
    __tablename__ = "books"

    id: Optional[int] = Field(default=None, primary_key=True)
    department_id: Optional[int] = Field(default=None, foreign_key="departments.id")
    subject_id: Optional[int] = Field(default=None, foreign_key="subjects.id")
    isbn: Optional[str] = Field(default=None, unique=True)
    title: str
    author: str
    publisher: Optional[str] = Field(default=None)
    year: Optional[int] = Field(default=None)
    edition: Optional[str] = Field(default=None)
    language: str = Field(default="uz")
    category: Optional[str] = Field(default=None)
    description: Optional[str] = Field(default=None)
    cover_url: Optional[str] = Field(default=None)
    total_copies: int = Field(default=1)
    available_copies: int = Field(default=1)
    shelf_location: Optional[str] = Field(default=None)
    view_count: int = Field(default=0)
    borrow_count: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class BookCopy(SQLModel, table=True):
    __tablename__ = "book_copies"

    id: Optional[int] = Field(default=None, primary_key=True)
    book_id: int = Field(foreign_key="books.id")
    barcode: Optional[str] = Field(default=None, unique=True)
    condition: str = Field(default="good")
    status: str = Field(default="available")
    shelf_location: Optional[str] = Field(default=None)
    acquired_at: Optional[datetime] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)

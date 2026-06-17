from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.core.database import get_session
from app.core.deps import get_current_user
from app.models.user import User, UserRoleEnum
from app.models.book import Book, BookCopy

router = APIRouter(prefix="/books", tags=["books"])


class BookCreate(BaseModel):
    title: str
    author: str
    department_id: Optional[int] = None
    subject_id: Optional[int] = None
    isbn: Optional[str] = None
    publisher: Optional[str] = None
    year: Optional[int] = None
    edition: Optional[str] = None
    language: str = "uz"
    category: Optional[str] = None
    description: Optional[str] = None
    total_copies: int = 1
    shelf_location: Optional[str] = None


@router.get("")
def list_books(
    search: Optional[str] = None,
    department_id: Optional[int] = None,
    language: Optional[str] = None,
    category: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    session: Session = Depends(get_session),
):
    query = select(Book)
    if search:
        query = query.where(
            (Book.title.ilike(f"%{search}%")) | (Book.author.ilike(f"%{search}%"))
        )
    if department_id:
        query = query.where(Book.department_id == department_id)
    if language:
        query = query.where(Book.language == language)
    if category:
        query = query.where(Book.category == category)
    books = session.exec(query.offset(offset).limit(limit)).all()
    return books


@router.post("")
def create_book(
    book: BookCreate,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    db_book = Book(**book.dict())
    db_book.available_copies = book.total_copies
    session.add(db_book)
    session.commit()
    session.refresh(db_book)

    for i in range(book.total_copies):
        copy = BookCopy(
            book_id=db_book.id,
            barcode=f"ATMU-{db_book.id:04d}-{i+1:03d}",
            shelf_location=book.shelf_location,
        )
        session.add(copy)
    session.commit()
    return db_book


@router.get("/{book_id}")
def get_book(book_id: int, session: Session = Depends(get_session)):
    book = session.get(Book, book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    book.view_count += 1
    session.add(book)
    session.commit()
    return book


@router.get("/{book_id}/availability")
def get_book_availability(book_id: int, session: Session = Depends(get_session)):
    copies = session.exec(
        select(BookCopy).where(BookCopy.book_id == book_id)
    ).all()
    available = [c for c in copies if c.status == "available"]
    return {
        "book_id": book_id,
        "total_copies": len(copies),
        "available_copies": len(available),
        "copies": [{"id": c.id, "barcode": c.barcode, "status": c.status, "condition": c.condition} for c in copies],
    }

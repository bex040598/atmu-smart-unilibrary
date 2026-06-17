from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from pydantic import BaseModel
from typing import Optional, List
import uuid

from app.core.database import get_session
from app.core.deps import get_current_user_optional
from app.models.user import User
from app.models.resource import DepartmentResource, ResourceStatus
from app.models.book import Book
from app.models.ai_session import AISession, AIMessage

router = APIRouter(prefix="/ai", tags=["ai"])

SAMPLE_RESPONSES = {
    "default": "Sizning so'rovingiz bo'yicha men katalogdan quyidagi resurslarni topdim.",
    "not_found": "Afsuski, bu mavzu bo'yicha hozircha resurslar topilmadi. O'qituvchilaringizdan so'rab ko'ring yoki kutubxonachi bilan bog'laning.",
}


class ChatMessage(BaseModel):
    message: str
    session_token: Optional[str] = None
    language: str = "uz"


class SearchRequest(BaseModel):
    query: str
    department_id: Optional[int] = None
    language: str = "uz"


class CitationRequest(BaseModel):
    resource_id: int
    style: str = "APA"


@router.post("/chat")
def ai_chat(
    req: ChatMessage,
    session: Session = Depends(get_session),
    current_user: Optional[User] = Depends(get_current_user_optional),
):
    query_lower = req.message.lower()

    resources = session.exec(
        select(DepartmentResource).where(
            DepartmentResource.status == ResourceStatus.approved,
            DepartmentResource.title.ilike(f"%{query_lower.split()[0] if query_lower.split() else 'a'}%"),
        ).limit(5)
    ).all()

    books = session.exec(
        select(Book).where(
            Book.title.ilike(f"%{query_lower.split()[0] if query_lower.split() else 'a'}%")
        ).limit(3)
    ).all()

    sources = []
    for r in resources:
        sources.append({
            "id": r.id,
            "type": "resource",
            "title": r.title,
            "author": r.author,
            "material_type": r.material_type,
            "department_id": r.department_id,
            "language": r.language,
            "file_format": r.file_format,
            "download_allowed": r.download_allowed,
        })
    for b in books:
        sources.append({
            "id": b.id,
            "type": "book",
            "title": b.title,
            "author": b.author,
            "available_copies": b.available_copies,
            "language": b.language,
        })

    if sources:
        reply = f"'{req.message}' bo'yicha {len(sources)} ta resurs topildi:"
    else:
        reply = SAMPLE_RESPONSES["not_found"]

    return {
        "reply": reply,
        "sources": sources,
        "session_token": req.session_token or str(uuid.uuid4()),
        "language": req.language,
    }


@router.post("/search")
def ai_search(req: SearchRequest, session: Session = Depends(get_session)):
    query = req.query.lower()
    resources = session.exec(
        select(DepartmentResource).where(
            DepartmentResource.status == ResourceStatus.approved,
            (DepartmentResource.title.ilike(f"%{query}%")) |
            (DepartmentResource.tags.ilike(f"%{query}%")),
        ).limit(10)
    ).all()

    books = session.exec(
        select(Book).where(
            (Book.title.ilike(f"%{query}%")) |
            (Book.author.ilike(f"%{query}%"))
        ).limit(5)
    ).all()

    return {
        "query": req.query,
        "resources": [{"id": r.id, "title": r.title, "author": r.author, "type": "resource"} for r in resources],
        "books": [{"id": b.id, "title": b.title, "author": b.author, "type": "book"} for b in books],
        "total": len(resources) + len(books),
    }


@router.post("/recommend")
def ai_recommend(
    department_id: Optional[int] = None,
    course: Optional[int] = None,
    subject_id: Optional[int] = None,
    session: Session = Depends(get_session),
):
    query = select(DepartmentResource).where(DepartmentResource.status == ResourceStatus.approved)
    if department_id:
        query = query.where(DepartmentResource.department_id == department_id)
    if course:
        query = query.where(DepartmentResource.course == course)
    if subject_id:
        query = query.where(DepartmentResource.subject_id == subject_id)
    resources = session.exec(query.order_by(DepartmentResource.view_count.desc()).limit(6)).all()
    return {"recommendations": resources}


@router.post("/citation")
def generate_citation(req: CitationRequest, session: Session = Depends(get_session)):
    resource = session.get(DepartmentResource, req.resource_id)
    if not resource:
        book = session.get(Book, req.resource_id)
        if book:
            year = book.year or 2024
            if req.style == "APA":
                citation = f"{book.author}. ({year}). {book.title}. {book.publisher or 'ATMU Press'}."
            elif req.style == "MLA":
                citation = f'{book.author}. "{book.title}." {book.publisher or "ATMU Press"}, {year}.'
            else:
                citation = f"{book.author}. {book.title}. {book.publisher or 'ATMU Press'}, {year}."
            return {"citation": citation, "style": req.style}
        return {"citation": "Resource not found", "style": req.style}

    year = resource.academic_year or "2024"
    author = resource.author or "ATMU"
    if req.style == "APA":
        citation = f"{author}. ({year}). {resource.title}. ATMU Smart UniLibrary. https://library.atmu.uz"
    elif req.style == "MLA":
        citation = f'{author}. "{resource.title}." ATMU Smart UniLibrary, {year}.'
    else:
        citation = f"{author}. {resource.title}. ATMU, {year}."
    return {"citation": citation, "style": req.style}


@router.post("/normalize-query")
def normalize_query(query: str, session: Session = Depends(get_session)):
    normalized = query.strip()
    return {"original": query, "normalized": normalized}

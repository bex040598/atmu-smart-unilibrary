from fastapi import APIRouter, Depends
from sqlmodel import Session, select, or_
from pydantic import BaseModel
from typing import Optional, List
import uuid
import re

from app.core.database import get_session
from app.core.deps import get_current_user_optional
from app.models.user import User
from app.models.resource import DepartmentResource, ResourceStatus
from app.models.book import Book
from app.models.department import Department
from app.models.subject import Subject

router = APIRouter(prefix="/ai", tags=["ai"])


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


def extract_keywords(text: str) -> List[str]:
    """Extract meaningful keywords from query."""
    stop_words = {"menga", "uchun", "kerak", "bormi", "top", "bering", "qil",
                  "va", "yoki", "ham", "bu", "men", "siz", "u", "bir", "bu",
                  "bo'yicha", "haqida", "kafedrasi", "kafedrasida"}
    words = re.findall(r'\w+', text.lower())
    keywords = [w for w in words if len(w) > 2 and w not in stop_words]
    return keywords[:5] if keywords else [text.lower()[:20]]


def search_catalog(keywords: List[str], session: Session, limit_res=6, limit_books=4):
    """Search resources and books by multiple keywords."""
    resources = []
    books = []

    for kw in keywords[:3]:
        res = session.exec(
            select(DepartmentResource).where(
                DepartmentResource.status == ResourceStatus.approved,
                or_(
                    DepartmentResource.title.ilike(f"%{kw}%"),
                    DepartmentResource.description.ilike(f"%{kw}%"),
                    DepartmentResource.tags.ilike(f"%{kw}%"),
                    DepartmentResource.author.ilike(f"%{kw}%"),
                )
            ).limit(limit_res)
        ).all()
        for r in res:
            if not any(x.id == r.id for x in resources):
                resources.append(r)

        bks = session.exec(
            select(Book).where(
                or_(
                    Book.title.ilike(f"%{kw}%"),
                    Book.author.ilike(f"%{kw}%"),
                    Book.description.ilike(f"%{kw}%"),
                )
            ).limit(limit_books)
        ).all()
        for b in bks:
            if not any(x.id == b.id for x in books):
                books.append(b)

    return resources[:limit_res], books[:limit_books]


def build_reply(message: str, sources_count: int, language: str = "uz") -> str:
    kw_map = {
        "uz": {
            "found": f"'{message}' so'rovi bo'yicha {sources_count} ta material topildi. Quyida eng mos resurslar:",
            "not_found": "Bu mavzu bo'yicha hozircha resurslar topilmadi. O'qituvchilar yangi materiallar yuklasa, bu yerda ko'rinadi.",
            "tip": "\n\n💡 Maslahat: Kurs raqami yoki fan nomini aniqroq yozing.",
        },
        "ru": {
            "found": f"По запросу '{message}' найдено {sources_count} материалов:",
            "not_found": "По этой теме материалы пока не найдены.",
            "tip": "\n\n💡 Совет: Укажите номер курса или название предмета точнее.",
        },
        "en": {
            "found": f"Found {sources_count} materials for '{message}':",
            "not_found": "No resources found for this topic yet.",
            "tip": "\n\n💡 Tip: Try specifying the course number or subject name.",
        },
    }
    msgs = kw_map.get(language, kw_map["uz"])
    if sources_count > 0:
        return msgs["found"]
    return msgs["not_found"] + msgs["tip"]


@router.post("/chat")
def ai_chat(
    req: ChatMessage,
    session: Session = Depends(get_session),
    current_user: Optional[User] = Depends(get_current_user_optional),
):
    keywords = extract_keywords(req.message)
    resources, books = search_catalog(keywords, session)

    sources = []
    for r in resources:
        dept = session.get(Department, r.department_id) if r.department_id else None
        sources.append({
            "id": r.id,
            "type": "resource",
            "title": r.title,
            "author": r.author or "Noma'lum muallif",
            "material_type": r.material_type,
            "department_name": dept.name_uz if dept else None,
            "department_id": r.department_id,
            "language": r.language,
            "file_format": r.file_format,
            "course": r.course,
            "semester": r.semester,
            "download_allowed": r.download_allowed,
            "view_count": r.view_count,
        })
    for b in books:
        sources.append({
            "id": b.id,
            "type": "book",
            "title": b.title,
            "author": b.author or "Noma'lum",
            "available_copies": b.available_copies,
            "total_copies": b.total_copies,
            "language": b.language,
            "year": b.year,
            "material_type": "book",
        })

    reply = build_reply(req.message, len(sources), req.language)

    return {
        "reply": reply,
        "sources": sources,
        "keywords": keywords,
        "session_token": req.session_token or str(uuid.uuid4()),
        "language": req.language,
        "total_found": len(sources),
    }


@router.post("/search")
def ai_search(req: SearchRequest, session: Session = Depends(get_session)):
    keywords = extract_keywords(req.query)

    res_query = select(DepartmentResource).where(DepartmentResource.status == ResourceStatus.approved)
    if req.department_id:
        res_query = res_query.where(DepartmentResource.department_id == req.department_id)

    resources = []
    books = []
    for kw in keywords[:3]:
        r = session.exec(
            res_query.where(
                or_(
                    DepartmentResource.title.ilike(f"%{kw}%"),
                    DepartmentResource.tags.ilike(f"%{kw}%"),
                    DepartmentResource.description.ilike(f"%{kw}%"),
                )
            ).limit(10)
        ).all()
        for x in r:
            if not any(y["id"] == x.id for y in resources):
                resources.append({"id": x.id, "title": x.title, "author": x.author, "type": "resource", "material_type": x.material_type, "course": x.course})

        b = session.exec(
            select(Book).where(
                or_(Book.title.ilike(f"%{kw}%"), Book.author.ilike(f"%{kw}%"))
            ).limit(5)
        ).all()
        for x in b:
            if not any(y["id"] == x.id for y in books):
                books.append({"id": x.id, "title": x.title, "author": x.author, "type": "book", "available_copies": x.available_copies})

    return {
        "query": req.query,
        "keywords": keywords,
        "resources": resources[:10],
        "books": books[:5],
        "total": len(resources) + len(books),
    }


@router.post("/recommend")
def ai_recommend(
    department_id: Optional[int] = None,
    course: Optional[int] = None,
    subject_id: Optional[int] = None,
    session: Session = Depends(get_session),
):
    q = select(DepartmentResource).where(DepartmentResource.status == ResourceStatus.approved)
    if department_id:
        q = q.where(DepartmentResource.department_id == department_id)
    if course:
        q = q.where(DepartmentResource.course == course)
    if subject_id:
        q = q.where(DepartmentResource.subject_id == subject_id)
    resources = session.exec(q.order_by(DepartmentResource.view_count.desc()).limit(6)).all()
    return {
        "recommendations": [
            {"id": r.id, "title": r.title, "author": r.author, "material_type": r.material_type,
             "course": r.course, "view_count": r.view_count, "language": r.language}
            for r in resources
        ]
    }


@router.post("/citation")
def generate_citation(req: CitationRequest, session: Session = Depends(get_session)):
    resource = session.get(DepartmentResource, req.resource_id)
    if resource:
        year = resource.academic_year or "2024"
        author = resource.author or "ATMU"
        title = resource.title
        if req.style == "APA":
            citation = f"{author}. ({year}). {title}. ATMU Smart UniLibrary. https://library.atmu.uz"
        elif req.style == "MLA":
            citation = f'{author}. "{title}." ATMU Smart UniLibrary, {year}.'
        elif req.style == "GOST":
            citation = f"{author}. {title} / {author}. — Toshkent: ATMU, {year}."
        else:
            citation = f"{author}. {title}. ATMU, {year}."
        return {"citation": citation, "style": req.style, "title": title, "author": author}

    book = session.get(Book, req.resource_id)
    if book:
        year = str(book.year or 2024)
        author = book.author or "Noma'lum"
        if req.style == "APA":
            citation = f"{author}. ({year}). {book.title}. {book.publisher or 'ATMU Press'}."
        elif req.style == "MLA":
            citation = f'{author}. "{book.title}." {book.publisher or "ATMU Press"}, {year}.'
        elif req.style == "GOST":
            citation = f"{author}. {book.title} / {author}. — Toshkent: {book.publisher or 'ATMU'}, {year}."
        else:
            citation = f"{author}. {book.title}. {book.publisher or 'ATMU Press'}, {year}."
        return {"citation": citation, "style": req.style, "title": book.title, "author": author}

    return {"citation": "Resurs topilmadi", "style": req.style}


@router.post("/normalize-query")
def normalize_query(query: str, session: Session = Depends(get_session)):
    normalized = query.strip()
    keywords = extract_keywords(normalized)
    return {"original": query, "normalized": normalized, "keywords": keywords}


@router.post("/department-search")
def department_search(
    department_id: int,
    query: str,
    session: Session = Depends(get_session),
):
    keywords = extract_keywords(query)
    resources = []
    for kw in keywords[:3]:
        r = session.exec(
            select(DepartmentResource).where(
                DepartmentResource.status == ResourceStatus.approved,
                DepartmentResource.department_id == department_id,
                or_(
                    DepartmentResource.title.ilike(f"%{kw}%"),
                    DepartmentResource.description.ilike(f"%{kw}%"),
                    DepartmentResource.tags.ilike(f"%{kw}%"),
                )
            ).limit(10)
        ).all()
        for x in r:
            if not any(y["id"] == x.id for y in resources):
                resources.append({
                    "id": x.id, "title": x.title, "author": x.author,
                    "material_type": x.material_type, "course": x.course,
                    "view_count": x.view_count, "language": x.language,
                })
    return {"department_id": department_id, "query": query, "results": resources, "total": len(resources)}

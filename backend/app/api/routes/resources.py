from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlmodel import Session, select
from typing import Optional
from datetime import datetime
import os
import shutil
import uuid

from app.core.database import get_session
from app.core.deps import get_current_user
from app.models.user import User, UserRoleEnum
from app.models.resource import DepartmentResource, ResourceStatus, MaterialType

router = APIRouter(prefix="/department-resources", tags=["resources"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("")
def list_resources(
    department_id: Optional[int] = None,
    subject_id: Optional[int] = None,
    material_type: Optional[str] = None,
    status: Optional[str] = "approved",
    language: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 20,
    offset: int = 0,
    session: Session = Depends(get_session),
):
    query = select(DepartmentResource)
    if department_id:
        query = query.where(DepartmentResource.department_id == department_id)
    if subject_id:
        query = query.where(DepartmentResource.subject_id == subject_id)
    if material_type:
        query = query.where(DepartmentResource.material_type == material_type)
    if status:
        query = query.where(DepartmentResource.status == status)
    if language:
        query = query.where(DepartmentResource.language == language)
    if search:
        query = query.where(DepartmentResource.title.ilike(f"%{search}%"))
    query = query.offset(offset).limit(limit)
    return session.exec(query).all()


@router.post("")
async def create_resource(
    title: str = Form(...),
    description: Optional[str] = Form(None),
    author: Optional[str] = Form(None),
    department_id: int = Form(...),
    subject_id: Optional[int] = Form(None),
    material_type: str = Form("lecture"),
    language: str = Form("uz"),
    course: Optional[int] = Form(None),
    semester: Optional[int] = Form(None),
    academic_year: Optional[str] = Form(None),
    tags: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    file_url = None
    file_name = None
    file_size = None
    file_format = None

    if file:
        ext = os.path.splitext(file.filename)[1]
        unique_name = f"{uuid.uuid4()}{ext}"
        file_path = os.path.join(UPLOAD_DIR, unique_name)
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        file_url = f"/uploads/{unique_name}"
        file_name = file.filename
        file_format = ext.lstrip(".")
        file_size = os.path.getsize(file_path)

    resource = DepartmentResource(
        department_id=department_id,
        subject_id=subject_id,
        uploader_id=current_user.id,
        title=title,
        description=description,
        author=author or current_user.full_name,
        material_type=material_type,
        language=language,
        course=course,
        semester=semester,
        academic_year=academic_year,
        tags=tags,
        file_url=file_url,
        file_name=file_name,
        file_size=file_size,
        file_format=file_format,
        status=ResourceStatus.draft,
    )
    session.add(resource)
    session.commit()
    session.refresh(resource)
    return resource


@router.get("/{resource_id}")
def get_resource(resource_id: int, session: Session = Depends(get_session)):
    r = session.get(DepartmentResource, resource_id)
    if not r:
        raise HTTPException(status_code=404, detail="Resource not found")
    return r


@router.post("/{resource_id}/submit")
def submit_resource(
    resource_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    r = session.get(DepartmentResource, resource_id)
    if not r or r.uploader_id != current_user.id:
        raise HTTPException(status_code=404, detail="Resource not found")
    r.status = ResourceStatus.pending_review
    r.submitted_at = datetime.utcnow()
    session.add(r)
    session.commit()
    return {"message": "Submitted for review"}


@router.patch("/{resource_id}/approve")
def approve_resource(
    resource_id: int,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian, UserRoleEnum.department_head]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    r = session.get(DepartmentResource, resource_id)
    if not r:
        raise HTTPException(status_code=404, detail="Resource not found")
    r.status = ResourceStatus.approved
    r.reviewer_id = current_user.id
    r.reviewed_at = datetime.utcnow()
    r.published_at = datetime.utcnow()
    session.add(r)
    session.commit()
    return {"message": "Resource approved"}


@router.patch("/{resource_id}/reject")
def reject_resource(
    resource_id: int,
    reason: str = "",
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role not in [UserRoleEnum.admin, UserRoleEnum.librarian, UserRoleEnum.department_head]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    r = session.get(DepartmentResource, resource_id)
    if not r:
        raise HTTPException(status_code=404, detail="Resource not found")
    r.status = ResourceStatus.rejected
    r.rejection_reason = reason
    r.reviewer_id = current_user.id
    r.reviewed_at = datetime.utcnow()
    session.add(r)
    session.commit()
    return {"message": "Resource rejected"}


@router.post("/{resource_id}/view")
def record_view(resource_id: int, session: Session = Depends(get_session)):
    r = session.get(DepartmentResource, resource_id)
    if r:
        r.view_count += 1
        session.add(r)
        session.commit()
    return {"message": "View recorded"}


@router.post("/{resource_id}/download")
def record_download(resource_id: int, session: Session = Depends(get_session)):
    r = session.get(DepartmentResource, resource_id)
    if r:
        r.download_count += 1
        session.add(r)
        session.commit()
    return {"message": "Download recorded"}

from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select
from typing import Optional, List

from app.core.database import get_session
from app.models.faculty import Faculty
from app.models.department import Department
from app.models.resource import DepartmentResource, ResourceStatus

router = APIRouter(tags=["departments"])


@router.get("/faculties")
def get_faculties(session: Session = Depends(get_session)):
    faculties = session.exec(select(Faculty)).all()
    return faculties


@router.get("/departments")
def get_departments(
    faculty_id: Optional[int] = None,
    session: Session = Depends(get_session),
):
    query = select(Department)
    if faculty_id:
        query = query.where(Department.faculty_id == faculty_id)
    departments = session.exec(query).all()
    return departments


@router.get("/departments/{dept_id}")
def get_department(dept_id: int, session: Session = Depends(get_session)):
    dept = session.get(Department, dept_id)
    if not dept:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Department not found")
    return dept


@router.get("/departments/by-slug/{slug}")
def get_department_by_slug(slug: str, session: Session = Depends(get_session)):
    dept = session.exec(select(Department).where(Department.slug == slug)).first()
    if not dept:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Department not found")
    return dept


@router.get("/departments/{dept_id}/statistics")
def get_department_stats(dept_id: int, session: Session = Depends(get_session)):
    dept = session.get(Department, dept_id)
    if not dept:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Department not found")

    resources = session.exec(
        select(DepartmentResource).where(DepartmentResource.department_id == dept_id)
    ).all()
    approved = [r for r in resources if r.status == ResourceStatus.approved]
    pending = [r for r in resources if r.status == ResourceStatus.pending_review]
    total_views = sum(r.view_count for r in approved)
    total_downloads = sum(r.download_count for r in approved)

    return {
        "department_id": dept_id,
        "total_resources": len(approved),
        "pending_resources": len(pending),
        "total_views": total_views,
        "total_downloads": total_downloads,
        "subject_count": dept.subject_count,
        "teacher_count": dept.teacher_count,
    }


@router.get("/departments/{dept_id}/resources")
def get_department_resources(
    dept_id: int,
    status: Optional[str] = "approved",
    material_type: Optional[str] = None,
    session: Session = Depends(get_session),
):
    query = select(DepartmentResource).where(DepartmentResource.department_id == dept_id)
    if status:
        query = query.where(DepartmentResource.status == status)
    if material_type:
        query = query.where(DepartmentResource.material_type == material_type)
    resources = session.exec(query).all()
    return resources

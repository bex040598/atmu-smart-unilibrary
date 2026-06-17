from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class MaterialType(str, Enum):
    textbook = "textbook"
    study_guide = "study_guide"
    lecture = "lecture"
    lab_work = "lab_work"
    practical = "practical"
    presentation = "presentation"
    test = "test"
    video = "video"
    article = "article"
    thesis = "thesis"
    course_work = "course_work"
    methodology = "methodology"
    code_sample = "code_sample"
    dataset = "dataset"


class ResourceStatus(str, Enum):
    draft = "draft"
    pending_review = "pending_review"
    approved = "approved"
    rejected = "rejected"
    needs_revision = "needs_revision"
    archived = "archived"


class ResourceLanguage(str, Enum):
    uz = "uz"
    ru = "ru"
    en = "en"
    tr = "tr"


class DepartmentResource(SQLModel, table=True):
    __tablename__ = "department_resources"

    id: Optional[int] = Field(default=None, primary_key=True)
    department_id: int = Field(foreign_key="departments.id")
    subject_id: Optional[int] = Field(default=None, foreign_key="subjects.id")
    uploader_id: int = Field(foreign_key="users.id")
    reviewer_id: Optional[int] = Field(default=None, foreign_key="users.id")

    title: str
    description: Optional[str] = Field(default=None)
    author: Optional[str] = Field(default=None)
    material_type: MaterialType = Field(default=MaterialType.lecture)
    language: ResourceLanguage = Field(default=ResourceLanguage.uz)
    course: Optional[int] = Field(default=None)
    semester: Optional[int] = Field(default=None)
    academic_year: Optional[str] = Field(default=None)
    tags: Optional[str] = Field(default=None)
    keywords: Optional[str] = Field(default=None)
    cover_url: Optional[str] = Field(default=None)
    file_url: Optional[str] = Field(default=None)
    file_name: Optional[str] = Field(default=None)
    file_size: Optional[int] = Field(default=None)
    file_format: Optional[str] = Field(default=None)
    download_allowed: bool = Field(default=True)
    online_read_allowed: bool = Field(default=True)
    visibility: str = Field(default="department")

    status: ResourceStatus = Field(default=ResourceStatus.draft)
    rejection_reason: Optional[str] = Field(default=None)
    revision_notes: Optional[str] = Field(default=None)
    version: str = Field(default="1.0")

    view_count: int = Field(default=0)
    download_count: int = Field(default=0)
    rating_avg: float = Field(default=0.0)
    rating_count: int = Field(default=0)

    submitted_at: Optional[datetime] = Field(default=None)
    reviewed_at: Optional[datetime] = Field(default=None)
    published_at: Optional[datetime] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class ResourceFile(SQLModel, table=True):
    __tablename__ = "resource_files"

    id: Optional[int] = Field(default=None, primary_key=True)
    resource_id: int = Field(foreign_key="department_resources.id")
    file_url: str
    file_name: str
    file_size: int
    file_format: str
    is_primary: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

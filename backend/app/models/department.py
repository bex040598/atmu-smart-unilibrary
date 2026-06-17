from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Department(SQLModel, table=True):
    __tablename__ = "departments"

    id: Optional[int] = Field(default=None, primary_key=True)
    faculty_id: int = Field(foreign_key="faculties.id")
    name_uz: str
    name_ru: str
    name_en: str
    name_tr: str
    slug: str = Field(unique=True)
    description_uz: Optional[str] = Field(default=None)
    head_name: Optional[str] = Field(default=None)
    head_title: Optional[str] = Field(default=None)
    icon: Optional[str] = Field(default=None)
    color: Optional[str] = Field(default=None)
    email: Optional[str] = Field(default=None)
    phone: Optional[str] = Field(default=None)
    resource_count: int = Field(default=0)
    subject_count: int = Field(default=0)
    teacher_count: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

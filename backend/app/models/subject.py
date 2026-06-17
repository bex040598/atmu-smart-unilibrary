from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Subject(SQLModel, table=True):
    __tablename__ = "subjects"

    id: Optional[int] = Field(default=None, primary_key=True)
    department_id: int = Field(foreign_key="departments.id")
    name_uz: str
    name_ru: Optional[str] = Field(default=None)
    name_en: Optional[str] = Field(default=None)
    code: Optional[str] = Field(default=None)
    course: Optional[int] = Field(default=None)
    semester: Optional[int] = Field(default=None)
    credits: Optional[int] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)

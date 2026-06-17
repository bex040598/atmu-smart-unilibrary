from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Faculty(SQLModel, table=True):
    __tablename__ = "faculties"

    id: Optional[int] = Field(default=None, primary_key=True)
    name_uz: str
    name_ru: str
    name_en: str
    name_tr: str
    slug: str = Field(unique=True)
    description: Optional[str] = Field(default=None)
    icon: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)

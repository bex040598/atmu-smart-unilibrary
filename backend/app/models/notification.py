from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Notification(SQLModel, table=True):
    __tablename__ = "notifications"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    title: str
    message: str
    type: str = Field(default="info")
    is_read: bool = Field(default=False)
    link: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Announcement(SQLModel, table=True):
    __tablename__ = "announcements"

    id: Optional[int] = Field(default=None, primary_key=True)
    title_uz: str
    title_ru: Optional[str] = Field(default=None)
    title_en: Optional[str] = Field(default=None)
    content_uz: str
    content_ru: Optional[str] = Field(default=None)
    content_en: Optional[str] = Field(default=None)
    type: str = Field(default="general")
    is_published: bool = Field(default=True)
    created_by: int = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    expires_at: Optional[datetime] = Field(default=None)

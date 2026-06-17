from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class AISession(SQLModel, table=True):
    __tablename__ = "ai_sessions"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="users.id")
    session_token: str = Field(unique=True)
    language: str = Field(default="uz")
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_activity: datetime = Field(default_factory=datetime.utcnow)


class AIMessage(SQLModel, table=True):
    __tablename__ = "ai_messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    session_id: int = Field(foreign_key="ai_sessions.id")
    role: str
    content: str
    sources: Optional[str] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)

from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class FaceEmbedding(SQLModel, table=True):
    __tablename__ = "face_embeddings"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", unique=True)
    embedding_hash: str
    registered_at: datetime = Field(default_factory=datetime.utcnow)
    last_verified_at: Optional[datetime] = Field(default=None)
    verification_count: int = Field(default=0)
    is_active: bool = Field(default=True)

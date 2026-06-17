from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid


class UserRoleEnum(str, Enum):
    admin = "admin"
    student = "student"
    teacher = "teacher"
    librarian = "librarian"
    department_head = "department_head"


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    uuid: str = Field(default_factory=lambda: str(uuid.uuid4()), unique=True)
    email: str = Field(unique=True, index=True)
    full_name: str
    hashed_password: str
    role: UserRoleEnum = Field(default=UserRoleEnum.student)
    department_id: Optional[int] = Field(default=None, foreign_key="departments.id")
    student_id: Optional[str] = Field(default=None)
    phone: Optional[str] = Field(default=None)
    avatar_url: Optional[str] = Field(default=None)
    bio: Optional[str] = Field(default=None)
    course: Optional[int] = Field(default=None)
    semester: Optional[int] = Field(default=None)
    face_registered: bool = Field(default=False)
    is_active: bool = Field(default=True)
    is_verified: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: Optional[datetime] = Field(default=None)


class UserRole(SQLModel, table=True):
    __tablename__ = "user_roles"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    role: UserRoleEnum
    granted_at: datetime = Field(default_factory=datetime.utcnow)

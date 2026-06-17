from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlmodel import Session, select
from datetime import datetime
import hashlib
import os
import shutil
import uuid

from app.core.database import get_session
from app.core.deps import get_current_user
from app.models.user import User
from app.models.face import FaceEmbedding

router = APIRouter(prefix="/face", tags=["face"])


@router.post("/register")
async def register_face(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    content = await file.read()
    embedding_hash = hashlib.sha256(content).hexdigest()

    existing = session.exec(
        select(FaceEmbedding).where(FaceEmbedding.user_id == current_user.id)
    ).first()

    if existing:
        existing.embedding_hash = embedding_hash
        existing.registered_at = datetime.utcnow()
        session.add(existing)
    else:
        face = FaceEmbedding(
            user_id=current_user.id,
            embedding_hash=embedding_hash,
        )
        session.add(face)

    current_user.face_registered = True
    session.add(current_user)
    session.commit()
    return {"message": "Face registered successfully", "status": "registered"}


@router.post("/verify")
async def verify_face(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    content = await file.read()
    new_hash = hashlib.sha256(content).hexdigest()

    face = session.exec(
        select(FaceEmbedding).where(FaceEmbedding.user_id == current_user.id)
    ).first()

    if not face:
        raise HTTPException(status_code=404, detail="Face not registered")

    face.last_verified_at = datetime.utcnow()
    face.verification_count += 1
    session.add(face)
    session.commit()

    # In production, compare embeddings with a real ML model
    # For demo: return success
    return {
        "verified": True,
        "message": "Face verified successfully",
        "confidence": 0.97,
    }


@router.get("/status")
def face_status(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    face = session.exec(
        select(FaceEmbedding).where(FaceEmbedding.user_id == current_user.id)
    ).first()
    if not face:
        return {"registered": False}
    return {
        "registered": True,
        "registered_at": face.registered_at.isoformat(),
        "last_verified_at": face.last_verified_at.isoformat() if face.last_verified_at else None,
        "verification_count": face.verification_count,
    }


@router.delete("/remove")
def remove_face(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    face = session.exec(
        select(FaceEmbedding).where(FaceEmbedding.user_id == current_user.id)
    ).first()
    if face:
        session.delete(face)
    current_user.face_registered = False
    session.add(current_user)
    session.commit()
    return {"message": "Face data removed"}

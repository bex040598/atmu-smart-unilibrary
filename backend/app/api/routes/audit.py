from fastapi import APIRouter, Depends
from sqlmodel import Session, select

from app.core.database import get_session
from app.core.deps import get_current_user
from app.models.user import User, UserRoleEnum
from app.models.audit import AuditLog

router = APIRouter(prefix="/audit-logs", tags=["audit"])


@router.get("")
def get_audit_logs(
    limit: int = 50,
    offset: int = 0,
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    if current_user.role != UserRoleEnum.admin:
        from fastapi import HTTPException
        raise HTTPException(status_code=403, detail="Admin only")
    logs = session.exec(
        select(AuditLog).order_by(AuditLog.created_at.desc()).offset(offset).limit(limit)
    ).all()
    return logs

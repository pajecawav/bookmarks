from app import crud, models
from app.api.dependencies import get_current_user, get_db
from app import schemas
from typing import List, Set
from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session


router = APIRouter()


@router.get("", response_model=List[schemas.Tag])
def get_tags(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    tags = (
        db.query(models.Tag)
        .select_from(models.Link)
        .join(models.Link.tags)
        .filter(models.Link.user_id == current_user.id)
        .all()
    )
    return tags

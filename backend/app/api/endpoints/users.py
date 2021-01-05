from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import dependencies

router = APIRouter()


@router.post("", response_model=schemas.User)
def create_user(
    user_in: schemas.UserCreate, db: Session = Depends(dependencies.get_db)
):
    if crud.user.get_by_username(db, username=user_in.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists.",
        )

    user = crud.user.create(db, user_in)

    return user

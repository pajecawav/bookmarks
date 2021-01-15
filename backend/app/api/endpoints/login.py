from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, models, schemas, security
from app.api.dependencies import get_current_user, get_db

router = APIRouter()


@router.post("/token", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(get_db), form: OAuth2PasswordRequestForm = Depends()
):
    user = crud.user.authenticate(db, username=form.username, password=form.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid credentials.",
        )
    result = {
        "access_token": security.create_access_token(str(user.id)),
        "token_type": "bearer",
    }
    return result


@router.post("/test-token", response_model=schemas.User)
def login_test_token(current_user: models.User = Depends(get_current_user)):
    return current_user

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas import UserCreate
from app.tests.utils import random_lower_string


def test_create_user(db: Session) -> None:
    username = random_lower_string()
    password = random_lower_string()
    user_in = UserCreate(username=username, password=password)
    user = crud.user.create(db, user_in)
    assert user.username == username
    assert hasattr(user, "password_hashed")


def test_authenticate_user(db: Session) -> None:
    username = random_lower_string()
    password = random_lower_string()
    user_in = UserCreate(username=username, password=password)

    user = crud.user.authenticate(db, username=username, password=password)
    assert user is None

    user = crud.user.create(db, user_in)
    authenticated_user = crud.user.authenticate(
        db, username=username, password=password
    )
    assert authenticated_user
    assert authenticated_user.username == username


def test_authenticate_user_invalid_password(db: Session) -> None:
    username = random_lower_string()
    password = random_lower_string()
    user_in = UserCreate(username=username, password=password)
    crud.user.create(db, user_in)
    authenticated_user = crud.user.authenticate(
        db, username=username, password=password + "1"
    )
    assert authenticated_user is None


def test_get_user(db: Session) -> None:
    username = random_lower_string()
    password = random_lower_string()
    user_in = UserCreate(username=username, password=password)
    user = crud.user.create(db, user_in)

    user2 = crud.user.get(db, user.id)
    assert user2
    assert jsonable_encoder(user2) == jsonable_encoder(user)

    user3 = crud.user.get_by_username(db, username=user.username)
    assert user3
    assert jsonable_encoder(user3) == jsonable_encoder(user)

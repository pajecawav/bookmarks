import random
import string
from sqlalchemy.orm import Session
from app import models, crud, schemas
from typing import Tuple


def random_lower_string(k: int = 10) -> str:
    return "".join(random.choices(string.ascii_lowercase, k=k))


def create_random_user(db: Session) -> Tuple[models.User, str]:
    username = random_lower_string()
    password = random_lower_string()
    user_in = schemas.UserCreate(username=username, password=password)
    user = crud.user.create(db, user_in)
    return user, password
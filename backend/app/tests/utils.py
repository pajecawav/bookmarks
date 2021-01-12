import random
import string
from typing import Dict, Tuple

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.config import settings


def random_lower_string(k: int = 10) -> str:
    return "".join(random.choices(string.ascii_lowercase, k=k))


def create_random_user(db: Session) -> Tuple[models.User, str]:
    username = random_lower_string()
    password = random_lower_string()
    user_in = schemas.UserCreate(username=username, password=password)
    user = crud.user.create(db, user_in)
    return user, password


def create_random_link(db: Session) -> models.Link:
    title = random_lower_string()
    url = "https://example.com"
    link_in = schemas.LinkCreate(title=title, url=url)
    link = crud.link.create(db, link_in)
    return link


def get_user_auth_headers(
    username: str, password: str, client: TestClient
) -> Dict[str, str]:
    data = {"username": username, "password": password}
    response = client.post(f"{settings.API_ROUTE}/login/token", data=data)
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    return headers

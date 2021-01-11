from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.config import settings
from app.tests.utils import random_lower_string
from app.schemas import UserCreate
from app import crud


def test_create_user(client: TestClient) -> None:
    username = random_lower_string()
    password = random_lower_string()
    data = {"username": username, "password": password}
    response = client.post(f"{settings.API_ROUTE}/users", json=data)
    assert response.status_code == 200
    new_user = response.json()
    assert username == new_user["username"]


def test_create_existing_user(client: TestClient, db: Session) -> None:
    username = random_lower_string()
    password = random_lower_string()
    data = {"username": username, "password": password}
    user_in = UserCreate(username=username, password=password)
    crud.user.create(db, user_in)
    response = client.post(f"{settings.API_ROUTE}/users", json=data)
    json = response.json()
    assert response.status_code == 400
    assert json["detail"] == "User already exists."
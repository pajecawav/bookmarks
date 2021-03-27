from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app import crud
from app.schemas import UserCreate
from app.tests.utils import random_lower_string


def test_create_user(client: TestClient) -> None:
    username = random_lower_string()
    password = random_lower_string()
    data = {"username": username, "password": password}
    response = client.post("/users", json=data)
    assert response.status_code == 200
    new_user = response.json()
    assert username == new_user["username"]
    assert not new_user["is_superuser"]


def test_create_existing_user(client: TestClient, db: Session) -> None:
    username = random_lower_string()
    password = random_lower_string()
    data = {"username": username, "password": password}
    user_in = UserCreate(username=username, password=password)
    crud.user.create(db, user_in)
    response = client.post("/users", json=data)
    json = response.json()
    assert response.status_code == 400
    assert json["detail"] == "User already exists."

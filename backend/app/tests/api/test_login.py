from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.config import settings
from app.tests.utils import create_random_user


def test_access_token(client: TestClient, db: Session) -> None:
    user, password = create_random_user(db)
    data = {"username": user.username, "password": password}
    response = client.post(f"{settings.API_ROUTE}/login/token", data=data)
    assert response.status_code == 200
    json = response.json()
    assert "access_token" in json
    assert json["access_token"]

    token = json["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    response = client.post(f"{settings.API_ROUTE}/login/test-token", headers=headers)
    assert response.status_code == 200
    json = response.json()
    assert "username" in json
    assert json["username"] == user.username

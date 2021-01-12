from typing import Dict

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.config import settings
from app.tests.utils import (
    create_random_link,
    create_random_user,
    get_user_auth_headers,
    random_lower_string,
)


def test_create_link(client: TestClient, db: Session) -> None:
    user, password = create_random_user(db)
    headers = get_user_auth_headers(user.username, password, client)
    title = random_lower_string()
    url = "https://example.com"
    data = {"title": title, "url": url}
    response = client.post(f"{settings.API_ROUTE}/links", json=data, headers=headers)
    assert response.status_code == 200
    json = response.json()
    assert json["title"] == title
    assert json["url"] == url
    assert not json["liked"]
    assert not json["archived"]


def test_read_link(
    client: TestClient, db: Session, superuser_headers: Dict[str, str]
) -> None:
    link = create_random_link(db)
    response = client.get(
        f"{settings.API_ROUTE}/links/{link.id}", headers=superuser_headers
    )
    assert response.status_code == 200
    json = response.json()
    assert json["title"] == link.title
    assert json["url"] == link.url
    assert json["liked"] == link.liked
    assert json["archived"] == link.archived


def test_like_link(
    client: TestClient, db: Session, superuser_headers: Dict[str, str]
) -> None:
    link = create_random_link(db)
    response = client.post(
        f"{settings.API_ROUTE}/links/{link.id}/toggle_liked", headers=superuser_headers
    )
    assert response.status_code == 200


def test_archive_link(
    client: TestClient, db: Session, superuser_headers: Dict[str, str]
) -> None:
    link = create_random_link(db)
    response = client.post(
        f"{settings.API_ROUTE}/links/{link.id}/toggle_archived",
        headers=superuser_headers,
    )
    assert response.status_code == 200

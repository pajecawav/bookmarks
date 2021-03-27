from typing import Dict

from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

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
    response = client.post("/links", json=data, headers=headers)
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
    response = client.get(f"/links/{link.id}", headers=superuser_headers)
    assert response.status_code == 200
    json = response.json()
    assert json["title"] == link.title
    assert json["url"] == link.url
    assert json["liked"] == link.liked
    assert json["archived"] == link.archived


def test_update_link(
    client: TestClient, db: Session, superuser_headers: Dict[str, str]
) -> None:
    link = create_random_link(db)
    new_title = link.title + " updated"
    new_url = link.url + ".edu"
    data = {
        "title": new_title,
        "url": new_url,
        "liked": not link.liked,
        "archived": not link.archived,
    }
    response = client.post(f"/links/{link.id}", headers=superuser_headers, json=data)
    assert response.status_code == 200
    link2 = response.json()
    assert link2["title"] == data["title"]
    assert link2["url"] == data["url"]
    assert link2["liked"] == data["liked"]
    assert link2["archived"] == data["archived"]

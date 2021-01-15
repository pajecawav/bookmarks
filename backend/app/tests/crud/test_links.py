from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app import crud
from app.schemas import LinkCreate, LinkUpdate, TagCreate
from app.tests.utils import create_random_link, random_lower_string


def test_create_link(db: Session) -> None:
    title = random_lower_string()
    url = "https://example.com"
    link_in = LinkCreate(title=title, url=url)
    link = crud.link.create(db, link_in)
    assert link.title == title
    assert link.url == url
    assert not link.liked
    assert not link.archived


def test_create_link_no_title(db: Session) -> None:
    url = "https://example.com"
    link_in = LinkCreate(url=url)
    link = crud.link.create(db, link_in)
    assert link.title == url
    assert link.url == url
    assert not link.liked
    assert not link.archived


def test_get_link(db: Session) -> None:
    link = create_random_link(db)
    link2 = crud.link.get(db, link.id)
    assert link2
    assert jsonable_encoder(link2) == jsonable_encoder(link)


def test_update_link(db: Session) -> None:
    link = create_random_link(db)
    new_title = random_lower_string()
    new_url = "https://example.org"
    tag_name = random_lower_string()
    link_update = LinkUpdate(
        title=new_title, url=new_url, tags=[TagCreate(name=tag_name)]
    )
    new_link = crud.link.update(db, object_db=link, object_update=link_update)
    assert new_link
    assert new_link.title == new_title
    assert new_link.url == new_url
    new_tags = list(new_link.tags)
    assert len(new_tags) == 1
    assert new_tags[0].name == tag_name


def test_delete_link(db: Session) -> None:
    link = create_random_link(db)
    crud.link.delete(db, id=link.id)
    link2 = crud.link.get(db, link.id)
    assert link2 is None


def test_toggle_liked(db: Session) -> None:
    link = create_random_link(db)
    liked = link.liked
    crud.link.toggle_liked(db, link=link)
    assert link.liked != liked


def test_toggle_archived(db: Session) -> None:
    link = create_random_link(db)
    archived = link.archived
    crud.link.toggle_archived(db, link=link)
    assert link.archived != archived

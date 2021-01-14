from sqlalchemy.orm import Session

from app import crud
from app.schemas import TagCreate
from app.tests.utils import random_lower_string


def test_create_same_tag(db: Session) -> None:
    tag_in = TagCreate(name=random_lower_string())
    tag = crud.tag.create(db, tag_in)
    assert tag
    assert tag.name == tag_in.name

    tag2 = crud.tag.create(db, tag_in)
    assert tag2
    assert tag2 == tag

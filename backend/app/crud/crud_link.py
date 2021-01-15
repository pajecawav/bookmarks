from collections import OrderedDict

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.models import Link
from app.schemas import LinkCreate, LinkUpdate, TagCreate

from . import crud_tag
from .base import CRUDBase


class CRUDLink(CRUDBase[Link, LinkCreate, LinkUpdate]):
    def create(self, db: Session, link_in: LinkCreate) -> Link:
        if link_in.title is None:
            link_in.title = link_in.url
        obj = self.model(**jsonable_encoder(link_in))
        db.add(obj)
        db.commit()
        db.refresh(obj)
        return obj

    def update(
        self, db: Session, *, object_db: Link, object_update: LinkUpdate
    ) -> Link:
        old_data = jsonable_encoder(object_db)
        new_data = object_update.dict(exclude_unset=True)

        tags = new_data.pop("tags", None)

        for key in old_data:
            if key in new_data:
                setattr(object_db, key, new_data[key])

        if tags is not None:
            unique_tag_names = list(OrderedDict.fromkeys({tag["name"] for tag in tags}))
            object_db.tags = [
                crud_tag.tag.create(db, TagCreate(name=name))
                for name in unique_tag_names
            ]

        db.add(object_db)
        db.commit()
        db.refresh(object_db)

        return object_db

    def toggle_liked(self, db: Session, *, link: Link) -> None:
        link.liked = not link.liked
        db.commit()

    def toggle_archived(self, db: Session, *, link: Link) -> None:
        link.archived = not link.archived
        db.commit()


link = CRUDLink(Link)

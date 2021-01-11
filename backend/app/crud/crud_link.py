from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.models import Link
from app.schemas import LinkCreate, LinkUpdate

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

    def toggle_liked(self, db: Session, *, link: Link) -> None:
        link.liked = not link.liked
        db.commit()

    def toggle_archived(self, db: Session, *, link: Link) -> None:
        link.archived = not link.archived
        db.commit()


link = CRUDLink(Link)

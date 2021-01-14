from sqlalchemy.orm import Session

from app.models import Tag
from app.schemas import TagCreate, TagUpdate

from .base import CRUDBase


class CRUDTag(CRUDBase[Tag, TagCreate, TagUpdate]):
    def create(self, db: Session, object_in: TagCreate) -> Tag:
        existing_tag = self.get(db, id=object_in.name)
        return existing_tag or super().create(db, object_in)


tag = CRUDTag(Tag)

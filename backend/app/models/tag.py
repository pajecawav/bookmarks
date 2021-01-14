from typing import TYPE_CHECKING

from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.db.database import Base
from app.models import link_to_tag_table

if TYPE_CHECKING:
    from app.models import Link  # noqa: F401


class Tag(Base):
    __tablename__ = "tags"

    name = Column(String, primary_key=True)
    links = relationship("Link", secondary=link_to_tag_table, back_populates="tags")

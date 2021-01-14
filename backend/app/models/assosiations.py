from sqlalchemy import Column, ForeignKey, Integer, Table

from app.db.database import Base

link_to_tag_table = Table(
    "link_to_tag",
    Base.metadata,
    Column("link_id", Integer, ForeignKey("links.id")),
    Column("tag_name", Integer, ForeignKey("tags.name")),
)

from sqlalchemy.orm import Session

from app import crud, schemas
from app.config import settings
from app.db import base  # noqa: F401
from app.db.database import Base, SessionLocal, engine


def init_db(db: Session) -> None:
    # Base.metadata.create_all(bind=engine)

    user = crud.user.get_by_username(db, username=settings.SUPERUSER_USERNAME)
    if not user:
        user_in = schemas.UserCreate(
            username=settings.SUPERUSER_USERNAME,
            password=settings.SUPERUSER_PASSWORD,
            is_superuser=True,
        )
        crud.user.create(db, user_in)


if __name__ == "__main__":
    init_db(SessionLocal())

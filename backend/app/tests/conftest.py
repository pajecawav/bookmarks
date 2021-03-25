from typing import Dict, Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.engine import create_engine
from sqlalchemy.orm.session import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app import crud, schemas
from app.api.dependencies import get_db
from app.config import settings
from app.db.database import Base
from app.main import app
from app.tests.utils import get_user_auth_headers

# TODO: use Postgres DB for testing?
engine = create_engine(
    "sqlite://",
    pool_pre_ping=True,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)
user_in = schemas.UserCreate(
    username=settings.SUPERUSER_USERNAME,
    password=settings.SUPERUSER_PASSWORD,
    is_superuser=True,
)
user = crud.user.create(TestingSessionLocal(), user_in)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="session")
def db() -> Generator[Session, None, None]:
    yield TestingSessionLocal()


@pytest.fixture(scope="module")
def client() -> Generator[TestClient, None, None]:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def superuser_headers(client: TestClient) -> Dict[str, str]:
    headers = get_user_auth_headers(
        settings.SUPERUSER_USERNAME, settings.SUPERUSER_PASSWORD, client
    )
    return headers

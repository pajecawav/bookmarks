from typing import List, Optional

import requests
from bs4 import BeautifulSoup
from fastapi import APIRouter, BackgroundTasks, Depends, Query, status
from fastapi.exceptions import HTTPException
from requests.exceptions import ConnectionError
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import dependencies
from app.api.dependencies import get_current_user, get_db

router = APIRouter()


def get_requested_link(
    link_id: int,
    db: Session = Depends(dependencies.get_db),
    current_user: models.User = Depends(get_current_user),
) -> Optional[models.Link]:

    link = crud.link.get(db, id=link_id)
    if link is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Link not found"
        )
    elif not current_user.is_superuser and link.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission to access this link",
        )
    return link


def fetch_link_title(link: models.Link, db: Session) -> None:
    try:
        response = requests.get(link.url)
    except ConnectionError:
        return
    soup = BeautifulSoup(response.content, "html.parser")
    title = soup.find("title")
    if title is not None:
        link.title = title.string.replace("\n", "").strip(" ")
        db.add(link)
        db.commit()


@router.get("", response_model=schemas.LinksResponse)
def get_links(
    query: Optional[str] = None,
    liked: Optional[bool] = None,
    archived: Optional[bool] = None,
    tags: Optional[List[str]] = Query(None),
    cursor: Optional[int] = None,
    limit: int = 20,
    current_user: models.User = Depends(get_current_user),
):
    links = current_user.links

    if cursor:
        links = links.filter(models.Link.id <= cursor)

    if tags:
        links = links.join(models.Link.tags).filter(models.Tag.name.in_(tags))

    if liked is not None:
        links = links.filter(models.Link.liked == liked)

    if archived is not None:
        links = links.filter(models.Link.archived == archived)

    if query is not None:
        links = links.filter(models.Link.title.ilike(f"%{query}%"))

    links_result = links.limit(limit + 1).all()
    next_cursor = None
    if len(links_result) == limit + 1:
        next_cursor = links_result.pop().id

    return {"links": links_result, "next_cursor": next_cursor}


@router.get("/{link_id}", response_model=schemas.Link)
def get_link(link: models.Link = Depends(get_requested_link)):
    return link


@router.post("", response_model=schemas.Link)
def add_link(
    link_in: schemas.LinkCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    fetch_title = link_in.title is None

    link = crud.link.create(db, link_in)
    crud.user.add_link(db, user=current_user, link=link)

    if fetch_title:
        background_tasks.add_task(fetch_link_title, link=link, db=db)

    return link


@router.post("/{link_id}", response_model=schemas.Link)
def update_link(
    link_up: schemas.LinkUpdate,
    db: Session = Depends(get_db),
    link: models.Link = Depends(get_requested_link),
):
    updated_link = crud.link.update(db, object_db=link, object_update=link_up)
    return updated_link


@router.delete("/{link_id}")
def delete_link(
    link_id: int,
    db: Session = Depends(dependencies.get_db),
):
    crud.link.delete(db, id=link_id)
    return {"status": "success"}

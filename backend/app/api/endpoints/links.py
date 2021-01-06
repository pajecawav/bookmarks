from typing import List, Optional

import requests
from bs4 import BeautifulSoup
from fastapi import APIRouter, BackgroundTasks, Depends, status
from fastapi.exceptions import HTTPException
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
    elif link.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No permission to access this link",
        )
    return link


def fetch_link_title(link: models.Link, db: Session) -> None:
    response = requests.get(link.url)
    soup = BeautifulSoup(response.content, "html.parser")
    title = soup.find("title")
    if title is not None:
        link.title = title.string
        db.add(link)
        db.commit()


@router.get("", response_model=List[schemas.Link])
def get_links(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return current_user.links.filter(~models.Link.archived).all()


@router.get("/liked", response_model=List[schemas.Link])
def get_liked(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return current_user.links.filter(models.Link.liked).all()


@router.get("/archived", response_model=List[schemas.Link])
def get_archived(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    return current_user.links.filter(models.Link.archived).all()


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
    link = crud.link.create(db, link_in)
    crud.user.add_link(db, user=current_user, link=link)
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
    link: models.Link = Depends(get_requested_link),
):
    crud.link.delete(db, id=link_id)
    return {"status": "success"}


@router.post("/{link_id}/toggle_liked")
def toggle_liked(
    db: Session = Depends(dependencies.get_db),
    link: models.Link = Depends(get_requested_link),
):
    crud.link.toggle_liked(db, link=link)
    return {"status": "success"}


@router.post("/{link_id}/toggle_archived")
def toggle_archived(
    db: Session = Depends(dependencies.get_db),
    link: models.Link = Depends(get_requested_link),
):
    crud.link.toggle_archived(db, link=link)
    return {"status": "success"}

from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    password: str
    is_superuser: bool = False


class User(BaseModel):
    username: str
    is_superuser: bool

    class Config:
        orm_mode = True


class UserUpdate(BaseModel):
    pass

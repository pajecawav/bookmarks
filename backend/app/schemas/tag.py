from pydantic import BaseModel


class TagCreate(BaseModel):
    name: str


class Tag(BaseModel):
    name: str

    class Config:
        orm_mode = True


class TagUpdate(BaseModel):
    pass

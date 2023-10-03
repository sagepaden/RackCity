import datetime as _dt

import pydantic as _pydantic


class _UserBase(_pydantic.BaseModel):
    email: str


class UserCreate(_UserBase):
    hashed_password: str

    class Config:
        orm_mode = True


class User(_UserBase):
    id: int

    class Config:
        orm_mode = True
        from_attributes = True


class _PoolTableBase(_pydantic.BaseModel):
    location_name: str
    num_of_pool_tables: int
    location_gps: str
    discounted_days: str
    hours: str
    rating: int


class PoolTableCreate(_PoolTableBase):
    pass


class PoolTable(_PoolTableBase):
    id: int
    date_created: _dt.datetime
    date_last_updated: _dt.datetime

    class Config:
        orm_mode = True
        from_attributes = True

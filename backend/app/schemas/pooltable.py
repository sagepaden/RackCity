from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


class PoolTableBase(BaseModel):
    location_name: str
    num_of_pool_tables: int
    discounted_days: str
    hours: str
    rating: float
    lat: float
    lng: float

    class Config:
        orm_mode = True
        from_attribute = True


class PoolTableCreate(PoolTableBase):
    pass

    class Config:
        orm_mode = True
        from_attributes = True


class PoolTable(PoolTableBase):
    id: int
    date_created: Optional[datetime] = None
    date_last_updated: Optional[datetime] = None

    class Config:
        orm_mode = True
        from_attributes = True

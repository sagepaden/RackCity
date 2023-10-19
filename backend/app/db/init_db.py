import logging
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db import base  # noqa: F401
from app.core.config import settings

logger = logging.getLogger(__name__)

POOLTABLES = [
    {
        "id": 1,
        "location_name": "Location 1",
        "num_of_pool_tables": 5,
        "discounted_days": "Monday",
        "hours": "5am-7pm",
        "rating": 5,
        "lat": 56.6,
        "lng": 73.7,
    },
    {
        "id": 2,
        "location_name": "Location 2",
        "num_of_pool_tables": 5,
        "discounted_days": "Monday",
        "hours": "5am-7pm",
        "rating": 5,
        "lat": 56.6,
        "lng": 73.7,
    },
    {
        "id": 3,
        "location_name": "Location 3",
        "num_of_pool_tables": 5,
        "discounted_days": "Monday",
        "hours": "5am-7pm",
        "rating": 5,
        "lat": 56.6,
        "lng": 73.7,
    },
]


def init_db(db: Session) -> None:
    if settings.FIRST_SUPERUSER_EMAIL:
        user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER_EMAIL)
        if not user:
            user_in = schemas.UserCreate(
                first_name="Initial Super User",
                surname="boring",
                email=settings.FIRST_SUPERUSER_EMAIL,
                is_superuser=True,
                password=settings.FIRST_SUPERUSER_PW,
            )
            user = crud.user.create(db, obj_in=user_in)
        else:
            logger.warning(
                f"Skipping creating superuser. User with email {settings.FIRST_SUPERUSER_EMAIL} already exists."
            )

        if not user.pool_tables:
            for pool_table in POOLTABLES:
                pool_table_in = schemas.PoolTableCreate(
                    location_name=pool_table["location_name"],
                    num_of_pool_tables=pool_table["num_of_pool_tables"],
                    discounted_days=pool_table["discounted_days"],
                    hours=pool_table["hours"],
                    rating=pool_table["rating"],
                    lat=pool_table["lat"],
                    lng=pool_table["lng"]
                )
                crud.crud_pool_table.create(db, obj_in=pool_table_in)
            logger.info("Pool tables created")
    else:
        logger.warning(
            "Skipping creating superuser. FIRST_SUPERUSER_EMAIL needs to be provided as an env variable."
        )

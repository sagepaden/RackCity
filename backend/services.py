import fastapi as _fastapi
import fastapi.security as _security
import jwt as _jwt
import datetime as _dt
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import database as _database
import models as _models
import schemas as _schemas



oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/api/token")

JWT_SECRET = "myjwtsecret"



def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)


def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


# User Services

async def get_user_by_email(email: str, db: _orm.Session):
    return db.query(_models.User).filter(_models.User.email == email).first()


async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(
        email=user.email, hashed_password=_hash.bcrypt.hash(
            user.hashed_password)
    )
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj


async def authenticate_user(email: str, password: str, db: _orm.Session):
    user = await get_user_by_email(db=db, email=email)

    if not user:
        return False

    if not user.verify_password(password):
        return False

    return user


async def create_token(user: _models.User):
    user_obj = _schemas.User.from_orm(user)

    token = _jwt.encode(user_obj.dict(), JWT_SECRET)

    return dict(access_token=token, token_type="bearer")


async def get_all_users(db: _orm.Session):
    all_users = db.query(_models.User).all()

    return [_schemas.User.from_orm(user) for user in all_users]


async def get_current_user(
    db: _orm.Session = _fastapi.Depends(get_db),
    token: str = _fastapi.Depends(oauth2schema),
):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        user = db.query(_models.User).get(payload["id"])
    except:
        raise _fastapi.HTTPException(
            status_code=401, detail="Invalid Email or Password"
        )

    return _schemas.User.from_orm(user)




# Pool Table Services

async def create_pool_table(new_pool_table: _schemas.PoolTableCreate, db: _orm.Session):
    new_pool_table_model = _models.PoolTable(**new_pool_table.dict())
    db.add(new_pool_table_model)
    db.commit()
    db.refresh(new_pool_table_model)
    return _schemas.PoolTable.from_orm(new_pool_table_model)


async def _pool_table_selector(pool_table_id: int, db: _orm.Session):
    pool_table = db.query(_models.PoolTable).filter(_models.PoolTable.id == pool_table_id).first()

    if pool_table is None:
        raise _fastapi.HTTPException(
            status_code=404, detail="The requested pool table was not found.")
    
    return pool_table


async def get_pool_table(pool_table_id: int, pool_table: _schemas.PoolTable, db: _orm.Session):
    pool_table = await _pool_table_selector(pool_table_id=pool_table_id, pool_table=pool_table, db=db)

    return _schemas.PoolTable.from_orm(pool_table)


async def get_all_pool_tables(db: _orm.Session):
    all_pool_tables = db.query(_models.PoolTable).all()

    return [_schemas.PoolTable.from_orm(pool_table) for pool_table in all_pool_tables]


async def delete_pool_table(pool_table_id: int, db: _orm.Session):
    pool_table = await _pool_table_selector(pool_table_id, db)
    if pool_table is not None:
        db.delete(pool_table)
        db.commit()
    else:
        raise _fastapi.HTTPException(
            status_code=404, detail="The requested pool table was not found."
        )


async def update_pool_table(pool_table_id: int, updated_pool_table: _schemas.PoolTableCreate, db: _orm.Session):
    pool_table_db = await _pool_table_selector(pool_table_id, db)

    pool_table_db.location_name = updated_pool_table.location_name
    pool_table_db.num_of_pool_tables = updated_pool_table.num_of_pool_tables
    pool_table_db.location_gps = updated_pool_table.location_gps
    pool_table_db.discounted_days = updated_pool_table.discounted_days
    pool_table_db.hours = updated_pool_table.hours
    pool_table_db.rating = updated_pool_table.rating
    pool_table_db.date_last_updated = _dt.datetime.utcnow()

    db.commit()
    db.refresh(pool_table_db)

    return _schemas.PoolTable.from_orm(pool_table_db)
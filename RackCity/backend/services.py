import fastapi as _fastapi
import fastapi.security as _security
import jwt as _jwt
import datetime as _dt
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import database as _database, models as _models, schemas as _schemas

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


async def get_user_by_email(email: str, db: _orm.Session):
    return db.query(_models.User).filter(_models.User.email == email).first()


async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(
        email=user.email, hashed_password=_hash.bcrypt.hash(user.hashed_password)
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


async def create_pool_table(poolTable: _schemas.PoolTableCreate, db: _orm.Session):
    pool_table = _models.PoolTable(**poolTable.dict()) 
    db.add(poolTable)
    db.commit()
    db.refresh(pool_table)
    return _schemas.PoolTable.from_orm(poolTable)


async def get_pool_tables(poolTable: _schemas.PoolTable, db: _orm.Session):
    poolTables = db.query(_models.PoolTable).filter_by(poolTable.id)

    return list(map(_schemas.PoolTable.from_orm, poolTables))


async def _pool_table_selector(pool_table_id: _schemas.PoolTable,  db: _orm.Session):
    poolTable = (
        db.query(_models.PoolTable)
        .filter_by(pool_table_id)
        .filter(_models.PoolTable.id == pool_table_id)
        .first()
    )

    if poolTable is None:
        raise _fastapi.HTTPException(status_code=404, detail="While some pool tables be doing, that table not do.")

    return poolTable


async def get_pool_table(pool_table_id: _schemas.PoolTable, db: _orm.Session):
    poolTable = await _pool_table_selector(pool_table_id=pool_table_id, db=db)

    return _schemas.PoolTable.from_orm(poolTable)


async def delete_lead(pool_table_id: _schemas.PoolTable, db: _orm.Session):
    poolTable = await _pool_table_selector(pool_table_id=pool_table_id, db=db)

    db.delete(poolTable)
    db.commit()

async def update_pool_table(pool_table_id: _schemas.PoolTable, pool_table: _schemas.PoolTableCreate, db: _orm.Session):
    pool_table_db = await _pool_table_selector(pool_table_id, db)

    pool_table_db.first_name = pool_table.first_name
    pool_table_db.last_name = pool_table.last_name
    pool_table_db.email = pool_table.email
    pool_table_db.company = pool_table.company
    pool_table_db.note = pool_table.note
    pool_table_db.date_last_updated = _dt.datetime.utcnow()

    db.commit()
    db.refresh(pool_table_db)

    return _schemas.PoolTable.from_orm(pool_table_db)


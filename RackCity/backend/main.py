from typing import List
import uvicorn
import fastapi as _fastapi
import fastapi.security as _security

import sqlalchemy.orm as _orm

import services as _services
import schemas as _schemas

app = _fastapi.FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/api/users")
async def create_user(
    user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    db_user = await _services.get_user_by_email(user.email, db)
    if db_user:
        raise _fastapi.HTTPException(
            status_code=400, detail="Email already in use")

    user = await _services.create_user(user, db)

    return await _services.create_token(user)


@app.post("/api/token")
async def generate_token(
    form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    user = await _services.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise _fastapi.HTTPException(
            status_code=401, detail="Invalid Credentials")

    return await _services.create_token(user)


@app.get("/api/users/me", response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
    return user


@app.post("/api/pooltables", response_model=_schemas.PoolTable)
async def create_pool_table(
    poolTable: _schemas.PoolTableCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_pool_table(db=db, poolTable=poolTable)


# @app.get("/api/pooltables/{pool_table_id}", status_code=200)
# async def get_pool_tables(
#     pool_table_id: _schemas.PoolTable = _fastapi.Depends(_services.get_current_user),
#     db: _orm.Session = _fastapi.Depends(_services.get_db),
# ):
#     return await _services.get_pool_tables(pool_table_id, db)


@app.delete("/api/pooltables/{pool_table_id}", status_code=204)
async def delete_pool_table(
    pool_table: _schemas.User = _fastapi.Depends(
        _services._pool_table_selector),
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_pool_table(pool_table, db)
    return {"message", "Successfully Deleted"}


@app.put("/api/pooltables/{pool_table_id}", status_code=200)
async def update_pool_table(
    pool_table_id: _schemas.PoolTable, 
    pool_table: _schemas.PoolTableCreate, 
    db: _orm.Session):

    await _services.update_pool_table(pool_table_id, pool_table, db)
    return {"message", "Successfully Updated"}


@app.get("/api")
async def root():
    return {"message": "Awesome Pool Tables"}



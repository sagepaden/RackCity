from typing import List
import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
from fastapi.middleware.cors import CORSMiddleware

import services as _services
import schemas as _schemas




app = _fastapi.FastAPI()

# CORS configuration
# origins = [
#     "http://localhost:5173",
# ]

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# User

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



@app.get("/api/users/", response_model=list[_schemas.User])
async def get_all_users(
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    all_users = await _services.get_all_users(db)
    return all_users



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



# Pool Tables

@app.post("/api/pooltables", response_model=_schemas.PoolTable)
async def create_pool_table(
    new_pool_table: _schemas.PoolTableCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    return await _services.create_pool_table(db=db, new_pool_table=new_pool_table)



@app.get("/api/pooltables/", response_model=list[_schemas.PoolTable])
async def get_all_pool_tables(
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    all_pool_tables = await _services.get_all_pool_tables(db)
    return all_pool_tables



@app.get("/api/pooltables/{pool_table_id}", response_model=_schemas.PoolTable)
async def get_pool_table(
    pool_table_id: int = _fastapi.Path(..., title="The ID of the pool table to retrieve", ge=1),
    db: _orm.Session = _fastapi.Depends(_services.get_db)
):
    pool_table = await _services._pool_table_selector(pool_table_id, db)
    if pool_table is None:
        raise _fastapi.HTTPException(status_code=404, detail="Pool table not found")
    return _schemas.PoolTable.from_orm(pool_table)



@app.delete("/api/pooltables/{pool_table_id}", status_code=204)
async def delete_pool_table(
    pool_table_id: int,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):
    await _services.delete_pool_table(pool_table_id, db)
    return {"message": "Successfully Deleted"}



@app.put("/api/pooltables/{pool_table_id}", status_code=200)
async def update_pool_table(
    pool_table_id: int,
    updated_pool_table: _schemas.PoolTableCreate,
    db: _orm.Session = _fastapi.Depends(_services.get_db),
):

    await _services.update_pool_table(pool_table_id, updated_pool_table, db)
    return {"message": "Successfully Updated"}



@app.get("/api")
async def root():
    return {"message": "Awesome Pool Tables"}
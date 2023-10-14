from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud
from app.api import deps
from app.schemas.pooltable import PoolTable, PoolTableCreate
from app.models.user import User
import json


router = APIRouter()


@router.get("/{pool_table_id}", status_code=200, response_model=PoolTable)
def fetch_pool_table(
    *,
    pool_table_id: int,
    db: Session = Depends(deps.get_db),
) -> Any:
    # Anyone can read
    pool_table = crud.crud_pool_table.get(db=db, id=pool_table_id)
    if not pool_table:
        raise HTTPException(
            status_code=404, detail=f"Pool table with ID {pool_table_id} not found"
        )
    return pool_table


@router.get("/", status_code=200, response_model=List[PoolTable])
def fetch_all_pool_tables(
    db: Session = Depends(deps.get_db),
) -> Any:
    # Anyone can read
    pool_tables = crud.crud_pool_table.get_all(db=db)
    if not pool_tables:
        raise HTTPException(status_code=404, detail="No pool tables found")
    return pool_tables


@router.post("/", status_code=201, response_model=PoolTable)
def create_pool_table(
    *,
    pool_table_in: PoolTableCreate,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_superuser),
) -> Any:
    # Only superusers can create
    pool_table = crud.crud_pool_table.create(db=db, obj_in=pool_table_in)
    return pool_table


@router.put("/{pool_table_id}", status_code=200, response_model=PoolTable)
def update_pool_table(
    *,
    pool_table_id: int,
    pool_table_in: PoolTable,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_superuser),
) -> Any:
    # Only superusers can update
    pool_table = crud.crud_pool_table.get(db, id=pool_table_id)
    if not pool_table:
        raise HTTPException(
            status_code=400, detail=f"Pool table with ID: {pool_table_id} not found."
        )
    updated_pool_table = crud.crud_pool_table.update(
        db=db, db_obj=pool_table, obj_in=pool_table_in
    )
    return updated_pool_table


@router.delete("/{pool_table_id}", status_code=204)
def delete_pool_table(
    *,
    pool_table_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_superuser),
) -> Any:
    # Only superusers can delete
    pool_table = crud.crud_pool_table.get(db, id=pool_table_id)
    if not pool_table:
        raise HTTPException(
            status_code=400, detail=f"Pool table with ID: {pool_table_id} not found."
        )
    crud.crud_pool_table.remove(db=db, id=pool_table_id)

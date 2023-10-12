from fastapi import APIRouter

from app.api.api_v1.endpoints import pool_table, auth

api_router = APIRouter()
api_router.include_router(pool_table.router, prefix="/pool_tables", tags=["pool_tables"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])

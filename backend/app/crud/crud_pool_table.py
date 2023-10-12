from typing import Any, Dict, List, Optional, Union
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.pooltable import PoolTable as PoolTableModel
from app.schemas.pooltable import PoolTableCreate, PoolTable

class CRUDPoolTable(CRUDBase[PoolTableModel, PoolTableCreate, PoolTable]):
    def create(self, db: Session, *, obj_in: PoolTableCreate) -> PoolTableModel:
        create_data = obj_in.dict()
        db_obj = PoolTableModel(**create_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: PoolTableModel, obj_in: Union[PoolTable, Dict[str, Any]]
    ) -> PoolTableModel:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def get_by_location_name(self, db: Session, *, location_name: str) -> Optional[PoolTableModel]:
        return db.query(PoolTableModel).filter(PoolTableModel.location_name == location_name).first()

    # def remove(self, db: Session, *, id: int) -> PoolTableModel:
    #     obj = db.query(PoolTableModel).get(id)
    #     db.delete(obj)
    #     db.commit()
    #     return obj
    
    def get_all(self, db: Session) -> List[PoolTableModel]:
        return db.query(PoolTableModel).all()
    
    def get_multi(self, db: Session, *, skip: int = 0, limit: int = 100) -> List[PoolTableModel]:
        return db.query(self.model).offset(skip).limit(limit).all()



crud_pool_table = CRUDPoolTable(PoolTableModel)

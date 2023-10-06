import datetime as _dt
import sqlalchemy as _sql
import passlib.hash as _hash
from passlib.context import CryptContext

import database as _database

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)

    def verify_password(self, password: str):
        if isinstance(self.hashed_password, str):
            return password_context.verify(password, self.hashed_password)
        return False


    def hash_password(self, password: str):
        self.hashed_password = password_context.hash(password)



class PoolTable(_database.Base):
    __tablename__ = "pool_tables"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    location_name = _sql.Column(_sql.String, index=True)
    num_of_pool_tables = _sql.Column(_sql.Integer, index=True)
    location_gps = _sql.Column(_sql.String, index=True)
    discounted_days = _sql.Column(_sql.String)
    hours = _sql.Column(_sql.String, index=True)
    rating = _sql.Column(_sql.Integer, index=True)
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    date_last_updated = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)


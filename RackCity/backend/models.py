import datetime as _dt

import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash

import database as _database


class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)


class PoolTable(_database.Base):
    __tablename__ = "pool_tables"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    location_name = _sql.Column(_sql.String, index=True)
    location_gps = _sql.Column(_sql.String, index=True)
    hours = _sql.Column(_sql.String, index=True, default="")
    num_of_pool_tables = _sql.Column(_sql.Integer, index=True)
    discounted_days = _sql.Column(_sql.String, default="")
    rating = _sql.Column(_sql.Integer, index=True)
    date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
    date_last_updated = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)


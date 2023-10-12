from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base_class import Base


class PoolTable(Base):
    id = Column(Integer, primary_key=True, index=True)
    location_name = Column(String(256), nullable=False)
    num_of_pool_tables = Column(String, nullable=False)
    location_gps = Column(String, nullable=False)
    discounted_days = Column(String, nullable=False)
    hours = Column(String, nullable=False)
    rating = Column(String, nullable=False)
    date_created = Column(
        DateTime(timezone=True), server_default=func.now(), nullable=True
    )
    date_last_updated = Column(
        DateTime(timezone=True), onupdate=func.now(), nullable=True
    )
    submitter_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    submitter = relationship("User", back_populates="pool_tables")

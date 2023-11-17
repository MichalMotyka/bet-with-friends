from sqlalchemy import Column, String, Integer, Boolean
from dataclasses import dataclass
from shared.base import Base

@dataclass(order=True)
class Users(Base):
     __tablename__ = 'users'
     id = Column(Integer, primary_key=True)
     public_id = Column(Integer)
     email = Column(String(50),unique=True)
     name = Column(String(50),unique=True)
     password = Column(String(50))
     salt = Column(String(255))
     admin = Column(Boolean)

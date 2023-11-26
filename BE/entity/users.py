from sqlalchemy import Column, String, Integer, Boolean
from dataclasses import dataclass
from shared.base import Base

@dataclass(order=True)
class Users(Base):
     __tablename__ = 'users'
     id = Column(Integer, primary_key=True)
     public_id = Column(String)
     email = Column(String,unique=True)
     name = Column(String,unique=True)
     password = Column(String)
     salt = Column(String)
     admin = Column(Boolean)
     isActive = Column(Boolean)

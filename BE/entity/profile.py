from sqlalchemy import Column, String, Integer, ForeignKey, Double
from sqlalchemy.orm import relationship
from dataclasses import dataclass
from shared.base import Base
from entity.users import Users

@dataclass(order=True)
class Profile(Base):
    __tablename__ = 'profiles'

    id = Column(Integer, primary_key=True)
    public_id = Column(Integer)
    name = Column(String(50),unique=True)
    points = Column(Double)
    avatar = Column(String(255),unique=True)
    user_id = Column(Integer,ForeignKey('users.id'))
    user = relationship(Users)
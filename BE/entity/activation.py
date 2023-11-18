from sqlalchemy import Column, String, Integer,DateTime,ForeignKey
from sqlalchemy.orm import relationship
from dataclasses import dataclass
from shared.base import Base
from entity.users import Users

@dataclass(order=True)
class Activation(Base):
    __tablename__ = 'activation'

    id = Column(Integer,primary_key=True)
    user_id = Column(Integer,ForeignKey('users.id'))
    code = Column(String)
    expire =  Column(DateTime)
    user = relationship(Users)
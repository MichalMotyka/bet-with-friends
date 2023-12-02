from shared.base import Base
from sqlalchemy import Column,String,Integer
from dataclasses import dataclass

@dataclass(order=True)
class Competition(Base):
    __tablename__ = 'competition'

    id = Column(Integer,primary_key=True)
    public_id = Column(Integer)
    name = Column(String)
    code = Column(String)
    type = Column(String)
    emblem = Column(String)
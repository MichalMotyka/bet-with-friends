from sqlalchemy import Column, String, Integer,ForeignKey
from shared.base import Base
from dataclasses import dataclass

@dataclass(order=True)
class Team(Base):
    __tablename__ = 'team'

    id = Column(Integer, primary_key=True)
    public_id = Column(Integer)
    name = Column(String)
    short_name = Column(String)
    tla = Column(String)
    crest = Column(String)
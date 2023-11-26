from sqlalchemy import Column, String, Integer, ForeignKey, Double
from sqlalchemy.orm import relationship
from dataclasses import dataclass
from shared.base import Base

@dataclass(frozen=True)
class Ranking(Base):
    __tablename__ = 'rankings'

    id = Column(Integer,primary_key=True)
    place = Column(Integer)
    profile_id = Column(Integer,ForeignKey("profiles.id")) 

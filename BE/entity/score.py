from sqlalchemy import Column, String, Integer,ForeignKey
from shared.base import Base
from dataclasses import dataclass

@dataclass(order=True)
class Score(Base):
    __tablename__ = 'score'

    id = Column(Integer,primary_key=True)
    public_id = Column(String)
    winner = Column(Integer,ForeignKey('team.id'),nullable=True)
    full_time = Column(String,nullable=True)
    half_time = Column(String,nullable=True)
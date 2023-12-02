from sqlalchemy import Column, String, Integer,DateTime,ForeignKey
from shared.base import Base
from dataclasses import dataclass

@dataclass(order=True)
class Match(Base):
    __tablename__  = 'match'

    id = Column(Integer, primary_key=True)
    public_id = Column(Integer)
    utc_date = Column(DateTime)
    status = Column(String)
    stage = Column(String)
    group = Column(String)
    last_updated = Column(DateTime)
    score = Column(Integer,ForeignKey('score.id'))
    competetition = Column(Integer,ForeignKey('competition.id'))
    home_team = Column(Integer,ForeignKey('team.id'))
    away_team = Column(Integer,ForeignKey('team.id'))
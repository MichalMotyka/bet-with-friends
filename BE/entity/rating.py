from sqlalchemy import Column, String, Integer, Double
from dataclasses import dataclass
from shared.base import Base

@dataclass(frozen=True)
class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True)
    bets = Column(Integer,default=0)
    wins = Column(Integer,default=0)
    rating = Column(Double)
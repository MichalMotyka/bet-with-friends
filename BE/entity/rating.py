from sqlalchemy import Column, String, Integer, Double
from dataclasses import dataclass
from shared.base import Base
import json

@dataclass(order=True)
class Rating(Base):
    __tablename__ = "ratings"

    id = Column(Integer, primary_key=True)
    public_id = Column(String,unique=True)
    bets = Column(Integer,default=0)
    wins = Column(Integer,default=0)
    rating = Column(Double)


    def to_json(self):
        return json.dumps({
            "public_id": self.public_id,
            "bets": self.bets,
            "wins": self.wins,
            "rating": self.rating
        }, indent= 4)
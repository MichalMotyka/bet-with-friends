from sqlalchemy import Column, String, Integer, ForeignKey, Double
from sqlalchemy.orm import relationship
from dataclasses import dataclass
from shared.base import Base
from entity.users import Users
from entity.rating import Rating
from entity.ranking import Ranking

@dataclass(order=True)
class Profile(Base):
    __tablename__ = 'profiles'

    id = Column(Integer, primary_key=True)
    public_id = Column(String)
    name = Column(String(50),unique=True)
    points = Column(Double)
    avatar = Column(String(255),unique=True)
    ranking_id = Column(Integer, ForeignKey("rankings.id"))
    rating_id = Column(Integer,ForeignKey('ratings.id'))
    user_id = Column(Integer,ForeignKey('users.id'))
    ranking = relationship(Ranking,foreign_keys=[ranking_id])
    user = relationship(Users,foreign_keys=[user_id])
    rating = relationship(Rating,foreign_keys=[rating_id])
from entity.rating import Rating
from shared.base import session_factory
from sqlalchemy import update
import uuid

def create_raiting():
    with session_factory() as session:
        rating = Rating(bets=0,public_id=uuid.uuid4(),wins=0,rating=0.00)
        session.add(rating)
        session.commit()
        session.refresh(rating)
    return rating

def update_raiting(id:int,isWin:bool):
    with session_factory() as session:
        rating:Rating = session.query(Rating).filter_by(id = id).first()
        rating.bets += 1
        if isWin:
            rating.wins += 1
        rate = calc_rating(rating=rating)
        stmt = update(Rating).where(Rating.id == rating.id).values(rating = rate)
        session.execute(stmt)
        session.commit()



def calc_rating(rating:Rating):
    try:
        return 100 * rating.wins / rating.bets
    except ZeroDivisionError:
        return 0
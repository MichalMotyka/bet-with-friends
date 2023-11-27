from entity.rating import Rating
from shared.base import session_factory
import uuid

def create_raiting():
    with session_factory() as session:
        rating = Rating(bets=0,public_id=uuid.uuid4(),wins=0,rating=0.00)
        session.add(rating)
        session.commit()
        session.refresh(rating)
    return rating

from entity.ranking import Ranking
from entity.profile import Profile
from shared.base import session_factory
import uuid

def create_ranking(profile:Profile):
    with session_factory() as session:
        ranking = Ranking(place=0,public_id=uuid.uuid4(),profile_id=profile.id)
        session.add(ranking)
        session.commit()
        session.refresh(ranking)
    return ranking
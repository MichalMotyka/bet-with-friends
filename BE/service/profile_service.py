from entity.profile import Profile
from shared.base import session_factory


def get_profile_by_uid(uuid:str):
    with session_factory() as session:
       profile = session.query(Profile).filter_by(public_id=uuid).first()
       if profile:
           return profile
       else:
           raise Exception
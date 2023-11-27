from entity.profile import Profile
from shared.base import session_factory
from exceptions.activation_code_invalid_exception import ActivationCodeInvalidException


def get_profile_by_uid(uuid:str):
    with session_factory() as session:
        profile = session.query(Profile).filter_by(public_id=uuid).first()
        if profile:
           print('-------------------------------')
           return profile
        raise ActivationCodeInvalidException()

def get_profile_by_id(id:int):
    with session_factory() as session:
        profile = session.query(Profile).filter_by(user_id=id).first()
        if profile:
            print('-------------------------------')
            return profile
        raise ActivationCodeInvalidException()
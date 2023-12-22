from service.achivment_repository import get_list_of_achiv
from shared.base import session_factory


def insert_achivments(profile_id):
    with session_factory() as session:
        session.add_all(get_list_of_achiv(profile_id=profile_id))
        session.commit()
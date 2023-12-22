from sqlalchemy import Column, String, Integer,DateTime,ForeignKey,Boolean
from sqlalchemy.orm import relationship
from entity.profile import Profile
from shared.base import Base

class Achivments(Base):
    __tablename__ = 'achievement'
    id = Column(Integer,primary_key=True)
    uuid = Column(String)
    profile_id = Column(Integer,ForeignKey('profiles.id'))
    achivment_type_uuid = Column(String)
    achiv_name = Column(String)
    description = Column(String)
    image_url = Column(String)
    acquired = Column(DateTime)
    active = Column(Boolean)
    query_text = Column(String)


    match = relationship(Profile,foreign_keys=[profile_id],lazy='joined')





    
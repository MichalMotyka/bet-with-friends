from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///database.db',echo=True)
Base = declarative_base()
_SessionFactory = sessionmaker(bind=engine)

def init_db():
    Base.metadata.create_all(engine)

def session_factory():
    return _SessionFactory()
import jwt
from entity.users import Users
from shared.base import session_factory
import bcrypt
import uuid
from sqlalchemy import update
from service.email_service import send_activation_mail
from service.activation_service import create_activation,activate
from configuration.configuration_manager import Configuration_Manager
from datetime import datetime, timedelta


config = Configuration_Manager.get_instance()
def create_user(user:Users,password:str):
    if password:
        salt = bcrypt.gensalt()
        password = password.encode('utf-8')
        hashed_password = bcrypt.hashpw(password, salt)
        user.password = hashed_password
        user.admin = False
        user.salt = salt
        user.isActive = False
        user.public_id = str(uuid.uuid4())
    with session_factory() as session:
        session.add(user)
        session.commit()
        session.refresh(user)
        create_activation(user_id=user.id)
        send_activation_mail(user.email)

def activate_user(code:str):
    user_id = activate(code)
    if user_id:
        with session_factory() as session:
            stmt = update(Users).where(Users.id == user_id).where(Users.isActive == False).values(isActive=True)
            session.execute(stmt)
            session.commit()

def login(user:Users):
    with session_factory() as session:
        userdb = session.query(Users).filter_by(name=user.name).first()
        if not userdb.isActive:
            return None
        password = user.password.encode('utf-8')
        password = bcrypt.hashpw(password,userdb.salt)
        expiry_time = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.authorization"))
        expiry_refresh = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.refresh"))
        if password == userdb.password:
            authorize = jwt.encode({'exp':expiry_time,'user_uid': userdb.public_id,'isAdmin':userdb.admin,'isActive':userdb.isActive,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
            refresh = jwt.encode({'exp':expiry_refresh,'user_uid': userdb.public_id,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
            return authorize, refresh
        return None




from entity.users import Users
from shared.base import session_factory
import bcrypt
import uuid
from sqlalchemy import update
from service.email_service import send_activation_mail
from service.activation_service import create_activation,activate

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



from entity.users import Users
from shared.base import session_factory
import bcrypt
from service.email_service import send_activation_mail

def createUser(user:Users,password:str):
    if password:
        salt = bcrypt.gensalt()
        password = password.encode('utf-8')
        hashed_password = bcrypt.hashpw(password, salt)
        user.password = hashed_password
        user.admin = False
        user.salt = salt
        user.isActive = False
    with session_factory() as session:
        session.add(user)
        session.commit()
        send_activation_mail(user.email)




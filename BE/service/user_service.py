from entity.users import Users
from shared.base import session_factory
import bcrypt

def createUser(user:Users,password:str):
    if password:
        salt = bcrypt.gensalt()
        password = password.encode('utf-8')
        hashed_password = bcrypt.hashpw(password, salt)
        user.password = hashed_password
        user.admin = False
        user.salt = salt
    with session_factory() as session:
        session.add(user)
        session.commit()




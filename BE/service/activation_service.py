from entity.activation import Activation
from shared.base import session_factory
import uuid
from datetime import datetime, timedelta

def create_activation(user_id:int):
    now = datetime.now()
    future_datetime = now + timedelta(hours=24)
    activation = Activation(user_id=user_id,code = str(uuid.uuid4()),expire=future_datetime)
    with session_factory() as session:
        session.add(activation)
        session.commit()

def activate(code:str,user_id:int):
    with session_factory() as session:
        activation = session.query(Activation).filter_by(code=code,user_id=user_id).first()
        if activation:
            session.delete(activation)
            session.commit()
            return activation.expire > datetime.now()
        else:
            return False
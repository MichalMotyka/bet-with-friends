from functools import wraps
from flask import make_response, request
import jwt
from entity.response import Response
from BE.entity.users import Users
from configuration.configuration_manager import ConfigurationManager
from datetime import datetime, timedelta

config = ConfigurationManager.get_instance()

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        refresh_token= None
        authorize = None
        refresh = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        elif 'Refresh' in request.headers:
            refresh_token = request.headers['Refresh']
            try:
                userdb = validate_token(refresh_token)
                expiry_time = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.authorization"))
                expiry_refresh = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.refresh"))
                authorize = jwt.encode({'exp':expiry_time,'user_uid': userdb.public_id,'isAdmin':userdb.admin,'isActive':userdb.isActive,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
                refresh = jwt.encode({'exp':expiry_refresh,'user_uid': userdb.public_id,'date':str(datetime.now())},config.get_config_by_key("SECRET_KEY"),algorithm="HS256")
            except:
                response = make_response(Response('Session expired','T1'))
                response.status_code = 401
                return response
        if not token and not refresh_token:
            response = make_response(Response('Session expired','T1'))
            response.status_code = 401
            return response
        try:
            current_user = validate_token(token)
        except:
            response = make_response(Response('Token is incorrect','T2'))
            response.status_code = 401
            return response
        return f(current_user,authorize,refresh *args, **kwargs)
    
    return decorator

def validate_token(token):
    data = jwt.decode(token, config.get_config_by_key('SECRET_KEY'))
    return Users.query.filter_by(public_id=data['user_uid']).first()
from functools import wraps
from flask import make_response, request
import jwt
from entity.response import Response
from BE.entity.users import Users
from configuration.configuration_manager import ConfigurationManager

config = ConfigurationManager.get_instance()

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        refresh_token= None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization']
        if 'Refresh' in request.headers:
            refresh_token = request.headers['Refresh']
        if not token and not refresh_token:
            response = make_response(Response('Session expired','T1'))
            response.status_code = 401
            return response
        try:
            data = jwt.decode(token, config.get_config_by_key('SECRET_KEY'))
            current_user = Users.query.filter_by(public_id=data['user_uid']).first()
        except:
            response = make_response(Response('Token is incorrect','T2'))
            response.status_code = 401
            return response
        return f(current_user, *args, **kwargs)
    
    return decorator
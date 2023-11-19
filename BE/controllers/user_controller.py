from flask import Blueprint, request, make_response
from configuration.configuration_manager import Configuration_Manager
from entity.users import Users
from entity.response import Response
from service import user_service,request_validator
from datetime import datetime, timedelta

user_blueprint = Blueprint('user_blueprint', __name__)

@user_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = request_validator.register_validation()
    user_service.create_user(user=new_user,password=data['password'])
    return make_response(Response(message='Pomyślnie utworzono użytkownika',code=200,time_stamp=datetime.utcnow().timestamp()).__dict__)

@user_blueprint.route('/activate/<code>', methods=['POST'])
def activate(code:str):
    user_service.activate_user(code=code)
    return ''
@user_blueprint.route('/login', methods=['POST'])
def login():
    user = request_validator.login_validation()
    jwtTokens = user_service.login(user)
    if jwtTokens:
        authorize, refresh = jwtTokens
        response = make_response(Response(message='Pomyślnie zalogowano użytkownika',code=200,time_stamp=datetime.utcnow().timestamp()).__dict__)
        expiration = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.authorization"))
        response.set_cookie('Authorization',authorize,expires=expiration,httponly=True)
        expiration = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.refresh"))
        response.set_cookie('Refresh',refresh,expires=expiration,httponly=True)
        return response
    return make_response(Response(message='Użytkownik nie posiada konta lub hasło jest nieprawidłowe',code=200,time_stamp=datetime.utcnow().timestamp()).__dict__)
        
    
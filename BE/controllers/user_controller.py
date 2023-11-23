from flask import Blueprint, request, make_response
from configuration.configuration_manager import Configuration_Manager
from entity.users import Users
from entity.response import Response
from jsonschema.exceptions import ValidationError
from service import user_service,request_validator
from datetime import datetime, timedelta
from exceptions.user_alredy_exist_email_exception import User_Alredy_Exist_Email_Exception
from exceptions.user_alredy_exist_name_exception import User_Alredy_Exist_Name_Exception

user_blueprint = Blueprint('user_blueprint', __name__)
config = Configuration_Manager.get_instance()

@user_blueprint.route('/register', methods=['POST'])
def register():
    try:
        new_user = request_validator.register_validation()
        try:
            user_service.create_user(user=new_user)
            response = make_response(Response(message='The user has been created successfully.',code='OK',time_stamp=datetime.utcnow().timestamp()).__dict__)
            response.status_code = 200
        except User_Alredy_Exist_Email_Exception as e:
            response = make_response(Response(message=e.message,code='R1',time_stamp=datetime.utcnow().timestamp()).__dict__)
            response.status_code = 400
        except User_Alredy_Exist_Name_Exception as e:
            response = make_response(Response(message=e.message,code='R2',time_stamp=datetime.utcnow().timestamp()).__dict__)
            response.status_code = 400
    except ValidationError as e:
        response = make_response(Response(message=e.schema['errorMessage'],code=e.schema['code'],time_stamp=datetime.utcnow().timestamp()).__dict__)
        response.status_code = 400
    return response 
    

@user_blueprint.route('/activate/<code>', methods=['POST'])
def activate(code:str):
    user_service.activate_user(code=code)
    return make_response(Response(message='The user has been successfully activated.',code='OK',time_stamp=datetime.utcnow().timestamp()).__dict__)


@user_blueprint.route('/login', methods=['POST'])
def login():
    user = request_validator.login_validation()
    jwtTokens = user_service.login(user)
    if jwtTokens:
        authorize, refresh = jwtTokens
        response = make_response(Response(message='The user has been successfully logged in.',code='OK',time_stamp=datetime.utcnow().timestamp()).__dict__)
        expiration = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.authorization"))
        response.set_cookie('Authorization',authorize,expires=expiration,httponly=True)
        expiration = datetime.utcnow() + timedelta(minutes=config.get_config_by_key("jwt.exp.refresh"))
        response.set_cookie('Refresh',refresh,expires=expiration,httponly=True)
        return response
    return make_response(Response(message='The user does not have an account, or the password is incorrect."',code='OK',time_stamp=datetime.utcnow().timestamp()).__dict__)
        
    
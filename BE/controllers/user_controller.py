from flask import Blueprint, request, make_response
import uuid
from entity.users import Users
from entity.response import Response
from service import user_service,request_validator
from datetime import datetime

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
from flask import Blueprint, request, make_response
import uuid
from entity.users import Users
from entity.response import Response
from service import user_service
from datetime import datetime

user_blueprint = Blueprint('user_blueprint', __name__)

@user_blueprint.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    new_user = Users(public_id=str(uuid.uuid4()),email=data['email'], name=data['name'], password='', admin=False)
    user_service.createUser(user=new_user,password=data['password'])
    return make_response(Response(message='Pomyślnie utworzono użytkownika',code=200,time_stamp=datetime.utcnow().timestamp()).__dict__)
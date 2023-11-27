from flask import Blueprint, request, Response, make_response
from security.token_validator import token_required
from entity.profile import Profile
from service.profile_service import get_profile_by_uid, get_profile_by_id
from entity.users import Users
from entity.response import Response as CustomResponse
from exceptions.profile_dont_exist_exception import ProfileDontExistException

profile_blueprint = Blueprint('profile_blueprint', __name__)

@profile_blueprint.route('/profile',methods=['GET'])
@token_required
def get_matches(current_user:Users,response:Response):
    uuid = request.args.get('uuid')
    try:
        if uuid:
            profile:Profile = get_profile_by_uid(uuid)
        else: 
            profile:Profile = get_profile_by_id(current_user.id)
    except ProfileDontExistException as e:
        response.set_data(CustomResponse(e.message,e.code).to_json())
        return response
    print(profile.rating)
    response.set_data(profile.to_json())
    return response


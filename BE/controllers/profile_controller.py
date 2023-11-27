from flask import Blueprint, request, Response, make_response
from security.token_validator import token_required
from entity.profile import Profile
from service.profile_service import get_profile_by_uid, get_profile_by_id
from entity.users import Users
from entity.response import Response as CustomResponse

profile_blueprint = Blueprint('profile_blueprint', __name__)

@profile_blueprint.route('/profile',methods=['GET'])
@token_required
def get_matches(current_user:Users,response:Response):
    uuid = request.args.get('uuid')
    try:
        if uuid:
            profile = get_profile_by_uid(uuid)
        else: 
            profile = get_profile_by_id(current_user.id)
    except:
        response.set_data("TEST")
        return response
    response.set_data(profile.__dict__)
    return response


from flask import Blueprint, request
from security.token_validator import token_required
from entity.profile import Profile

profile_blueprint = Blueprint('profile_blueprint', __name__)

@profile_blueprint.route('/profile',methods=['GET'])
@token_required
def get_matches(current_user,response):
    return 'TEST'

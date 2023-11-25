from flask import Blueprint, request
from security.token_validator import token_required

match_blueprint = Blueprint('match_blueprint', __name__)

@match_blueprint.route('/matches',methods=['GET'])
@token_required
def get_matches(current_user,response):
    return 'TEST'

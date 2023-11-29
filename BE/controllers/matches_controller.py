from flask import Blueprint, request
from security.token_validator import token_required
from flask_cors import CORS, cross_origin

match_blueprint = Blueprint('match_blueprint', __name__)

@match_blueprint.route('/matches',methods=['GET'])
@cross_origin()
@token_required
def get_matches(current_user,response):
    return 'TEST'

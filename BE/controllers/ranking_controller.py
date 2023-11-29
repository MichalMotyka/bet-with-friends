from flask import Blueprint, request, Response, make_response
from service.ranking_service import get_ranking
from entity.profile import Profile
import json
from flask_cors import CORS, cross_origin


ranking_blueprint = Blueprint('ranking_blueprint', __name__)

@ranking_blueprint.route('/ranking', methods=['GET'])
@cross_origin()
def ranking_list():
    page = 1 
    limit = 5
    if request.args.get('page'):
        page = request.args.get('page')
    if request.args.get('limit'):
        limit = request.args.get('limit')
    response = make_response(json.dumps([obj.to_json() for obj in get_ranking(page=page,limit=limit)],indent=4))
    response.headers['Content-Type'] = 'application/json'
    return response
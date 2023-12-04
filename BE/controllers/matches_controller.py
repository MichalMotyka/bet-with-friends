from flask import Blueprint, request,Response
from security.token_validator import token_required
from service.match_service import get_competetition_list,get_matches_list,get_posible_bets,create_bet
from entity.response import Response as CustomResponse
from entity.competition import Competition
import json

match_blueprint = Blueprint('match_blueprint', __name__)

@match_blueprint.route('/matches',methods=['GET'])
@token_required
def get_matches(current_user,response:Response):
    page = 1 
    limit = 5
    if request.args.get('page'):
        page = request.args.get('page')
    if request.args.get('limit'):
        limit = request.args.get('limit')
    if request.args.get('competetition'):
        competetition = request.args.get('competetition')
        (matches, count) = get_matches_list(page=int(page),limit=int(limit),competetition=competetition)
        response.set_data(json.dumps([obj.to_json() for obj in matches],indent=4))
        response.headers['X-Total-Count'] = count
        return response,200
    response.set_data(CustomResponse(message="Parameter competetition is required",code="M1").to_json())
    return response,400

@match_blueprint.route('/competetition',methods=['GET'])
@token_required
def get_competetition(current_user,response:Response):
    comp:Competition = get_competetition_list()
    response.set_data(json.dumps([obj.to_json() for obj in comp],indent=4))
    return response

@match_blueprint.route('/bet',methods=['GET'])
@token_required
def get_bets(current_user,response:Response):
    page = 1 
    limit = 5
    if request.args.get('page'):
        page = request.args.get('page')
    if request.args.get('limit'):
        limit = request.args.get('limit')
    if request.args.get('competetition'):
        competetition = request.args.get('competetition')
        (posible_best, count) = get_posible_bets(page=page,limit=limit,competetition=competetition)
        response.set_data(json.dumps([obj.to_json() for obj in posible_best],indent=4))
        response.headers['X-Total-Count'] = count
        return response
    response.set_data(CustomResponse(message="Parameter competetition is required",code="M1").to_json())
    return response,400

@match_blueprint.route('/bet/<match>',methods=['POST'])
@token_required
def create_bet(current_user,response:Response,match:int):
    create_bet()
from jsonschema import validate, ValidationError
import json
from flask import request
from entity.users import Users
import os


def register_validation():
    directory = os.path.dirname(__file__)
    directory = os.path.abspath(os.path.join(directory, os.pardir))
    file_path = os.path.join(directory, 'resources', 'schema', 'register.json')
    with open(file_path) as data:
        schema = json.load(data)
        data.close() 

    data_as_str = request.data.decode('utf-8')
    data_as_dict = json.loads(data_as_str)
    
    try:
        validate(data_as_dict, schema)
        user:Users = Users(**data_as_dict)
    except ValidationError as e:
        raise e
    
    return user
from flask import Blueprint, request, send_file
import os

image_blueprint = Blueprint('image_blueprint', __name__)

@image_blueprint.route('/image/<id>',methods=['GET'])
def download(id):
    directory = os.path.dirname(__file__)
    directory = os.path.abspath(os.path.join(directory, os.pardir))
    image_type = request.args.get('type')
    file_path = os.path.join(directory, 'resources','images',id+'.'+image_type)
    return send_file(file_path, as_attachment=True) 

import io
from flask import Blueprint, request, send_file, send_from_directory
import os

image_blueprint = Blueprint('image_blueprint', __name__)

@image_blueprint.route('/image/<id>',methods=['GET'])
def download(id):
    directory = os.path.dirname(__file__)
    directory = os.path.abspath(os.path.join(directory, os.pardir))
    image_type = request.args.get('type')
    file_path = os.path.join(directory, 'resources','images',id+'.'+image_type)
    return send_file(file_path, as_attachment=True) 

@image_blueprint.route('/avatar/<id>',methods=['GET'])
def avatar(id):
    directory = os.path.join(os.path.dirname(__file__), os.pardir, 'resources', 'avatars')
    file_path = os.path.join(directory, f"{id}.webp")

    with open(file_path, 'rb') as file:
        image = file.read()
    
    return send_file(
        io.BytesIO(image),
        mimetype='image/webp'
    )

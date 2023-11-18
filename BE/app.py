from flask import Flask, request, jsonify, make_response
from controllers.user_controller import user_blueprint
from controllers.image_controller import image_blueprint
from shared.base import init_db

app = Flask(__name__)

init_db()

app.config['SECRET_KEY']='Th1s1ss3cr3t'
api_v1_prefix = '/api/v1'
app.register_blueprint(user_blueprint, url_prefix=f'{api_v1_prefix}')
app.register_blueprint(image_blueprint, url_prefix=f'{api_v1_prefix}')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 

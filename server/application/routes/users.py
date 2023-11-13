from application import db
from flask import request, jsonify, Blueprint
from application.controllers.UserController import create, login

users = Blueprint('users', __name__ )


@users.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@users.route("/register", methods=['POST'])
def create_user():
    return create()
    
@users.route("/login", methods=['POST'])
def log_user():
    return login()
    
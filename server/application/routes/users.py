from application import db
from flask import request, jsonify, Blueprint
from application.controllers.UserController import create, login, logout, fetch_profile, set_preferences

users = Blueprint('users', __name__ )




## All routes use prefix /user
@users.route("/")
def hello_world():
    return "<p>UserRoute</p>"

@users.route("/register", methods=['POST'])
def create_user():
    return create()
    
@users.route("/login", methods=['POST', 'DELETE'])
def log_user():
    if request.method == 'POST':
        return login()
    if request.method == 'DELETE':
        return logout()

@users.route('/profile', methods=['GET'])
def profile_by_token():
    return(fetch_profile())  ##uses a token to find the profile

@users.route('/profile/<username>')
def profile_by_username(username):  ##uses a username to find the profile
    return(fetch_profile(username))

@users.route('/preferences', methods=['POST'])
def preferences():
    return set_preferences()


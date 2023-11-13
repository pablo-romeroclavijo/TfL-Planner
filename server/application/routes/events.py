from application import db
from flask import request, jsonify, Blueprint
from application.controllers.EventController import create, get_event, join_event

events = Blueprint('events', __name__ )


## All routes use prefix /event
@events.route("/")
def hello_world():
    return "<p>EventRoute</p>"

@events.route("/create", methods=['POST'])
def create_event():
    return create()

@events.route("/<share_code>", methods=['GET', 'POST'])
def get_join_event(share_code):
    if request.method == 'GET':
        return get_event(share_code)
    else:
        return join_event(share_code)

    
# @events.route("/login", methods=['POST'])
# def log_user():
#     return login()

# @events.route('/profile', methods=['GET'])
# def profile_by_token():
#     return(fetch_profile())  ##uses a token to find the profile

# @events.route('/profile/<username>')
# def profile_by_username(username):  ##uses a username to find the profile
#     return(fetch_profile(username))
    
from application import db
from flask import request, jsonify, Blueprint
from application.controllers.EventController import create, get_event, join_event, set_route, fetch_events, event_detailed

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

@events.route('/setroute', methods =['PATCH'])
def set():
    return set_route()

@events.route('/all', methods=['GET'])
def fetch_all():
    return fetch_events()

@events.route('/<sharecode>/details')
def fetch_attendees(sharecode):
    return event_detailed(sharecode)
    

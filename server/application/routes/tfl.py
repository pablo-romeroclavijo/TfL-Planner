from application import db
from flask import request, jsonify, Blueprint
from application.controllers.tflController import get_route

tfl = Blueprint('tfl', __name__ )


## All routes use prefix /tfl
@tfl.route("/")
def hello_world():
    return "<p>TfL Route</p>"

@tfl.route("/get", methods=['GET'])
def route():
    return get_route()

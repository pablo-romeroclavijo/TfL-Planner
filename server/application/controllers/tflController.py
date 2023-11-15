from application import db
from flask import request, jsonify


from application.models.User import User
from application.models.Errors import AuthenticationError, UserNotFound
from application.models.TfL import TfL_Request



def get_route():
    data = request.json
    token = request.headers['Authorization']       
    user = User.get_one_by_token(token)
    routes = TfL_Request.get_routes(user, data)
    return routes

def set_route():
    data = request.json
    token = request.headers['Authorization']  
         
    user_id = User.get_one_by_token(token)
    event_id = data.event_id
    journey = data.journey
    
    response = TfL_Request.set_route(user_id, event_id, journey)
    pass
    
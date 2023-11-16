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

    
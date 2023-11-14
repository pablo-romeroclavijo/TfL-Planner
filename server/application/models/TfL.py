from application import db
from application.models.Token import Token
from flask import jsonify

import requests
from application.models.Errors import EventNotFound, ActionNotAllowed

class TfL_Request():
    
    def __init__(self):
        pass
    
    def __repr__(self):
        pass
    def get_routes(user_id, body):
        print(body['origins']['from'])
        tfl_api = f"https://api.tfl.gov.uk/journey/journeyresults/{body['origins']['from']}/to/{body['origins']['to']}?"

        for key, value in body["params"].items():
            tfl_api += f"{key}={value}&"
        tfl_api = tfl_api[:-1]
        print(tfl_api)
        response = requests.get(tfl_api)
        print(response.status_code)
        
        if response.status_code == 300 or response.status_code == 200:
            data = response.json()
            return jsonify(data)
        else:
            return jsonify({'error': 'Failed to fetch data from the external API'})

class Journey():
    pass
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
            print(data)
            journeys = [Journey.create_journey(journey) for journey in data["journeys"]]
            print(journeys)
            return 'hello'
        # jsonify({'journeys': journeys})
        else:
            return jsonify({'error': 'Failed to fetch data from the external API'})

class Journey():
    def __init__(self, journey):
        self.startDateTime = journey['arrivalDateTime']
        self.arrivalDateTime = journey['arrivalDateTime']
        self.duration = journey['duration']
        # self.legs = [Leg(x) for x in journey['legs']]
    
    def create_journey(data):
        journey = Journey(data)
        print(journey.duration)
        JSON = jsonify(startDateTime=journey.startDateTime, arrivalDateTime=journey.arrivalDateTime, duration=journey.duration)
        print('here', JSON)
        return JSON
    # jsonify(startDateTime=journey.startDateTime, arrivalDateTime=journey.arrivalDateTime, duration=journey.duration)


class Leg():
    def __init__(self, leg):
        self.duration = leg['duration']
        self.summary = leg['instruction']['detailed']
        self.departure = leg['departureTime']
        self.arrival = leg['arrivalTime']
        self.mode = leg['mode']
        self.disruptions = [x['description'] for x in leg['disruptions']]
        self.isDisrupted = leg['isDisrupted']
        self.stops = [x['name'] for x in leg['path']['stopPoints']]
        
        
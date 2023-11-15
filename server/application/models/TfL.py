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
            journeys = [Journey.create_journey(journey) for journey in data["journeys"]]
            return jsonify({'journeys': journeys})
        else:
            return jsonify({'error': 'Failed to fetch data from the external API'})
    
class Journey():
    def __init__(self, journey):
        self.startDateTime = journey['startDateTime']
        self.arrivalDateTime = journey['arrivalDateTime']
        self.duration = journey['duration']
        self.legs = [Leg.create_leg(x) for x in journey['legs']]
    
    def create_journey(data):
        journey = Journey(data)
        journey_dict={ 
            'startDateTime': journey.startDateTime, 
            'arrivalDateTime': journey.arrivalDateTime,
            'duration':journey.duration,
            'legs' :journey.legs
        }
        return journey_dict

class Leg():
    def __init__(self, leg):
        self.duration = leg['duration']
        self.summary = leg['instruction']['detailed']
        self.departure = leg['departureTime']
        self.arrival = leg['arrivalTime']
        self.mode = leg['mode']['id']
        self.disruptions = [x['description'] for x in leg['disruptions']]
        self.isDisrupted = leg['isDisrupted']
        self.stops = [x['name'] for x in leg['path']['stopPoints']]
        
    def create_leg(data):
        leg = Leg(data)
        leg_dict={
            'duration':leg.duration,
            "summary": leg.summary,
            "departure": leg.departure,
            "arrival": leg.arrival,
            'mode': leg.mode,
            'distuptions': leg.disruptions,
            'isDisrupted': leg.isDisrupted,
            'stops': leg.stops  
        }
        return(leg_dict)
        
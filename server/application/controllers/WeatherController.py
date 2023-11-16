from flask import request, jsonify
import datetime

from application.models.Weather import Weather
from application.models.Errors import WeatherForecastError

def current():
    try:
        data = request.json
        location = data["location"]

        return Weather.current_forecast(location)
        
    except WeatherForecastError:
        return 'Unable to fetch weather data', 400
    except:
        return 'Another error', 400

def forecast():
    try: 
        data = request.json
        location = data["location"]
        event_timestamp = data["event_time"]
        
        today = datetime.datetime.now()
        date = datetime.datetime.fromisoformat(event_timestamp)
        delta = date - today
        
        if delta.days > 10:
            return "Event is too far ahead, no forecast available", 400
        else:
            return Weather.future_forecast(location, date, delta.days)
    except WeatherForecastError:
        return 'Unable to fetch weather data', 400
    except:
        return 'Another error', 400
    
from application import db
from flask import request, jsonify, Blueprint
from application.controllers.WeatherController import current, forecast

weather = Blueprint('weather', __name__ )




## All routes use prefix /weather
@weather.route('/')
def hello():
    return 'Weather routes'

@weather.route('/current')
def current_weather():
    return current()

@weather.route('/forecast')
def forecast_weather():
    return forecast()
import pytest
from application import create_app, db
from application.models.Weather import Weather
from unittest.mock import MagicMock
import datetime
from application.models.Errors import WeatherForecastError


import sys
import os
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
from mock_data import MockData


class MockResponse:
    def __init__(self, json_data, status_code):
        self.json_data = json_data
        self.status_code = status_code

    def json(self):
        return self.json_data


@pytest.fixture(scope='module')
def test_client():
    app = create_app('TEST')
    app.config['TESTING'] = True

    with app.test_client() as testing_client:
        with app.app_context():
            yield testing_client


def test_current(test_client, monkeypatch):
    mock_data = MockData.weather_current
    mock_alert = MockData.weather_future_alert
        
    def mock_get(*args, **kwargs):
        return MockResponse(mock_data, 200)
    def mock_get_alerts(*args, **kwargs):
        return MockResponse(mock_alert, 200)
    def mock_get_400(*args, **kwargs):
        return MockResponse([], 400)

    monkeypatch.setattr('requests.get', mock_get)

    response = Weather.current_forecast('Test Location')
    data = response.json
    forecast = data['forecast']
    
    assert forecast['condition'] == 'Sunny'
    assert forecast['humidity'] == 100
    assert forecast['icon_route'] == "//cdn.weatherapi.com/weather/64x64/day/113.png"
    assert forecast['location'] == 'Camden Town - London'
    assert forecast['temperature_celsius'] == 5.0
    
    
    monkeypatch.setattr('requests.get', mock_get_alerts)
    response = Weather.current_forecast('Test Location')
    data = response.json
    forecast = data['forecast']
    print
    
    assert forecast['alert_type'] == 'Fire risk'
   
    
    monkeypatch.setattr('requests.get', mock_get_400)
    with pytest.raises(WeatherForecastError):
        Weather.current_forecast('Test Location')

def test_future_forecast(test_client, monkeypatch):
    mock_data = MockData.weather_future
    test_date = '2023-11-18 16:05:06'
    date = datetime.datetime.fromisoformat(test_date)

    def mock_get(*args, **kwargs):
        return MockResponse(mock_data, 200)
    
    def mock_get_400(*args, **kwargs):
        return MockResponse([], 400)

    monkeypatch.setattr('requests.get', mock_get)
    response = Weather.future_forecast('Test Location', date , 5).json
    forecast = response['forecast']
    
    assert forecast['condition'] == 'Patchy rain possible'
    assert forecast['humidity'] == 71
    assert forecast['icon_route'] == "//cdn.weatherapi.com/weather/64x64/day/176.png"
    assert forecast['location'] == 'Camden Town - London'
    assert forecast['temperature_celsius'] == 8.0
    

    monkeypatch.setattr('requests.get', mock_get_400)
    with pytest.raises(WeatherForecastError):
        Weather.future_forecast('Test Location', date , 5).json
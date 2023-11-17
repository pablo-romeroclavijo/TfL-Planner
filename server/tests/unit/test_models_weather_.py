import pytest
from application import create_app, db
from application.models.Weather import Weather
from unittest import mock

@pytest.fixture(scope='module')
def test_client():
    app = create_app('TEST')
    app.config['TESTING'] = True

    with app.test_client() as testing_client:
        with app.app_context():
            yield testing_client


def test_one(test_client, monkeypatch):
    mock_weather =  {
        "forecast": {
        "alert_type": "Yellow rain warning",
        "condition": "Partly cloudy",
        "humidity": 87,
        "icon_route": "//cdn.weatherapi.com/weather/64x64/day/116.png",
        "is_day": True,
        "location": "Camden Town - London",
        "precip_mm": 0.14,
        "temperature_celsius": 7.0,
        "wind_kph": 9.0
        }
    }
    
    monkeypatch.setattr(Weather.current_forecast, "response", mock_weather)
    result = Weather.current_forecast('NW1 9HU')
    print(result)
    
    assert 1 == 2
    
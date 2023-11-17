# import pytest
# from unittest.mock import patch, MagicMock
# from application import create_app
# from application.models.Errors import WeatherForecastError

# @pytest.fixture(scope='function')
# def test_client():
#     flask_app = create_app('TEST')
#     with flask_app.test_client() as testing_client:
#         with flask_app.app_context():
#             yield testing_client

# @patch('application.models.Weather.requests.get')
# def test_current_weather_success(mock_get, test_client):
#     # Mock successful API response
#     mock_get.return_value = MagicMock(status_code=200, json=lambda: {
#         # Mocked JSON response structure
#         "location": {"name": "Test City", "region": "Test Region"},
#         "current": {
#             # Fill in the expected data structure
#         },
#         "alerts": {"alert": []}
#     })

#     response = test_client.post('/weather/current', json={"location": "Test City"})
#     assert response.status_code == 200
#     # Additional assertions based on response content

# @patch('application.models.Weather.requests.get')
# def test_current_weather_failure(mock_get, test_client):
#     # Mock API failure
#     mock_get.return_value = MagicMock(status_code=404)

#     response = test_client.post('/weather/current', json={"location": "Test City"})
#     assert response.status_code == 400
#     # Additional assertions based on response content

# # Similar tests can be written for the forecast function

import pytest
from application import create_app, db, bcrypt
from unittest.mock import patch, MagicMock

@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app('TEST')

    with flask_app.app_context():
        db.create_all()
        yield flask_app.test_client()

        db.session.remove()
        db.drop_all()
        db.engine.dispose()
        
# @pytest.fixture
# def mock_Weather_model():
#     with patch('application.models.Weather') as mock:
#         yield mock

def test_hello_world(test_client):

    response = test_client.get('/weather/')
    assert response.status_code == 200
    assert response.data.decode('utf-8') == "Weather routes"
    
# def test_current(test_client, mock_Weather_model):
#     data = dict(location="NW19HU")
#     response = test_client.get('/weather/current', json=data)
#     assert response.status_code == 200
    
# def test_future(test_client, mock_Weather_model):
#     data = dict(location="NW19HU", event_time="2023-11-21T12:43:00")
#     response = test_client.get('/weather/current', json=data)
#     assert response.status_code == 200
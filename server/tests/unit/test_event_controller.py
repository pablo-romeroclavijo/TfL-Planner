import pytest
from application import create_app, db, bcrypt
from unittest.mock import patch, MagicMock
from flask import jsonify
from application.models.User import User
from application.models.Attendees import Attendee
from datetime import datetime
from application.models.Errors import ActionNotAllowed, EventNotFound

default_preferences = {
            'journeyPreferences':'leastinterchange', ##'leastwalking' or 'leasttiime'
            'maxWalkingMinutes': 20,
            'walkingSpeed': 'average',  #slow, average or fast
            'accessibilityPreferences': None, #"noSolidStairs,noEscalators,noElevators,stepFreeToVehicle,stepFreeToPlatform"
        }


@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app('TEST')

    with flask_app.app_context():
        db.create_all()

        hashed_password = bcrypt.generate_password_hash('testpassword1')
        hashed_password_2 = bcrypt.generate_password_hash('testpassword2')

        user1 = User(username='testuser1', password=hashed_password, email='test1@test.com', preferences=default_preferences)
        db.session.add(user1)
        db.session.commit()
        user2 = User(username='testuser2', password=hashed_password_2, email='test1@test.com', preferences=default_preferences)
        db.session.add(user2)
        db.session.commit()

        yield flask_app.test_client()

        db.session.remove()
        db.drop_all()
        db.engine.dispose()

@pytest.fixture
def mock_user_model():
    with patch('application.models.User') as mock:
        yield mock
@pytest.fixture
def mock_attendee_model():
    with patch('application.models.Attendees') as mock:
        yield mock
        
        
@pytest.fixture       
def mock_db_session():
    with patch('application.models.Events.db.session.execute') as mock_session:
        yield mock_session
        
@pytest.fixture       
def mock_db_session_user():
    with patch('application.models.User.db.session.execute') as mock_session:
        yield mock_session
@pytest.fixture

def mock_token_model():
    with patch('application.models.Token') as mock:
        yield mock

@pytest.fixture()
def mock_event_model():
    with patch('application.models.Events') as mock:
        yield mock

@pytest.fixture(scope='module')       
def login(test_client):
    login_data = {
            'username': 'testuser1',
            'password': 'testpassword1'
        }
    login_data_2 = {
            'username': 'testuser2',
            'password': 'testpassword2'
        }

    login_response = test_client.post('/user/login', json=login_data)
    token = login_response.get_json()['token']  
    
    test_client.post('/user/login', json=login_data)
    token = login_response.get_json()['token']  
    
    login_response_2 = test_client.post('/user/login', json=login_data_2)
    token_2 = login_response_2.get_json()['token']  

    event_data = {
            'creator_id': 1,
            'postcode': '12345',
            'date': datetime.now(), 
            'description': 'Test Event',
            'title': 'Test'
        }
    create_event_response = test_client.post('/event/create', json=event_data, headers={'Authorization': token})

    share_code = create_event_response.json["share_code"]
    event_id = create_event_response.json["id"]
    return token, share_code, token_2, event_id


def test_create_event(test_client, login, mock_event_model, mock_user_model):
    token, share_code, token_2, event_id = login
    event_data = {
            'creator_id': 1,
            'postcode': '12345',
            'date': datetime.now(), 
            'description': 'Test Event',
            'title': 'Test'
        }
    mock_user_model.get_one_by_token.return_value = MagicMock(id=1)
    mock_event_model.create_event.return_value = MagicMock(id=1, creator=1, postcode=1, date='now', description='description', title='tile', share_code='aaaa')
    
    response = test_client.post('event/create', json=event_data, headers={'Authorization': token} )
    assert response.status_code == 201
    
def test_create_event_failed(test_client, login, mock_event_model, mock_user_model):
    token, share_code, token_2, event_id = login
    event_data = {
            'creator_id': 1,
            'date': datetime.now(), 
            'description': 'Test Event',
            'title': 'Test'
        }
    #mock_user_model.get_one_by_token.return_value = MagicMock(id=1)
    mock_event_model.create_event.side_effect = ActionNotAllowed

    response = test_client.post('event/create', json=event_data, headers={'Authorization': token} )
    assert response.status_code == 400
  
  
def test_get_event_failed_404(test_client, login, mock_event_model, mock_user_model, mock_db_session):
    token, share_code, token_2, event_id = login
    mock_db_session.return_value.scalar_one.side_effect = AssertionError
    response = test_client.post('event/'+share_code)
    print(response)
    assert response.status_code == 404
    
def test_get_event(test_client, login, mock_event_model, mock_user_model, mock_db_session):
    token, share_code, token_2, event_id = login
    mock_db_session.return_value.scalar_one.return_value = MagicMock(id=1, creator=1, postcode=1, date='now', description='description', title='tile', share_code='aaaa')
    mock_event_model.get_one_by_id.return_value = MagicMock(id=1, creator=2, postcode=1, date='now', description='description', title='tile', share_code='aaaa')
    
    response = test_client.post('event/'+share_code)

    assert response.status_code == 400

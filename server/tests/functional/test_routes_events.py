import pytest
from datetime import datetime
from application import create_app, db, bcrypt
from application.models.User import User

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

@pytest.fixture(scope='module')
def login_and_create_event(test_client):
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


def test_hello_world(test_client):

    response = test_client.get('/event/')
    assert response.status_code == 200
    assert response.data.decode('utf-8') == "<p>EventRoute</p>"

def test_login_and_create_event(test_client):
    login_data = {
        'username': 'testuser1',
        'password': 'testpassword1'
    }

    login_response = test_client.post('/user/login', json=login_data)
    assert login_response.status_code == 200, f"Login failed with status {login_response.status_code} and response {login_response.data.decode('utf-8')}"
    token = login_response.get_json()['token']  

    event_data = {
        'creator_id': 1,
        'postcode': '12345',
        'date': datetime.now(), 
        'description': 'Test Event',
        'title': 'Test'
    }
    create_event_response = test_client.post('/event/create', json=event_data, headers={'Authorization': token})

    assert create_event_response.status_code == 201 

def test_get_event(test_client, login_and_create_event):
    token, share_code, token_2, event_id = login_and_create_event
    print(token, share_code)
    get_event_response = test_client.get('/event/'+share_code)
    assert get_event_response.status_code == 200
    
def test_join_event(test_client, login_and_create_event):
    token, share_code, token_2, event_id = login_and_create_event
    get_event_response = test_client.post('/event/'+share_code, headers={'Authorization': token_2})
    assert get_event_response.status_code == 201
    
def test_get_event_details(test_client, login_and_create_event):
    token, share_code, token_2, event_id = login_and_create_event
    get_event_response = test_client.get('/event/'+share_code+"/details")
    assert get_event_response.status_code == 200
    
def test_get_all_events(test_client, login_and_create_event):
    token, share_code, token_2, event_id = login_and_create_event
    get_event_response = test_client.get('/event/all', headers={'Authorization': token})
    assert get_event_response.status_code == 200

def test_set_route(test_client, login_and_create_event):
    token, share_code, token_2, event_id = login_and_create_event
    journey = dict(arrivalDateTime="2023-11-17T13:24:00",duration= 49,legs= [],origin= "NW19HU",startDateTime="2023-11-17T12:35:00")
    data = dict(event_id=event_id, journey=journey, status="pending")
    print(data)
    get_event_response = test_client.patch('/event/setroute', json=data, headers={'Authorization': token})
    assert get_event_response.status_code == 200
    
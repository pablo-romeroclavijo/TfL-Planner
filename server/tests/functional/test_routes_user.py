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
def login(test_client):
    login_data = {
            'username': 'testuser1',
            'password': 'testpassword1'
        }

    login_response = test_client.post('/user/login', json=login_data)
    token = login_response.get_json()['token']  
    
    test_client.post('/user/login', json=login_data)
    token = login_response.get_json()['token']
    username = login_response.get_json()['username']
    
    return token, username

@pytest.fixture
def mock_Weather_model():
    with patch('application.models.Token') as mock:
        yield mock

def test_hello_world(test_client):

    response = test_client.get('/user/')
    assert response.status_code == 200
    assert response.data.decode('utf-8') == "<p>UserRoute</p>"

def test_get_profile(test_client, login):
    token, username = login
    print(token, username)
    response = test_client.get('user/profile/'+ username)
    assert response.status_code == 200
    
def test_get_profile_by_token(test_client, login):
    token, username = login
    print(token, username)
    response = test_client.get('user/profile', headers={'Authorization': token})
    assert response.status_code == 200

def test_set_preferences(test_client, login):
    token, username = login
    data = dict(preferences={})
    print(token, username)
    response = test_client.get('user/profile', json=data, headers={'Authorization': token})
    assert response.status_code == 200
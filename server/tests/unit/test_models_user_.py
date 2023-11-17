# test_user_model.py
import pytest
from application import create_app, db
from application.models.User import User, UserNotFound, ActionNotAllowed
from application.models.Token import Token 

default_preferences = {
            'journeyPreferences':'leastinterchange', ##'leastwalking' or 'leasttiime'
            'maxWalkingMinutes': 20,
            'walkingSpeed': 'average',  #slow, average or fast
            'accessibilityPreferences': None, #"noSolidStairs,noEscalators,noElevators,stepFreeToVehicle,stepFreeToPlatform"
        }
# user1 = User(username='testuser1', password='testpassword1'.encode('utf-8'), email='test1@test.com', preferences=default_preferences)
@pytest.fixture(scope='module')
def test_client():
    app = create_app('TEST')
    app.config['TESTING'] = True

    with app.test_client() as testing_client:
        with app.app_context():
            yield testing_client

@pytest.fixture(scope='module')
def init_database(test_client):
    
    
    db.session.remove()
    db.drop_all()
    db.create_all()

    user1 = User(username='testuser1', password='testpassword1'.encode('utf-8'), email='test1@test.com', preferences=default_preferences)
    db.session.add(user1)
    db.session.commit()
    
    user2 = User(username='testuser2', password='testpassword1'.encode('utf-8'), email='test2@test.com', preferences=default_preferences)
    db.session.add(user2)
    db.session.commit()

    yield db  

    db.session.remove()
    db.drop_all()
    db.engine.dispose()


def test_new_user():
    user = User(username='testuser', password='testpassword'.encode('utf-8'), email='test@test.com', preferences=default_preferences)
    assert user.user_name == 'testuser'
    assert user.password == 'testpassword'.encode('utf-8')  # Hash in real scenarios
    assert user.email == 'test@test.com'



def test_get_user_by_username(test_client, init_database):

    user = User.get_one_by_username('testuser1')
    assert user.user_name == 'testuser1'
    assert user.email == 'test1@test.com'

def test_get_user_by_id(test_client, init_database):

    user = User.get_one_by_id(1)
    assert user.user_name == 'testuser1'
    
    with pytest.raises(UserNotFound):
        User.get_one_by_id(50)
        

def test_user_not_found_exception(test_client, init_database):
    with pytest.raises(UserNotFound):
        User.get_one_by_username('nonexistentuser')

def test_get_one_by_token(test_client, init_database):
    token = Token.create_token(1)
    db.session.add(token)
    db.session.commit()
    user = User.get_one_by_token(token.token)
    
    assert user.id == 1
    
    with pytest.raises(Exception):
        User.get_one_by_token('not a token')
        
def test_create_user(test_client, init_database):
    data = dict(username='testuser10', password='testpassword1'.encode('utf-8'), email='test1@test.com', preferences=default_preferences)
    user = User.create_user(data)
    
    assert user.id is not None
    assert user.user_name == data['username']
    assert user.password == data['password']
    assert user.email == data['email']
    assert user.remainder == 30
    assert user.postcode == 'null'
    assert str(user) == 'User testuser10 created'
    
    with pytest.raises(ActionNotAllowed):
        data = dict(username='testuser1', password='testpassword1'.encode('utf-8'), email='test1@test.com', preferences=default_preferences)
        User.create_user(data)
    
    
    

import pytest
import string
from datetime import datetime
from application import create_app, db
from application.models.User import User
from application.models.Events import Event
from application.models.Attendees import Attendee
from application.models.Errors import EventNotFound, ActionNotAllowed


default_preferences = {
            'journeyPreferences':'leastinterchange', ##'leastwalking' or 'leasttiime'
            'maxWalkingMinutes': 20,
            'walkingSpeed': 'average',  #slow, average or fast
            'accessibilityPreferences': None, #"noSolidStairs,noEscalators,noElevators,stepFreeToVehicle,stepFreeToPlatform"
        }


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
    
def test_create_event(test_client, init_database):
    test_user_id = 1 
    event_data = {
        'postcode': '12345',
        'date': datetime.now(), 
        'description': 'Test Event',
        'title': 'Test'
    }

    event = Event.create_event(test_user_id, event_data)
    assert event is not None
    assert event.postcode == event_data['postcode']
    assert event.description == event_data['description']
    assert event.title == event_data['title']
    print(event)
    assert str(event) == 'User 1 created the event'

def test_Error_create_event(test_client, init_database):
    test_user_id = 1 
    event_data = {
    }
    with pytest.raises(ActionNotAllowed):
        event = Event.create_event(test_user_id, event_data)
         
def test_get_event_by_id(test_client, init_database):

    event_id = 1  

    retrieved_event = Event.get_event_by_id(event_id)
    assert retrieved_event is not None
    assert retrieved_event.id == event_id
    
def test_Error_get_event_by_id(test_client, init_database):
    event_id = 10  
    with pytest.raises(ActionNotAllowed):
        retrieved_event = Event.get_event_by_id(event_id)

def test_create_share_code():
    length = 10  
    share_code = Event.create_code(length)

    assert len(share_code) == length
    all_characters_valid = all(c in string.ascii_letters + string.digits for c in share_code)
    assert all_characters_valid is True


def test_get_event_by_share_code(test_client, init_database):
    test_user_id = 1  
    event_data = {
        'postcode': '12345',
        'date': datetime.now(),
        'description': 'Test Event',
        'title': 'Test'
    }

    event = Event.create_event(test_user_id, event_data)

    retrieved_event = Event.get_one_by_share(event.share_code)
    assert retrieved_event is not None
    assert retrieved_event.share_code == event.share_code
    assert retrieved_event.id == event.id


def test_get_event_by_share_code_not_found(test_client, init_database):
    with pytest.raises(EventNotFound):
        Event.get_one_by_share("Event not found")
        
def test_fetch_all(test_client, init_database):
    test_user_id_1 = 1 
    date = datetime.now()
    event_data_1 = {
        'postcode': '12345',
        'date': date, 
        'description': 'Test Event1',
        'title': 'Test1'
    }
    test_user_id_2 = 1
    event_data_2 = {
        'postcode': '1234',
        'date': date, 
        'description': 'Test Event2',
        'title': 'Test2'
    }

    event_1 = Event.create_event(test_user_id_1, event_data_1)
    event_2 = Event.create_event(test_user_id_2, event_data_2)

    events = Event.fetch_all(1)
    print(events[2].id)
    assert events[2].id == 3
    assert events[2].postcode == "12345"
    assert events[2].description == 'Test Event1'
    assert events[2].title == 'Test1'
    assert events[2].date == date
    
    assert events[3].id == 4
    assert events[3].postcode == "1234"
    assert events[3].description == 'Test Event2'
    assert events[3].title == 'Test2'
    assert events[3].date == date

def test_Error_fetch_all(test_client, init_database):
    with pytest.raises(ActionNotAllowed):
        Event.fetch_all('not a user')
        
def test_fetch_attendees(test_client, init_database):
    test_user_id = 1
    test_user_2_id = 2 
    date = datetime.now()
    event_data = {
        'postcode': '12345',
        'date': date, 
        'description': 'Test Event1',
        'title': 'Test1'
    }
    
    event = Event.create_event(test_user_id, event_data)
    create_attendee = Attendee.create_attendee(event.id, test_user_2_id)
    
    attendees = Event.fetch_attendees(event.id)

    assert len(attendees) == 2
    assert attendees[0][0].user_id == 1
    assert attendees[1][0].user_id == 2

def test_Error_fetch_attendees(test_client, init_database):
    with pytest.raises(ActionNotAllowed):
        Event.fetch_attendees(200)
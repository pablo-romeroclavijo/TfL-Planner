import pytest
import string
import random
from datetime import datetime
from application import create_app, db
from application.models.User import User
from application.models.Attendees import Attendee
from application.models.Events import Event
from application.models.Errors import EventNotFound, AttendeeIsNotUnique, ActionNotAllowed

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
    db.session.close()


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
      
      
    event = Event(
        creator_id=user1.id,
        postcode='12345',
        share_code=''.join(random.choices(string.ascii_uppercase + string.digits, k=10)),
        date=datetime.now(),
        description='Test Event Description',
        title='Test Event'
    )
    
    event2 = Event(
        creator_id=user2.id,
        postcode='12345',
        share_code=''.join(random.choices(string.ascii_uppercase + string.digits, k=10)),
        date=datetime.now(),
        description='Test Event Description',
        title='Test Event'
    )
    db.session.add(event)
    db.session.add(event2)
    db.session.commit()

    yield db  

    db.session.remove()
    db.drop_all()
    db.engine.dispose()

def test_create_attendee(test_client, init_database):
    test_user = db.session.get(User, 2) 
    test_event_id = 1

    attendee = Attendee.create_attendee(test_event_id, test_user.id)


    assert attendee is not None
    assert attendee.user_id == test_user.id
    assert attendee.event_id == test_event_id
    assert attendee.status == 'Pending'
    assert attendee.accepted == True
    assert attendee.ETA is None
    assert attendee.route is None
    assert attendee.suggested_departure is None
    assert attendee.origin is None
    
    with pytest.raises(AttendeeIsNotUnique):
        Attendee.create_attendee(test_event_id, test_user.id)
    with pytest.raises(ActionNotAllowed):
        Attendee.create_attendee(20, test_user.id)

def test_Error_get_one_by_user(test_client, init_database):
    with pytest.raises(ActionNotAllowed):
        Attendee.get_one_by_user(20)
        
def test_get_one_by_user_and_event(test_client, init_database):
    test_user = db.session.get(User, 1) 
    test_event_id = 2

    Attendee.create_attendee(test_event_id, test_user.id)
    get_attendee = Attendee.get_one_by_user_and_event(test_user.id, test_event_id)
    
    assert get_attendee.user_id == test_user.id
    assert get_attendee.event_id == test_event_id
    assert get_attendee.status == "Pending"
    assert get_attendee.accepted == True
    
    with pytest.raises(ActionNotAllowed):
        Attendee.get_one_by_user_and_event(20, 20)

def test_set_route(test_client, init_database):
    journey = dict(arrivalDateTime="2023-11-17T13:24:00",duration= 49,legs= [],origin= "NW19HU",startDateTime="2023-11-17T12:35:00")
    
    attendee = Attendee.get_one_by_user(1)
    attendee.set_route(journey, 'Pending' )

    
    assert attendee.origin == journey['origin']
    assert attendee.route == journey
    assert attendee.status == 'Pending'

    

        

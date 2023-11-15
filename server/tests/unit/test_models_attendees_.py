import pytest
import string
import random
from datetime import datetime
from application import create_app, db
from application.models.User import User
from application.models.Attendees import Attendee
from application.models.Events import Event
from application.models.Errors import EventNotFound


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

    user1 = User(username='testuser1', password='testpassword1'.encode('utf-8'), email='test1@test.com')
    db.session.add(user1)
    db.session.commit()
      
      
    event = Event(
        creator_id=user1.id,
        postcode='12345',
        share_code=''.join(random.choices(string.ascii_uppercase + string.digits, k=10)),
        date=datetime.now(),
        description='Test Event Description',
        title='Test Event'
    )
    db.session.add(event)
    db.session.commit()

    yield db  

    db.session.remove()
    db.drop_all()
    db.engine.dispose()

def test_create_attendee(test_client, init_database):
    test_user = db.session.get(User, 1) 
    test_event_id = 1

    attendee = Attendee.create_attendee(test_event_id, test_user)


    assert attendee is not None
    assert attendee.user_id == test_user.id
    assert attendee.event_id == test_event_id
    assert attendee.status == 'Pending'
    assert attendee.accepted == True
    assert attendee.ETA is None
    assert attendee.route is None
    assert attendee.suggested_departure is None
    assert attendee.origin is None



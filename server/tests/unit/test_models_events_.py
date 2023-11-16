import pytest
import string
from datetime import datetime
from application import create_app, db
from application.models.User import User
from application.models.Events import Event
from application.models.Errors import EventNotFound

@pytest.fixture(scope='module')
def test_client():
    app = create_app('TEST')
    app.config['TESTING'] = True

    with app.test_client() as testing_client:
        with app.app_context():
            yield testing_client


@pytest.fixture(scope='module')
def init_database(test_client):
    db.create_all()

    user1 = User(username='testuser1', password='testpassword1'.encode('utf-8'), email='test1@test.com')
    db.session.add(user1)
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

def test_get_event_by_id(test_client, init_database):

    event_id = 1  

    retrieved_event = Event.get_event_by_id(event_id)
    assert retrieved_event is not None
    assert retrieved_event.id == event_id

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

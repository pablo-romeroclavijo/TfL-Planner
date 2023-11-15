import pytest
from datetime import datetime
from application import create_app, db
from application.models.User import User

@pytest.fixture(scope='module')
def test_client():
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
    flask_app = create_app('TEST')  # Create your Flask app with test configuration
    testing_client = flask_app.test_client()

    # Establish an application context before running the tests
    ctx = flask_app.app_context()
    ctx.push()

    yield testing_client  # this is where the testing happens

    ctx.pop()



def test_hello_world(test_client):
    response = test_client.get('https://metro-mingle.onrender.com/event/')
    assert response.status_code == 200
    assert response.data == b"<p>EventRoute</p>"

def test_create_event(test_client):
    # Prepare the data for the POST request
    data = {
        '': 'value1',
        'key2': 'value2'
        # ... include other relevant data for event creation
    }

    response = test_client.post('/event/create', json=data)
    assert response.status_code == 200
    # Further assertions based on the expected response


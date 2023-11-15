import pytest
from datetime import datetime
from application import create_app, db, bcrypt
from application.models.User import User

@pytest.fixture(scope='module')
def test_client():
    flask_app = create_app('TEST')

    with flask_app.app_context():
        db.create_all()

        hashed_password = bcrypt.generate_password_hash('testpassword1')

        user1 = User(username='testuser1', password=hashed_password, email='test1@test.com')
        db.session.add(user1)
        db.session.commit()

        yield flask_app.test_client()

        db.session.remove()
        db.drop_all()
        db.engine.dispose()



def test_hello_world(test_client):

    response = test_client.get('/event/')
    assert response.status_code == 200
    assert response.data.decode('utf-8') == "<p>EventRoute</p>"

# def test_login_and_create_event(test_client):
#     login_data = {
#         'username': 'testuser1',
#         'password': 'testpassword1'
#     }

#     print(login_data)
#     login_response = test_client.post('/user/login', json=login_data)

#     print(login_response)

#     assert login_response.status_code == 200, f"Login failed with status {login_response.status_code} and response {login_response.data.decode('utf-8')}"


#     token = login_response.get_json()['token']  

#     headers = {
#         'Authorization': f'Bearer {token}'
#     }
#     event_data = {
#         'creator_id': 1,
#         'postcode': '12345',
#         'date': datetime.now(), 
#         'description': 'Test Event',
#         'title': 'Test'
#     }
#     create_event_response = test_client.post('/event/create', json=event_data, headers=headers)

#     assert create_event_response.status_code == 200 


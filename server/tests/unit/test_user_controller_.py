import pytest
import json
from bcrypt import hashpw, gensalt
from unittest.mock import patch, MagicMock
from application import create_app, db
from application.models.User import User
from application.models.Errors import UserNotFound

@pytest.fixture(scope='function')
def test_client():
    app = create_app('TEST')
    app.config['TESTING'] = True

    with app.test_client() as testing_client:
        with app.app_context():
            db.create_all() 

            yield testing_client  
            db.session.remove()
            db.drop_all() 
            db.engine.dispose()  


@pytest.fixture
def mock_user_model():
    with patch('application.models.User') as mock:
        yield mock

@pytest.fixture
def mock_token_model():
    with patch('application.models.Token') as mock:
        yield mock

@pytest.fixture
def mock_bcrypt():
    with patch('application.controllers.UserController.bcrypt') as mock:
        yield mock

def test_create_user_success(test_client, mock_user_model):
    mock_user_model.create_user.return_value = MagicMock(id=1, user_name='testuser0')

    request_data = {
            "username": "testuser0", 
           "password": "testpassword",
           "email": "test@test.com"
}
    
    response = test_client.post('/user/register', json=request_data)
    print(request_data)
    
    print("Response data:", response.data.decode('utf-8'))  # Decoding response data for readability

    assert response.status_code == 201, f"Unexpected status code: {response.status_code}"



def test_create_user_failure(test_client):
    response = test_client.post('/user/register', json={
        'username': '', 
        'password': 'testpassword'
    })

    assert response.status_code == 400



def test_login_success(test_client, mock_user_model, mock_bcrypt):

    hashed_password = hashpw('testpassword'.encode('utf-8'), gensalt())
    new_user = User(username='testuser', password=hashed_password, email='test@test.com')
    db.session.add(new_user)
    db.session.commit()


    mock_user_model.get_one_by_username.return_value = new_user
    mock_bcrypt.checkpw.return_value = True


    response = test_client.post('/user/login', json={
        'username': 'testuser', 
        'password': 'testpassword'
    })

    assert response.status_code == 200
    assert 'token' in response.json 



def test_login_failure_wrong_credentials(test_client, mock_user_model, mock_bcrypt):

    hashed_password = hashpw('correctpassword'.encode('utf-8'), gensalt())
    existing_user = User(username='testuser', password=hashed_password, email='test@test.com')
    db.session.add(existing_user)
    db.session.commit()

    mock_user_model.get_one_by_username.return_value = existing_user
    mock_bcrypt.checkpw.return_value = False 

    response = test_client.post('/user/login', json={
        'username': 'testuser', 
        'password': 'wrongpassword'
    })

    assert response.status_code == 400


def test_fetch_profile_with_username(test_client):
    hashed_password = hashpw('testpassword'.encode('utf-8'), gensalt())
    new_user = User(username='testuser', password=hashed_password, email='test@test.com')
    db.session.add(new_user)
    db.session.commit()

    response = test_client.get('/user/profile/testuser')

    assert response.status_code == 200
    assert response.json['username'] == 'testuser'  
    assert response.json['email'] == 'test@test.com'


def test_fetch_profile_user_not_found(test_client, mock_user_model):
    mock_user_model.get_one_by_username.side_effect = UserNotFound

    response = test_client.get('/user/profile/nonexistentuser')
    assert response.status_code == 404

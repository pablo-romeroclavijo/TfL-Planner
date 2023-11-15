# test_user_model.py
import pytest
from application import create_app, db
from application.models.User import User, UserNotFound

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
    user2 = User(username='testuser2', password='testpassword2'.encode('utf-8'), email='test2@test.com')
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()

    yield db  

    db.session.remove()
    db.drop_all()
    db.engine.dispose()


def test_new_user():
    user = User(username='testuser', password='testpassword'.encode('utf-8'), email='test@test.com')
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

def test_user_not_found_exception(test_client, init_database):
    with pytest.raises(UserNotFound):
        User.get_one_by_username('nonexistentuser')

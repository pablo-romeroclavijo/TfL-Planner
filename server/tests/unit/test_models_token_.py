import pytest
import uuid
from application import create_app, db
from application.models.Token import Token
from application.models.User import User

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


def test_token_generation(test_client, init_database):
    test_user = User(username='testuser', password='testpassword'.encode('utf-8'), email='test@test.com')
    db.session.add(test_user)
    db.session.commit()

    token = Token.create_token(test_user.id)

    assert token is not None
    assert isinstance(token.token, uuid.UUID)
    assert token.user_id == test_user.id
    assert str(token) == f"{test_user.id}, {token.token}"

    db.session.delete(token)
    db.session.delete(test_user)
    db.session.commit()
    
    with pytest.raises(Exception):
        Token.create_token(20)
from application.models.User import User
import os
from application import create_app, db

def create_test_app():
    app = create_app(env='TEST')

    # Provide a fallback for the test database URL
    test_db_url = os.environ.get("TEST_DATABASE_URL", "sqlite:///:memory:")
    app.config['SQLALCHEMY_DATABASE_URI'] = test_db_url

    with app.app_context():
        db.create_all()
        # Ensure that the parameters match your User model's constructor
        test_user = User(username="test", postcode="w68ed", password="test", email="test@gmail.com", remainder=1)
        db.session.add(test_user)
        db.session.commit()

    return app

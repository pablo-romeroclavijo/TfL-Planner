from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
db = SQLAlchemy()
# application factory
def create_app(env=None):
    app = Flask(__name__)
    load_dotenv()
    

    if env == 'TEST':        
        app.config['TESTING']=True
        app.config['DEBUG']=False
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("TEST_DATABASE_URL")
    else:
        print('here2')
        app.config['TESTING'] = False
        app.config['DEBUG'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ["DATABASE_URL"]
   
    db.init_app(app)
    bcrypt.init_app(app)

    
    app.app_context().push()
    from application.models.User import User
    from application.models.Token import Token
    from application.models.Events import Event
    from application.models.Attendees import Attendee
    from application.models.Weather import Weather
    db.create_all()
    CORS(app)

    from application.routes.users import users
    from application.routes.events import events
    from application.routes.tfl import tfl
    from application.routes.weather import weather
    
    app.register_blueprint(users, url_prefix='/user')
    app.register_blueprint(events, url_prefix='/event')
    app.register_blueprint(tfl, url_prefix='/tfl')
    app.register_blueprint(weather, url_prefix='/weather')
    
    return app




from application import db
from application.models.Token import Token
from application.models.Errors import EventNotFound, UserNotFound, ActionNotAllowed


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(25), nullable=False, unique=True)
    postcode = db.Column(db.String(9), nullable=False)
    password = db.Column(db.LargeBinary(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    remainder = db.Column(db.Integer, nullable=False)
    preferences = db.Column(db.String(200), nullable=False)
    
    def __init__(self, username, password, email, preferences):
        self.user_name = username
        self.postcode = 'null'
        self.password = password
        self.email = email
        self.remainder = 30
        self.preferences = str(preferences)
    
    def __repr__(self):
        return (f"User {self.user_name} created")
    
    def create_user(data):
        default_preferences = {
            'journeyPreferences':'leastinterchange', ##'leastwalking' or 'leasttiime'
            'maxWalkingMinutes': 20,
            'walkingSpeed': 'average',  #slow, average or fast
            'accessibilityPreferences': None, #"noSolidStairs,noEscalators,noElevators,stepFreeToVehicle,stepFreeToPlatform"
        }
        try: 
            user = User(data['username'], data['password'], data['email'], default_preferences)
            db.session.add(user)
            db.session.commit()
            return user
        except:
            db.session.rollback()
            raise ActionNotAllowed

    def get_one_by_username(username):
        try:
            user = db.session.execute(db.select(User).filter_by(user_name=username)).scalar_one()
            return user
        except:
            db.session.rollback()
            raise UserNotFound
    
    def get_one_by_id(id):
        try:
            user = db.session.execute(db.select(User).filter_by(id=id)).scalar_one()
            return user
        except:
            db.session.rollback()
            raise UserNotFound
    
    def get_one_by_token(token):
        try:
            token = Token.query.filter_by(token=token).first()
            user = User.get_one_by_id(token.user_id)

            return user
        except:
            db.session.rollback()
            raise Exception
          
    def set_preferences(token, data):
        user = User.get_one_by_token(token)
        postcode = data['postcode']
        preferences = data['preferences']
        user.postcode = postcode
        user.preferences = str(preferences)
        return user

    
    
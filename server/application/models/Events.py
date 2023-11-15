from application import db
import random, string
from application.models.Errors import EventNotFound, ActionNotAllowed

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    creator_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    postcode = db.Column(db.String(9), nullable=False)
    share_code = db.Column(db.String(250), nullable=True)
    date = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(250), nullable=True)
    title = db.Column(db.String(30), nullable=False)
    

    
    def __init__(self, creator_id, postcode, share_code, date, description, title):
        self.creator_id = creator_id
        self.postcode = postcode
        self.share_code = share_code
        self.date = date
        self.description = description
        self.title = title
        db.create_all()
    
    def __repr__(self):
        return (f"User {self.creator_id} created the event")
    
    
    def get_event_by_id(id):
        try:
            event =  db.session.execute(db.select(Event).filter_by(id=id)).scalar_one()
            return event
        except:
            db.session.rollback()
            raise ActionNotAllowed
    
    def create_event(user_id, data):
        try:
            share_code = Event.create_code(10)
            event = Event(user_id, data['postcode'], share_code, data['date'], data['description'], data['title'])
            print(user_id, data)
            db.session.add(event)
            db.session.commit()
            event_new = Event.get_event_by_id(event.id)
            return event_new
        except:
            db.session.rollback()
            raise ActionNotAllowed
    
    def create_code(length):
        code = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(length))
        print(code) 
        return code   
    
    def get_one_by_share(share_code):
        try: 
            event = db.session.execute(db.select(Event).filter_by(share_code=share_code)).scalar_one()
            event_new = Event.get_event_by_id(event.id)
            return event_new
        except: 
            db.session.rollback()
            raise EventNotFound
            
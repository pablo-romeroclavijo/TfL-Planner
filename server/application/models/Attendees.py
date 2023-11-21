from application import db
from application.models.Token import Token
from application.models.Errors import EventNotFound, AttendeeIsNotUnique, ActionNotAllowed



class Attendee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("event.id"), nullable=False)
    status = db.Column(db.String(20), nullable=True)
    ETA = db.Column(db.DateTime, nullable=True)
    route = db.Column(db.String(3000), nullable=True)
    suggested_departure = db.Column(db.DateTime, nullable=True)
    accepted = db.Column(db.Boolean, nullable = False)
    origin = db.Column(db.String(9), nullable=True)

    

    def __init__(self, user_id, event_id, status, ETA, route, suggested_departure, accepted, origin):
        self.user_id = user_id
        self.event_id = event_id 
        self.status = status
        self.ETA = ETA
        self.route = route
        self.suggested_departure = suggested_departure
        self.accepted = accepted 
        self.origin = origin
        db.create_all()
        
    def get_one_by_user(id):
        try:
            attendee =  db.session.execute(db.select(Attendee).filter_by(id=id)).scalar_one()
            return attendee
        except:
            db.session.rollback()
            raise ActionNotAllowed
    def get_one_by_user_and_event(user_id, event_id):
        print(event_id, user_id)
        try:
            attendee = db.session.execute(db.select(Attendee)
                .filter_by(user_id=user_id)
                .filter_by(event_id=event_id)).scalar_one()
            return attendee

        except:
            db.session.rollback()
            raise ActionNotAllowed
            
    def create_attendee(event_id, user_id):
        try:
            check_unique = Attendee.query.filter_by(event_id=event_id, user_id= user_id)
            if check_unique.count() > 0:
                raise AttendeeIsNotUnique
            
            attendee = Attendee(user_id, event_id, 'Pending', None, None, None, True, None)
            db.session.add(attendee)
            db.session.commit()
            return Attendee.get_one_by_user(attendee.id)
        
        except AttendeeIsNotUnique:
            db.session.rollback()
            raise AttendeeIsNotUnique
        except:
            db.session.rollback()
            raise ActionNotAllowed
        
    def set_route(self, journey):
        self.route = str(journey)
        self.origin = journey['origin']
        self.suggested_departure = journey['startDateTime']
        self.ETA = journey['arrivalDateTime']
        self.status = 'Journey Planned'
        db.session.commit()
        return self
        
        
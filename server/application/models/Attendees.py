from application import db
from application.models.Token import Token
from application.models.Errors import EventNotFound, AttendeeIsNotUnique, ActionNotAllowed

class Attendee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey("event.id"), nullable=False)
    status = db.Column(db.String(20), nullable=True)
    ETA = db.Column(db.Integer, nullable=False)
    route = db.Column(db.String(1000), nullable=True)
    suggested_departure = db.Column(db.String(10), nullable=False)
    accepted = db.Column(db.Boolean, nullable = False)
    origin = db.Column(db.String(9), nullable=False)
    

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

        
    def get_one_by_id(id):
        try:
            attendee =  db.session.execute(db.select(Attendee).filter_by(id=id)).scalar_one()
            return attendee
        except:
            db.session.rollback()
            raise ActionNotAllowed
        
    def create_attendee(event_id, user, data):
        try:
            check_unique = Attendee.query.filter_by(event_id=event_id, user_id= user.id)
            if check_unique.count() > 0:
                db.session.rollback()
                raise AttendeeIsNotUnique
            
            attendee = Attendee(user.id, event_id, 'Pending', 0, 'null', 'null', True, data['origin'])
            print(attendee)
            db.session.add(attendee)
            db.session.commit()
            return Attendee.get_one_by_id(attendee.id)
        except:
            db.session.rollback()
            raise ActionNotAllowed
        

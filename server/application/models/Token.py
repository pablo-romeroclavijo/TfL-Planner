from application import db
import uuid


class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    token = db.Column(db.String(36))
    
    def __init__(self, username):
        self.user_name = username
        self.token = uuid.uuid4()

    
    def __repr__(self):
        return (f"User {self.user_name} created")
    
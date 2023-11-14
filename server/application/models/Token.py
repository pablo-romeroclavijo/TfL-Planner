from application import db
import uuid


class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    token = db.Column(db.UUID)
    
    def __init__(self, user_id):
        self.user_id = user_id
        self.token = uuid.uuid4()

    
    def __repr__(self):
        return f"{self.user_id}, {self.token}"
    
    def create_token(user_id):
        token = Token(user_id)
        db.session.add(token)
        db.session.commit()
        return token
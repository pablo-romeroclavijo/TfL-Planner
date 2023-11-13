from application import db


class Token(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    token = db.Column(db.String(36))
    
    def __init__(self, username, postcode, password, email, remainder=30):
        self.user_name = username
        self.postcode = postcode
        self.password = password
        self.email = email
        self.remainder = remainder
    
    def __repr__(self):
        return (f"User {self.user_name} created")
    
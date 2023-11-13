from application import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(25), nullable=False)
    postcode = db.Column(db.String(9), nullable=False)
    password = db.Column(db.LargeBinary(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    remainder = db.Column(db.Integer, nullable=False)
    
    def __init__(self, username, postcode, password, email, remainder=30):
        self.user_name = username
        self.postcode = postcode
        self.password = password
        self.email = email
        self.remainder = remainder
    
    def __repr__(self):
        return (f"User {self.user_name} created")
    

    
    
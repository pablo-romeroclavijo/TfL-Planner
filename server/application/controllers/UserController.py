from application import db
from flask import request, jsonify
from application.models.User import User


def create_user(data):
    user = User(data['username'], data['postcode'], data['password'], data['email'], data['remainder'])
    db.session.add(user)
    db.session.commit()
    return user

def get_one_by_username(username):
    user = db.session.execute(db.select(User).filter_by(user_name=username)).scalar_one()
    return user
from flask import request, jsonify
import bcrypt
from ast import literal_eval
from application.models.User import User
from application.models.Token import Token
from application.models.Errors import AuthenticationError, UserNotFound

def format_user(user):
    return jsonify(
            id=user.id, 
            username=user.user_name, 
            postcode=user.postcode,
            email=user.email,
            remainder=user.remainder,
            preferences= literal_eval(user.preferences))

    
def create():
    try: 
        data = request.json
        
        bytes = data['password'].encode('utf-8')  
        salt = bcrypt.gensalt()
        hash = bcrypt.hashpw(bytes, salt)
        data['password'] = hash

        user = User.create_user(data)
        user_id = user.id
        token = Token.create_token(user_id)
        

        return jsonify(
            id=user.id, 
            username=user.user_name, 
            token=token.token), 201
    except:
        return 'Unable to create user', 400
    
def login():
    try: 
        data = request.json
        
        user = User.get_one_by_username(data['username'])
        password = user.password
        user_id = user.id

        userPassword =  data['password']
        userBytes = userPassword.encode('utf-8') 
        
        authenticated = bcrypt.checkpw(userBytes, password)
        print(authenticated)
        
        if(authenticated):
            token = Token.create_token(user_id)
            return jsonify(
                id=user.id, 
                username=user.user_name, 
                token=token.token), 200
        else:
            raise AuthenticationError
            
    except AuthenticationError:
        return 'Invalid credentials', 400
    except:
        return 'another error', 400

def logout():
    try:
        token = request.headers['Authorization']
        Token.destroy_token(token)
        return 'Token destroyed'
    except:
        return "Token not deleted", 400
    
def fetch_profile(username=None):
    try:
        user = None
        if(username != None):    ### uses username if it is passed as an argument
            user = User.get_one_by_username(username)
        else:            ### uses the token if username is not passed      
            token = request.headers['Authorization']
            user = User.get_one_by_token(token)

        return format_user(user)
    except UserNotFound:

        return 'Unable to find user', 404

def set_preferences():
    token = request.headers['Authorization']
    data = request.json
    user_update = User.set_preferences(token, data)
    print(user_update.preferences)
    return format_user(user_update)
       
    
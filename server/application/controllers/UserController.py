from application import db
from flask import request, jsonify
from application.models.User import User
from application.models.Token import Token
from application.models.Errors import AuthenticationError
import bcrypt

def create():
    try: 
        data = request.json
        
        bytes = data['password'].encode('utf-8')  
        salt = bcrypt.gensalt()
        hash = bcrypt.hashpw(bytes, salt)

        data['password'] = hash

        user = User.create_user(data)
        username = user.user_name
        token = Token(username)
        return jsonify(
            id=user.id, 
            username=user.user_name, 
            token=token.token)
    except:
        return 'Unable to create user', 400
    

def login():
    try: 
        data = request.json
        
        user = User.get_one_by_username(data['username'])
        password = user.password
        username = user.user_name

        userPassword =  data['password']
        userBytes = userPassword.encode('utf-8') 
        
        authenticated = bcrypt.checkpw(userBytes, password)
        print(authenticated)
        
        if(authenticated):
            token = Token(username)
            return jsonify(
                id=user.id, 
                username=user.user_name, 
                token=token.token)
        else:
            raise AuthenticationError
        
    except AuthenticationError:
        return ('Invalid credentials'
    except:
        return ('another error')
        
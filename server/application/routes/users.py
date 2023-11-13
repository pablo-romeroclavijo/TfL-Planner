from application import db
from flask import request, jsonify, Blueprint
import bcrypt

from application.models.User import User
import application.controllers.UserController as User_controller


users = Blueprint('users', __name__ )


@users.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@users.route("/user/register", methods=['POST'])
def create():
    data = request.json
    
    bytes = data['password'].encode('utf-8')  
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt)
    print(hash)
    data['password'] = hash
    print(data)
    user = User_controller.create_user(data)
    return jsonify(
        id=user.id, 
        username=user.user_name, 
        postcode=user.postcode, 
        email=user.email,
        remainder=user.remainder)

@users.route('/user/login', methods=['POST'])
def login():
    try:
        data = request.json
        
        user = User_controller.get_one_by_username(data['username'])
        password = user.password

        userPassword =  data['password']
        userBytes = userPassword.encode('utf-8') 
        
        authenticated = bcrypt.checkpw(userBytes, password)
        
        if(authenticated):
            token =  createToken()
            print (token)
            return jsonify(
                id=user.id, 
                username=user.user_name, 
                token=token)
        else:
            pass
    except:
        return('Incorrect password')
   
# # POST 
# @app.route("/characters", methods=["POST"])
# def create_character():
#     # Retrieved data from client
#     data = request.json
#     # Created a new character using the data
#     character = FriendsCharacter(data['name'], data['age'], data['catch_phrase'])
#     # Send character to datbase
#     db.session.add(character)
#     db.session.commit()
#     # Return JSON response back to the user/client
#     return jsonify(id=character.id, name=character.name, age=character.age, catch_phrase=character.catch_phrase)

# @app.route("/characters", methods=['GET'])
# def get_characters():
#     characters = FriendsCharacter.query.all()
#     character_list = []
#     for character in characters:
#         character_list.append(format_character(character))
#     return character_list

# # GET /:id
# @app.route('/characters/<id>')
# def get_character(id):
#     # filter_by
#     character = FriendsCharacter.query.filter_by(id=id).first()
#     return jsonify(id=character.id, name=character.name, age=character.age, catch_phrase=character.catch_phrase)

# # DELETE /:id
# @app.route("/characters/<id>", methods=['DELETE'])
# def delete_character(id):
#     character = FriendsCharacter.query.filter_by(id=id).first()
#     db.session.delete(character)
#     db.session.commit()
#     return f"Character deleted {id}"

# # PATCH /:id
# @app.route("/characters/<id>", methods=["PATCH"])
# def update_character(id):
#     character = FriendsCharacter.query.filter_by(id=id)
#     data = request.json
#     character.update(dict(name=data["name"], age=data["age"], catch_phrase=data["catch_phrase"]))
#     # Commit the change to the database
#     db.session.commit()
#     # Retrieve specific character from the filtering
#     updatedCharacter = character.first()
#     # Return JSON response to client 
#     return jsonify(id=updatedCharacter.id, name=updatedCharacter.name, age=updatedCharacter.age, catch_phrase=updatedCharacter.catch_phrase)

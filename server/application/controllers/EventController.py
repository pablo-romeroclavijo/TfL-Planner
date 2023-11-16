from flask import request, jsonify

from application.models.User import User
from application.models.Token import Token
from application.models.Events import Event
from application.models.Attendees import Attendee

from application.models.Errors import EventNotFound, AttendeeIsNotUnique
def format_event(event):
    return jsonify(
            id=event.id, 
            creator_id=event.creator_id, 
            postcode=event.postcode,
            date=event.date,
            description=event.description,
            title=event.title,
            share_code=event.share_code)
    
def format_attendee(attendee):
    return jsonify(
        user_id = attendee.user_id,
        event_id = attendee.event_id, 
        status = attendee.status,
        ETA = attendee.ETA,
        route = attendee.route,
        suggested_departure = attendee.suggested_departure,
        accepted = attendee.accepted,
        origin = attendee.origin
    )
    
def create():
    try: 
        token = request.headers['Authorization']
        
        data = request.json
        user_id = User.get_one_by_token(token).id
        print(user_id, 'user_id')
        
        event = Event.create_event(user_id, data)
        
        return format_event(event), 201
    except:
        return 'Unable to create event', 400
    
def get_event(share_code):
    try: 
        event = Event.get_one_by_share(share_code)
        return format_event(event), 200
    except EventNotFound:
        return "Event not found", 404
    except:
        return "General Error", 400
    
def join_event(share_code):
    try: 
        event_id = Event.get_one_by_share(share_code).id
        
        token = request.headers['Authorization']
        user = User.get_one_by_token(token)
        attendee = Attendee.create_attendee(event_id, user)
        return format_attendee(attendee), 201
        
    except EventNotFound:
        return "Event not found", 404
    except AttendeeIsNotUnique:
        return "You are already attending this event", 400
    except:
        return "attendee not created", 400
    
def set_route():
    data = request.json
    token = request.headers['Authorization']
    
         
    user_id = User.get_one_by_token(token).id
    event_id = data['event_id']
    journey = data['journey']
   
    
    attendee = Attendee.get_one_by_user_and_event(user_id, event_id)
    response = attendee.set_route(journey)
    return format_attendee(response)
    
    
    
    
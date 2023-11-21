from flask import request, jsonify
import json

from application.models.User import User
from application.models.Token import Token
from application.models.Events import Event
from application.models.Attendees import Attendee

from application.models.Errors import EventNotFound, AttendeeIsNotUnique, ActionNotAllowed
def format_event(event):
    return dict(
            id=event.id, 
            creator_id=event.creator_id, 
            postcode=event.postcode,
            date=event.date,
            description=event.description,
            title=event.title,
            share_code=event.share_code)
    
def format_attendee(attendee, username):
    return dict(
        user_id = attendee.user_id,
        event_id = attendee.event_id, 
        status = attendee.status,
        ETA = attendee.ETA,
        route = attendee.route,
        suggested_departure = attendee.suggested_departure,
        accepted = attendee.accepted,
        origin = attendee.origin,
        username = username
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
        attendee = Attendee.create_attendee(event_id, user.id)
        return format_attendee(attendee, user.user_name), 201
        
    except EventNotFound:
        return "Event not found", 404
    except AttendeeIsNotUnique:
        return "You are already attending this event", 400
    except:
        return "attendee not created", 400
    
def set_route():
    try:
        data = request.json
        token = request.headers['Authorization']
        
            
        user = User.get_one_by_token(token)
        event_id = data['event_id']
        journey = data['journey']
        status = data['status']
    
        
        attendee = Attendee.get_one_by_user_and_event(user.id, event_id)
        response = attendee.set_route(journey, status)
        return format_attendee(response, user.user_name)
    except:
        return 'Unable to add route', 400
    
def fetch_events():
    try:
        token = request.headers['Authorization']
        user_id = User.get_one_by_token(token).id
        
        events = Event.fetch_all(user_id)
        events_dicts = dict(events=[format_event(e) for e in events])

        return events_dicts
    
    except ActionNotAllowed:
        return "Unable to fetch Events", 400
    except:
        return 'General error', 400
    
def event_detailed(sharecode):
    try:
        event = Event.get_one_by_share(sharecode)
        attendees = Event.fetch_attendees(event.id)

        response = dict(event=format_event(event), attendees=[format_attendee(e, username) for e, username in attendees])
        return response
    
    except ActionNotAllowed:
        return "Unable to fetch Events", 400
    except:
        return 'General error', 400
    
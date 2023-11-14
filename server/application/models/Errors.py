class AuthenticationError(Exception):
    "Login Failed"
    pass

class UserNotFound(Exception):
    'User not found'
    pass

class EventNotFound(Exception):
    'Event not found'
    pass

class AttendeeIsNotUnique(Exception):
    'Attendde is not UNique'
    pass

class ActionNotAllowed(Exception):
    "action not allowed"
    pass
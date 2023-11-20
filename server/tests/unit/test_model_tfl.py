import pytest
from unittest.mock import patch, Mock
from application.models.TfL import TfL_Request

from application import db, create_app
from application.models.Token import Token
from flask import jsonify

mock_json_data= {
    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.ItineraryResult, Tfl.Api.Presentation.Entities",
    "journeys": [
        {
            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Journey, Tfl.Api.Presentation.Entities",
            "startDateTime": "2023-11-20T16:07:00",
            "duration": 46,
            "arrivalDateTime": "2023-11-20T16:53:00",
            "alternativeRoute": False,
            "legs": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 8,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "Walk to Camden Road Station",
                        "detailed": "Walk to Camden Road Station",
                        "steps": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "Rochester Square for 6 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "Rochester Square",
                                "distance": 6,
                                "cumulativeDistance": 6,
                                "skyDirection": 307,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 5,
                                "latitude": 51.543854495130006,
                                "longitude": -0.13568901088,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "for 16 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "",
                                "distance": 16,
                                "cumulativeDistance": 22,
                                "skyDirection": 310,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 19,
                                "latitude": 51.54389158678,
                                "longitude": -0.13575960351,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to Camden Road, continue for 317 metres",
                                "turnDirection": "LEFT",
                                "streetName": "Camden Road",
                                "distance": 317,
                                "cumulativeDistance": 339,
                                "skyDirection": 219,
                                "skyDirectionDescription": "SouthWest",
                                "cumulativeTravelTime": 304,
                                "latitude": 51.54398420124,
                                "longitude": -0.13592887938,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Turn left",
                                "trackType": "None"
                            }
                        ]
                    },
                    "obstacles": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "WALKWAY",
                            "incline": "LEVEL",
                            "stopId": 1001045,
                            "position": "IDEST"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "UP",
                            "stopId": 1001045,
                            "position": "IDEST"
                        }
                    ],
                    "departureTime": "2023-11-20T16:07:00",
                    "arrivalTime": "2023-11-20T16:15:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "platformName": "",
                        "icsCode": "99999997",
                        "commonName": "NW1 9HU",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54374871671,
                        "lon": -0.13582312947000003
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GCMDNRD",
                        "platformName": "",
                        "icsCode": "1001045",
                        "individualStopId": "9100CMDNRD0",
                        "commonName": "Camden Road Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54190310164,
                        "lon": -0.13908561754
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.54374871671, -0.13582312947],[51.54385449513, -0.13568901088],[51.54389158678, -0.13575960351],[51.54398420124, -0.13592887938],[51.54379061696, -0.13619638121],[51.54362376303, -0.13644836701],[51.54323659137, -0.13698335973],[51.54281278416, -0.13747657494],[51.54253808761, -0.13773295329],[51.54215669436, -0.13806578970],[51.54203271108, -0.13818621952],[51.54188176772, -0.13830774898],[51.54181078931, -0.13836833003],[51.54169556367, -0.13847397967],[51.54164255847, -0.13853382678],[51.54165129542, -0.13851898748],[51.54178908883, -0.13870090005],[51.54184069542, -0.13911698748]]",
                        "stopPoints": [],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "",
                            "directions": [
                                ""
                            ],
                            "direction": ""
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "walking",
                        "name": "walking",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "100",
                        "network": ""
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "distance": 339,
                    "isDisrupted": False,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:07:00",
                    "scheduledArrivalTime": "2023-11-20T16:15:00",
                    "interChangeDuration": "3",
                    "interChangePosition": "IDEST"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 5,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "London Overground to Highbury & Islington Rail Station",
                        "detailed": "London Overground towards Stratford",
                        "steps": []
                    },
                    "obstacles": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "UP",
                            "stopId": 1000108,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "DOWN",
                            "stopId": 1000108,
                            "position": "AFTER"
                        }
                    ],
                    "departureTime": "2023-11-20T16:15:00",
                    "arrivalTime": "2023-11-20T16:20:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GCMDNRD",
                        "platformName": "",
                        "icsCode": "1001045",
                        "individualStopId": "9100CMDNRD0",
                        "commonName": "Camden Road Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54190310164,
                        "lon": -0.13908561754
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GHGHI",
                        "platformName": "",
                        "icsCode": "1000108",
                        "individualStopId": "9100HIGHBYA2",
                        "commonName": "Highbury & Islington Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54586871203,
                        "lon": -0.10481488587
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.54183834786, -0.13911763525],[51.54175664072, -0.13835611881],[51.54107794653, -0.13186559551],[51.54103015091, -0.12943043159],[51.54103206921, -0.12729606852],[51.54111113077, -0.12605262812],[51.54120377247, -0.12509704299],[51.54155170666, -0.12267443317],[51.54273662757, -0.11805408434],[51.54335085150, -0.11553259493],[51.54335085150, -0.11553259493],[51.54407796676, -0.11254729030],[51.54444901671, -0.11101763084],[51.54493749521, -0.10896388277],[51.54589735183, -0.10482905703]]",
                        "stopPoints": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GCLDNNRB",
                                "name": "Caledonian Road & Barnsbury Rail Station",
                                "uri": "/StopPoint/910GCLDNNRB",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GHGHI",
                                "name": "Highbury & Islington Rail Station",
                                "uri": "/StopPoint/910GHGHI",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            }
                        ],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "London Overground",
                            "directions": [
                                "Stratford Rail Station"
                            ],
                            "lineIdentifier": {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "london-overground",
                                "name": "London Overground",
                                "uri": "/Line/london-overground",
                                "type": "Line",
                                "crowding": {
                                    "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
                                },
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            "direction": "Inbound"
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "overground",
                        "name": "overground",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "7",
                        "network": "nrc"
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "isDisrupted": False,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:15:00",
                    "scheduledArrivalTime": "2023-11-20T16:20:00",
                    "interChangeDuration": "4",
                    "interChangePosition": "AFTER"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 19,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "London Overground to Rotherhithe Rail Station",
                        "detailed": "London Overground towards Crystal Palace",
                        "steps": []
                    },
                    "obstacles": [],
                    "departureTime": "2023-11-20T16:25:00",
                    "arrivalTime": "2023-11-20T16:44:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GHGHI",
                        "platformName": "",
                        "icsCode": "1000108",
                        "individualStopId": "9100HIGBYA3",
                        "commonName": "Highbury & Islington Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.546030373309996,
                        "lon": -0.10424569214
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GRTHERHI",
                        "platformName": "",
                        "icsCode": "1000195",
                        "individualStopId": "9100RTHERHI2",
                        "commonName": "Rotherhithe Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.50099477335,
                        "lon": -0.052055312720000003
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.54603247211, -0.10424692736],[51.54624911227, -0.10331355767],[51.54726555370, -0.09888673560],[51.54741726481, -0.09826022606],[51.54843655725, -0.09402055726],[51.54862354843, -0.09288707338],[51.54862354843, -0.09288707338],[51.54873125247, -0.09223416960],[51.54889314020, -0.08947252819],[51.54894895075, -0.08737879406],[51.54889067432, -0.08601101467],[51.54876218188, -0.08419906317],[51.54844319853, -0.07953932301],[51.54825524442, -0.07794626065],[51.54809847316, -0.07715959347],[51.54793625507, -0.07658950819],[51.54770403460, -0.07613776455],[51.54729090405, -0.07562154425],[51.54699080920, -0.07541786449],[51.54652044695, -0.07525021860],[51.54608744599, -0.07516815850],[51.54608744599, -0.07516815850],[51.54589802654, -0.07513226117],[51.54481990505, -0.07519218335],[51.54359894799, -0.07531581643],[51.54095531429, -0.07532641455],[51.53852145530, -0.07551754824],[51.53852145530, -0.07551754824],[51.53659055923, -0.07566916665],[51.53549469928, -0.07574422527],[51.53162703181, -0.07568497947],[51.53162703181, -0.07568497947],[51.53123115708, -0.07567891545],[51.53071988103, -0.07575814643],[51.53035356801, -0.07590335089],[51.53008681349, -0.07608760794],[51.52930711914, -0.07679808852],[51.52899779313, -0.07712830114],[51.52874262038, -0.07747064491],[51.52826656481, -0.07805295854],[51.52791183122, -0.07835623321],[51.52753700015, -0.07853059916],[51.52687295330, -0.07861622216],[51.52435511926, -0.07862130342],[51.52410066918, -0.07845902749],[51.52387081776, -0.07815156261],[51.52366461952, -0.07764128848],[51.52350240627, -0.07707150440],[51.52342792770, -0.07636828880],[51.52342757359, -0.07633948499],[51.52342757359, -0.07633948499],[51.52340098385, -0.07417828865],[51.52335297381, -0.07344513121],[51.52306631934, -0.07132377065],[51.52220774574, -0.06451292085],[51.52211498189, -0.06379610510],[51.52196216405, -0.06325481964],[51.52167264604, -0.06260402056],[51.52132164853, -0.06204232822],[51.51951850962, -0.05959673941],[51.51951850962, -0.05959673941],[51.51806521511, -0.05762583201],[51.51743490447, -0.05703286755],[51.51701771853, -0.05682000780],[51.51486475144, -0.05659455727],[51.51277620074, -0.05700051332],[51.51129826656, -0.05680262255],[51.51129826656, -0.05680262255],[51.51016254656, -0.05665056107],[51.50541087278, -0.05643486019],[51.50490501609, -0.05629788030],[51.50472276252, -0.05620907630],[51.50472276252, -0.05620907630],[51.50446985609, -0.05608584751],[51.50414133752, -0.05579723306],[51.50188389522, -0.05306922668],[51.50113267623, -0.05223674116],[51.50096850903, -0.05211507945]]",
                        "stopPoints": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GCNNB",
                                "name": "Canonbury Rail Station",
                                "uri": "/StopPoint/910GCNNB",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GDALS",
                                "name": "Dalston Junction Rail Station",
                                "uri": "/StopPoint/910GDALS",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GHAGGERS",
                                "name": "Haggerston Rail Station",
                                "uri": "/StopPoint/910GHAGGERS",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GHOXTON",
                                "name": "Hoxton Rail Station",
                                "uri": "/StopPoint/910GHOXTON",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GSHRDHST",
                                "name": "Shoreditch High Street Rail Station",
                                "uri": "/StopPoint/910GSHRDHST",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GWCHAPEL",
                                "name": "Whitechapel Rail Station",
                                "uri": "/StopPoint/910GWCHAPEL",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GSHADWEL",
                                "name": "Shadwell Rail Station",
                                "uri": "/StopPoint/910GSHADWEL",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GWAPPING",
                                "name": "Wapping Rail Station",
                                "uri": "/StopPoint/910GWAPPING",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GRTHERHI",
                                "name": "Rotherhithe Rail Station",
                                "uri": "/StopPoint/910GRTHERHI",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            }
                        ],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "London Overground",
                            "directions": [
                                "Crystal Palace Rail Station"
                            ],
                            "lineIdentifier": {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "london-overground",
                                "name": "London Overground",
                                "uri": "/Line/london-overground",
                                "type": "Line",
                                "crowding": {
                                    "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
                                },
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            "direction": "Outbound"
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "overground",
                        "name": "overground",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "7",
                        "network": "nrc"
                    },
                    "disruptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
                            "category": "Information",
                            "type": "stopInfo",
                            "categoryDescription": "Information",
                            "description": "ROTHERHITHE STATION: This station has short platforms. Customers are advised to travel in the front 4 coaches and listen to on-board announcements.",
                            "summary": "",
                            "additionalInfo": "",
                            "created": "2021-04-08T10:02:00",
                            "lastUpdate": "2021-04-08T10:03:00"
                        }
                    ],
                    "plannedWorks": [],
                    "isDisrupted": True,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:25:00",
                    "scheduledArrivalTime": "2023-11-20T16:45:00"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 9,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "Walk to SE16 4JB",
                        "detailed": "Walk to SE16 4JB",
                        "steps": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "Brunel Road for 174 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "Brunel Road",
                                "distance": 174,
                                "cumulativeDistance": 174,
                                "skyDirection": 229,
                                "skyDirectionDescription": "SouthWest",
                                "cumulativeTravelTime": 157,
                                "latitude": 51.50066084667,
                                "longitude": -0.051983102489999995,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to Rupack Street, continue for 50 metres",
                                "turnDirection": "RIGHT",
                                "streetName": "Rupack Street",
                                "distance": 50,
                                "cumulativeDistance": 224,
                                "skyDirection": 330,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 201,
                                "latitude": 51.49964927697,
                                "longitude": -0.05388485772,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Turn right",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to St Marychurch Street, continue for 76 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "St Marychurch Street",
                                "distance": 76,
                                "cumulativeDistance": 300,
                                "skyDirection": 320,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 269,
                                "latitude": 51.500041659539995,
                                "longitude": -0.054228342859999994,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            }
                        ]
                    },
                    "obstacles": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "UP",
                            "stopId": 1000195,
                            "position": "BEFORE"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "ESCALATOR",
                            "incline": "UP",
                            "stopId": 1000195,
                            "position": "BEFORE"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "WALKWAY",
                            "incline": "LEVEL",
                            "stopId": 1000195,
                            "position": "BEFORE"
                        }
                    ],
                    "departureTime": "2023-11-20T16:44:00",
                    "arrivalTime": "2023-11-20T16:53:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GRTHERHI",
                        "platformName": "",
                        "icsCode": "1000195",
                        "individualStopId": "9100RTHERHI2",
                        "commonName": "Rotherhithe Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.50099477335,
                        "lon": -0.052055312720000003
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.Place, Tfl.Api.Presentation.Entities",
                        "commonName": "SE16 4JB",
                        "placeType": "StopPoint",
                        "lat": 51.50064191973,
                        "lon": -0.05463502216
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.50096879539, -0.05211408747],[51.50081433063, -0.05201978227],[51.50086189264, -0.05217624533],[51.50066089539, -0.05198308747],[51.50066084667, -0.05198310249],[51.50052161032, -0.05226279543],[51.50010294102, -0.05304427262],[51.49984076214, -0.05350209331],[51.49964927697, -0.05388485772],[51.50004165954, -0.05422834286],[51.50038155655, -0.05466051775],[51.50062561903, -0.05473657381],[51.50064191973, -0.05463502216]]",
                        "stopPoints": [],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "",
                            "directions": [
                                ""
                            ],
                            "direction": ""
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "walking",
                        "name": "walking",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "100",
                        "network": ""
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "distance": 300,
                    "isDisrupted": False,
                    "hasFixedLocations": False,
                    "scheduledDepartureTime": "2023-11-20T16:45:00",
                    "scheduledArrivalTime": "2023-11-20T16:54:00",
                    "interChangeDuration": "4",
                    "interChangePosition": "BEFORE"
                }
            ]
        },
        {
            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Journey, Tfl.Api.Presentation.Entities",
            "startDateTime": "2023-11-20T16:11:00",
            "duration": 54,
            "arrivalDateTime": "2023-11-20T17:05:00",
            "alternativeRoute": False,
            "legs": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 5,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "Walk to Camden Road Station",
                        "detailed": "Walk to Camden Road Station",
                        "steps": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "Rochester Square for 6 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "Rochester Square",
                                "distance": 6,
                                "cumulativeDistance": 6,
                                "skyDirection": 307,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 5,
                                "latitude": 51.543854495130006,
                                "longitude": -0.13568901088,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "for 16 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "",
                                "distance": 16,
                                "cumulativeDistance": 22,
                                "skyDirection": 310,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 19,
                                "latitude": 51.54389158678,
                                "longitude": -0.13575960351,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to Camden Road, continue for 295 metres",
                                "turnDirection": "LEFT",
                                "streetName": "Camden Road",
                                "distance": 295,
                                "cumulativeDistance": 317,
                                "skyDirection": 219,
                                "skyDirectionDescription": "SouthWest",
                                "cumulativeTravelTime": 285,
                                "latitude": 51.54398420124,
                                "longitude": -0.13592887938,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Turn left",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to Royal College Street, continue for 5 metres",
                                "turnDirection": "SLIGHT_LEFT",
                                "streetName": "Royal College Street",
                                "distance": 5,
                                "cumulativeDistance": 322,
                                "skyDirection": 148,
                                "skyDirectionDescription": "SouthEast",
                                "cumulativeTravelTime": 290,
                                "latitude": 51.54181078931,
                                "longitude": -0.13836833003000001,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Take a slight left",
                                "trackType": "None"
                            }
                        ]
                    },
                    "obstacles": [],
                    "departureTime": "2023-11-20T16:11:00",
                    "arrivalTime": "2023-11-20T16:16:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "platformName": "",
                        "icsCode": "99999997",
                        "commonName": "NW1 9HU",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54374871671,
                        "lon": -0.13582312947000003
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "490G01045G",
                        "platformName": "F",
                        "icsCode": "1001045",
                        "commonName": "Camden Road Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54176562737,
                        "lon": -0.13835575206
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.54374871671, -0.13582312947],[51.54385449513, -0.13568901088],[51.54389158678, -0.13575960351],[51.54398420124, -0.13592887938],[51.54379061696, -0.13619638121],[51.54362376303, -0.13644836701],[51.54323659137, -0.13698335973],[51.54281278416, -0.13747657494],[51.54253808761, -0.13773295329],[51.54215669436, -0.13806578970],[51.54203271108, -0.13818621952],[51.54188176772, -0.13830774898],[51.54181078931, -0.13836833003],[51.54177415663, -0.13832656186]]",
                        "stopPoints": [],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "",
                            "directions": [
                                ""
                            ],
                            "direction": ""
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "walking",
                        "name": "walking",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "100",
                        "network": ""
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "distance": 322,
                    "isDisrupted": False,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:11:00",
                    "scheduledArrivalTime": "2023-11-20T16:16:00"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 5,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "29 bus to Mornington Crescent Station",
                        "detailed": "29 bus towards Trafalgar Square",
                        "steps": []
                    },
                    "obstacles": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "WALKWAY",
                            "incline": "LEVEL",
                            "stopId": 1000152,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "WALKWAY",
                            "incline": "LEVEL",
                            "stopId": 1000152,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "LIFT",
                            "incline": "DOWN",
                            "stopId": 1000152,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "DOWN",
                            "stopId": 1000152,
                            "position": "AFTER"
                        }
                    ],
                    "departureTime": "2023-11-20T16:16:00",
                    "arrivalTime": "2023-11-20T16:21:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "490G01045G",
                        "platformName": "F",
                        "stopLetter": "F",
                        "icsCode": "1001045",
                        "individualStopId": "490001045F",
                        "commonName": "Camden Road Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54229682078,
                        "lon": -0.13782933045
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "490G00152G",
                        "platformName": "C",
                        "stopLetter": "C",
                        "icsCode": "1000152",
                        "individualStopId": "490000152C",
                        "commonName": "Mornington Crescent Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.53344283979,
                        "lon": -0.13862323864
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.54232625690, -0.13791781571],[51.54215669436, -0.13806578970],[51.54203271108, -0.13818621952],[51.54188176772, -0.13830774898],[51.54181078931, -0.13836833003],[51.54169556367, -0.13847397967],[51.54158056658, -0.13859404045],[51.54111966251, -0.13901663134],[51.54108417311, -0.13904692082],[51.54068617388, -0.13946693682],[51.54050408138, -0.13989256234],[51.54002763254, -0.14103678848],[51.53982973192, -0.14139581694],[51.53982973192, -0.14139581694],[51.53967798359, -0.14167111306],[51.53955353986, -0.14176270436],[51.53914366078, -0.14143331448],[51.53846837176, -0.14081192464],[51.53825825249, -0.14060418830],[51.53767351132, -0.14002239009],[51.53754587015, -0.13991223606],[51.53715155092, -0.13954368675],[51.53715155092, -0.13954368675],[51.53618582941, -0.13864110905],[51.53510040811, -0.13767606275],[51.53475342453, -0.13734417299],[51.53454248266, -0.13821791042],[51.53451202404, -0.13856520348],[51.53444721791, -0.13901482819],[51.53416170186, -0.13915624090],[51.53392850569, -0.13919458823],[51.53372737035, -0.13898651303],[51.53343363751, -0.13865388107]]",
                        "stopPoints": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "490G00036N",
                                "name": "Camden Town Station  / Bayham Street",
                                "uri": "/StopPoint/490G00036N",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "490G00011168",
                                "name": "Pratt Street",
                                "uri": "/StopPoint/490G00011168",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "490G00152G",
                                "name": "Mornington Crescent Station",
                                "uri": "/StopPoint/490G00152G",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            }
                        ],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "29",
                            "directions": [
                                "Trafalgar Square"
                            ],
                            "lineIdentifier": {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "29",
                                "name": "29",
                                "uri": "/Line/29",
                                "type": "Line",
                                "crowding": {
                                    "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
                                },
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            "direction": "Outbound"
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "bus",
                        "name": "bus",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "3",
                        "network": "tfl"
                    },
                    "disruptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
                            "category": "PlannedWork",
                            "type": "lineInfo",
                            "categoryDescription": "PlannedWork",
                            "description": "TRAFALGAR SQUARE, SW1: Buses are on curtailment until 17:30 on Monday 20 November due to Thames Water works. Routes 12 159 are curtailed to Parliament Square. Route 29 is curtailed to Warren Street Station. Routes N18 N97 N113 are curtailed to Piccadilly Circus.",
                            "summary": "CE23/46989/B - TRAFALGAR SQUARE, SW1 - ROUTES 12 29 159 N18 N97 N113",
                            "additionalInfo": "",
                            "created": "2023-11-16T14:53:00",
                            "lastUpdate": "2023-11-16T14:55:00"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
                            "category": "RealTime",
                            "type": "lineInfo",
                            "categoryDescription": "RealTime",
                            "description": "WHITEHALL, W1C: Route 29 is starting and terminating at Warren Street Station due to emergency Thames Water works. Buses will not be serving remaining stops from/to Trafalgar Square.",
                            "summary": "NMCC - CE23/46989/A- WHITEHALL, W1C - ROUTE 29",
                            "additionalInfo": "",
                            "created": "2023-11-14T09:19:00",
                            "lastUpdate": "2023-11-16T13:21:00"
                        }
                    ],
                    "plannedWorks": [],
                    "isDisrupted": True,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:16:00",
                    "scheduledArrivalTime": "2023-11-20T16:21:00",
                    "interChangeDuration": "6",
                    "interChangePosition": "AFTER"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 10,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "Northern line to Waterloo",
                        "detailed": "Northern line towards Battersea Power Station via Charing Cross",
                        "steps": []
                    },
                    "obstacles": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "UP",
                            "stopId": 1000254,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "WALKWAY",
                            "incline": "LEVEL",
                            "stopId": 1000254,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "ESCALATOR",
                            "incline": "DOWN",
                            "stopId": 1000254,
                            "position": "AFTER"
                        }
                    ],
                    "departureTime": "2023-11-20T16:29:00",
                    "arrivalTime": "2023-11-20T16:39:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "940GZZLUMTC",
                        "platformName": "",
                        "icsCode": "1000152",
                        "individualStopId": "9400ZZLUMTC1",
                        "commonName": "Mornington Crescent Underground Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.53436869473,
                        "lon": -0.1385998881
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "940GZZLUWLO",
                        "platformName": "",
                        "icsCode": "1000254",
                        "individualStopId": "9400ZZLUWLO3",
                        "commonName": "Waterloo Underground Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.503374829209996,
                        "lon": -0.11348036186999999
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.53436924498, -0.13859814632],[51.53416824435, -0.13843504155],[51.53307847440, -0.13719627121],[51.53002288741, -0.13391850658],[51.52956920002, -0.13366313116],[51.52920904653, -0.13363460854],[51.52876223570, -0.13381146755],[51.52834398876, -0.13408807281],[51.52820258091, -0.13426594049],[51.52820258091, -0.13426594049],[51.52796489550, -0.13456490612],[51.52769409817, -0.13506613933],[51.52659742310, -0.13792212169],[51.52641350529, -0.13823236537],[51.52612128928, -0.13851819112],[51.52574613507, -0.13867765128],[51.52536640855, -0.13854897780],[51.52453833160, -0.13793404580],[51.52426728202, -0.13775209637],[51.52426728202, -0.13775209637],[51.52364757359, -0.13733610884],[51.52079010637, -0.13464188965],[51.52065255322, -0.13448944900],[51.52065255322, -0.13448944900],[51.52011272039, -0.13389120047],[51.51706140767, -0.13088824152],[51.51654388896, -0.13057792637],[51.51594735271, -0.13041926318],[51.51594735271, -0.13041926318],[51.51583948663, -0.13039057402],[51.51385717305, -0.12957818072],[51.51194360605, -0.12859202804],[51.51194360605, -0.12859202804],[51.51186242040, -0.12855019106],[51.51095453931, -0.12857298551],[51.51036925821, -0.12852491425],[51.51007040073, -0.12839305086],[51.50976048788, -0.12813194364],[51.50946578906, -0.12769728583],[51.50925081867, -0.12718731020],[51.50881604180, -0.12558825255],[51.50881604180, -0.12558825255],[51.50869669107, -0.12514931399],[51.50845474988, -0.12464046618],[51.50754848947, -0.12307813893],[51.50726881517, -0.12251430869],[51.50726881517, -0.12251430869],[51.50709316128, -0.12216019243],[51.50505710740, -0.11575962921],[51.50481489482, -0.11523647240],[51.50437150269, -0.11450548536],[51.50406017068, -0.11415810701],[51.50332402965, -0.11366926841]]",
                        "stopPoints": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLUEUS",
                                "name": "Euston Underground Station",
                                "uri": "/StopPoint/940GZZLUEUS",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLUWRR",
                                "name": "Warren Street Underground Station",
                                "uri": "/StopPoint/940GZZLUWRR",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLUGDG",
                                "name": "Goodge Street Underground Station",
                                "uri": "/StopPoint/940GZZLUGDG",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLUTCR",
                                "name": "Tottenham Court Road Underground Station",
                                "uri": "/StopPoint/940GZZLUTCR",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLULSQ",
                                "name": "Leicester Square Underground Station",
                                "uri": "/StopPoint/940GZZLULSQ",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLUCHX",
                                "name": "Charing Cross Underground Station",
                                "uri": "/StopPoint/940GZZLUCHX",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLUEMB",
                                "name": "Embankment Underground Station",
                                "uri": "/StopPoint/940GZZLUEMB",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLUWLO",
                                "name": "Waterloo Underground Station",
                                "uri": "/StopPoint/940GZZLUWLO",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            }
                        ],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "Northern",
                            "directions": [
                                "Battersea Power Station Underground Station via Charing Cross"
                            ],
                            "lineIdentifier": {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "northern",
                                "name": "Northern",
                                "uri": "/Line/northern",
                                "type": "Line",
                                "crowding": {
                                    "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
                                },
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            "direction": "Inbound"
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "tube",
                        "name": "tube",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "1",
                        "network": "tfl"
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "isDisrupted": False,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:29:00",
                    "scheduledArrivalTime": "2023-11-20T16:39:00",
                    "interChangeDuration": "6",
                    "interChangePosition": "AFTER"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 6,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "Jubilee line to Bermondsey",
                        "detailed": "Jubilee line towards Stratford",
                        "steps": []
                    },
                    "obstacles": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "ESCALATOR",
                            "incline": "UP",
                            "stopId": 1000021,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "UP",
                            "stopId": 1000021,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "WALKWAY",
                            "incline": "LEVEL",
                            "stopId": 1000021,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "WALKWAY",
                            "incline": "LEVEL",
                            "stopId": 1000021,
                            "position": "AFTER"
                        }
                    ],
                    "departureTime": "2023-11-20T16:46:00",
                    "arrivalTime": "2023-11-20T16:52:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "940GZZLUWLO",
                        "platformName": "",
                        "icsCode": "1000254",
                        "individualStopId": "9400ZZLUWLO4",
                        "commonName": "Waterloo Underground Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.5033314699,
                        "lon": -0.11302106599
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "940GZZLUBMY",
                        "platformName": "",
                        "icsCode": "1000021",
                        "individualStopId": "9400ZZLUBMY1",
                        "commonName": "Bermondsey Underground Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.497866062629996,
                        "lon": -0.06404595188000001
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.50334021841, -0.11302050919],[51.50398263164, -0.11045815326],[51.50426791493, -0.10863078532],[51.50435391644, -0.10727275108],[51.50429110535, -0.10537316395],[51.50429110535, -0.10537316395],[51.50407247951, -0.09876857033],[51.50422182312, -0.09577963589],[51.50438855388, -0.09441820863],[51.50474304808, -0.09299129443],[51.50495951359, -0.09247792400],[51.50527608232, -0.09148484980],[51.50575025274, -0.08967822607],[51.50586158486, -0.08823258959],[51.50583317843, -0.08785973200],[51.50583317843, -0.08785973200],[51.50573572781, -0.08658073472],[51.50557902064, -0.08579476516],[51.50492692900, -0.08440996133],[51.50459565509, -0.08394834396],[51.50396382690, -0.08325438721],[51.50364153499, -0.08279241071],[51.50241104354, -0.08013521531],[51.49813794116, -0.07236190935],[51.49776262631, -0.07141245720],[51.49751098093, -0.07032813269],[51.49747262778, -0.06909073433],[51.49751371545, -0.06776353502],[51.49766872544, -0.06571114880],[51.49787763214, -0.06406074665]]",
                        "stopPoints": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLUSWK",
                                "name": "Southwark Underground Station",
                                "uri": "/StopPoint/940GZZLUSWK",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLULNB",
                                "name": "London Bridge Underground Station",
                                "uri": "/StopPoint/940GZZLULNB",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "940GZZLUBMY",
                                "name": "Bermondsey Underground Station",
                                "uri": "/StopPoint/940GZZLUBMY",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            }
                        ],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "Jubilee",
                            "directions": [
                                "Stratford Underground Station"
                            ],
                            "lineIdentifier": {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "jubilee",
                                "name": "Jubilee",
                                "uri": "/Line/jubilee",
                                "type": "Line",
                                "crowding": {
                                    "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
                                },
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            "direction": "Outbound"
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "tube",
                        "name": "tube",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "1",
                        "network": "tfl"
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "isDisrupted": False,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:45:00",
                    "scheduledArrivalTime": "2023-11-20T16:50:00",
                    "interChangeDuration": "6",
                    "interChangePosition": "AFTER"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 5,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "C10 bus to Rotherhithe Tunnel",
                        "detailed": "C10 bus towards Canada Water Bus Station",
                        "steps": []
                    },
                    "obstacles": [],
                    "departureTime": "2023-11-20T16:57:00",
                    "arrivalTime": "2023-11-20T17:02:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "490G00021W",
                        "platformName": "D",
                        "stopLetter": "D",
                        "icsCode": "1000021",
                        "individualStopId": "490012729D",
                        "commonName": "Bermondsey Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.49808823355,
                        "lon": -0.06552049889
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "490G000729",
                        "platformName": "U",
                        "stopLetter": "U",
                        "icsCode": "1011724",
                        "individualStopId": "490011724N",
                        "commonName": "Rotherhithe Tunnel",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.49959616772,
                        "lon": -0.0544778436
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.49805678310, -0.06552258726],[51.49810117710, -0.06466991446],[51.49819760611, -0.06397427306],[51.49826165206, -0.06349611318],[51.49834837423, -0.06275765589],[51.49838046569, -0.06249713618],[51.49838046569, -0.06249713618],[51.49841973618, -0.06217832983],[51.49853174289, -0.06133794168],[51.49863618589, -0.06058431586],[51.49869170793, -0.06013532353],[51.49876942248, -0.05939723518],[51.49883082810, -0.05876069074],[51.49886176798, -0.05845681543],[51.49899974492, -0.05708189113],[51.49899974492, -0.05708189113],[51.49900842340, -0.05699540543],[51.49910329127, -0.05566585955],[51.49913780411, -0.05557794423],[51.49945089165, -0.05547817146],[51.49957096943, -0.05512727130],[51.49959131424, -0.05447851901]]",
                        "stopPoints": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "490G00006202",
                                "name": "Drummond Road",
                                "uri": "/StopPoint/490G00006202",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "490G00012349",
                                "name": "Southwark Park",
                                "uri": "/StopPoint/490G00012349",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "490G000729",
                                "name": "Rotherhithe Tunnel",
                                "uri": "/StopPoint/490G000729",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            }
                        ],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "C10",
                            "directions": [
                                "Canada Water Bus Station"
                            ],
                            "lineIdentifier": {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "c10",
                                "name": "C10",
                                "uri": "/Line/c10",
                                "type": "Line",
                                "crowding": {
                                    "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
                                },
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            "direction": "Inbound"
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "bus",
                        "name": "bus",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "3",
                        "network": "tfl"
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "isDisrupted": False,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:50:00",
                    "scheduledArrivalTime": "2023-11-20T16:54:00"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 3,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "Walk to SE16 4JB",
                        "detailed": "Walk to SE16 4JB",
                        "steps": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "Brunel Road for 43 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "Brunel Road",
                                "distance": 43,
                                "cumulativeDistance": 43,
                                "skyDirection": 86,
                                "skyDirectionDescription": "East",
                                "cumulativeTravelTime": 40,
                                "latitude": 51.49958718145,
                                "longitude": -0.0544782263,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to Rupack Street, continue for 50 metres",
                                "turnDirection": "LEFT",
                                "streetName": "Rupack Street",
                                "distance": 50,
                                "cumulativeDistance": 93,
                                "skyDirection": 330,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 84,
                                "latitude": 51.49964927697,
                                "longitude": -0.05388485772,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Turn left",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to St Marychurch Street, continue for 76 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "St Marychurch Street",
                                "distance": 76,
                                "cumulativeDistance": 169,
                                "skyDirection": 320,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 152,
                                "latitude": 51.500041659539995,
                                "longitude": -0.054228342859999994,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            }
                        ]
                    },
                    "obstacles": [],
                    "departureTime": "2023-11-20T17:02:00",
                    "arrivalTime": "2023-11-20T17:05:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "490G000729",
                        "platformName": "U",
                        "stopLetter": "U",
                        "icsCode": "1011724",
                        "individualStopId": "490011724N",
                        "commonName": "Rotherhithe Tunnel",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.49959616772,
                        "lon": -0.0544778436
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.Place, Tfl.Api.Presentation.Entities",
                        "commonName": "SE16 4JB",
                        "placeType": "StopPoint",
                        "lat": 51.50064191973,
                        "lon": -0.05463502216
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.49958718145, -0.05447822630],[51.49960625699, -0.05400195350],[51.49964927697, -0.05388485772],[51.50004165954, -0.05422834286],[51.50038155655, -0.05466051775],[51.50062561903, -0.05473657381],[51.50064191973, -0.05463502216]]",
                        "stopPoints": [],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "",
                            "directions": [
                                ""
                            ],
                            "direction": ""
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "walking",
                        "name": "walking",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "100",
                        "network": ""
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "distance": 169,
                    "isDisrupted": False,
                    "hasFixedLocations": False,
                    "scheduledDepartureTime": "2023-11-20T16:54:00",
                    "scheduledArrivalTime": "2023-11-20T16:57:00"
                }
            ]
        },
        {
            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Journey, Tfl.Api.Presentation.Entities",
            "startDateTime": "2023-11-20T16:21:00",
            "duration": 47,
            "arrivalDateTime": "2023-11-20T17:08:00",
            "alternativeRoute": False,
            "legs": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 8,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "Walk to Camden Road Station",
                        "detailed": "Walk to Camden Road Station",
                        "steps": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "Rochester Square for 6 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "Rochester Square",
                                "distance": 6,
                                "cumulativeDistance": 6,
                                "skyDirection": 307,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 5,
                                "latitude": 51.543854495130006,
                                "longitude": -0.13568901088,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "for 16 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "",
                                "distance": 16,
                                "cumulativeDistance": 22,
                                "skyDirection": 310,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 19,
                                "latitude": 51.54389158678,
                                "longitude": -0.13575960351,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to Camden Road, continue for 317 metres",
                                "turnDirection": "LEFT",
                                "streetName": "Camden Road",
                                "distance": 317,
                                "cumulativeDistance": 339,
                                "skyDirection": 219,
                                "skyDirectionDescription": "SouthWest",
                                "cumulativeTravelTime": 304,
                                "latitude": 51.54398420124,
                                "longitude": -0.13592887938,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Turn left",
                                "trackType": "None"
                            }
                        ]
                    },
                    "obstacles": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "WALKWAY",
                            "incline": "LEVEL",
                            "stopId": 1001045,
                            "position": "IDEST"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "UP",
                            "stopId": 1001045,
                            "position": "IDEST"
                        }
                    ],
                    "departureTime": "2023-11-20T16:21:00",
                    "arrivalTime": "2023-11-20T16:29:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "platformName": "",
                        "icsCode": "99999997",
                        "commonName": "NW1 9HU",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54374871671,
                        "lon": -0.13582312947000003
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GCMDNRD",
                        "platformName": "",
                        "icsCode": "1001045",
                        "individualStopId": "9100CMDNRD0",
                        "commonName": "Camden Road Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54190310164,
                        "lon": -0.13908561754
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.54374871671, -0.13582312947],[51.54385449513, -0.13568901088],[51.54389158678, -0.13575960351],[51.54398420124, -0.13592887938],[51.54379061696, -0.13619638121],[51.54362376303, -0.13644836701],[51.54323659137, -0.13698335973],[51.54281278416, -0.13747657494],[51.54253808761, -0.13773295329],[51.54215669436, -0.13806578970],[51.54203271108, -0.13818621952],[51.54188176772, -0.13830774898],[51.54181078931, -0.13836833003],[51.54169556367, -0.13847397967],[51.54164255847, -0.13853382678],[51.54165129542, -0.13851898748],[51.54178908883, -0.13870090005],[51.54184069542, -0.13911698748]]",
                        "stopPoints": [],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "",
                            "directions": [
                                ""
                            ],
                            "direction": ""
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "walking",
                        "name": "walking",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "100",
                        "network": ""
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "distance": 339,
                    "isDisrupted": False,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:21:00",
                    "scheduledArrivalTime": "2023-11-20T16:29:00",
                    "interChangeDuration": "3",
                    "interChangePosition": "IDEST"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 5,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "London Overground to Highbury & Islington Rail Station",
                        "detailed": "London Overground towards Stratford",
                        "steps": []
                    },
                    "obstacles": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "UP",
                            "stopId": 1000108,
                            "position": "AFTER"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "DOWN",
                            "stopId": 1000108,
                            "position": "AFTER"
                        }
                    ],
                    "departureTime": "2023-11-20T16:29:00",
                    "arrivalTime": "2023-11-20T16:34:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GCMDNRD",
                        "platformName": "",
                        "icsCode": "1001045",
                        "individualStopId": "9100CMDNRD0",
                        "commonName": "Camden Road Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54190310164,
                        "lon": -0.13908561754
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GHGHI",
                        "platformName": "",
                        "icsCode": "1000108",
                        "individualStopId": "9100HIGHBYA2",
                        "commonName": "Highbury & Islington Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.54586871203,
                        "lon": -0.10481488587
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.54183834786, -0.13911763525],[51.54175664072, -0.13835611881],[51.54107794653, -0.13186559551],[51.54103015091, -0.12943043159],[51.54103206921, -0.12729606852],[51.54111113077, -0.12605262812],[51.54120377247, -0.12509704299],[51.54155170666, -0.12267443317],[51.54273662757, -0.11805408434],[51.54335085150, -0.11553259493],[51.54335085150, -0.11553259493],[51.54407796676, -0.11254729030],[51.54444901671, -0.11101763084],[51.54493749521, -0.10896388277],[51.54589735183, -0.10482905703]]",
                        "stopPoints": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GCLDNNRB",
                                "name": "Caledonian Road & Barnsbury Rail Station",
                                "uri": "/StopPoint/910GCLDNNRB",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GHGHI",
                                "name": "Highbury & Islington Rail Station",
                                "uri": "/StopPoint/910GHGHI",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            }
                        ],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "London Overground",
                            "directions": [
                                "Stratford Rail Station"
                            ],
                            "lineIdentifier": {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "london-overground",
                                "name": "London Overground",
                                "uri": "/Line/london-overground",
                                "type": "Line",
                                "crowding": {
                                    "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
                                },
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            "direction": "Inbound"
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "overground",
                        "name": "overground",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "7",
                        "network": "nrc"
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "isDisrupted": False,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:29:00",
                    "scheduledArrivalTime": "2023-11-20T16:34:00",
                    "interChangeDuration": "4",
                    "interChangePosition": "AFTER"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 19,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "London Overground to Rotherhithe Rail Station",
                        "detailed": "London Overground towards Crystal Palace",
                        "steps": []
                    },
                    "obstacles": [],
                    "departureTime": "2023-11-20T16:40:00",
                    "arrivalTime": "2023-11-20T16:59:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GHGHI",
                        "platformName": "",
                        "icsCode": "1000108",
                        "individualStopId": "9100HIGBYA3",
                        "commonName": "Highbury & Islington Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.546030373309996,
                        "lon": -0.10424569214
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GRTHERHI",
                        "platformName": "",
                        "icsCode": "1000195",
                        "individualStopId": "9100RTHERHI2",
                        "commonName": "Rotherhithe Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.50099477335,
                        "lon": -0.052055312720000003
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.54603247211, -0.10424692736],[51.54624911227, -0.10331355767],[51.54726555370, -0.09888673560],[51.54741726481, -0.09826022606],[51.54843655725, -0.09402055726],[51.54862354843, -0.09288707338],[51.54862354843, -0.09288707338],[51.54873125247, -0.09223416960],[51.54889314020, -0.08947252819],[51.54894895075, -0.08737879406],[51.54889067432, -0.08601101467],[51.54876218188, -0.08419906317],[51.54844319853, -0.07953932301],[51.54825524442, -0.07794626065],[51.54809847316, -0.07715959347],[51.54793625507, -0.07658950819],[51.54770403460, -0.07613776455],[51.54729090405, -0.07562154425],[51.54699080920, -0.07541786449],[51.54652044695, -0.07525021860],[51.54608744599, -0.07516815850],[51.54608744599, -0.07516815850],[51.54589802654, -0.07513226117],[51.54481990505, -0.07519218335],[51.54359894799, -0.07531581643],[51.54095531429, -0.07532641455],[51.53852145530, -0.07551754824],[51.53852145530, -0.07551754824],[51.53659055923, -0.07566916665],[51.53549469928, -0.07574422527],[51.53162703181, -0.07568497947],[51.53162703181, -0.07568497947],[51.53123115708, -0.07567891545],[51.53071988103, -0.07575814643],[51.53035356801, -0.07590335089],[51.53008681349, -0.07608760794],[51.52930711914, -0.07679808852],[51.52899779313, -0.07712830114],[51.52874262038, -0.07747064491],[51.52826656481, -0.07805295854],[51.52791183122, -0.07835623321],[51.52753700015, -0.07853059916],[51.52687295330, -0.07861622216],[51.52435511926, -0.07862130342],[51.52410066918, -0.07845902749],[51.52387081776, -0.07815156261],[51.52366461952, -0.07764128848],[51.52350240627, -0.07707150440],[51.52342792770, -0.07636828880],[51.52342757359, -0.07633948499],[51.52342757359, -0.07633948499],[51.52340098385, -0.07417828865],[51.52335297381, -0.07344513121],[51.52306631934, -0.07132377065],[51.52220774574, -0.06451292085],[51.52211498189, -0.06379610510],[51.52196216405, -0.06325481964],[51.52167264604, -0.06260402056],[51.52132164853, -0.06204232822],[51.51951850962, -0.05959673941],[51.51951850962, -0.05959673941],[51.51806521511, -0.05762583201],[51.51743490447, -0.05703286755],[51.51701771853, -0.05682000780],[51.51486475144, -0.05659455727],[51.51277620074, -0.05700051332],[51.51129826656, -0.05680262255],[51.51129826656, -0.05680262255],[51.51016254656, -0.05665056107],[51.50541087278, -0.05643486019],[51.50490501609, -0.05629788030],[51.50472276252, -0.05620907630],[51.50472276252, -0.05620907630],[51.50446985609, -0.05608584751],[51.50414133752, -0.05579723306],[51.50188389522, -0.05306922668],[51.50113267623, -0.05223674116],[51.50096850903, -0.05211507945]]",
                        "stopPoints": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GCNNB",
                                "name": "Canonbury Rail Station",
                                "uri": "/StopPoint/910GCNNB",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GDALS",
                                "name": "Dalston Junction Rail Station",
                                "uri": "/StopPoint/910GDALS",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GHAGGERS",
                                "name": "Haggerston Rail Station",
                                "uri": "/StopPoint/910GHAGGERS",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GHOXTON",
                                "name": "Hoxton Rail Station",
                                "uri": "/StopPoint/910GHOXTON",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GSHRDHST",
                                "name": "Shoreditch High Street Rail Station",
                                "uri": "/StopPoint/910GSHRDHST",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GWCHAPEL",
                                "name": "Whitechapel Rail Station",
                                "uri": "/StopPoint/910GWCHAPEL",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GSHADWEL",
                                "name": "Shadwell Rail Station",
                                "uri": "/StopPoint/910GSHADWEL",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GWAPPING",
                                "name": "Wapping Rail Station",
                                "uri": "/StopPoint/910GWAPPING",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "910GRTHERHI",
                                "name": "Rotherhithe Rail Station",
                                "uri": "/StopPoint/910GRTHERHI",
                                "type": "StopPoint",
                                "routeType": "Unknown",
                                "status": "Unknown"
                            }
                        ],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "London Overground",
                            "directions": [
                                "Crystal Palace Rail Station"
                            ],
                            "lineIdentifier": {
                                "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                                "id": "london-overground",
                                "name": "London Overground",
                                "uri": "/Line/london-overground",
                                "type": "Line",
                                "crowding": {
                                    "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
                                },
                                "routeType": "Unknown",
                                "status": "Unknown"
                            },
                            "direction": "Outbound"
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "overground",
                        "name": "overground",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "7",
                        "network": "nrc"
                    },
                    "disruptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
                            "category": "Information",
                            "type": "stopInfo",
                            "categoryDescription": "Information",
                            "description": "ROTHERHITHE STATION: This station has short platforms. Customers are advised to travel in the front 4 coaches and listen to on-board announcements.",
                            "summary": "",
                            "additionalInfo": "",
                            "created": "2021-04-08T10:02:00",
                            "lastUpdate": "2021-04-08T10:03:00"
                        }
                    ],
                    "plannedWorks": [],
                    "isDisrupted": True,
                    "hasFixedLocations": True,
                    "scheduledDepartureTime": "2023-11-20T16:40:00",
                    "scheduledArrivalTime": "2023-11-20T17:00:00"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Leg, Tfl.Api.Presentation.Entities",
                    "duration": 9,
                    "instruction": {
                        "$type": "Tfl.Api.Presentation.Entities.Instruction, Tfl.Api.Presentation.Entities",
                        "summary": "Walk to SE16 4JB",
                        "detailed": "Walk to SE16 4JB",
                        "steps": [
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "Brunel Road for 174 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "Brunel Road",
                                "distance": 174,
                                "cumulativeDistance": 174,
                                "skyDirection": 229,
                                "skyDirectionDescription": "SouthWest",
                                "cumulativeTravelTime": 157,
                                "latitude": 51.50066084667,
                                "longitude": -0.051983102489999995,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to Rupack Street, continue for 50 metres",
                                "turnDirection": "RIGHT",
                                "streetName": "Rupack Street",
                                "distance": 50,
                                "cumulativeDistance": 224,
                                "skyDirection": 330,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 201,
                                "latitude": 51.49964927697,
                                "longitude": -0.05388485772,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Turn right",
                                "trackType": "None"
                            },
                            {
                                "$type": "Tfl.Api.Presentation.Entities.InstructionStep, Tfl.Api.Presentation.Entities",
                                "description": "on to St Marychurch Street, continue for 76 metres",
                                "turnDirection": "STRAIGHT",
                                "streetName": "St Marychurch Street",
                                "distance": 76,
                                "cumulativeDistance": 300,
                                "skyDirection": 320,
                                "skyDirectionDescription": "NorthWest",
                                "cumulativeTravelTime": 269,
                                "latitude": 51.500041659539995,
                                "longitude": -0.054228342859999994,
                                "pathAttribute": {
                                    "$type": "Tfl.Api.Presentation.Entities.PathAttribute, Tfl.Api.Presentation.Entities"
                                },
                                "descriptionHeading": "Continue along ",
                                "trackType": "None"
                            }
                        ]
                    },
                    "obstacles": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "STAIRS",
                            "incline": "UP",
                            "stopId": 1000195,
                            "position": "BEFORE"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "ESCALATOR",
                            "incline": "UP",
                            "stopId": 1000195,
                            "position": "BEFORE"
                        },
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Obstacle, Tfl.Api.Presentation.Entities",
                            "type": "WALKWAY",
                            "incline": "LEVEL",
                            "stopId": 1000195,
                            "position": "BEFORE"
                        }
                    ],
                    "departureTime": "2023-11-20T16:59:00",
                    "arrivalTime": "2023-11-20T17:08:00",
                    "departurePoint": {
                        "$type": "Tfl.Api.Presentation.Entities.StopPoint, Tfl.Api.Presentation.Entities",
                        "naptanId": "910GRTHERHI",
                        "platformName": "",
                        "icsCode": "1000195",
                        "individualStopId": "9100RTHERHI2",
                        "commonName": "Rotherhithe Rail Station",
                        "placeType": "StopPoint",
                        "additionalProperties": [],
                        "lat": 51.50099477335,
                        "lon": -0.052055312720000003
                    },
                    "arrivalPoint": {
                        "$type": "Tfl.Api.Presentation.Entities.Place, Tfl.Api.Presentation.Entities",
                        "commonName": "SE16 4JB",
                        "placeType": "StopPoint",
                        "lat": 51.50064191973,
                        "lon": -0.05463502216
                    },
                    "path": {
                        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.Path, Tfl.Api.Presentation.Entities",
                        "lineString": "[[51.50096879539, -0.05211408747],[51.50081433063, -0.05201978227],[51.50086189264, -0.05217624533],[51.50066089539, -0.05198308747],[51.50066084667, -0.05198310249],[51.50052161032, -0.05226279543],[51.50010294102, -0.05304427262],[51.49984076214, -0.05350209331],[51.49964927697, -0.05388485772],[51.50004165954, -0.05422834286],[51.50038155655, -0.05466051775],[51.50062561903, -0.05473657381],[51.50064191973, -0.05463502216]]",
                        "stopPoints": [],
                        "elevation": []
                    },
                    "routeOptions": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.RouteOption, Tfl.Api.Presentation.Entities",
                            "name": "",
                            "directions": [
                                ""
                            ],
                            "direction": ""
                        }
                    ],
                    "mode": {
                        "$type": "Tfl.Api.Presentation.Entities.Identifier, Tfl.Api.Presentation.Entities",
                        "id": "walking",
                        "name": "walking",
                        "type": "Mode",
                        "routeType": "Unknown",
                        "status": "Unknown",
                        "motType": "100",
                        "network": ""
                    },
                    "disruptions": [],
                    "plannedWorks": [],
                    "distance": 300,
                    "isDisrupted": False,
                    "hasFixedLocations": False,
                    "scheduledDepartureTime": "2023-11-20T17:00:00",
                    "scheduledArrivalTime": "2023-11-20T17:09:00",
                    "interChangeDuration": "4",
                    "interChangePosition": "BEFORE"
                }
            ]
        }
    ],
    "lines": [
        {
            "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
            "id": "29",
            "name": "29",
            "modeName": "bus",
            "disruptions": [],
            "created": "2023-11-14T16:09:01.693Z",
            "modified": "2023-11-14T16:09:01.693Z",
            "lineStatuses": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
                    "id": 0,
                    "lineId": "29",
                    "statusSeverity": 0,
                    "statusSeverityDescription": "Special Service",
                    "reason": "WHITEHALL, W1C: Route 29 is starting and terminating at Warren Street Station due to emergency Thames Water works. Buses will not be serving remaining stops from/to Trafalgar Square.",
                    "created": "0001-01-01T00:00:00",
                    "validityPeriods": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
                            "fromDate": "2023-11-14T09:11:00Z",
                            "toDate": "2023-11-21T17:30:00Z",
                            "isNow": True
                        }
                    ],
                    "disruption": {
                        "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
                        "category": "RealTime",
                        "categoryDescription": "RealTime",
                        "description": "WHITEHALL, W1C: Route 29 is starting and terminating at Warren Street Station due to emergency Thames Water works. Buses will not be serving remaining stops from/to Trafalgar Square.",
                        "created": "2023-11-14T09:19:00Z",
                        "affectedRoutes": [],
                        "affectedStops": []
                    }
                }
            ],
            "routeSections": [],
            "serviceTypes": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name": "Regular",
                    "uri": "/Line/Route?ids=29&serviceTypes=Regular"
                }
            ],
            "crowding": {
                "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
            }
        },
        {
            "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
            "id": "c10",
            "name": "C10",
            "modeName": "bus",
            "disruptions": [],
            "created": "2023-11-14T16:09:01.707Z",
            "modified": "2023-11-14T16:09:01.707Z",
            "lineStatuses": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
                    "id": 0,
                    "lineId": "c10",
                    "statusSeverity": 0,
                    "statusSeverityDescription": "Special Service",
                    "reason": "VICTORIA BUS STATION: Routes 170 and C10 are on diversion towards Victoria only from 02:00 on Monday 13 November until 17:00 on Friday 29 December due to works within Victoria Bus Station. Buses are diverted via Grosvenor Gardens, Lower Grosvenor Place and Bressenden Place, missing stop Victoria Station (AP). Buses are serving stop S on Buckingham Palace Road.",
                    "created": "0001-01-01T00:00:00",
                    "validityPeriods": [
                        {
                            "$type": "Tfl.Api.Presentation.Entities.ValidityPeriod, Tfl.Api.Presentation.Entities",
                            "fromDate": "2023-11-03T07:41:00Z",
                            "toDate": "2023-12-29T17:00:00Z",
                            "isNow": False
                        }
                    ],
                    "disruption": {
                        "$type": "Tfl.Api.Presentation.Entities.Disruption, Tfl.Api.Presentation.Entities",
                        "category": "PlannedWork",
                        "categoryDescription": "PlannedWork",
                        "description": "VICTORIA BUS STATION: Routes 170 and C10 are on diversion towards Victoria only from 02:00 on Monday 13 November until 17:00 on Friday 29 December due to works within Victoria Bus Station. Buses are diverted via Grosvenor Gardens, Lower Grosvenor Place and Bressenden Place, missing stop Victoria Station (AP). Buses are serving stop S on Buckingham Palace Road.",
                        "created": "2023-11-03T07:48:00Z",
                        "affectedRoutes": [],
                        "affectedStops": []
                    }
                }
            ],
            "routeSections": [],
            "serviceTypes": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name": "Regular",
                    "uri": "/Line/Route?ids=C10&serviceTypes=Regular"
                }
            ],
            "crowding": {
                "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
            }
        },
        {
            "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
            "id": "jubilee",
            "name": "Jubilee",
            "modeName": "tube",
            "disruptions": [],
            "created": "2023-11-14T16:09:01.693Z",
            "modified": "2023-11-14T16:09:01.693Z",
            "lineStatuses": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
                    "id": 0,
                    "statusSeverity": 10,
                    "statusSeverityDescription": "Good Service",
                    "created": "0001-01-01T00:00:00",
                    "validityPeriods": []
                }
            ],
            "routeSections": [],
            "serviceTypes": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name": "Regular",
                    "uri": "/Line/Route?ids=Jubilee&serviceTypes=Regular"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name": "Night",
                    "uri": "/Line/Route?ids=Jubilee&serviceTypes=Night"
                }
            ],
            "crowding": {
                "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
            }
        },
        {
            "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
            "id": "london-overground",
            "name": "London Overground",
            "modeName": "overground",
            "disruptions": [],
            "created": "2023-11-14T16:09:01.707Z",
            "modified": "2023-11-14T16:09:01.707Z",
            "lineStatuses": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
                    "id": 0,
                    "statusSeverity": 10,
                    "statusSeverityDescription": "Good Service",
                    "created": "0001-01-01T00:00:00",
                    "validityPeriods": []
                }
            ],
            "routeSections": [],
            "serviceTypes": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name": "Regular",
                    "uri": "/Line/Route?ids=London Overground&serviceTypes=Regular"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name": "Night",
                    "uri": "/Line/Route?ids=London Overground&serviceTypes=Night"
                }
            ],
            "crowding": {
                "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
            }
        },
        {
            "$type": "Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities",
            "id": "northern",
            "name": "Northern",
            "modeName": "tube",
            "disruptions": [],
            "created": "2023-11-14T16:09:01.693Z",
            "modified": "2023-11-14T16:09:01.693Z",
            "lineStatuses": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities",
                    "id": 0,
                    "statusSeverity": 10,
                    "statusSeverityDescription": "Good Service",
                    "created": "0001-01-01T00:00:00",
                    "validityPeriods": []
                }
            ],
            "routeSections": [],
            "serviceTypes": [
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name": "Regular",
                    "uri": "/Line/Route?ids=Northern&serviceTypes=Regular"
                },
                {
                    "$type": "Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities",
                    "name": "Night",
                    "uri": "/Line/Route?ids=Northern&serviceTypes=Night"
                }
            ],
            "crowding": {
                "$type": "Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities"
            }
        }
    ],
    "stopMessages": [],
    "recommendedMaxAgeMinutes": 5,
    "searchCriteria": {
        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.SearchCriteria, Tfl.Api.Presentation.Entities",
        "dateTime": "2023-11-20T16:00:00",
        "dateTimeType": "Departing",
        "timeAdjustments": {
            "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.TimeAdjustments, Tfl.Api.Presentation.Entities",
            "earliest": {
                "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.TimeAdjustment, Tfl.Api.Presentation.Entities",
                "date": "20231120",
                "time": "0300",
                "timeIs": "departing",
                "uri": "/journey/journeyresults/nw19hu/to/se164jb?date=20231120&time=0300&mode=bus,%20overground,%20dlr,%20tube,%20taxi&nationalsearch=True&taxionlytrip=False&timeIs=departing&userealtimearrivals=True&walkingspeed="
            },
            "earlier": {
                "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.TimeAdjustment, Tfl.Api.Presentation.Entities",
                "date": "20231120",
                "time": "1607",
                "timeIs": "departing",
                "uri": "/journey/journeyresults/nw19hu/to/se164jb?date=20231120&time=1607&mode=bus,%20overground,%20dlr,%20tube,%20taxi&nationalsearch=True&taxionlytrip=False&timeIs=departing&userealtimearrivals=True&walkingspeed="
            },
            "later": {
                "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.TimeAdjustment, Tfl.Api.Presentation.Entities",
                "date": "20231120",
                "time": "1621",
                "timeIs": "departing",
                "uri": "/journey/journeyresults/nw19hu/to/se164jb?date=20231120&time=1621&mode=bus,%20overground,%20dlr,%20tube,%20taxi&nationalsearch=True&taxionlytrip=False&timeIs=departing&userealtimearrivals=True&walkingspeed="
            },
            "latest": {
                "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.TimeAdjustment, Tfl.Api.Presentation.Entities",
                "date": "20231121",
                "time": "0300",
                "timeIs": "departing",
                "uri": "/journey/journeyresults/nw19hu/to/se164jb?date=20231121&time=0300&mode=bus,%20overground,%20dlr,%20tube,%20taxi&nationalsearch=True&taxionlytrip=False&timeIs=departing&userealtimearrivals=True&walkingspeed="
            }
        }
    },
    "journeyVector": {
        "$type": "Tfl.Api.Presentation.Entities.JourneyPlanner.JourneyVector, Tfl.Api.Presentation.Entities",
        "from": "NW19HU",
        "to": "SE164JB",
        "via": "",
        "uri": "/journey/journeyresults/nw19hu/to/se164jb?date=20231120&time=1600&mode=bus,%20overground,%20dlr,%20tube,%20taxi&nationalsearch=True&taxionlytrip=False&timeis=&userealtimearrivals=True&walkingspeed="
    }
}


@pytest.fixture(scope='module')
def test_client():
    app = create_app('TEST')
    app.config['TESTING'] = True

    with app.test_client() as testing_client:
        with app.app_context():
            yield testing_client


@pytest.fixture
def mock_response_200(test_client):
    mock_resp = Mock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = mock_json_data
    return mock_resp


def test_get_routes_success(mock_response_200):
    with patch('requests.get', return_value=mock_response_200):
        response = TfL_Request.get_routes(user_id=None, body={
            'origins': {'from': 'PointA', 'to': 'PointB'},
            'params': {}
        })
        assert response.status_code == 200

        data = response.get_json()
        assert 'journeys' in data
        assert len(data['journeys']) > 0  
        
        for journey in data['journeys']:
            assert 'startDateTime' in journey
            assert 'arrivalDateTime' in journey
            assert 'duration' in journey
            assert isinstance(journey['duration'], int)


            assert 'legs' in journey
            for leg in journey['legs']:
                assert 'duration' in leg
                assert 'mode' in leg
                assert 'arrivalPoint' in leg
                assert 'departurePoint' in leg
                assert 'summary' in leg



# TfL-Planner

Metro-Mingle is a cross-platform mobile application developed using React Native for the front-end and Flask for the back-end. It provides live tracking of event attendees within the TfL (Transport for London) network, integrating real-time data from TfL and weather APIs to enhance the navigation and planning experience for academic conference attendees in London.

## Features

- **Live TfL Updates**: Real-time tracking of public transportation within the TfL network to help attendees plan their journeys to event locations.
- **Weather Forecasts**: Integration of weather API to provide current weather updates, aiding in travel planning.
- **Interactive Maps**: Easy-to-use maps to guide attendees through their journey within London.
- **Event Schedule Integration**: Attendees can view event schedules and plan their journeys accordingly.

## Live Demo
[Click Here](https://youtu.be/E3oP54Ec7os)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- Python 3
- React Native environment setup
- Flask

### Installing

Clone the repository:

```
git clone https://github.com/pablo-romeroclavijo/TfL-tracker.git
```

Install dependencies for the server:

```
cd TfL-tracker/server
pip install -r requirements.txt
```

Install dependencies for the client:

```
cd TfL-tracker/client
npm install
```

### Running the App

To run the server:

```
cd server
python app.py
```

To run the React Native application:

```
cd client
npm start
```

## Running the Tests

```
cd server
pipenv shell
pipenv run test
```

## Deployment

Backed deployment on Render
Front-End Deployed on Expo Go

## Built With

- [React Native](https://reactnative.dev/) - The web framework used
- [Flask](https://flask.palletsprojects.com/) - Backend framework
- [TfL API](https://api.tfl.gov.uk/) - Used for live transportation data
- [Weather API](#) - Used for fetching weather forecasts

## Contributing

Please read [CONTRIBUTING.md](#) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- **Pablo Romero** - *Full-Stack - [pablo-RomeroClavijo](https://github.com/pablo-romeroclavijo)

See also the list of [contributors](https://github.com/yourusername/Tfl-Planner/contributors) who participated in this project.


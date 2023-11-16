from dotenv import load_dotenv
from flask import jsonify
import requests
import os
import datetime

from application.models.Errors import WeatherForecastError


load_dotenv()

class Weather():
    url = "http://api.weatherapi.com/v1/forecast.json?"
    key = os.environ.get('WEATHER_API') 
    
    def __innit__():
        pass
    @classmethod
    def current_forecast(cls, location):
        comp_url = f"{cls.url}key={cls.key}&q={location}&aqi=no&alerts=yes"
        response = requests.get(comp_url)
        
        if response.status_code == 200:
            data=response.json()
            current = data['current']

            forecast_dict={
                'location': f"{data['location']['name']} - {data['location']['region']}",
                'temperature_celsius': current['temp_c'],
                'is_day': True if current['is_day'] == 1 else False,
                "condition": current['condition']['text'],
                "icon_route": current['condition']['icon'],
                "wind_kph": current['wind_kph'],
                "precip_mm": current['precip_mm'],
                "humidity": current['humidity'],
                "alert_type": 'No alerts',
            }
        
            try: 
                alert = data['alerts']['alert'][0]['event']
                forecast_dict['alert_type'] = alert
            except:
                pass
            
            return jsonify(forecast=forecast_dict)
        
        raise WeatherForecastError
    
    @classmethod
    def future_forecast(cls, location, event_date, days):
        hour = event_date.hour
        request_url = f"{cls.url}key={cls.key}&q={location}&days={days}&aqi=no&alerts=yes"

        response = requests.get(request_url)
        print(response.status_code)
        
        if response.status_code == 200:
            data = response.json()
            data=response.json()
            forecast_day = data['forecast']['forecastday'][days-1]
            forecast_hour = data['forecast']['forecastday'][days-1]["hour"][hour]
            
            forecast_dict={
                'date': forecast_day['date'],
                'hour': hour,
                'location': f"{data['location']['name']} - {data['location']['region']}",
                'temperature_celsius': forecast_hour['temp_c'],
                'is_day': True if forecast_hour['is_day'] == 1 else False,
                "condition": forecast_hour['condition']['text'],
                "icon_route": forecast_hour['condition']['icon'],
                "wind_kph": forecast_hour['wind_kph'],
                "precip_mm": forecast_hour['precip_mm'],
                "humidity": forecast_hour['humidity'],
            }
            return jsonify(forecast=forecast_dict)
        
        raise WeatherForecastError
       
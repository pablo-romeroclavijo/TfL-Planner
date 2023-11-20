import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import {SVG, SlideBox, BlinkingCircle} from "../../Components"

export default function RoutePage({}){

  return (
    <SafeAreaView style={styles.container}>
        <View>
          <SlideBox slides={[
          {journey: journeys.journeys[0], content: 'Slide 1', onSelect: () => console.log('Red Selected')}, 
          {journey: journeys.journeys[1], content: 'Slide 2', onSelect: () => console.log('Blue Selected')}, 
          {journey: journeys.journeys[2], content: 'Slide 2', onSelect: () => console.log('Green Selected')}
          ]} />
          
        </View>
    </SafeAreaView>
  
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50
    }

  });
  
const journeys = {
  "journeys": [
    {
      "arrivalDateTime": "2023-11-20T09:53:00",
      "duration": 49,
      "fare": 0,
      "legs": [
        {
          "arrival": "2023-11-20T09:20:00",
          "arrivalPoint": "Bermondsey Underground Station",
          "departure": "2023-11-20T09:04:00",
          "departurePoint": "SE16 4JB",
          "distance": "755m",
          "distuptions": [],
          "duration": 16,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to Bermondsey Station"
        },
        {
          "arrival": "2023-11-20T09:33:00",
          "arrivalPoint": "Baker Street Underground Station",
          "departure": "2023-11-20T09:20:00",
          "departurePoint": "Bermondsey Underground Station",
          "distance": "0m",
          "distuptions": [],
          "duration": 13,
          "isDisrupted": false,
          "line": "Jubilee",
          "mode": "tube",
          "stops": [
            "London Bridge Underground Station",
            "Southwark Underground Station",
            "Waterloo Underground Station",
            "Westminster Underground Station",
            "Green Park Underground Station",
            "Bond Street Underground Station",
            "Baker Street Underground Station"
          ],
          "summary": "Jubilee line towards Stanmore"
        },
        {
          "arrival": "2023-11-20T09:45:00",
          "arrivalPoint": "Kilburn Park Underground Station",
          "departure": "2023-11-20T09:36:00",
          "departurePoint": "Baker Street Underground Station",
          "distance": "0m",
          "distuptions": [],
          "duration": 9,
          "isDisrupted": false,
          "line": "Bakerloo",
          "mode": "tube",
          "stops": [
            "Marylebone Underground Station",
            "Edgware Road (Bakerloo) Underground Station",
            "Paddington Underground Station",
            "Warwick Avenue Underground Station",
            "Maida Vale Underground Station",
            "Kilburn Park Underground Station"
          ],
          "summary": "Bakerloo line towards Stonebridge Park"
        },
        {
          "arrival": "2023-11-20T09:53:00",
          "arrivalPoint": "NW6 5SB",
          "departure": "2023-11-20T09:45:00",
          "departurePoint": "Kilburn Park Underground Station",
          "distance": "294m",
          "distuptions": [],
          "duration": 8,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to NW6 5SB"
        }
      ],
      "origin": "SE164JB",
      "startDateTime": "2023-11-20T09:04:00"
    },
    {
      "arrivalDateTime": "2023-11-20T09:56:00",
      "duration": 47,
      "fare": 0,
      "legs": [
        {
          "arrival": "2023-11-20T09:12:00",
          "arrivalPoint": "Rotherhithe Tunnel",
          "departure": "2023-11-20T09:09:00",
          "departurePoint": "SE16 4JB",
          "distance": "167m",
          "distuptions": [],
          "duration": 3,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to Rotherhithe Tunnel"
        },
        {
          "arrival": "2023-11-20T09:17:00",
          "arrivalPoint": "Bermondsey Station",
          "departure": "2023-11-20T09:11:00",
          "departurePoint": "Rotherhithe Tunnel",
          "distance": "0m",
          "distuptions": [
            "VICTORIA BUS STATION: Routes 170 and C10 are on diversion towards Victoria only from 02:00 on Monday 13 November until 17:00 on Friday 29 December due to works within Victoria Bus Station. Buses are diverted via Grosvenor Gardens, Lower Grosvenor Place and Bressenden Place, missing stop Victoria Station (AP). Buses are serving stop S on Buckingham Palace Road."
          ],
          "duration": 6,
          "isDisrupted": true,
          "line": "C10",
          "mode": "bus",
          "stops": [
            "Southwark Park",
            "Drummond Road",
            "Bermondsey Station"
          ],
          "summary": "C10 bus towards Victoria Station"
        },
        {
          "arrival": "2023-11-20T09:37:00",
          "arrivalPoint": "Baker Street Underground Station",
          "departure": "2023-11-20T09:24:00",
          "departurePoint": "Bermondsey Underground Station",
          "distance": "0m",
          "distuptions": [],
          "duration": 13,
          "isDisrupted": false,
          "line": "Jubilee",
          "mode": "tube",
          "stops": [
            "London Bridge Underground Station",
            "Southwark Underground Station",
            "Waterloo Underground Station",
            "Westminster Underground Station",
            "Green Park Underground Station",
            "Bond Street Underground Station",
            "Baker Street Underground Station"
          ],
          "summary": "Jubilee line towards Stanmore"
        },
        {
          "arrival": "2023-11-20T09:48:00",
          "arrivalPoint": "Kilburn Park Underground Station",
          "departure": "2023-11-20T09:39:00",
          "departurePoint": "Baker Street Underground Station",
          "distance": "0m",
          "distuptions": [],
          "duration": 9,
          "isDisrupted": false,
          "line": "Bakerloo",
          "mode": "tube",
          "stops": [
            "Marylebone Underground Station",
            "Edgware Road (Bakerloo) Underground Station",
            "Paddington Underground Station",
            "Warwick Avenue Underground Station",
            "Maida Vale Underground Station",
            "Kilburn Park Underground Station"
          ],
          "summary": "Bakerloo line towards Queen's Park"
        },
        {
          "arrival": "2023-11-20T09:56:00",
          "arrivalPoint": "NW6 5SB",
          "departure": "2023-11-20T09:48:00",
          "departurePoint": "Kilburn Park Underground Station",
          "distance": "294m",
          "distuptions": [],
          "duration": 8,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to NW6 5SB"
        }
      ],
      "origin": "SE164JB",
      "startDateTime": "2023-11-20T09:09:00"
    },
    {
      "arrivalDateTime": "2023-11-20T09:59:00",
      "duration": 48,
      "fare": 0,
      "legs": [
        {
          "arrival": "2023-11-20T09:20:00",
          "arrivalPoint": "Rotherhithe Rail Station",
          "departure": "2023-11-20T09:11:00",
          "departurePoint": "SE16 4JB",
          "distance": "300m",
          "distuptions": [],
          "duration": 9,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to Rotherhithe Station"
        },
        {
          "arrival": "2023-11-20T09:20:00",
          "arrivalPoint": "Canada Water Rail Station",
          "departure": "2023-11-20T09:20:00",
          "departurePoint": "Rotherhithe Rail Station",
          "distance": "0m",
          "distuptions": [
            "ROTHERHITHE STATION: This station has short platforms. Customers are advised to travel in the front 4 coaches and listen to on-board announcements.",
            "CANADA WATER STATION: This station has short London Overground platforms. Customers are advised to travel in the front 4 coaches and listen to on-board announcements."
          ],
          "duration": 0,
          "isDisrupted": true,
          "line": null,
          "mode": "overground",
          "stops": [
            "Canada Water Rail Station"
          ],
          "summary": "London Overground towards Clapham Junction"
        },
        {
          "arrival": "2023-11-20T09:39:00",
          "arrivalPoint": "Baker Street Underground Station",
          "departure": "2023-11-20T09:24:00",
          "departurePoint": "Canada Water Underground Station",
          "distance": "0m",
          "distuptions": [],
          "duration": 15,
          "isDisrupted": false,
          "line": "Jubilee",
          "mode": "tube",
          "stops": [
            "Bermondsey Underground Station",
            "London Bridge Underground Station",
            "Southwark Underground Station",
            "Waterloo Underground Station",
            "Westminster Underground Station",
            "Green Park Underground Station",
            "Bond Street Underground Station",
            "Baker Street Underground Station"
          ],
          "summary": "Jubilee line towards Wembley Park"
        },
        {
          "arrival": "2023-11-20T09:51:00",
          "arrivalPoint": "Kilburn Park Underground Station",
          "departure": "2023-11-20T09:42:00",
          "departurePoint": "Baker Street Underground Station",
          "distance": "0m",
          "distuptions": [],
          "duration": 9,
          "isDisrupted": false,
          "line": "Bakerloo",
          "mode": "tube",
          "stops": [
            "Marylebone Underground Station",
            "Edgware Road (Bakerloo) Underground Station",
            "Paddington Underground Station",
            "Warwick Avenue Underground Station",
            "Maida Vale Underground Station",
            "Kilburn Park Underground Station"
          ],
          "summary": "Bakerloo line towards Stonebridge Park"
        },
        {
          "arrival": "2023-11-20T09:59:00",
          "arrivalPoint": "NW6 5SB",
          "departure": "2023-11-20T09:51:00",
          "departurePoint": "Kilburn Park Underground Station",
          "distance": "294m",
          "distuptions": [],
          "duration": 8,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to NW6 5SB"
        }
      ],
      "origin": "SE164JB",
      "startDateTime": "2023-11-20T09:11:00"
    }
  ]
}
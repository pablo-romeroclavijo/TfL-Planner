import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import {SVG, SlideBox, BlinkingCircle} from "../../Components"

export default function RoutePage({}){
  console.log(journeys.journeys[0])

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
      "arrivalDateTime": "2023-11-18T19:32:00",
      "duration": 47,
      "fare": 0,
      "legs": [
        {
          "arrival": "2023-11-18T19:01:00",
          "arrivalPoint": "Bermondsey Underground Station",
          "departure": "2023-11-18T18:45:00",
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
          "arrival": "2023-11-18T19:14:00",
          "arrivalPoint": "Baker Street Underground Station",
          "departure": "2023-11-18T19:01:00",
          "departurePoint": "Bermondsey Underground Station",
          "distance": "0m",
          "distuptions": [
            "Jubilee Line: Minor delays due to train cancellations."
          ],
          "duration": 13,
          "isDisrupted": true,
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
          "arrival": "2023-11-18T19:25:00",
          "arrivalPoint": "Kilburn Park Underground Station",
          "departure": "2023-11-18T19:16:00",
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
          "arrival": "2023-11-18T19:29:00",
          "arrivalPoint": "Kilburn High Road Station",
          "departure": "2023-11-18T19:28:00",
          "departurePoint": "Kilburn Park Station",
          "distance": "0m",
          "distuptions": [
            "FORTUNE GREEN ROAD, NW3: Routes 139 328 are on diversion towards Golders Green until 20:00 on Sunday 19 November due to resurfacing works. Buses are diverted via Broadhurst Gardens, Canfield Gardens, and Finchley Road, missing the stops from West Hampstead Station to Finchley Road."
          ],
          "duration": 1,
          "isDisrupted": true,
          "line": "328",
          "mode": "bus",
          "stops": [
            "Kilburn High Road Station"
          ],
          "summary": "328 bus towards Golders Green"
        },
        {
          "arrival": "2023-11-18T19:32:00",
          "arrivalPoint": "NW6 5SB",
          "departure": "2023-11-18T19:29:00",
          "departurePoint": "Kilburn High Road Station",
          "distance": "150m",
          "distuptions": [],
          "duration": 3,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to NW6 5SB"
        }
      ],
      "origin": "SE164JB",
      "startDateTime": "2023-11-18T18:45:00"
    },
    {
      "arrivalDateTime": "2023-11-18T19:36:00",
      "duration": 48,
      "fare": 0,
      "legs": [
        {
          "arrival": "2023-11-18T19:04:00",
          "arrivalPoint": "Bermondsey Underground Station",
          "departure": "2023-11-18T18:48:00",
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
          "arrival": "2023-11-18T19:17:00",
          "arrivalPoint": "Baker Street Underground Station",
          "departure": "2023-11-18T19:04:00",
          "departurePoint": "Bermondsey Underground Station",
          "distance": "0m",
          "distuptions": [
            "Jubilee Line: Minor delays due to train cancellations."
          ],
          "duration": 13,
          "isDisrupted": true,
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
          "arrival": "2023-11-18T19:28:00",
          "arrivalPoint": "Kilburn Park Underground Station",
          "departure": "2023-11-18T19:19:00",
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
          "summary": "Bakerloo line towards Harrow & Wealdstone"
        },
        {
          "arrival": "2023-11-18T19:36:00",
          "arrivalPoint": "NW6 5SB",
          "departure": "2023-11-18T19:28:00",
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
      "startDateTime": "2023-11-18T18:48:00"
    },
    {
      "arrivalDateTime": "2023-11-18T19:39:00",
      "duration": 48,
      "fare": 0,
      "legs": [
        {
          "arrival": "2023-11-18T19:00:00",
          "arrivalPoint": "Rotherhithe Rail Station",
          "departure": "2023-11-18T18:51:00",
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
          "arrival": "2023-11-18T19:01:00",
          "arrivalPoint": "Canada Water Rail Station",
          "departure": "2023-11-18T19:00:00",
          "departurePoint": "Rotherhithe Rail Station",
          "distance": "0m",
          "distuptions": [
            "ROTHERHITHE STATION: This station has short platforms. Customers are advised to travel in the front 4 coaches and listen to on-board announcements.",
            "CANADA WATER STATION: This station has short London Overground platforms. Customers are advised to travel in the front 4 coaches and listen to on-board announcements."
          ],
          "duration": 1,
          "isDisrupted": true,
          "line": null,
          "mode": "overground",
          "stops": [
            "Canada Water Rail Station"
          ],
          "summary": "London Overground towards Crystal Palace"
        },
        {
          "arrival": "2023-11-18T19:19:00",
          "arrivalPoint": "Baker Street Underground Station",
          "departure": "2023-11-18T19:04:00",
          "departurePoint": "Canada Water Underground Station",
          "distance": "0m",
          "distuptions": [
            "Jubilee Line: Minor delays due to train cancellations."
          ],
          "duration": 15,
          "isDisrupted": true,
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
          "arrival": "2023-11-18T19:31:00",
          "arrivalPoint": "Kilburn Park Underground Station",
          "departure": "2023-11-18T19:22:00",
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
          "arrival": "2023-11-18T19:39:00",
          "arrivalPoint": "NW6 5SB",
          "departure": "2023-11-18T19:31:00",
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
      "startDateTime": "2023-11-18T18:51:00"
    }
  ]
}
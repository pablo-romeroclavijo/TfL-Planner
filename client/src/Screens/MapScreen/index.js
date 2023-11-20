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
      "arrivalDateTime": "2023-11-20T16:48:00",
      "disruptions": ['CRITICAL DELAY: Overground'],
      "duration": 45,
      "fare": 340,
      "legs": [
        {
          "arrival": "2023-11-20T16:10:00",
          "arrivalPoint": "Camden Road Rail Station",
          "departure": "2023-11-20T16:03:00",
          "departurePoint": "NW1 9HU",
          "disruptions": [],
          "distance": "339m",
          "duration": 7,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to Camden Road Station"
        },
        {
          "arrival": "2023-11-20T16:20:00",
          "arrivalPoint": "Dalston Kingsland Rail Station",
          "departure": "2023-11-20T16:10:00",
          "departurePoint": "Camden Road Rail Station",
          "disruptions": [],
          "distance": "0m",
          "duration": 10,
          "isDisrupted": false,
          "line": null,
          "mode": "overground",
          "stops": [
            "Caledonian Road & Barnsbury Rail Station",
            "Highbury & Islington Rail Station",
            "Canonbury Rail Station",
            "Dalston Kingsland Rail Station"
          ],
          "summary": "London Overground towards Stratford"
        },
        {
          "arrival": "2023-11-20T16:27:00",
          "arrivalPoint": "Dalston Junction Rail Station",
          "departure": "2023-11-20T16:20:00",
          "departurePoint": "Dalston Kingsland Rail Station",
          "disruptions": [],
          "distance": "0m",
          "duration": 7,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [
            "Dalston Junction Station"
          ],
          "summary": "Walk to Dalston Junction Station"
        },
        {
          "arrival": "2023-11-20T16:41:00",
          "arrivalPoint": "Rotherhithe Rail Station",
          "departure": "2023-11-20T16:27:00",
          "departurePoint": "Dalston Junction Rail Station",
          "disruptions": [],
          "distance": "0m",
          "duration": 14,
          "isDisrupted": false,
          "line": null,
          "mode": "overground",
          "stops": [
            "Haggerston Rail Station",
            "Hoxton Rail Station",
            "Shoreditch High Street Rail Station",
            "Whitechapel Rail Station",
            "Shadwell Rail Station",
            "Wapping Rail Station",
            "Rotherhithe Rail Station"
          ],
          "summary": "London Overground towards New Cross"
        },
        {
          "arrival": "2023-11-20T16:48:00",
          "arrivalPoint": "SE16 4JB",
          "departure": "2023-11-20T16:41:00",
          "departurePoint": "Rotherhithe Rail Station",
          "disruptions": [],
          "distance": "300m",
          "duration": 7,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to SE16 4JB"
        }
      ],
      "origin": "NW19HU",
      "startDateTime": "2023-11-20T16:03:00"
    },
    {
      "arrivalDateTime": "2023-11-20T16:52:00",
      "disruptions": ['Minor delays'],
      "duration": 44,
      "fare": 340,
      "legs": [
        {
          "arrival": "2023-11-20T16:15:00",
          "arrivalPoint": "Camden Road Rail Station",
          "departure": "2023-11-20T16:08:00",
          "departurePoint": "NW1 9HU",
          "disruptions": [],
          "distance": "339m",
          "duration": 7,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to Camden Road Station"
        },
        {
          "arrival": "2023-11-20T16:20:00",
          "arrivalPoint": "Highbury & Islington Rail Station",
          "departure": "2023-11-20T16:15:00",
          "departurePoint": "Camden Road Rail Station",
          "disruptions": [],
          "distance": "0m",
          "duration": 5,
          "isDisrupted": false,
          "line": null,
          "mode": "overground",
          "stops": [
            "Caledonian Road & Barnsbury Rail Station",
            "Highbury & Islington Rail Station"
          ],
          "summary": "London Overground towards Stratford"
        },
        {
          "arrival": "2023-11-20T16:45:00",
          "arrivalPoint": "Rotherhithe Rail Station",
          "departure": "2023-11-20T16:25:00",
          "departurePoint": "Highbury & Islington Rail Station",
          "disruptions": [],
          "distance": "0m",
          "duration": 20,
          "isDisrupted": false,
          "line": null,
          "mode": "overground",
          "stops": [
            "Canonbury Rail Station",
            "Dalston Junction Rail Station",
            "Haggerston Rail Station",
            "Hoxton Rail Station",
            "Shoreditch High Street Rail Station",
            "Whitechapel Rail Station",
            "Shadwell Rail Station",
            "Wapping Rail Station",
            "Rotherhithe Rail Station"
          ],
          "summary": "London Overground towards Crystal Palace"
        },
        {
          "arrival": "2023-11-20T16:52:00",
          "arrivalPoint": "SE16 4JB",
          "departure": "2023-11-20T16:45:00",
          "departurePoint": "Rotherhithe Rail Station",
          "disruptions": [],
          "distance": "300m",
          "duration": 7,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to SE16 4JB"
        }
      ],
      "origin": "NW19HU",
      "startDateTime": "2023-11-20T16:08:00"
    },
    {
      "arrivalDateTime": "2023-11-20T16:58:00",
      "disruptions": [],
      "duration": 41,
      "fare": 340,
      "legs": [
        {
          "arrival": "2023-11-20T16:24:00",
          "arrivalPoint": "Camden Road Rail Station",
          "departure": "2023-11-20T16:17:00",
          "departurePoint": "NW1 9HU",
          "disruptions": [],
          "distance": "339m",
          "duration": 7,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to Camden Road Station"
        },
        {
          "arrival": "2023-11-20T16:29:00",
          "arrivalPoint": "Highbury & Islington Rail Station",
          "departure": "2023-11-20T16:24:00",
          "departurePoint": "Camden Road Rail Station",
          "disruptions": [],
          "distance": "0m",
          "duration": 5,
          "isDisrupted": false,
          "line": null,
          "mode": "overground",
          "stops": [
            "Caledonian Road & Barnsbury Rail Station",
            "Highbury & Islington Rail Station"
          ],
          "summary": "London Overground towards Stratford"
        },
        {
          "arrival": "2023-11-20T16:51:00",
          "arrivalPoint": "Rotherhithe Rail Station",
          "departure": "2023-11-20T16:32:00",
          "departurePoint": "Highbury & Islington Rail Station",
          "disruptions": [],
          "distance": "0m",
          "duration": 19,
          "isDisrupted": false,
          "line": null,
          "mode": "overground",
          "stops": [
            "Canonbury Rail Station",
            "Dalston Junction Rail Station",
            "Haggerston Rail Station",
            "Hoxton Rail Station",
            "Shoreditch High Street Rail Station",
            "Whitechapel Rail Station",
            "Shadwell Rail Station",
            "Wapping Rail Station",
            "Rotherhithe Rail Station"
          ],
          "summary": "London Overground towards West Croydon"
        },
        {
          "arrival": "2023-11-20T16:58:00",
          "arrivalPoint": "SE16 4JB",
          "departure": "2023-11-20T16:51:00",
          "departurePoint": "Rotherhithe Rail Station",
          "disruptions": [],
          "distance": "300m",
          "duration": 7,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to SE16 4JB"
        }
      ],
      "origin": "NW19HU",
      "startDateTime": "2023-11-20T16:17:00"
    },
    {
      "arrivalDateTime": "2023-11-20T17:43:00",
      "disruptions": [],
      "duration": 103,
      "fare": 0,
      "legs": [
        {
          "arrival": "2023-11-20T17:43:00",
          "arrivalPoint": "SE16 4JB",
          "departure": "2023-11-20T16:00:00",
          "departurePoint": "NW1 9HU",
          "disruptions": [],
          "distance": "9004m",
          "duration": 103,
          "isDisrupted": false,
          "line": null,
          "mode": "walking",
          "stops": [],
          "summary": "Walk to SE16 4JB"
        }
      ],
      "origin": "NW19HU",
      "startDateTime": "2023-11-20T16:00:00"
    }
  ]
}
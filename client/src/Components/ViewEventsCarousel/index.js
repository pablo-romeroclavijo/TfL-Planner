import Carousel from 'react-native-snap-carousel';
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import moment from 'moment';


async function getEvents() {
	const token = await GetAsync("token")
	try {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
			},
		}
		const response = await fetch(
			"https://metro-mingle.onrender.com/event/all",
			options
		)

		const data = await response.json()

		if (response.status == 200) {
			return filterEventsHappeningToday(data.events)
		} else {
			console.log("error")
		}
	} catch (error) {
		console.log(error)
	}
}

	//filter for today event
  const filterEventsHappeningToday = (events) => {
		// Get today's date using moment
		const today = moment().format('YYYY-MM-DD');
		const date = moment(event.date).format('YYYY-MM-DD')
		// Filter events that have a date matching today's date
		return events.filter(event => date.isSame(today, 'day'));
	  };


  
  export default function ViewEventsCarousel({ events }) {
      const renderItem = ({ item }) => (
          <View style={[styles.newEventContainer, { padding: 10 }]}>
          <Text style={styles.eventheader}>Title: {item.title}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Time: {item.time}</Text>
        <Text>Location: {item.location}</Text>
      </View>
    );
  
      return (
        <View style={styles.container}>
          <Text style={styles.heading}>Event Carousel</Text>
          <Carousel
            data={events}
            renderItem={renderItem}
            sliderWidth={350}
            itemWidth={350}
          />
          <Text> ===    ===     === </Text>
        </View>
      );
  };

  
 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      textAlign: "center",
      color: "black",
    },
    heading: {
      fontSize: 30,
      fontWeight: "bold",
      color: "black",
      paddingTop: 20,
    },
    newEventContainer: {
      width: 280,
      margin: 40,
      backgroundColor: "lightblue",
      borderRadius: 10,
    },
    eventheader: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
    },
  });
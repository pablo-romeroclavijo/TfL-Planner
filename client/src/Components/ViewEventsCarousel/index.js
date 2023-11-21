import React from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import moment from 'moment';

const { width } = Dimensions.get('window');

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
    const today = moment().format('YYYY-MM-DD');
    return events.filter(event => moment(event.date).isSame(today, 'day'));
  };
  
  const ViewEventsCarousel = ({ events }) => {
    const renderItem = ({ item }) => (
      <View style={styles.newEventContainer}>
        <Text style={styles.eventheader}>Title: {item.title}</Text>
        <Text>Date: {item.date}</Text>
        <Text>Time: {item.time}</Text>
        <Text>Location: {item.location}</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Event Carousel</Text>
        <FlatList
          data={events}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.title} // Change this based on your event structure
          style={styles.flatListStyle}
        />
        <Text> === === === </Text>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      textAlign: 'center',
      color: 'black',
    },
    heading: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      paddingTop: 20,
    },
    newEventContainer: {
      width: width - 40, // Adjust width based on your design
      margin: 20,
      backgroundColor: 'lightblue',
      borderRadius: 10,
      padding: 10,
    },
    eventheader: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    flatListStyle: {
      flex: 1,
    },
  });
  
  export default ViewEventsCarousel;

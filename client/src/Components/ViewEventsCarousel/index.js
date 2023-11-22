import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Dimensions, StyleSheet } from 'react-native';
import { ScrollView} from 'react-native';

import moment from 'moment';

const { width } = Dimensions.get('window');


  
  const ViewEventsCarousel = ({ events, title }) => {
  const [activeSlide, setActiveSlide] = useState(0);


  console.log(events)

  const handleScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };
  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {events.map((_, index) => (
          <View key={index} style={[styles.dot, activeSlide === index && styles.activeDot]} />
        ))}
      </View>
    );
  };


  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>{title}</Text>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={styles.scrollViewStyle}
        >
          {events.map((event, index) => (
          
          <View key={index} style={[styles.slide, { backgroundColor: "lightblue" }]}>
            <ScrollView style={styles.contentScroll}>
              <View style={styles.newEventContainer}>
              <Text style={styles.eventheader}>{event.title}</Text>
              <Text>Date: {moment(event.date).format("ddd, DD MMM YYYY")}</Text>
              <Text>Time: {moment(event.date).format("HH:mm")}</Text>
              <Text>Description: {event.description}</Text>
              <Text>Invite code: {event.share_code}</Text>
              <Text>Postcode: {event.postcode}</Text>
          </View>
            </ScrollView>
        
          </View>
        ))}
      </ScrollView>
        {renderDots()}
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
      margin: 10,
      borderRadius:10
    },
    heading: {
      
      fontSize: 23,
      fontWeight: 'bold',
      color: 'black',
      paddingTop: 10,
    },
    newEventContainer: {
      width: width - 40, // Adjust width based on your design
      margin: 10,
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
    dotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 20, // Adjust as needed
    },
    dot: {
      height: 10,
      width: 10,
      borderRadius: 5,
      backgroundColor: '#ddd',
      margin: 5,
    },
    activeDot: {
      backgroundColor: 'grey',
    },
  });
  
  export default ViewEventsCarousel;

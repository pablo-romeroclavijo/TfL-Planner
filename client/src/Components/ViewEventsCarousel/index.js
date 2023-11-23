
import { View, Text, FlatList, Dimensions, StyleSheet, Alert} from 'react-native';
import { ScrollView, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';


import moment from 'moment';

const { width } = Dimensions.get('window');
const invites_2 = [
  {
    title: "La Fosse Reunion",
    date: "Wed, 22 Nov 2023 18:01:00 GMT",
    location: "Bunga Bunga",
    sharecode: 'm1q9384gWF'
  }

]


  
  const acceptInvite = async (sharecode) => {
    const token = await GetAsync("token")
    console.log(sharecode, token)
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      }
      const response = await fetch(
        `https://metro-mingle.onrender.com/event/${sharecode}`,
        options
      )

      const data = await response.json()
      Alert.alert("Accept accepted")
    } catch (error) {
      console.log(error)
    }   

  }
const ViewEventsCarousel = ({ events, title , button, setInvites}) => {
  const [activeSlide, setActiveSlide] = useState(0);



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
  const print = (statement) => {
    console.log(statement)
  }

  function splitDate(timestamp) {
    const dateObj = new Date(timestamp);
    console.log('here', timestamp)
  
    // Formatting the date as DDMMYY
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = dateObj.getFullYear().toString().substr(-2);
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate}

  function splitTime(timestamp) {
    // Formatting the time as HH:MM:SS

    const dateObj = new Date(timestamp);
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
  
    return formattedTime ;
  }
  

  
  

  
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
          
          <View key={index}>
            <ScrollView>
              <View style={styles.newEventContainer}>

                <View  style={styles.header}>
                  <Text style={styles.eventheader}>{event.title}</Text>
                  <Text style={styles.location}>{event.location}</Text>
                </View>
                <View  style={styles.body}>
                  <Text><Text style={{fontWeight: 'bold'}}>Date: </Text>{splitDate(event.date)}</Text>
                  <Text><Text style={{fontWeight: 'bold'}}>Time: </Text>{splitTime(event.date)}</Text>
                </View>
                <View>
                 { button && <View style = {styles.buttonContainer}>
                  <TouchableOpacity style={styles.button1} onPress={() => {setInvites(invites_2); Alert.alert("Success", "Event joined successfully")}}>
                    <Text style={styles.buttonText}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button2} onPress={() => console.log('declined')}>
                    <Text style={styles.buttonText}>Decline</Text>
                  </TouchableOpacity>
                  </View>}
                </View>
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
      padding: 5,
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    location: {
      padding: 9,
      fontSize: 15,
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
    body: {
      marginBottom: 8,
      flexDirection: "row",
      justifyContent: 'space-around',
      width: "100%",
      //backgroundColor: 'white',
      
    },
    header: {
      marginBottom: 8,
      flexDirection: "row",
      paddingLeft: 10,
      justifyContent: 'space-between',
      columnGap:20,
      width: "100%",
      //backgroundColor: 'white',
    },
      
    buttonContainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    
    button1: {
    
      padding: 10,
      backgroundColor: 'rgb(71,141,185)' ,
      borderRadius: 5,
      margin: 10,
    },
    button2: {
      padding: 10,
      backgroundColor: 'rgb(250,60,70)' ,
      borderRadius: 5,
      margin: 10,
    },
    buttonText:{
      color: "white",
      fontWeight: '800'
    }

  });
  
  export default ViewEventsCarousel;

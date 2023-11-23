import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RouteInfo = ({ duration, fare, warningText, arrival }) => {
  // Determine the color of the conditional element based on the content

  const getColor = () => {
    if (warningText.length > 0) {
      return warningText.includes('CRITICAL:') ? 'red' : 'yellow';
    }
    return 'transparent';
  };
  
  let arrivelDate = new Date(arrival)
  let time = `${arrivelDate.getHours()}:${arrivelDate.getMinutes()}`
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Duration: {`${duration} minutes     `}</Text>
        <Text>Arrival Time: {time}</Text>

      </View>
      <View style={styles.header}>

        <Text>Cost: £3.40</Text>
      </View>
      {warningText.length > 0 && (
        <View style={[styles.warning, { backgroundColor: getColor() }]}>
          <Image
            source={require('../../assets/warningICon.png')} // Replace with your warning icon path
            style={styles.icon}
          />
          <Text>{warningText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container:{ 
    padding: 15,
    paddingRight: 25,
    paddingLeft: 25,
    borderRadius:25,
    backgroundColor: '#f0f0f0',
    rowGap: 10
    
  },
  warningText:{},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  warning: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 260,
    padding: 10,
    marginTop:5,
    borderRadius:15,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default RouteInfo;

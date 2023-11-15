import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import AppButton from "../../Components/AppButton/AppButton";
import { CreateEventForm, CreateEventModal } from "../../Components";

export default function Home({ navigation }) {
  const [createEvent, setCreateEvent] = useState(false);
  const [joinEvent, setJoinEvent] = useState(false);
  const [viewEvent, setViewEvent] = useState(false);

  useEffect(() => {}, [createEvent]);

  async function clickCreateEvent() {
    setCreateEvent(!createEvent);
  }

  return (
    // <ImageBackground source={image} style={{ width: "100%", height: "100%" }}>
    <View style={styles.container}>
      <Text style={styles.title}>My Home</Text>
      <View style={styles.newEventContainer}>
        <AppButton onPress={clickCreateEvent} title="Create Event" />
        {createEvent ? (
          <CreateEventModal closeModal={clickCreateEvent} createEvent={createEvent}/>
        ) : null}
      
	  
	  </View>
      <View style={styles.newEventContainer}>
        <AppButton title="Join Event" />
      </View>

	  
      <View style={styles.newEventContainer}>
        <AppButton title="View Events" />
      </View>
    </View>
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
  },
  newEventContainer: {
    width: 350,
    margin: 40,
  },
  subHeading: {
    textAlign: "center",
  },
});

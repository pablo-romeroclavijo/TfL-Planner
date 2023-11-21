import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Modal, Svg, SafeAreaView, ScrollView } from "react-native"
import { CreateEventForm, CreateEventModal, AppButton, Header,  ViewEventsCarousel} from "../../Components"

export default function Home({ navigation }) {
	const [createEvent, setCreateEvent] = useState(false)
	const [joinEvent, setJoinEvent] = useState(false)
	const [viewEvent, setViewEvent] = useState(false)

	useEffect(() => {}, [createEvent])

	async function clickCreateEvent() {
		setCreateEvent(!createEvent)
	}

	const clickViewEvent = () => {
		setViewEvent(!viewEvent);
	  };
	  const events = [
		{ title: 'Event 1', date: '2023-12-01', time: '12:00 PM', location: 'Venue 1' },
		{ title: 'Event 2', date: '2023-12-01', time: '2:30 PM', location: 'Venue 2' },
	  
	  ];


	return (
		// <ImageBackground source={image} style={{ width: "100%", height: "100%" }}>
	<ScrollView style={styles.container}>
						<Header />
			<View style={{alignSelf: "center"}}>

			</View>
			<Text style={styles.title}>My Home</Text>

        	<ViewEventsCarousel events={events} />

			<View style={styles.newEventContainer}>
				<AppButton onPress={clickCreateEvent} title="Create Event" />
				{createEvent ? (
					<CreateEventModal
						closeModal={clickCreateEvent}
						createEvent={createEvent}
					/>
				) : null}
			</View>
			<View style={styles.newEventContainer}>
				<AppButton title="Join Event" />
			</View>

			
		</ScrollView>
		// </ImageBackground>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
})

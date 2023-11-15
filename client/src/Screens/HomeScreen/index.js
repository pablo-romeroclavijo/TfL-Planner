import { View, Button, Text, ImageBackground, ScrollView, StyleSheet, Modal } from "react-native"
import React, { useEffect, useState } from "react"
import AppButton from "../../Components/AppButton/AppButton"
import { CreateEventForm } from "../../Components"

export default function Home({ navigation }) {
	// const image = require("../src/assets/background1.png")
	
	const [createEvent, setCreateEvent] = useState(false)
	const [joinEvent, setJoinEvent] = useState(false)
	const [viewEvent, setViewEvent] = useState(false)
	
	useEffect(()=>{

		

	},[createEvent])


	async function clickCreateEvent(){
		setCreateEvent(!createEvent)
	}



	return (
		// <ImageBackground source={image} style={{ width: "100%", height: "100%" }}>
			<View style={styles.container}>
				<Text style={styles.title}>My Home</Text>

				<View style={styles.newEventContainer} >
				
					<AppButton onPress={clickCreateEvent} title="Create Event"/>
					{ createEvent ? (
					<Modal
					animationType="slide"
					visible={createEvent}
					onRequestClose={()=>setCreateEvent(false)}
					>
						{CreateEventForm}
					</Modal> ) : null}
				</View> 

				<View style={styles.newEventContainer} >
					
					<AppButton title="Join Event"/>
				</View>
				
				<View style={styles.newEventContainer} >
					
					<AppButton title="View Events"/>
				</View>

			</View>
		// </ImageBackground>
	)
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
			textAlign: "center"
	}
}
)
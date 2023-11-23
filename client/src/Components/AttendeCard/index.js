import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable, Modal } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import SlideBox from "../SlideBox"
import SVG from "../MapSVG"
import moment from "moment"
import RouteInfo from '../RouteDetails';

export default function AttendeeCard({ person }) {
	const [modalVisible, setModalVisible] = useState(false)
	const [attendee1, setAttendee1] = useState({ person })
	console.log("TYPE", typeof person.route)

	return (
		<View>
			<Pressable onLongPress={() => setModalVisible(true)}>
				<View style={styles.attendee} key={person.user_id}>
					<Text style={styles.attendeeName}>{person.username}</Text>
					<Text style={styles.attendeeStatus}><Text style={{fontWeight: 'bold'}}>Status: </Text> {person.status}</Text>
					<Text style={styles.attendeeETA}><Text style={{fontWeight: 'bold'}}>ETA: </Text>
					{person.ETA == null ? null: (moment(person.ETA).format("HH:mm"))}
					</Text>
				</View>
			</Pressable>

			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<ScrollView>
					<View style={styles.view}>
						<SVG journey={person.route} user={true} />
					
					<Pressable style ={styles.button1}onPress={() => setModalVisible(false)}>
							<Text style ={styles.buttonText}>Close</Text>
					</Pressable>
					</View>
				</ScrollView>
			</Modal>
		</View>
	)
}
const styles = StyleSheet.create({
	attendee: {
		backgroundColor: "lightblue", // Light red background for each attendee
		padding: 10,
		marginBottom: 10,
		borderRadius: 8,
	},
	attendeeName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333", // Dark text color
	},
	attendeeStatus: {
		fontSize: 16,
		color: "#333", // Dark text color
	},
	attendeeETA: {
		fontSize: 16,
		color: "#333", // Dark text color
	}, // Style for the outermost view
	view: {
		marginTop: 200,
		borderColor:' black',
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: "white", // White background
		opacity: 1, // Semi-transparent
		width: 300,
		height: "fit-content",


		borderRadius: 8,

		paddingTop: 0,
	},

button1: {
  padding: 10,
  backgroundColor: 'rgb(71,141,185)' ,
  borderRadius: 5,
  margin: 10,
},
buttonText:{
  color: "white",
  fontWeight: '800',
  alignSelf: "center"
}
})

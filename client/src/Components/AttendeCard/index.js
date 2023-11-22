import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable, Modal } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import SlideBox from "../SlideBox"
import SVG from "../MapSVG"
import moment from "moment"

export default function AttendeeCard({ person }) {
	const [modalVisible, setModalVisible] = useState(false)
	const [attendee1, setAttendee1] = useState({ person })
	console.log("TYPE", typeof person.route)

	return (
		<View>
			<Pressable onLongPress={() => setModalVisible(true)}>
				<View style={styles.attendee} key={person.user_id}>
					<Text style={styles.attendeeName}>{person.username}</Text>
					<Text style={styles.attendeeStatus}>Status: {person.status}</Text>
					<Text style={styles.attendeeETA}>
					ETA: {person.ETA == null ? null: (moment(person.ETA).format("HH:mm"))}
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
						<Pressable onPress={() => setModalVisible(false)}>
							<Text>Close</Text>
						</Pressable>
						<SVG journey={person.route} user={true} />
					</View>
				</ScrollView>
			</Modal>
		</View>
	)
}
const styles = StyleSheet.create({
	attendee: {
		backgroundColor: "#FFD1D1", // Light red background for each attendee
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
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: "grey", // White background
		opacity: 0.8, // Semi-transparent
		width: 300,
		height: "fit-content",

		borderRadius: 8,

		paddingTop: 50,
	},
})

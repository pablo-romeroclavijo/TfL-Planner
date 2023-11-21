import React, { useState, useEffect } from "react"
import {
	StyleSheet,
	View,
	Text,
	Pressable,
	FlatList,
	Modal,
} from "react-native"
import GetAsync from "../AsyncStorageGet"
import LoadingModal from "../LoadingModal"
import EventsRoutesForm from "../EventRouteSelector"
import GestureRecognizer from "react-native-swipe-gestures"
import moment from "moment"
import { useIsFocused } from "@react-navigation/native"
import AttendeeCard from "../AttendeCard"
const EventModal = ({ onClose, code }) => {
	const [event, setEvent] = useState({})
	const [attendees, setAttendees] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [Route, setRoute] = useState(false)
	const isFocused = useIsFocused()

	useEffect(() => {
		getEvent(code).then((data) => {
			setEvent(data.event)
			setAttendees(data.attendees)
			setIsLoading(false)
		
		})
	}, [code])
	return (
		<View style={styles.modalContent}>
			<Pressable style={styles.closeButton} onPress={onClose}>
				<Text style={styles.closeButtonText}>Close</Text>
			</Pressable>
			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<>
					<View style={styles.header}>
						<Text style={styles.headerText}>{event.title}</Text>
						<Text style={styles.dateText}>
							{moment(event.date).format("ddd, DD MMM YYYY")}
						</Text>
						<Text style={styles.dateText}>
							{moment(event.date).format("HH:mm")}
						</Text>
						<Text style={styles.codeText}>{event.code}</Text>
						<Text style={styles.locationText}>{event.postcode}</Text>
						<Pressable onPress={() => setRoute(true)}>
							<Text>set jounrey </Text>
						</Pressable>
					</View>
					<Text style={styles.descriptionText}>{event.description}</Text>
					<FlatList
						data={attendees}
						keyExtractor={(item) => item.user_id}
						renderItem={({ item }) => <AttendeeCard person={item} />}
					/>

					<GestureRecognizer>
						<Modal
							visible={Route}
							onPress={() => setRoute(false)}
							animationType="fade"
							onRequestClose={() => setRoute(false)}
						>
							<EventsRoutesForm event={event} />
						</Modal>
					</GestureRecognizer>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	modalContent: {
		flex: 1,
		padding: 20,
		backgroundColor: "#FF6363", // Red background color
	},
	closeButton: {
		alignSelf: "flex-start",
		marginBottom: 10,
	},
	closeButtonText: {
		fontSize: 18,
		color: "#FFF", // White color
	},
	header: {
		alignItems: "center",
		marginBottom: 20,
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FFF", // White color
	},
	dateText: {
		fontSize: 16,
		color: "#FFF", // White color
	},
	codeText: {
		fontSize: 16,
		color: "#FFF", // White color
	},
	locationText: {
		fontSize: 16,
		color: "#FFF", // White color
	},
	descriptionText: {
		fontSize: 16,
		color: "#FFF", // White color
		marginBottom: 20,
	},

	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
	},
	// Style for the modal view to make it appear smaller
	modal: {
		width: "80%", // for example, 80% of the screen width
		height: "50%", // for example, 50% of the screen height
		backgroundColor: "white", // background color for the modal content
		borderRadius: 10, // optional, if you want rounded corners
		padding: 20, // optional, for padding inside the modal
		// Add other styling as needed
	},
})

export default EventModal
async function getEvent(code) {
	const token = await GetAsync("token")
	try {
		const options = {
			method: "GET",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": token,
			},
		}
		const response = await fetch(
			`https://metro-mingle.onrender.com/event/${code}/details`,
			options
		)

		const data = await response.json()

		if (response.status == 200) {
			return data
		} else {
			console.log(data)
		}
	} catch (error) {
		console.log(error)
	}
}

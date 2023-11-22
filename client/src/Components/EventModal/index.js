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
const EventModal = ({ onClose, code, id }) => {
	const [event, setEvent] = useState({})
	const [attendees, setAttendees] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [Route, setRoute] = useState(false)
	const [user, setUser] = useState({})
	const [renderItem, setRender] = useState("")

	const isFocused = useIsFocused()
	const fetchAttendeesData = async () => {
		try {
			const data = await getEvent(code)
			if (data && data.attendees) {
				const attendeesA = data.attendees
				const userAttendee = attendeesA.find((obj) => obj.user_id == id)
				setUser(userAttendee)

				const updatedAttendees = attendeesA.filter((item) => item.user_id != id)
				console.log("updatedAttendees", userAttendee)
				setAttendees(updatedAttendees)
			}
		} catch (error) {
			console.error("Failed to fetch attendees data:", error)
		}
	}

	async function closeModal() {
		setRoute(!Route)
		await fetchAttendeesData()
	}
	useEffect(() => {
		// Function to fetch event data only once
		const fetchInitialEvent = async () => {
			setIsLoading(true)
			try {
				const data = await getEvent(code)
				setEvent(data.event) // Set the event data only once
			} catch (error) {
				console.error("Failed to fetch event data:", error)
			} finally {
				setIsLoading(false)
			}
		}

		// Function to fetch attendees data, can be used on mount and in interval

		if (Object.keys(event).length === 0) {
			fetchInitialEvent() // Fetch event data on mount
		}

		// Define a function to handle the setting up and clearing of the interval
		let interval
		const setupInterval = () => {
			fetchAttendeesData() // Also fetch attendees data on mount
			interval = setInterval(fetchAttendeesData, 120000) // Refresh attendees every 2 minutes
		}

		// Call setupInterval when the modal opens

		setupInterval()

		// Clear the interval when the modal closes
		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [Route]) // Dependency array

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
						<Text style={styles.headerText}> {event.title}</Text>
						<Text style={styles.dateText}>
							{moment(event.date).format("ddd, DD MMM YYYY")}
						</Text>
						<Text style={styles.dateText}>
							{moment(event.date).format("HH:mm")}
						</Text>
						<Text style={styles.codeText}>{event.code}</Text>
						<Text style={styles.locationText}>{event.postcode}</Text>
						<View style={styles.Button}>
							{user.status == "journey set" ? (
								<Pressable onPress={() => setRoute(true)}>
									<Text>Update Journey </Text>
								</Pressable>
							) : (
								<Pressable onPress={() => setRoute(true)}>
									<Text>Set Journey </Text>
								</Pressable>
							)}
						</View>
						{user.status == "Pending" ? null : user.status == "journey set" ? (
							<Pressable
								onPress={async () => {
									await journeyStarted(user) // Wait for this async operation to complete
									setRender((prevRender) => prevRender + "s") // Trigger a re-render
									fetchAttendeesData() // Re-fetch the attendees list
								}}
							>
								<Text>I have left </Text>
							</Pressable>
						) : user.route === "Arrived" ? (
							<Pressable
								onPress={async () => {
									await setArrived(user) // Wait for this async operation to complete
									setRender((prevRender) => prevRender + "s") // Trigger a re-render
									fetchAttendeesData() // Re-fetch the attendees list
								}}
							>
								<Text>I have arrived </Text>
							</Pressable>
						) : null}
					</View>
					<Text style={styles.descriptionText}>{event.description}</Text>
					<Text style={styles.descriptionText}>My Route</Text>
					<AttendeeCard person={user} />
					<Text style={styles.descriptionText}>Attendees</Text>
					<FlatList
						data={attendees}
						keyExtractor={(item) => item.user_id}
						renderItem={({ item }) => <AttendeeCard person={item} />}
					/>

					<GestureRecognizer>
						<Modal
							animationType="slide"
							visible={Route}
							onPress={() => setRoute(false)}
							animationType="fade"
							onRequestClose={() => closeModal()}
						>
							<EventsRoutesForm event={event} onClose={() => setRoute(false)} />
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
		backgroundColor: "lightblue", // Red background color
	},
	closeButton: {
		alignSelf: "flex-start",
		marginBottom: 10,
	},
	Button: {
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
	console.log("token", token)

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
async function setArrived(user) {
	const token = await GetAsync("token")
	console.log("token", token)

	try {
		const id = user.event_id
		const route = user.route
		const options = {
			method: "PATCH",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": token,
			},
			body: JSON.stringify({
				status: "Arrived",
				event_id: id,
				journey: route,
			}),
		}
		const response = await fetch(
			"https://metro-mingle.onrender.com/event/setroute",
			options
		)
		console.log("response", response.status)
		if (response.status == 200) {
			alert("Route set.")
		} else {
			alert("Request failed.")
		}
	} catch (error) {
		console.log(error)
	}
}
async function journeyStarted(user) {
	const token = await GetAsync("token")
	try {
		const id = user.event_id
		console.log("id", id)
		const route = user.route
		console.log("route", route)
		const options = {
			method: "PATCH",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": token,
			},
			body: JSON.stringify({
				status: "Started journey",
				event_id: id,
				journey: route,
			}),
		}
		const response = await fetch(
			"https://metro-mingle.onrender.com/event/setroute",
			options
		)
		console.log("options", options)
		console.log("response", response.status)
		if (response.status == 200) {
			alert("Route set.")
		} else {
			alert("Request failed.")
		}
	} catch (error) {
		console.log(error)
	}
}

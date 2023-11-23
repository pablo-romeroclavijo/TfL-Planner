import React from "react"
import { StyleSheet, View, Text, Pressable } from "react-native"
import moment from "moment"
import GetAsync from "../AsyncStorageGet"
const EventCard = ({ event, handlePress, key, id }) => {
	// Removed `key` prop, it's not used here

	return (
		<Pressable onPress={handlePress}>
			<View style={styles.card}>
				<View style={styles.header}>
					<Text style={styles.headerText}>{event.title}</Text>
					<View style={styles.dateTimeContainer}>
						<Text style={styles.dateText}>
							{moment(event.date).format("ddd DD MMM YYYY")}
						</Text>
						<Text style={styles.timeText}>
							{moment(event.date).format("HH:mm")}
						</Text>
					</View>
				</View>
				<View style={styles.body}>
					<Text style={styles.bodyText}>{event.description}</Text>
				</View>
				<View style={styles.footer}>
					{event.creator_id == id ? (
						<Text style={styles.codeText}>Code: {event.share_code}</Text>
					) : null}
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "lightblue",
		borderRadius: 10,
		padding: 16,
		margin: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 10,
		width: 350, // Use a percentage or "auto" for responsiveness
		alignSelf: "center", // Center the card horizontally
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between", // Align header content to the left and date/time to the right
		alignItems: "center", // Align items vertically
		marginBottom: 8,
	},
	dateTimeContainer: {
		flexDirection: "column", // Align date and time horizontally
		alignItems: "center", // Align items vertically
		marginRight: 4,
	},
	dateText: {
		fontSize: 16,
		color: "#555",
		fontWeight: "bold",
		marginRight: 0, // Add some space between the date and time
	},
	timeText: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
	},
	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333", // Choose your text color
	},
	body: {
		marginBottom: 8,
		flexDirection: "column",
		backgroundColor: "#fff",
		width: 200,
	},
	bodyText: {
		fontSize: 16,
		color: "#333", // Choose your text color
	},
	locationText: {
		fontSize: 16,
		color: "#555", // Choose your text color
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	codeText: {
		fontSize: 16,
		color: "#333", // Choose your text color
	},
	button: {
		backgroundColor: "#78A9FF", // Set your desired color
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 4,
	},
	buttonText: {
		fontSize: 16,
		color: "#FFF", // Choose your text color
		fontWeight: "bold",
	},
})

// Usage
const event = {
	title: "John's events",
	date: "07 October 2023",
	description: "Pub link up after a long time",
	time: "17:40",
	location: "SE15 2RS",
	code: "2HSFCEs",
}

export default EventCard

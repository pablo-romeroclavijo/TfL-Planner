import React from "react"
import { StyleSheet, View, Text, Pressable } from "react-native"

const EventCard = ({ event, handlePress, key }) => {
	return (
		<Pressable key={key} onPress={handlePress}>
			<View style={styles.card}>
				<View style={styles.header}>
					<Text style={styles.headerText}>{event.title}</Text>
					<Text style={styles.dateText}>{event.date}</Text>
				</View>
				<View style={styles.body}>
					<Text style={styles.bodyText}>{event.description}</Text>
					<View style={styles.timeLocation}>
						<Text style={styles.timeText}>{event.time}</Text>
						<Text style={styles.locationText}>{event.location}</Text>
					</View>
				</View>

				<View style={styles.footer}>
					<Text style={styles.codeText}>Code: {event.share_code}</Text>
				</View>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#CDE4D0", // Set your desired color
		borderRadius: 10,
		padding: 16,
		margin: 20,
		// shadowColor: "#000",
		// shadowOffset: { width: 0, height: 2 },
		// shadowOpacity: 0.25,
		// shadowRadius: 3.84,
		// elevation: 5,
		width: 350,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333", // Choose your text color
	},
	dateText: {
		fontSize: 16,
		color: "#555", // Choose your text color
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
	timeText: {
		fontSize: 16,
		fontWeight: "bold",
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

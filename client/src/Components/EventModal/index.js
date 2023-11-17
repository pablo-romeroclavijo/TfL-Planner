import React, { useState } from "react"
import { StyleSheet, View, Text, Pressable, FlatList } from "react-native"

const EventModal = ({ visible, onClose, event, attendees }) => {
	return (
		<View style={styles.modalContent}>
			<Pressable style={styles.closeButton} onPress={onClose}>
				<Text style={styles.closeButtonText}>Close</Text>
			</Pressable>
			<View style={styles.header}>
				<Text style={styles.headerText}>{event.title}</Text>
				<Text style={styles.dateText}>{event.date}</Text>
				<Text style={styles.codeText}>{event.code}</Text>
				<Text style={styles.locationText}>{event.location}</Text>
			</View>

			<Text style={styles.descriptionText}>{event.description}</Text>

			<FlatList
				data={attendees}
				keyExtractor={(item) => item.name}
				renderItem={({ item }) => (
					<View style={styles.attendee}>
						<Text style={styles.attendeeName}>{item.name}</Text>
						<Text style={styles.attendeeStatus}>{item.status}</Text>
						<Text style={styles.attendeeETA}>ETA: {item.eta}</Text>
					</View>
				)}
			/>
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
	},
})

export default EventModal

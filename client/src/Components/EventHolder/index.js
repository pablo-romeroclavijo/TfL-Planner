import React, { useEffect, useState } from "react"
import {
	Modal,
	View,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native"
import { EventCard, EventModal } from ".."

export default function EventHolder({ events }) {
	const [modalshow, setModalShow] = useState(false)
	const [event, setEvent] = useState({})

	return (
		<View style={styles.container}>
			<FlatList
				data={events}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<EventCard
						handlePress={() => setModalShow(true)}
						key={item.key}
						event={item}
					/>
				)}
			/>
			{modalshow ? (
				<Modal>
					<TouchableOpacity
						style={styles.container}
						onPress={() => setModalShow(false)}
						style={styles.closeButton}
					>
						<Text style={styles.closeButtonText}>X</Text>
					</TouchableOpacity>

					<EventModal
						visible={modalshow}
						event={events[0]}
						attendees={events[0].attendees}
					/>
				</Modal>
			) : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})

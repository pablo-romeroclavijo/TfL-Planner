import React, { useEffect, useState } from "react"
import {
	SafeAreaView,
	Modal,
	View,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
} from "react-native"

import EventCard from "../EventCard"
import EventModal from "../EventModal"
import GestureRecognizer from "react-native-swipe-gestures"
import FilterDropdown from "../FilterDropdwon"

export default function EventHolder({ events }) {
	const [modalshow, setModalShow] = useState(false)
	const [event, setEvent] = useState({})
	useEffect(() => {
		console.log("EventHolder.js: ", event)
	}, [modalshow])

	const [selectedFilter, setSelectedFilter] = useState("all")

	return (
		<SafeAreaView>
			<FilterDropdown
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
			/>
			<View style={styles.list}>
				<FlatList
					data={events}
					keyExtractor={(item) => item.id.toString()} // Assuming 'id' is the unique identifier
					renderItem={({ item }) => (
						<EventCard
							handlePress={() => {
								setModalShow(true)
								setEvent(item) // You might want to update this line to actually set the event you want to show in the modal.
							}}
							// key={item.id.toString()} // Remove this line, the key in renderItem is not needed and can cause confusion.
							event={item}
						/>
					)}
				/>
			</View>

			{modalshow ? (
				<GestureRecognizer onSwipeDown={() => setModalShow(false)}>
					<Modal style={styles.modal}>
						<EventModal
							visible={modalshow}
							event={event}
							onClose={() => setModalShow(false)}
							attendees={event.attendees}
						/>
					</Modal>
				</GestureRecognizer>
			) : null}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 20,
	},
	modal: {
		backgroundColor: "#FF6363",
		padding: 20,
	},
	list: { paddingTop: 20 },
})

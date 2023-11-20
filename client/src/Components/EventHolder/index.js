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
import FilterDropdown from "../FilterDropdown"
import moment from "moment"
import GetAsync from "../AsyncStorageGet"
export default function EventHolder({ events }) {
	const [modalshow, setModalShow] = useState(false)
	const [event, setEvent] = useState({})
	const [eventsList, setEventsList] = useState([])
	const [filteredEvents, setFilteredEvents] = useState([])
	const [selectedFilter, setSelectedFilter] = useState("All")

	useEffect(() => {
		getEvents().then((data) => {
			setEventsList(data)
			setFilteredEvents(data)
		})
	}, [])

	useEffect(() => {
		let filteredEvents = eventsList // Start with all events
		const format = "ddd, DD MMM YYYY HH:mm:ss [GMT]"

		if (selectedFilter === "Past") {
			filteredEvents = eventsList.filter((event) =>
				moment(event.date, format).isBefore(moment())
			)
			filteredEvents.sort(
				(a, b) =>
					moment(a.date, format).valueOf() - moment(b.date, format).valueOf() // Sorts in descending order
			)
		} else if (selectedFilter === "future") {
			filteredEvents = eventsList
				.filter((event) => moment(event.date, format).isAfter(moment()))
				.sort(
					(a, b) =>
						moment(b.date, format).valueOf() - moment(a.date, format).valueOf()
				) // Sorts in ascending order
		}
		filteredEvents.sort(sortFilter) // Sorts in ascending order
		setFilteredEvents(filteredEvents) // Sorts in ascending order) // Update the state with the filtered events
		console.log("filtered", filteredEvents)
	}, [selectedFilter, eventsList]) // Assuming eventsList is a dependency

	return (
		<SafeAreaView>
			<FilterDropdown
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
			/>
			<View style={styles.list}>
				<FlatList
					data={filteredEvents}
					keyExtractor={(item) => item.key} // Assuming 'id' is the unique identifier
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

			<GestureRecognizer onSwipeDown={() => setModalShow(false)}>
				<Modal style={styles.modal} visible={modalshow}>
					<EventModal
						code={event.share_code}
						onClose={() => setModalShow(false)}
					/>
				</Modal>
			</GestureRecognizer>
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
	list: { paddingTop: 20, paddingBottom: 90 },
})

async function getEvents() {
	const token = await GetAsync("token")
	try {
		const options = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": token,
			},
		}
		const response = await fetch(
			"https://metro-mingle.onrender.com/event/all",
			options
		)

		const data = await response.json()

		if (response.status == 200) {
			return data.events
		} else {
			console.log(data)
		}
	} catch (error) {
		console.log(error)
	}
}

function sortFilter(a, b) {
	// Parse the dates
	const format = "ddd, DD MMM YYYY HH:mm:ss [GMT]"
	const dateA = moment(a.date, format)
	const dateB = moment(b.date, format)
	const now = moment()

	// Check if either date is the current date (or very close to it, depending on the precision of your dates)
	const isTodayA = dateA.isSame(now, "day")
	const isTodayB = dateB.isSame(now, "day")

	// If both dates are today, sort them normally
	if (isTodayA && isTodayB) {
		return dateA.valueOf() - dateB.valueOf()
	}

	// If dateA is today and dateB is not, dateA should come first
	if (isTodayA) {
		return -1
	}

	// If dateB is today and dateA is not, dateB should come first
	if (isTodayB) {
		return 1
	}

	// Otherwise, sort dates in ascending order
	return dateB.valueOf() - dateA.valueOf()
}

import React, { useEffect, useState } from "react"
import {
	SafeAreaView,
	Modal,
	View,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	Dimensions,
} from "react-native"

import EventCard from "../EventCard"
import EventModal from "../EventModal"
import GestureRecognizer from "react-native-swipe-gestures"
import FilterDropdown from "../FilterDropdown"
import moment from "moment"
import GetAsync from "../AsyncStorageGet"
import { useIsFocused } from "@react-navigation/native"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"

const { width, height } = Dimensions.get("window")

export default function EventHolder({ events }) {
	const [modalshow, setModalShow] = useState(false)
	const [event, setEvent] = useState({})
	const [eventsList, setEventsList] = useState([])
	const [filteredEvents, setFilteredEvents] = useState([])
	const [selectedFilter, setSelectedFilter] = useState("All")
	const [id, setId] = useState("")
	const isFocused = useIsFocused()
	useEffect(() => {
		getEvents().then((data) => {
			setEventsList(data)
			setFilteredEvents(data)
		})
		getId()
	}, [isFocused])

	async function getId() {
		setId(await GetAsync("id"))
	}
	useEffect(() => {
		if (eventsList != 0) {
			let filteredEvents = eventsList // Start with all events
			const format = "ddd, DD MMM YYYY HH:mm:ss [GMT]"

			if (selectedFilter === "Past") {
				filteredEvents = eventsList.filter((event) =>
					moment(event.date, format).isBefore(moment())
				)
			} else if (selectedFilter === "future") {
				filteredEvents = eventsList.filter((event) =>
					moment(event.date, format).isAfter(moment())
				)
			}
			filteredEvents.sort(sortFilter) // Sorts in ascending order
			console.log(filteredEvents)
			setFilteredEvents(filteredEvents)
		} // Sorts in ascending order) // Update the state with the filtered events
	}, [selectedFilter, eventsList]) // Assuming eventsList is a dependency

	return (
		<SafeAreaView>
			<FilterDropdown
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
			/>
			<View style={styles.list}>
				{eventsList != 0 ? (
					<FlatList
						data={filteredEvents}
						keyExtractor={(item) => item.id} // Assuming 'id' is the unique identifier
						renderItem={({ item }) => (
							<EventCard
								handlePress={() => {
									setModalShow(true)
									setEvent(item) // You might want to update this line to actually set the event you want to show in the modal.
								}}
								// key={item.id.toString()} // Remove this line, the key in renderItem is not needed and can cause confusion.
								event={item}
								id={id}
							/>
						)}
					/>
				) : (
					<Text>add events</Text>
				)}
			</View>

			<GestureRecognizer onSwipeDown={() => setModalShow(false)}>
				<Modal style={styles.modal} visible={modalshow}>
					<EventModal
						code={event.share_code}
						onClose={() => setModalShow(false)}
						id={id}
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
	list: { paddingTop: 20, paddingBottom: 60 },
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
			console.log("error")
		}
	} catch (error) {
		console.log(error)
	}
}

// function sortFilter(a, b) {
// 	// Parse the dates
// 	const format = "ddd, DD MMM YYYY HH:mm:ss [GMT]"
// 	const dateA = moment(a.date, format)
// 	const dateB = moment(b.date, format)
// 	const now = moment()

// 	// Check if either date is the current date (or very close to it, depending on the precision of your dates)
// 	const isTodayA = dateA.isSame(now, "day")
// 	const isTodayB = dateB.isSame(now, "day")

// 	// If both dates are today, sort them normally
// 	if (isTodayA && isTodayB) {
// 		return dateA.valueOf() - dateB.valueOf()
// 	}

// 	// If dateA is today and dateB is not, dateA should come first
// 	if (isTodayA) {
// 		return -1
// 	}

// 	// If dateB is today and dateA is not, dateB should come first
// 	if (isTodayB) {
// 		return 1
// 	}

// 	// Otherwise, sort dates in ascending order
// 	return dateB.valueOf() - dateA.valueOf()
// }
function sortFilter(a, b) {
	// Parse the dates
	const format = "ddd, DD MMM YYYY HH:mm:ss [GMT]"
	const dateA = moment(a.date, format)
	const dateB = moment(b.date, format)
	const now = moment()

	// Check if either date is the current date (or very close to it)
	const isTodayA = dateA.isSame(now, "day")
	const isTodayB = dateB.isSame(now, "day")

	// If both dates are today, sort by most recent first
	if (isTodayA && isTodayB) {
		return dateB.valueOf() - dateA.valueOf()
	}

	// If dateA is today and dateB is not, dateA should come first
	if (isTodayA) {
		return -1
	}

	// If dateB is today and dateA is not, dateB should come first
	if (isTodayB) {
		return 1
	}

	// If neither date is today, sort by most recent first (i.e., descending order)
	return dateB.valueOf() - dateA.valueOf()
}

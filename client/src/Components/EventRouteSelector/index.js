import React, { useState, useEffect } from "react"
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native"

import AppButton from "../AppButton"
import AppTextInput from "../AppTextInput"
import GetAsync from "../AsyncStorageGet"
import RouteParamsModal from "../RouteParamsModal"
import SlideBox from "../SlideBox"
import moment from "moment"
import validator from "validator"

// i need a form that takes start pastcode, jounrey pref, mode, walking speed, taxi only, national search

export default function EventsRoutesForm({ event, onClose }) {
	const formatDate = "YYYYMMDD"
	const formatTime = "HHmm"
	const [endPostcodeInput, setEndPostcodeInput] = useState(event.postcode, "GB")
	const [startPostcodeInput, setStartPostcodeInput] = useState("")
	const [token, setToken] = useState("")
	const [showModal, setShowModal] = useState(false)
	const [route, setRoute] = useState(false)
	const [paramsModal, setParamsModal] = useState(false)
	const originalDate = moment(event.date)
	// Initialize state with formatted date and time
	const [fDate, setFDate] = useState(originalDate.format(formatDate))
	const [fTime, setFTime] = useState(originalDate.format(formatTime))
	const [selectedParams, setSelectedParams] = useState({
		taxiOnlyChecked: false,
		nationalSearch: false,
		journeyPref: "",
		mode: "",
		walkingSpeed: "",
	})
	const handleParamsSelection = (params) => {
		setSelectedParams(params)
	}
	console.log("event", event)
	console.log("event date", event.date)
	console.log("original date", originalDate)
	console.log("fDate", fDate)
	console.log("fTime", fTime)
	console.log("startPostcodeInput", startPostcodeInput)
	console.log("endPostcodeInput", endPostcodeInput)

	// Parse the original date string

	async function clickPreferences() {
		setParamsModal(!paramsModal)
	}
	useEffect(() => {
		async function getToken() {
			setToken(await GetAsync("token"))
		}
		getToken()
	}, [])
	function dataValidation() {
		if (!startPostcodeInput) {
			alert("Fill in all fields.")
		} else if (!validator.isPostalCode(startPostcodeInput.trim(), "GB")) {
			alert("Enter a valid starting postcode.")
		} else {
			getRoute()
		}
	}
	async function getRoute() {
		const startPostcode = startPostcodeInput.trim()
		const endPostcode = endPostcodeInput
		const useDate = fDate || ""
		const useTime = fTime || ""
		const timeIs = "arriving"

		const options = {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization": token,
			},
			body: JSON.stringify({
				origins: {
					from: startPostcode,
					to: endPostcode,
				},
				params: {
					taxiOnlyTrip: selectedParams.taxiOnlyChecked,
					nationalSearch: selectedParams.nationalSearch,
					date: useDate || "",
					time: useTime || "",
					timeIs: timeIs || "",
					mode: selectedParams.mode || "",
					walkingSpeed: selectedParams.walkingSpeed || "",
					useRealTimeArrivals: true,
				},
			}),
		}
		const response = await fetch(
			"https://metro-mingle.onrender.com/tfl/get",
			options
		)
		console.log(options)
		if (response.status == 200) {
			const data = await response.json()
			console.log(data)
			setRoute(data.journeys)
			closeModal()
		} else {
			alert("Request failed.")
		}
	}

	async function setJourney(route) {
		try {
			const id = event.id
			const options = {
				method: "PATCH",
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Authorization": token,
				},
				body: JSON.stringify({
					status: "journey set",
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
				await onClose()
			} else {
				alert("Request failed.")
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<ScrollView>
			<View style={styles.screen}>
				<Text style={styles.heading}>Set your journey</Text>
				<AppTextInput
					onChangeText={(text) => setStartPostcodeInput(text)}
					placeholder="Start Postcode"
				/>

				<AppButton onPress={clickPreferences} title="Preferences" />
				{paramsModal ? (
					<RouteParamsModal
						paramsModal={paramsModal}
						closeModal={clickPreferences}
						onParamsSelect={handleParamsSelection}
					></RouteParamsModal>
				) : null}
				<AppButton onPress={dataValidation} title="Submit" />
			</View>
			<></>
			<SafeAreaView style={styles.container}>
				<View>
					{route ? (
						<SlideBox
							slides={[
								{
									journey: route[0],
									content: "Route 1",
									onSelect: () => setJourney(route[0]),
								},
								{
									journey: route[1],
									content: "Route 2",
									onSelect: () => setJourney(route[1]),
								},
								{
									journey: route[2],
									content: "Route 3",
									onSelect: () => setJourney(route[2]),
								},
							]}
						/>
					) : null}
				</View>
			</SafeAreaView>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 30
	},
})

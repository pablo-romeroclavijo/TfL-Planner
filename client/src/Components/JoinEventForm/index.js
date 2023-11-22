import React, { useState } from "react"
import { View, StyleSheet, Text, Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import AppTextInput from "../AppTextInput"
import AppButton from "../AppButton"
import GetAsync from "../AsyncStorageGet"

export default function JoinEventForm() {
	const [eventCode, setEventCode] = useState("")
	const navigation = useNavigation()

	async function joinEvent() {
		const token = await GetAsync("token")
		try {
			const options = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": token,
				},
			}
			const response = await fetch(
				`https://metro-mingle.onrender.com/event/${eventCode}`,
				options
			)
             
			if (response.status === 200) {
				Alert.alert("Success", "Event joined successfully", [
					{
						text: "OK",
						onPress: () => navigation.navigate("Events"),
					},
				])
			} else {
				Alert.alert("Error", "Failed to join event. Please try again.")
			}
		} catch (error) {
			Alert.alert("Error", "An error occurred. Please try again.")
		}
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Join Event</Text>
			<View style = {styles.inputContainer} >
				<AppTextInput 
					placeholder="Enter Event Code"
					onChangeText={(text) => setEventCode(text)}
					value={eventCode}
				/>
			</View>
			<AppButton title="Join Event" onPress={() => joinEvent()} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 10,
	},
	inputContainer:{
		width: 250,
		overflow: "hidden",

	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "#000",
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		color: "#fff",
	},
})

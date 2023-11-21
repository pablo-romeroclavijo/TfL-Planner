import React, { useState, useEffect } from "react";
import {
	Text,
	View,
	StyleSheet,
	Modal,
	TouchableOpacity,
	Alert,
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	Dimensions, // Import Dimensions
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Picker } from "@react-native-picker/picker";
import AppTextInput from "../AppTextInput";
import Linear from "../LinearGradientButton";
import GetAsync from "../AsyncStorageGet";
import colors from "../../config/colors";

const { width, height } = Dimensions.get("window");

export default function PreferencesForm() {

	const [modalVisible, setModalVisible] = useState(false);
	const [postcodeInput, setPostcodeInput] = useState("");
	const [journeyPreferences, setJourneyPreferences] = useState("");
	const [maxWalkingMinutes, setMaxWalkingMinutes] = useState(0);
	const [walkingSpeed, setWalkingSpeed] = useState("Average");
	const [accessibilityPreferences, setAccessibilityPreferences] = useState("None");
	const [token, setToken] = useState("");
	const [originalPreferences, setOriginalPreferences] = useState({
		postcode: "",
		preferences: {
			journeyPreferences: "",
			maxWalkingMinutes: 0,
			walkingSpeed: "",
			accessibilityPreferences: "",
		},
	});

	useEffect(() => {
		async function getToken() {
			setToken(await GetAsync("token"));
		}
		getToken();
	}, []);

	async function fetchData() {
		try {
			const response = await fetch(`https://metro-mingle.onrender.com/user/profile`, {
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: token,
				},
			});

			if (response.status === 200) {
				const data = await response.json();
				setPostcodeInput(data.postcode);
				setJourneyPreferences(data.preferences.journeyPreferences);
				setMaxWalkingMinutes(data.preferences.maxWalkingMinutes);
				setWalkingSpeed(data.preferences.walkingSpeed);
				setAccessibilityPreferences(data.preferences.accessibilityPreferences);
				setOriginalPreferences(data);
				console.log(data);
			}
		} catch (error) {
			console.error("Error fetching user preferences:", error.message);
		}
	}

	useEffect(() => {
		fetchData();
	}, [token]);

	async function handleFormSubmit() {
		try {
			const options = {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify({
					postcode: postcodeInput,
					preferences: {
						journeyPreferences: journeyPreferences,
						maxWalkingMinutes: maxWalkingMinutes,
						walkingSpeed: walkingSpeed,
						accessibilityPreferences: accessibilityPreferences,
					},
				}),
			};

			const response = await fetch("https://metro-mingle.onrender.com/user/preferences", options);

			if (response.status === 200) {
				Alert.alert("Submit Successful", "Your Preferences have been updated", [
					{
						text: "OK",
						onPress: async () => {
							// Update the originalPreferences state when the changes are saved
							setOriginalPreferences({
								postcode: postcodeInput,
								preferences: {
									journeyPreferences,
									maxWalkingMinutes,
									walkingSpeed,
									accessibilityPreferences,
								},
							});

							closeModal();
						},
					},
				]);
			}
		} catch (error) {
			console.error("Error submitting preferences:", error.message);
		}
	}

	const openModal = () => {
		setModalVisible(true);
	};

	const closeModal = () => {
		setModalVisible(false);
	};

	const resetForm = () => {
		// Reset the form to the original preferences fetched from the backend
		setPostcodeInput(originalPreferences.postcode);
		setJourneyPreferences(originalPreferences.preferences.journeyPreferences);
		setMaxWalkingMinutes(originalPreferences.preferences.maxWalkingMinutes);
		setWalkingSpeed(originalPreferences.preferences.walkingSpeed);
		setAccessibilityPreferences(originalPreferences.preferences.accessibilityPreferences);
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.header}>Account</Text>
			<View style={styles.fullWidthUnderline} />
			<Text style={styles.title}>Preferences</Text>
			<TouchableOpacity onPress={openModal}>
				<Text style={styles.click}>Edit Preferences {">"}</Text>
			</TouchableOpacity>
			<View style={styles.fullWidthUnderline} />


			<GestureRecognizer
				style={{ flex: 1 }}
				onSwipeDown={() => {
					resetForm();
					closeModal();
				}}
			>
				<Modal animationType="slide" transparent={false} visible={modalVisible} onRequestClose={closeModal}>
					<View style={styles.modalContainer}>
						<View style={[{ marginTop: height * 0.02, paddingRight: width * 0.04, marginBottom: height * 0.02 }]}>
							<Text style={[styles.header, { paddingLeft: width * 0.05 }]}>Change Your Preferences</Text>
						</View>
						<Text style={[styles.label, { paddingRight: width * 0.7 }]}>Postcode</Text>
						<AppTextInput placeholder="Postcode" icon="post" onChangeText={(text) => setPostcodeInput(text)} value={postcodeInput === "null" ? "" : postcodeInput} />
						<Text style={[styles.label, { paddingRight: width * 0.09 }]}>On a given journey, how long are you willing to walk (minutes)</Text>
						<AppTextInput placeholder="Max time you are willing to walk" icon="post" onChangeText={(text) => setMaxWalkingMinutes(text)} value={maxWalkingMinutes} />

						<Text style={[styles.label, { paddingRight: width * 0.25, marginBottom: height * 0.015 }]}>What are your journey Preferences</Text>
						<Picker style={{ height: height * 0.03, width: "100%" }} selectedValue={journeyPreferences} onValueChange={(itemValue) => setJourneyPreferences(itemValue)} value={journeyPreferences}>
							<Picker.Item label="Least interchange" value="leastinterchange" />
							<Picker.Item label="Least walking" value="leastwalking" />
							<Picker.Item label="Least time" value="leasttime" />
						</Picker>

						<Text style={[styles.label, { paddingRight: width * 0.27, marginBottom: height * 0.015 }]}>On Average how fast do you walk</Text>
						<Picker style={{ height: height * 0.03, width: "100%" }} selectedValue={walkingSpeed} onValueChange={(itemValue) => setWalkingSpeed(itemValue)} value={walkingSpeed}>
							<Picker.Item label="Slow" value="slow" />
							<Picker.Item label="Average" value="average" />
							<Picker.Item label="Fast" value="fast" />
						</Picker>

						<Text style={[styles.label, { paddingRight: width * 0.39, marginBottom: height * 0.015 }]}>Accessibility Preferences</Text>
						<Picker style={{ height: height * 0.03, width: "100%" }} selectedValue={accessibilityPreferences} onValueChange={(itemValue) => setAccessibilityPreferences(itemValue)} value={accessibilityPreferences}>
							<Picker.Item label="None" value="none" />
							<Picker.Item label="No stairs" value="noSolidStairs" />
							<Picker.Item label="No escalators" value="noEscalators" />
							<Picker.Item label="No elavators" value="noElevators" />
							<Picker.Item label="Step free access to Vehicle" value="stepFreeToVehicle" />
							<Picker.Item label="Step free access to Pavement" value="stepFreeToPlatform" />
						</Picker>

						<View style={{ alignSelf: "center", marginTop: height * 0.001 }}>
							<Linear onPress={handleFormSubmit} colors={["#FF7E5F", "#FFB270"]} buttonText="Submit" />
							<View style={{ alignSelf: "center" }}>
								<TouchableOpacity
									onPress={() => {
										resetForm(), closeModal();
									}}
								>
									<Text
										style={{
											color: colors.secondary,
											fontWeight: "700",
											paddingLeft: width * 0.01,
										}}
									>
										Cancel
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</GestureRecognizer>
		</View>
		// </KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff', // Assuming a white background
	},
	header: {
	  fontSize: height * 0.03, // Adjust the size as needed
	  fontWeight: 'bold',
	  paddingVertical: height * 0.02, // Add padding to top and bottom
	  paddingHorizontal: width * 0.05, // Add padding to left and right
	  backgroundColor: '#f2f2f2', // Adjust the background color as needed
	},
	title: {
	  fontSize: height * 0.025, // Adjust the size as needed
	  fontWeight: '600', // Adjust the weight as needed
	  paddingVertical: height * 0.015, // Add padding to top and bottom
	  paddingHorizontal: width * 0.05, // Add padding to left and right
	  backgroundColor: '#fff', // Assuming a white background
	  marginTop: height * 0.02, // Space between sections
	},
	click: {
	  fontSize: height * 0.02, // Adjust the size as needed
	  fontWeight: '400', // Adjust the weight as needed
	  textAlign: 'left',
	  paddingHorizontal: width * 0.05, // Add padding to left and right
	  paddingVertical: height * 0.015, // Add padding to top and bottom
	  borderBottomWidth: 1, // Set the underline thickness
	  borderBottomColor: '#e0e0e0', // Set the underline color
	},
	fullWidthUnderline: {
	  borderBottomWidth: 1,
	  borderBottomColor: '#e0e0e0',
	  width: '100%', // Ensure the underline is full width
	  marginBottom: height * 0.02, // Space after the underline

	},
  modalContainerPicker: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0)",
	},
  modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: width * 0.06,
        paddingTop: height * 0.02,
        marginTop: 0,
  }
});

		

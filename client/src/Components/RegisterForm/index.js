import React, { useState, useEffect } from "react";
import validator from "validator";
import { View, StyleSheet, Text, Platform, Image, TouchableOpacity } from "react-native";

import colors from "../../config/colors";
import GradientBackground from "../../Components/Gradient";

import CreateAsync from "../AsyncStorageCreate";

import LoadingModal from "../LoadingModal";
import AppButton from "../AppButton";
import AppTextInput from "../AppTextInput";
import GetAsync from "../AsyncStorageGet";


export default function Register({ navigation }) {
	const [usernameInput, setUsernameInput] = useState("");
	const [passwordInput, setPasswordInput] = useState("");
	const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
	const [emailInput, setEmailInput] = useState("");
	const [loading, setLoading] = useState(false);

	function validate() {
		if (!usernameInput && !passwordInput && !confirmPasswordInput && !emailInput) {
			alert("Fill in all fields.");
		} else if (!validator.isEmail(emailInput.trim())) {
			alert("Enter a valid email.");
		} else if (passwordInput.trim() !== confirmPasswordInput.trim()) {
			alert("Passwords do not match.");
		} else {
			handleFormSubmit();
		}
	}

	async function setPreferenceTokens() {
		const options = {
			method: "GET",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
				"Authorization" : await GetAsync("token")
			},
		}
		const response = await fetch(
			"https://metro-mingle.onrender.com/user/profile",
			options
		)
		if (response.status == 200) {
			const data = await response.json()
			console.log(await GetAsync("token"))
			console.log(data)
			console.log(data.preferences.accessibilityPreferences)
			if (data.postcode == null){
				console.log(postcode, "passed")
				await CreateAsync("postcode", "")
			} else {
				await CreateAsync("postcode", data.postcode)
			}
			if (data.preferences.accessibilityPreferences == null){
				await CreateAsync("accessibilityPreferences", "")
			} else {
				await CreateAsync("accessibilityPreferences", data.preferences.accessibilityPreferences)
			}
			if (data.preferences.journeyPreferences == null){
				await CreateAsync("journeyPreferences", "")
			} else {
				await CreateAsync("journeyPreferences", data.preferences.journeyPreferences)
			}
			if (data.preferences.maxWalkingMinutes == null){
				await CreateAsync("maxWalkingMinutes", "")
			} else {
				await CreateAsync("maxWalkingMinutes", String(data.preferences.maxWalkingMinutes))
			}
			if (data.preferences.walkingSpeed == null){
				await CreateAsync("walkingSpeed", "")
			} else {
				await CreateAsync("walkingSpeed", data.preferences.walkingSpeed)
			}
			console.log("Postcode", await GetAsync("postcode"))
			console.log("Access", await GetAsync("accessibilityPreferences"))
			console.log("Journey", await GetAsync("journeyPreferences"))
			console.log("Walk Mins", await GetAsync("maxWalkingMinutes"))
			console.log("Walk Speed", await GetAsync("walkingSpeed"))
			setLoading(false)
			navigation.navigate("Dashboard")
		} 
	}

	async function handleFormSubmit() {
		setLoading(true);
		const username = usernameInput.trim();
		const password = passwordInput.trim();
		const email = emailInput.trim();
		const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
			}),
		};
		const response = await fetch("https://metro-mingle.onrender.com/user/register", options);
		console.log("Response", response.status)

		if (response.status == 201) {
			const data = await response.json()
			const token = data.token;
			CreateAsync("token", token);
			setEmailInput("");
			setUsernameInput("");
			setPasswordInput("");
			setConfirmPasswordInput("");
			setPreferenceTokens()
		} else {
			alert("Register failed, try again later.");
			setLoading(false);
		}
	}

	

	return (
		<GradientBackground colors={["#87C7FC", "#2370EE", "#FFFFFF"]}>
			<View style={styles.container}>
				<Image style={styles.logo} source={require("../../assets/logo2.png")} />
				<AppTextInput placeholder="Enter Username" icon="account-circle-outline" onChangeText={(text) => setUsernameInput(text)} />
				<AppTextInput placeholder="Enter Email" icon="email" onChangeText={(text) => setEmailInput(text)} />
				<AppTextInput secureTextEntry={true} placeholder="Enter Password" icon="form-textbox-password" onChangeText={(text) => setPasswordInput(text)} />
				<AppTextInput secureTextEntry={true} placeholder="Confirm Password" icon="form-textbox-password" onChangeText={(text) => setConfirmPasswordInput(text)} />
				<View style={styles.buttonContainer}>
					<AppButton title="Register" onPress={validate} color="btn2" disabled={passwordInput !== confirmPasswordInput} />
					{loading ? <LoadingModal visible={loading} /> : null}

					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							marginTop: 20,
						}}
					>
						<Text>Already Registered?</Text>
						<TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
							<Text
								style={{
									color: colors.btn2,
									fontWeight: "700",
									paddingLeft: 4,
								}}
							>
								Login
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</GradientBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		padding: 20,
		width: "90%",
	},
	textStyle: {
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
		fontSize: 30,
		fontWeight: "bold",
	},
	logo: {
		marginBottom: 10,
		width: 200,
		height: 200,
		justifyContent: "flex-start",
		shadowColor: "#fff", // White glow color
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.9,
		shadowRadius: 10,
	},
});

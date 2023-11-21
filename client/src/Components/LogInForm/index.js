import React, { useState, useEffect } from "react"
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
	Platform,
	Alert,
} from "react-native"

import AppTextInput from "../AppTextInput"
import AppButton from "../AppButton"
import LoadingModal from "../LoadingModal"
import CreateAsync from "../AsyncStorageCreate"
import colors from "../../config/colors"
import GradientBackground from "../Gradient"

export default function LogInForm({ navigation }) {
	const [usernameInput, setUsernameInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	async function handleFormSubmit() {
		if (!usernameInput || !passwordInput) {
			alert("Fill in all fields.")
		} else {
			setUsername(usernameInput.trim())
			setPassword(passwordInput.trim())
		}
	}
	useEffect(() => {
		if (username && password) {
			verifyLogin()
		}
	}, [username, password])
	async function verifyLogin() {
		setLoading(true)
		const options = {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		}
		const response = await fetch(
			"https://metro-mingle.onrender.com/user/login",
			options
		)
		if (response.status == 200) {
			const data = await response.json()
			const token = data.token
			CreateAsync("token", token)
			CreateAsync("username", username)
			console.log(token)
			setUsernameInput("")
			setPasswordInput("")
			navigation.navigate("Dashboard")
			setLoading(false)
		} else {
			Alert.alert("Login Failed", "Invalid username or password", [
				{ text: "Try Again", onPress: () => setLoading(false) },
			])
		}
		setUsernameInput("")
		setPasswordInput("")
		setPassword("")
		setUsername("")
	}
	return (
		<GradientBackground colors={["#87C7FC", "#2370EE", "#FFFFFF"]}>
			<View style={styles.container}>
				<Image style={styles.logo} source={require("../../assets/logo2.png")} />
				{loading ? <LoadingModal loading={loading} /> : null}
				<View style={styles.inputContainer}>
					<AppTextInput
						placeholder="Enter Username"
						icon="account-circle-outline"
						onChangeText={(text) => setUsernameInput(text)}
						value={usernameInput}
					/>
					<AppTextInput
						secureTextEntry={true}
						placeholder="Enter Password"
						icon="form-textbox-password"
						onChangeText={(text) => setPasswordInput(text)}
						value={passwordInput}
					/>
					<View style={styles.buttonContainer}>
						<AppButton title="Login" onPress={handleFormSubmit} color="btn2" />
					</View>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
							marginBottom: 30,
						}}
					>
						<Text
							style={{
								fontWeight: "bold",
								paddingLeft: 4,
							}}
						>
							New to App?
						</Text>
						<TouchableOpacity onPress={() => navigation.navigate("Register")}>
							<Text
								style={{
									color: colors.btn2,
									fontWeight: "bold",
									paddingLeft: 4,
								}}
							>
								Register
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</GradientBackground>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonContainer: {
		padding: 20,
	},
	backgroundImage: {
		flex: 1,
	},
	logo: {
		marginBottom: 50,
		width: 200,
		height: 200,
		justifyContent: "flex-start",
		shadowColor: "#fff", // White glow color
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 1,
		shadowRadius: 12,
	},
	textStyle: {
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
		fontSize: 30,
		fontWeight: "bold",
		alignContent: "flex-start",
	},
	iconContainer: {
		padding: 10,
	},
	inputContainer: {
		fontWeight: "bold",
		color: "white",
		placeholder: "white",
	},
})

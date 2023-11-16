import React, { useState, useEffect } from "react"
import {
	Text,
	TextInput,
	View,
	StyleSheet,
	Pressable,
	ImageBackground,
	Image,
	Platform,
	TouchableOpacity,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import { AppTextInput, AppButton, LoadingModal } from "../../Components"
import colors from "../../config/colors"

export default function LogIn({ navigation }) {
	const [usernameInput, setUsernameInput] = useState("")
	const [passwordInput, setPasswordInput] = useState("")
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	async function handleFormSubmit() {
		if (!usernameInput || !passwordInput) {
			alert("Fill in all fields.")
		} else {
			setUsername(usernameInput)
			setPassword(passwordInput)
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
			console.log(token)
			setUsernameInput("")
			setPasswordInput("")

			navigation.navigate("Dashboard")
			setLoading(false)
		} else {
			alert("Invalid Credentials")
			setLoading(false)
		}
		setUsernameInput("")
		setPasswordInput("")
		setPassword("")
		setUsername("")
	}

	return (
		// <ImageBackground
		// blurRadius={7}
		// source={{uri: "https://img.freepik.com/premium-vector/seamless-vector-pattern-with-colorful-train-illustration-children-hand-drawn-style_335402-68.jpg"}}
		// resizeMode="cover"
		// style={styles.backgroundImage} >
		<View style={styles.container}>
			<Image style={styles.logo} source={require("../../assets/logo2.png")} />
			{loading ? <LoadingModal loading={loading} /> : null}

			<Text style={styles.textStyle}>Login</Text>
			<View style={styles.inputContainer}>
				{/* <Text style={styles.label}>Username:</Text> */}
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
					<AppButton title="Login" onPress={handleFormSubmit} color="primary" />
					{/* <AppButton
            title="Register"
            onPress={() => navigation.navigate("Register")}
            color="secondary"
          /> */}
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						marginBottom: 30,
					}}
				>
					<Text>New to App?</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Register")}>
						<Text
							style={{
								color: colors.secondary,
								fontWeight: "700",
								paddingLeft: 4,
							}}
						>
							Register
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
		// </ImageBackground>
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
		marginBottom: 25,
		width: 200,
		height: 200,
		justifyContent: "flex-start",
	},
	textStyle: {
		fontFamily: Platform.OS === "android" ? "Roboto" : "San Francisco",
		fontSize: 30,
		fontWeight: "bold",
		alignContent: "flex-start",
	},
	iconContainer: {
		padding: 10,
	},
})

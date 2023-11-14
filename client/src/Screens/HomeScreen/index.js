import { View, Button, Text, ImageBackground } from "react-native"
import React from "react"

export default function Home({ navigation }) {
	const image = require("../src/assets/background1.png")

	return (
		<ImageBackground source={image} style={{ width: "100%", height: "100%" }}>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Text>Welcome to Our App</Text>
			</View>
		</ImageBackground>
	)
}

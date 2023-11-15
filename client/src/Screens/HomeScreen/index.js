import { View, Button, Text, ImageBackground, ScrollView } from "react-native"
import React from "react"

export default function Home({ navigation }) {
	// const image = require("../src/assets/background1.png")

	return (
		// <ImageBackground source={image} style={{ width: "100%", height: "100%" }}>
			<View>
				<ScrollView>
					<Text>My Events</Text>
				</ScrollView>
			</View>
		// </ImageBackground>
	)
}

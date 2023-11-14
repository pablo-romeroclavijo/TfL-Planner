import { View, Text, StyleSheet } from "react-native"

export default function CurrentEvent({ navigation }) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Current Event</Text>
		</View>
	)
}

styles = StyleSheet.create({
	text: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
})

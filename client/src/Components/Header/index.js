import React from "react";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";

const Header = () => {
	return (
			<View style={styles.container}>
				<Image source={require("../../assets/logo2.png")} style={styles.logo} />
			</View>

	);
};

const styles = StyleSheet.create({
	header: {
		height: 100,
		width: "100%", // Stretch across the screen width
		backgroundColor: "btn2",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	logo: {
		width: 80,
		height: 60,
		marginRight: 10,
		marginTop: 35,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
});

export default Header;

import React from "react";
import { Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../../config/colors"; // Import your colors configuration

const Header = () => {
	return (
		<LinearGradient
			colors={colors.gradient} // Use gradient colors
			style={styles.headerGradient}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
		>
			<Image source={require("../../assets/logo2.png")} style={styles.logo} />
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	headerGradient: {
		height: 120, // Adjust as needed for your header size
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingTop: 35,
	},
	logo: {
		width: 80,
		height: 60,
	},
});

export default Header;

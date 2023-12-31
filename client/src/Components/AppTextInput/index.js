import React, { useState } from "react";
import { View, TextInput, StyleSheet, Platform, Dimensions, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../config/colors";

const window = Dimensions.get("window");

export default function AppTextInput({ icon, secureTextEntry, placeholderTextColor, ...otherProps }) {
	const [isSecure, setIsSecure] = useState(secureTextEntry);

	const containerWidth = window.width * 0.9; // Adjust the percentage as needed

	const toggleSecureEntry = () => {
		setIsSecure(!isSecure);
	};

	return (
		<View style={[styles.container, { width: containerWidth }]}>
			{icon && <MaterialCommunityIcons name={icon} size={20} color="black" style={styles.icon} />}
			<TextInput style={styles.TextInput} secureTextEntry={secureTextEntry && isSecure} placeholderTextColor={"#000"} {...otherProps} />
			{secureTextEntry && (
				<Pressable onPress={toggleSecureEntry} style={styles.iconContainer}>
					<MaterialCommunityIcons name={isSecure ? "eye-outline" : "eye-off-outline"} size={20} color="black" />
				</Pressable>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginVertical: window.height * 0.02,
		height: window.height * 0.05,
		paddingLeft: window.width * 0.02,
		paddingRight: window.width * 0.02,
		marginBottom: window.height * 0.02,
		borderRadius: window.width * 0.02,
		borderBottomColor: "black",
		borderBottomWidth: 1,
		alignItems: "center",
	},
	icon: {
		marginRight: window.width * 0.02,
	},
	TextInput: {
		fontSize: window.width * 0.04,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
		width: "100%",
	},
	iconContainer: {
		position: "absolute",
		right: window.width * 0.02,
	},
});

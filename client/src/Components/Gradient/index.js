import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

const GradientBackground = ({ children, colors, style }) => {
	return (
		<LinearGradient
			colors={colors}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={[styles.gradient, style]} // Use only a basic default style here
		>
			{children}
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	gradient: {
		flex: 1, // Takes up the entire space of its parent by default
	},
});

export default GradientBackground;

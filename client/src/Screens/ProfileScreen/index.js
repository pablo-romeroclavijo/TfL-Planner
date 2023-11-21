import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

import { LogoutButton, PreferencesForm, Help, Header } from "../../Components";

export default function Profile() {
	return (
		<View style={styles.container}>
			
			<View style={{alignSelf: "center"}}>
			<Header />
			</View>

			<PreferencesForm />

			<Help style={styles.help} />

			<View style={styles.logoutButton}>
				<LogoutButton />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	logoutButton: {
		alignSelf: "center",
	},
});

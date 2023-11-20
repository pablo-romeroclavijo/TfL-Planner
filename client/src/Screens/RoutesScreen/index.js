import { View, StyleSheet, SafeAreaView } from "react-native";
import RoutesScreenForm from "../../Components/RoutesScreenForm";
import Header from "../../Components/Header";

export default function Routes() {
	return (
		<View style={styles.view}>
			<Header />
			<RoutesScreenForm />
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: "center",
	},
});

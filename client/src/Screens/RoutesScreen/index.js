import { View, StyleSheet, SafeAreaView } from "react-native"
import RoutesScreenForm from "../../Components/RoutesScreenForm"

export default function Routes() {
	return (
		<View style={styles.view}>
			<RoutesScreenForm />
		</View>
	)
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		justifyContent: "center",
	},
})

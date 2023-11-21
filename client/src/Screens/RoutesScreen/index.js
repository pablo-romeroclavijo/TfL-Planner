import { View, StyleSheet, SafeAreaView } from "react-native";
import RoutesScreenForm from "../../Components/RoutesScreenForm";
import Header from "../../Components/Header";

export default function Routes() {
	return (
		<View>

						<Header />
			<View style={{alignSelf: "center"}}>


			</View>
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

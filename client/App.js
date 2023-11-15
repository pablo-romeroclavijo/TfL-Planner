import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import * as Screens from "./src/Screens"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { HomeTabs } from "./src/Components"
const Stack = createStackNavigator()

export default function App() {

	return (
		//   <View style={styles.container}>
		//     <Screens.LogIn />
		//     <StatusBar style="auto" />
		//   </View>


		<NavigationContainer>
			<Stack.Navigator initialRouteName="LogIn">
				<Stack.Screen name="LogIn" component={Screens.LogIn} />
				<Stack.Screen
					name="Dashboard"
					component={HomeTabs}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="Register" component={Screens.Register} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
})

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
			<Stack.Navigator initialRouteName="Map">
				<Stack.Screen
					name="Initial"
					component={Screens.Initial}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="LogIn"
					component={Screens.LogIn}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Register"
					component={Screens.Register}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Routes"
					component={Screens.Routes}
					options={{ headerShown: false }}
				/>

				<Stack.Screen
					name="Dashboard"
					component={HomeTabs}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Map"
					component={Screens.Map}
					options={{ headerShown: false }}
				/>

				{/* <Stack.Screen
					name="Routes"
					component={HomeTabs}
					options={{ headerShown: false }}
				/> */}
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

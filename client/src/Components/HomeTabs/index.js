import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Home, Routes, Events, Profile } from "../../Screens" // Assuming your screens are exported from here
import Ionicons from "react-native-vector-icons/Ionicons"
import { Text } from "react-native"

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconName

					if (route.name === "Home") {
						// Use MaterialIcons for the "Home" tab
						iconName = focused ? "home" : "home-outline"
					} else if (route.name === "Routes") {
						iconName = focused ? "map" : "map-outline"
					} else if (route.name === "Profile") {
						iconName = focused ? "person" : "person-outline"
					} else if (route.name === "Events") {
						iconName = focused ? "calendar-sharp" : "calendar-outline"
					}

					return <Ionicons name={iconName} size={24} color={"#0B2364"} />
				},
				// tabBarLabel: ({ focused, color }) => {
				// 	return focused ? (
				// 		<Text style={{ color: "#0B2364", fontSize: 12 }}>{route.name}</Text>
				// 	) : null
				// },
			})}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Routes"
				component={Routes}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Events"
				component={Events}
				options={{ headerShown: false }}
			/>

			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	)
}

export default HomeTabs

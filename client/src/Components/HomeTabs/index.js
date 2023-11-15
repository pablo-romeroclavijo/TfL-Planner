// HomeTabs.js
import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as Screens from "../../Screens" // Assuming your screens are exported from here

const Tab = createBottomTabNavigator()

export default function HomeTabs() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={Screens.Home} options={{ headerShown: false }}/>
			{/* <Tab.Screen name="Feed" component={Screens.fee} />
			<Tab.Screen name="Profile" component={Screens.Profile} /> */}
		</Tab.Navigator>
	)
}

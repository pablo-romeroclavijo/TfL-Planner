import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import * as Screens from "../../Screens" // Assuming your screens are exported from here
import Ionicons from "react-native-vector-icons/Ionicons"
import { Text } from "react-native"

const Tab = createBottomTabNavigator()

const HomeTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconName

<<<<<<< HEAD
          if (route.name === "Home") {
            // Use MaterialIcons for the "Home" tab
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Routes") {
            iconName= focused ? "map" : "map-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={24} color={"#F96F3A"} />;
        },
		tabBarLabel: ({ focused, color }) => {
			return focused ? <Text style={{ color: "#3BD4BB", fontSize: 12 }}>{route.name}</Text> : null;
		  }
      })}
    >
      <Tab.Screen name="Home" component={Screens.Home} options={{ headerShown: false }} />
      <Tab.Screen name="Routes" component={Screens.Routes} options={{headerShown: false}} />
      <Tab.Screen name="Profile" component={Screens.Profile} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};
=======
					if (route.name === "Home") {
						// Use MaterialIcons for the "Home" tab
						iconName = focused ? "home" : "home-outline"
					} else if (route.name === "Profile") {
						iconName = focused ? "person" : "person-outline"
					}

					return <Ionicons name={iconName} size={24} color={"#F96F3A"} />
				},
				tabBarLabel: ({ focused, color }) => {
					return focused ? (
						<Text style={{ color: "#3BD4BB", fontSize: 12 }}>{route.name}</Text>
					) : null
				},
			})}
		>
			<Tab.Screen
				name="Events"
				component={Screens.Events}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Home"
				component={Screens.Home}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Profile"
				component={Screens.Profile}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	)
}
>>>>>>> f5808c26be30481db792e41e98e83ace9924b369

export default HomeTabs

//for log out functionality on or ProfileScreen index.json

//import it: import { LogoutButton } from './LogOutComponent'

import React from "react";
import { Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";


const LogoutButton = ({ navigation }) => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();

      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
    navigation.navigate("Login");
  };

  return (
    <TouchableOpacity onPress={handleLogout}>
      <Text style={{ color: colors.secondary, fontWeight: "700", paddingTop: 10 }}>
        Logout
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;

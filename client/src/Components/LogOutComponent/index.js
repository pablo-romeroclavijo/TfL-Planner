// redirect to login page
// remove token from local storage - async token
// asks as promt to log out(confurmation) -> pass state
//for log out functionality on or ProfileScreen index.json
//import it: import { LogoutButton } from './LogOutComponent'


import React from "react";
import { Text, TouchableOpacity } from "react-native";
import colors from "../../config/colors";
import { useHistory } from 'react-router-dom';


const LogoutButton = ({navigation}) => {
 const history = useHistory();

  const handleLogout = async () => {
    try {
     localStorage.removeItem('token');

     history.push('/login');
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

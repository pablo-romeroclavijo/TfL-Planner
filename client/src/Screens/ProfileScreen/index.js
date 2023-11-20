import React from "react";
import {
  View,
  StyleSheet
} from "react-native";

import {  LogoutButton, PreferencesForm, Help } from "../../Components";


export default function Profile() {

  return (
    <View style={styles.container}>
      
      <PreferencesForm />

      <Help style={styles.help} />
      
      <View style={styles.logoutButton}>
        <LogoutButton />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginTop: 55
  },
  logoutButton: {
    alignSelf: "center",
  }
});

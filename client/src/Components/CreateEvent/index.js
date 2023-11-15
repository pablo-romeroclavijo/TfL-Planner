import React from "react";
import { View } from "react-native";
import AppTextInput from "../AppTextInput/AppTextInput";

export default function CreateEventForm() {
  return (
    <View>
      <AppTextInput
        placeholder="Enter Username"
        icon="account-circle-outline"
        onChangeText={(text) => setUsernameInput(text)}
      />
      <AppTextInput
        placeholder="Enter Email"
        icon="email"
        onChangeText={(text) => setEmailInput(text)}
      />
      <AppTextInput
        secureTextEntry={true}
        placeholder="Enter Password"
        icon="form-textbox-password"
        onChangeText={(text) => setPasswordInput(text)}
      />
      <AppTextInput
        secureTextEntry={true}
        placeholder="Confirm Password"
        icon="form-textbox-password"
        onChangeText={(text) => setConfirmPasswordInput(text)}
      />
    </View>
  );
}

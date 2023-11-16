import React, { useState, useEffect } from "react";
import validator from "validator";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";

import colors from "../../config/colors";
import { LoadingModal, AppButton, AppTextInput } from "../../Components";

export default function Register({ navigation }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (
      !usernameInput &&
      !passwordInput &&
      !confirmPasswordInput &&
      !emailInput
    ) {
      alert("Fill in all fields.");
    } else if (!validator.isEmail(emailInput)) {
      alert("Enter a valid email.");
    } else if (passwordInput !== confirmPasswordInput) {
      alert("Passwords do not match.");
    } else {
      handleFormSubmit();
    }
  }
  async function handleFormSubmit() {
    setLoading(true);
    const username = usernameInput.trim();
    const password = passwordInput.trim();
    const email = emailInput.trim();
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    };
    const response = await fetch(
      "https://metro-mingle.onrender.com/user/register",
      options
    );

    if (response.status == 201) {
      const data = await response.json().then(setLoading(false));
      const token = data.token;
      navigation.navigate("Dashboard");
      setEmailInput("");
      setUsernameInput("");
      setPasswordInput("");
      setConfirmPasswordInput("");
    } else {
      alert("Register failed, try again later.");
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo2.png")} />
      <Text style={styles.textStyle}>Register</Text>
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
      <View style={styles.buttonContainer}>
        <AppButton
          title="Register"
          onPress={validate}
          color="primary"
          disabled={passwordInput !== confirmPasswordInput}
        />
        {loading ? <LoadingModal visible={loading} /> : null}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Text>Already Registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <Text
              style={{
                color: colors.secondary,
                fontWeight: "700",
                paddingLeft: 4,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    padding: 20,
    width: "90%",
  },
  textStyle: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    marginBottom: 10,
    width: 200,
    height: 200,
    justifyContent: "flex-start",
  },
});

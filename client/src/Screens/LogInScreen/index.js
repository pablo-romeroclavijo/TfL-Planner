import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
  Platform,
} from "react-native";

import AppButton from "../../Components/AppButton/AppButton";
import AppTextInput from "../../Components/AppTextInput/AppTextInput"

export default function LogIn({ navigation }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleFormSubmit() {
    if (!usernameInput || !passwordInput) {
      alert("Fill in all fields.");
    } else {
      setUsername(usernameInput);
      setPassword(passwordInput);
      if (username && password){
        verifyLogin()
      }
    }
  }

  async function verifyLogin() {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    const response = await fetch(
      "https://metro-mingle.onrender.com/user/login",
      options
    );
    if (response.status == 200) {
      const data = await response.json();
      const token = data.token;
      console.log(token);
      setUsernameInput("");
      setPasswordInput("");
      setPassword("");
      setUsername("");
      navigation.navigate("Dashboard");
    } else {
      alert("Invalid Credentials");
    }
    setUsernameInput("");
    setPasswordInput("");
    setPassword("");
    setUsername("");
  }

  return (
    // <ImageBackground
    // blurRadius={7}
    // source={{uri: "https://img.freepik.com/premium-vector/seamless-vector-pattern-with-colorful-train-illustration-children-hand-drawn-style_335402-68.jpg"}}
    // resizeMode="cover"
    // style={styles.backgroundImage} >
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.textStyle}>
        Login into your MetroMingle Account!:
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username:</Text>
        <AppTextInput
          placeholder="Enter Username"
          icon="account-circle-outline"
          onChangeText={(text) => setUsernameInput(text)}
          value={usernameInput}
        />
        <AppTextInput
          secureTextEntry={true}
          placeholder="Enter Password"
          icon="form-textbox-password"
          onChangeText={(text) => setPasswordInput(text)}
          value={passwordInput}
        />
        <View style={styles.buttonContainer}>
          <AppButton title="Login" onPress={handleFormSubmit} color="primary" />
          <AppButton
            title="Register"
            onPress={() => navigation.navigate("Register")}
            color="secondary"
          />
        </View>
        {/* <AppButton title='Home' onPress={()=>navigation.navigate('Home')}/> */}
      </View>
    </View>
    // </ImageBackground>
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
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
  },
  logo: {
    marginBottom: 50,
    width: 200,
    height: 200,
    justifyContent: "flex-start",
  },
  textStyle: {
    fontFamily: Platform.OS === "android" ? "Roboto" : "San Francisco",
    fontSize: 30,
    fontWeight: "bold",
  },
});

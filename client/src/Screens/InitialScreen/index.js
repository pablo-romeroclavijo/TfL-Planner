import React, { useEffect } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";

import { AppButton, GetAsync } from "../../Components";
import GradientBackground from "../../Components/Gradient";


export default function Initial({ navigation }) {
  const logoPositionY = new Animated.Value(0);
  const buttonOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoPositionY, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: false,
      }),
      Animated.timing(logoPositionY, {
        toValue: -100,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 500, // Adjust the duration as needed
        useNativeDriver: false,
      }),
    ]).start();
  }, [navigation]);
  

  return (
    <GradientBackground colors={["#1C1C1C", "#2370EE", "#FFFFFF"]}>
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logo, top: logoPositionY }}>
        <Image source={require("../../assets/logo2.png")} style={styles.logoImage} />
      </Animated.View>
      <Animated.View style={{ opacity: buttonOpacity, bottom: -150 }}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate("LogIn")}
          color="btn2"
        />
        <AppButton
          title="Register"
          onPress={() => navigation.navigate("Register")}
          color="btn2"
        />
      </Animated.View>
    </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    marginBottom: 25,
    width: 200,
    height: 200,
    justifyContent: "flex-start",
  },
  logoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    shadowColor: "#fff", // White glow color
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.9,
		shadowRadius: 10,
  },
});

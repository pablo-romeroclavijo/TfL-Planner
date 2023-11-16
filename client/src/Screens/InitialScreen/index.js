import React, { useEffect } from "react";
import { View, Animated, Image, StyleSheet } from "react-native";

import { AppButton } from "../../Components";


export default function Initial({ navigation }) {
  const logoPositionY = new Animated.Value(0);
  const buttonOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoPositionY, {
        toValue: 0,
        duration: 3000,
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
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logo, top: logoPositionY }}>
        <Image source={require("../../assets/logo2.png")} style={styles.logoImage} />
      </Animated.View>
      <Animated.View style={{ opacity: buttonOpacity, bottom: -150 }}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate("LogIn")}
          color="primary"
        />
        <AppButton
          title="Register"
          onPress={() => navigation.navigate("Register")}
          color="secondary"
        />
      </Animated.View>
    </View>
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
  },
});

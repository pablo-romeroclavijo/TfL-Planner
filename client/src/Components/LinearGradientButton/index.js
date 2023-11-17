import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, StyleSheet, Dimensions, Text, View } from "react-native"

const windowWidth = Dimensions.get("window").width;

export default function Linear({ onPress, colors, buttonText }) {
  const [isPress, setIsPress] = useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPress(true)}
      onPressOut={() => setIsPress(false)}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.gradientButton, { opacity: isPress ? 0.9 : 1 }]}
      >
        <Text style={styles.buttonText}>
          {buttonText}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 18,
        textTransform: "uppercase",
        fontWeight: "bold",
      },
      gradientButton: {
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        width: windowWidth * 0.8, 
        marginVertical: 10,
      }
})

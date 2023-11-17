import React from "react";
import { StyleSheet, Text, Pressable, Dimensions } from "react-native";

import colors from "../../config/colors";

const windowWidth = Dimensions.get("window").width;

export default function AppButton({ title, onPress, color = "primary" }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? colors[color] + '77' : colors[color] },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: windowWidth * 0.8, 
    marginVertical: 10,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

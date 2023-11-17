import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import {SVG} from "../../Components"

export default function RoutePage({}){

  return (
    <SafeAreaView style={styles.container}>
        <View>
            <SVG />
        </View>
    </SafeAreaView>
  
  );
};

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
  


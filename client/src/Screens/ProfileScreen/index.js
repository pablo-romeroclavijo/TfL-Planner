import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Profile(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile Details</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: 20,
      marginTop: 55,
    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20, 
    }
})

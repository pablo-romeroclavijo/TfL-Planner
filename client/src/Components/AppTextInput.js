import React from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors'

function AppTextInput({icon, ...otherProps}) {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color="black" style={styles.icon}/>}
            <TextInput style={styles.TextInput} {...otherProps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        marginVertical: 10,
        justifyContent: 'center',
        height: 40,
        borderColor: 'gray',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    icon: {
        marginRight: 10,

    },
    TextInput: {
        fontsize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir"
    }
})

export default AppTextInput;
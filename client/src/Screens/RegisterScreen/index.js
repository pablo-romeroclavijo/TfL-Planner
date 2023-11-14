import React, { useState, useEffect } from "react";
import AppTextInput from "../../Components/AppTextInput";
import validator from "validator";
import { View, StyleSheet } from "react-native";
import AppButton from "../../Components/AppButton";

export default function Register({navigation}){
    
    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [postcodeInput, setPostcodeInput] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [postcode, setPostcode] = useState('')

    async function handleFormSubmit(){
        if (!usernameInput || !passwordInput || !confirmPasswordInput || !emailInput || !postcodeInput){
            alert("Fill in all fields.")
        } else if (passwordInput !== confirmPasswordInput ){
            alert("Passwords do not match.")
        } else if (!validator.isPostalCode(postcodeInput, "GB")){
            alert("Enter a valid postcode.")
        } else if (!validator.isEmail(emailInput)){
            alert("Enter a valid email.")
        } else {
            setUsername(usernameInput)
            setPassword(passwordInput)
            setConfirmPassword(confirmPasswordInput)
            setEmail(emailInput)
            setPostcode(postcodeInput)

            if (username && password && email && postcode){
                const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'                    
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    postcode: postcode,
                    email: email,
                    remainder: 1,
                }),
            };
            const response = await fetch ('https://metro-mingle.onrender.com/user/register', options)
            if (response.status == 201){
                const data = await response.json()
                const token = data.token
                console.log(token);
                navigation.navigate("Dashboard")
            } else {
                alert("Register failed, try again later.");
            }
            }
            // setUsernameInput('')
            // setPasswordInput('')
        }
    }



    return(
        <View style={styles.container}>
            <AppTextInput placeholder="Enter Username" onChangeText={(text) => setUsernameInput(text)}/> 
            <AppTextInput secureTextEntry={true} placeholder="Enter Password" onChangeText={(text) => setPasswordInput(text)}/> 
            <AppTextInput secureTextEntry={true} placeholder="Confirm Password" onChangeText={(text) => setConfirmPasswordInput(text)}/> 
            <AppTextInput placeholder="Enter Email" onChangeText={(text) => setEmailInput(text)}/> 
            <AppTextInput placeholder="Enter Postcode" onChangeText={(text) => setPostcodeInput(text)}/> 
            <AppButton title='Submit' onPress={handleFormSubmit} color="primary" />
        </View>    
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
})

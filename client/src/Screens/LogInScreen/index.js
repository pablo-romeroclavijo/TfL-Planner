import { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet, Pressable } from "react-native";

export default function LogIn(){

    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    async function handleFormSubmit(){
        if (!usernameInput || !passwordInput){
            alert("Fill in all fields.")
        }
        setUsername(usernameInput)
        setPassword(passwordInput)
        // setUsernameInput('')
        // setPasswordInput('')
    }

    useEffect(() => {
        // This useEffect runs whenever username or password changes
        if (username && password) {
          alert(`Username set as ${username}. Password set as ${password}`);
          // Now, call the verifyLogin function
          verifyLogin();
        }
      }, [username, password]);

        async function verifyLogin(){
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'                    
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            };
            const response = await fetch ('#', options)
        }

    return(
        <View>
            <Text>Login Here:</Text>
            <TextInput style={styles.inputStyles} placeholder="Enter Username" onChangeText={(text)=>setUsernameInput(text) } />
            <TextInput style={styles.inputStyles} placeholder="Enter Passsord" onChangeText={(text)=>setPasswordInput(text)} />      
            <Pressable title='Login' onPress={handleFormSubmit} > 
             <Text>Login</Text> 
            </Pressable>
            <Pressable title='RegisterDirect'>
                <Text>Register</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyles: {
        alignSelf: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        paddingRight: 10,
        width: 200,
        marginBottom: 20,
        borderRadius: 5,
      }
});
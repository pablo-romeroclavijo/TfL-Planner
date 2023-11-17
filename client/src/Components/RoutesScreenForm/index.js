import react, { useState, useEffect } from "react";
import { View, Text, Picker } from "react-native";
import { AppButton, AppTextInput, GetAsync, RouteParamsModal } from "../../Components";
import validator from "validator";
    
export default function RoutesScreenForm(){
 
    const [startPostcodeInput, setStartPostcodeInput] = useState('')
    const [endPostcodeInput, setEndPostcodeInput] = useState('')
    const [token, setToken] = useState('')
    const [route, setRoute] = useState([])
    const [paramsModal, setParamsModal] = useState(false)

    async function clickPreferences() {
        setParamsModal(!paramsModal);
      }

    useEffect(() => {
        async function getToken() {
          setToken(await GetAsync("token"));
        }
        getToken();
      }, []);

      console.log(token)

    function dataValidation(){
        if (!startPostcodeInput || !endPostcodeInput) {
            alert("Fill in all fields.");
        } else if (!validator.isPostalCode(startPostcodeInput.trim(), "GB") || startPostcodeInput.length < 5) {
            alert("Enter a valid starting postcode.");
        } else if (!validator.isPostalCode(endPostcodeInput.trim(), "GB") || endPostcodeInput.length < 5) {
            alert("Enter a valid ending postcode.");
        } else {
            getRoute();
        }
    }


    async function getRoute(){
        const startPostcode = startPostcodeInput
        const endPostcode = endPostcodeInput

        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({
                "origins":{
                    from: startPostcode,
                    to: endPostcode,
                },
                "params": {
            
                },
            }),
        }
        const response = await fetch("https://metro-mingle.onrender.com/tfl/get", options)
        console.log(response)
        if (response.status == 200){
            const data = await response.json()
            setRoute(data.journeys[0].legs)
            console.log(data)

        } else {
            alert("Request failed.")
        }
    }

    return(
        <View>
            <AppTextInput onChangeText={(text)=>setStartPostcodeInput(text)} placeholder="Start Postcode" />
            <AppTextInput onChangeText={(text)=>setEndPostcodeInput(text)} placeholder="End Postcode" />
            <AppButton onPress={clickPreferences} title="Preferences" />
            {clickPreferences ? 
            <RouteParamsModal paramsModal={paramsModal} closeModal={clickPreferences}></RouteParamsModal>
            : null
            }
            <AppButton onPress={dataValidation} title="Submit" /> 
            {route ? route.map((r, index) => <Text key={index}>{r.summary}</Text>) : null}
        </View>
    )
}
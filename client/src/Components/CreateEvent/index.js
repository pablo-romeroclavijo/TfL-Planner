import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { AppButton, AppTextInput, GetAsync } from "../"
import validator from "validator";

export default function CreateEventForm({closeModal}) {

  const [postcodeInput, setPostcodeInput] = useState('')
  const [dateInput, setDateInput] = useState(null)
  const [timeInput, setTimeInput] = useState(null)
  const [descriptionInput, setDescriptionInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [token, setToken] = useState('')
  
  useEffect(()=>{
    async function getToken(){
      setToken(await GetAsync("token"))
    }
    getToken()
  },[])


  function dataValidation(){
    const dateOptions ={ 
      format: 'YYYY-MM-DD',
      delimiters: ['-'] ,
    }
    const timeOptions = {
      hourFormat: 'hour24',
    }
    if (!postcodeInput || !dateInput || !timeInput || !titleInput ){
      alert("Fill in all fields.")
    } else if (!validator.isPostalCode(postcodeInput, 'GB')){
      alert("Enter valid postcode.")
    } else if (!validator.isDate(dateInput, dateOptions)){
      alert("Enter a valid date.")
    } else if (!validator.isTime(timeInput, timeOptions)){
      alert("Enter Valid Time.")
    } else {
      createEvent()
    }
  }

  async function createEvent(){
    const postcode = postcodeInput
		const date = dateInput.trim() + ' ' + timeInput.trim()
		const description = descriptionInput.trim() || null
    const title = titleInput.trim()
    const options = {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
        "Authorization": token,
			},
			body: JSON.stringify({
				postcode: postcode,
				date: date,
				description: description,
        title: title,
			}),
		}
		const response = await fetch(
			"https://metro-mingle.onrender.com/event/create",
			options
		)

		if (response.status == 201) {
      alert("Event Created.")
      closeModal()
    } else {
			alert("Register failed, try again later.")
      closeModal()
		}

	}


  return (
    <View>
      <AppTextInput
        placeholder="Enter Postcode"
        onChangeText={(text) => setPostcodeInput(text)}
      />
      <AppTextInput
        placeholder="Enter Date (YYYY-MM-DD)"
        onChangeText={(text) => setDateInput(text)}
      />
      <AppTextInput
        placeholder="Enter Time (24H) hh:mm"
        onChangeText={(text) => setTimeInput(text)}
      />
      <AppTextInput
        placeholder="Enter Description"
        onChangeText={(text) => setDescriptionInput(text)}
      />
      <AppTextInput
        placeholder="Enter Event Title"
        onChangeText={(text) => setTitleInput(text)}
      />
      <AppButton title="Submit" onPress={dataValidation} />
    </View>
  );
}

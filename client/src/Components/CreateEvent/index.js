import React, { useEffect, useState } from "react";
import { Text, View, Button, Platform, StyleSheet } from "react-native";
import { AppButton, AppTextInput, GetAsync } from "../"
import validator from "validator";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function CreateEventForm({closeModal}) {

  const [postcodeInput, setPostcodeInput] = useState('')
  const [dateInput, setDateInput] = useState(null)
  const [timeInput, setTimeInput] = useState(null)
  const [descriptionInput, setDescriptionInput] = useState('')
  const [titleInput, setTitleInput] = useState('')
  const [token, setToken] = useState('')
  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState('date')
  const [show, setShow] = useState(false)
  const [text, setText] = useState ('')
  const [fDate, setFDate] = useState('')
  const [fTime, setFTime] = useState('')


  const showDatePicker = () => {
    setShow(true);
    setMode('date');
  };

  const showTimePicker = () => {
    setShow(true);
    setMode('time');
  };

  const hideDateTimePicker = () => {
    setShow(false);
  };

  const onDateTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    hideDateTimePicker();

    let tempDate = new Date(currentDate);
    setFDate(tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate());
    setFTime(tempDate.getHours()+':'+ tempDate.getMinutes().toString().padStart(2, '0'));
    setText(fDate + ' ' + fTime );

    console.log(fDate + fTime);
  };
  
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
    if (!postcodeInput || !text || !titleInput ){
      alert("Fill in all fields.")
    } else if (!validator.isPostalCode(postcodeInput, 'GB')){
      alert("Enter valid postcode.")
    } else {
      createEvent()
    }
  }

  async function createEvent(){
    const postcode = postcodeInput
		const date = text
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
      {/* <AppTextInput
        placeholder="Enter Date (YYYY-MM-DD)"
        onChangeText={(text) => setDateInput(text)}
      />
      <AppTextInput
        placeholder="Enter Time (24H) hh:mm"
        onChangeText={(text) => setTimeInput(text)}
      /> */}
      <AppTextInput
        placeholder="Enter Description"
        onChangeText={(text) => setDescriptionInput(text)}
      />
      <AppTextInput
        placeholder="Enter Event Title"
        onChangeText={(text) => setTitleInput(text)}
      />

      <AppButton title={fDate ? fDate : "Set Date"} onPress={showDatePicker} ></AppButton>
      <AppButton title={fTime ? fTime : "Set Time"} onPress={showTimePicker}></AppButton>

      {show && 
      <DateTimePicker
      testID="dateTimePicker"
      value={date}
      mode={mode}
      is24Hour={true}
      display="default"
      onChange={onDateTimeChange}
      />}

      <AppButton title="Submit" onPress={dataValidation} />
    </View>
  );
}

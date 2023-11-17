import React, { useEffect, useState } from "react";
import { Text, View, Button, Platform } from "react-native";
import { AppButton, AppTextInput, GetAsync } from "../";
import validator from "validator";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CreateEventForm({ closeModal }) {
  const [postcodeInput, setPostcodeInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [token, setToken] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [text, setText] = useState("");
  const [fDate, setFDate] = useState("");
  const [fTime, setFTime] = useState("");


  useEffect(() => {
    if (fDate && fTime) {
      setText(fDate + " " + fTime);
    }
  }, [fDate, fTime]);

  const showDatepicker = () => {
    setShowDatePicker(true);
    setShowTimePicker(false);
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
    setShowDatePicker(false);
  };

  const hideDateTimePicker = () => {
    setShowDatePicker(false);
    setShowTimePicker(false);
  };

  const onDateChange = (selectedDate) => {
    const currentDate = selectedDate || date;
    hideDateTimePicker();
    let tempDate = new Date(currentDate);
    setFDate(
      tempDate.getFullYear() +
        "-" +
        (tempDate.getMonth() + 1) +
        "-" +
        tempDate.getDate()
    );
    (fDate && fTime) ? setText(fDate + " " + fTime) : null

  };

  const onTimeChange = (selectedTime) => {
    const currentTime = selectedTime || date;
    hideDateTimePicker();
    let tempTime = new Date(currentTime);
    setFTime(
      tempTime.getHours() +
        ":" +
        tempTime.getMinutes().toString().padStart(2, "0")
    );
    (fDate && fTime) ? setText(fDate + " " + fTime) : null;
  };

  useEffect(() => {
    async function getToken() {
      setToken(await GetAsync("token"));
    }
    getToken();
  }, []);

  function dataValidation() {
    if (!postcodeInput || !text || !titleInput) {
      alert("Fill in all fields.");
    } else if (!validator.isPostalCode(postcodeInput.trim(), "GB") || postcodeInput.length < 5) {
      alert("Enter a valid postcode.");
    } else {
      createEvent();
    }
  }

  async function createEvent() {
    const postcode = postcodeInput.trim();
    const date = text;
    const description = descriptionInput.trim() || null;
    const title = titleInput.trim();
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        postcode: postcode,
        date: date,
        description: description,
        title: title,
      }),
    };
    const response = await fetch(
      "https://metro-mingle.onrender.com/event/create",
      options
    );

    if (response.status == 201) {
      alert("Event Created.");
      closeModal();
    } else {
      alert("Event creation failed, try again later.");
      closeModal();
    }
  }

  return (
    <View style={{alignContent: "center"}}>
      <AppTextInput
        placeholder="Enter Postcode"
        onChangeText={(text) => setPostcodeInput(text)}
      />
      <AppTextInput
        placeholder="Enter Description"
        onChangeText={(text) => setDescriptionInput(text)}
      />
      <AppTextInput
        placeholder="Enter Event Title"
        onChangeText={(text) => setTitleInput(text)}
      />

      <AppButton
        title={fDate ? fDate : "Set Date"}
        onPress={showDatepicker}
      ></AppButton>
      <AppButton
        title={fTime ? fTime : "Set Time"}
        onPress={showTimepicker}
      />

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onTimeChange}
        />
      )}

      <AppButton title="Submit" onPress={dataValidation} />
    </View>
  );
}

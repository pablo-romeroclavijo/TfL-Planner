import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { AppButton, AppTextInput, GetAsync, RouteParamsModal } from "../../Components";
import validator from "validator";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export default function RoutesScreenForm() {
  const [startPostcodeInput, setStartPostcodeInput] = useState("");
  const [endPostcodeInput, setEndPostcodeInput] = useState("");
  const [token, setToken] = useState("");
  const [route, setRoute] = useState([]);
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fDate, setFDate] = useState("");
  const [fTime, setFTime] = useState("");
  const [paramsModal, setParamsModal] = useState(false);
  const [selectedParams, setSelectedParams] = useState({
    taxiOnlyChecked: false,
    nationalSearch: false,
    journeyPref: null,
    mode: null,
    walkingSpeed: null,
  });
  const [timeOption, setTimeOption] = useState("")


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
    const currentDate = selectedDate.nativeEvent.timestamp || date;
    hideDateTimePicker();
    let tempDate = new Date(currentDate);
    setFDate(
      tempDate.getFullYear().toString() + (tempDate.getMonth() + 1).toString() + tempDate.getDate().toString());
  };

  const onTimeChange = (selectedTime) => {
    const currentTime = selectedTime.nativeEvent.timestamp || date;
    hideDateTimePicker();
    let tempTime = new Date(currentTime);
    setFTime(tempTime.getHours().toString() + tempTime.getMinutes().toString().padStart(2, "0")
    );
  };

  const handleParamsSelection = (params) => {
    setSelectedParams(params);
  };

  async function clickPreferences() {
    setParamsModal(!paramsModal);
  }

  useEffect(() => {
    async function getToken() {
      setToken(await GetAsync("token"));
    }
    getToken();
  }, []);

  function dataValidation() {
    if (!startPostcodeInput || !endPostcodeInput) {
      alert("Fill in all fields.");
    } else if (
      !validator.isPostalCode(startPostcodeInput.trim(), "GB") ||
      startPostcodeInput.length < 5
    ) {
      alert("Enter a valid starting postcode.");
    } else if (
      !validator.isPostalCode(endPostcodeInput.trim(), "GB") ||
      endPostcodeInput.length < 5
    ) {
      alert("Enter a valid ending postcode.");
    } else {
      getRoute();
    }
  }

  async function getRoute() {
    const startPostcode = startPostcodeInput;
    const endPostcode = endPostcodeInput;
    const useDate = fDate
    console.log(useDate)
    const useTime = fTime
    console.log(useTime)
    const timeIs = timeOption
    console.log(timeIs)
    console.log(selectedParams.mode)
    console.log(selectedParams.walkingSpeed)
    console.log(selectedParams.taxiOnlyChecked)
    console.log(selectedParams.nationalSearch)
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        origins: {
          from: startPostcode,
          to: endPostcode,
        },
        params: {
          taxiOnlyTrip: selectedParams.taxiOnlyChecked,
          nationalSearch: selectedParams.nationalSearch,
          date: useDate || "",
          time: useTime || "",
          timeIs: timeIs || "",
          mode: selectedParams.mode || "",
          walkingSpeed: selectedParams.walkingSpeed || "",
          useRealTimeArrivals: true,
        },
      }),
    };
    const response = await fetch(
      "https://metro-mingle.onrender.com/tfl/get",
      options
    );
    console.log(response);
    if (response.status == 200) {
      const data = await response.json();
      console.log(data)
      setRoute(data.journeys[0].legs || data.journeys.legs || data.journeys);
      console.log(data);
    } else {
      alert("Request failed.");
    }
  }

  return (
    <View>
      <AppTextInput
        onChangeText={(text) => setStartPostcodeInput(text)}
        placeholder="Start Postcode"
      />
      <AppTextInput
        onChangeText={(text) => setEndPostcodeInput(text)}
        placeholder="End Postcode"
      />

      <AppButton
        title={fDate ? fDate : "Set Date"}
        onPress={showDatepicker}
      />

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
      
        <Picker selectedValue={timeOption} onValueChange={(itemValue)=>setTimeOption(itemValue)}>
            <Picker.Item label="Select" value={null} />
            <Picker.Item label="Arrive By" value="arriving" />
            {/* <Picker.Item label="Depart" value="departing" /> */}
        </Picker>

      <AppButton onPress={clickPreferences} title="Preferences" />
      {paramsModal ? (
        <RouteParamsModal
          paramsModal={paramsModal}
          closeModal={clickPreferences}
          onParamsSelect={handleParamsSelection}
        ></RouteParamsModal>
      ) : null}
      <AppButton onPress={dataValidation} title="Submit" />
      {route
        ? route.map((r, index) => <Text key={index}>{r.summary}</Text>)
        : null}
    </View>
  );
}

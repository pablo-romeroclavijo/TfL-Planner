import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { AppButton, AppTextInput, GetAsync, RouteParamsModal, SlideBox } from "../../Components";
import validator from "validator";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export default function RoutesScreenForm({navigation}) {
  const [startPostcodeInput, setStartPostcodeInput] = useState("");
  const [endPostcodeInput, setEndPostcodeInput] = useState("");
  const [token, setToken] = useState("");
  const [route, setRoute] = useState(false);
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [fDate, setFDate] = useState("");
  const [fTime, setFTime] = useState("");
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [paramsModal, setParamsModal] = useState(false);
  const [finalRoute, setFinalRoute] = useState(false)
  const [selectedParams, setSelectedParams] = useState({
    taxiOnlyChecked: false,
    nationalSearch: false,
    journeyPref: "",
    mode: "",
    walkingSpeed: "",
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
      tempDate.getFullYear().toString() + (tempDate.getMonth() + 1).toString() + tempDate.getDate().toString().padStart(2,"0"));
    setEventDate(
      tempDate.getFullYear().toString() + "-" + (tempDate.getMonth() + 1).toString() + "-" + tempDate.getDate().toString());
  };

  const onTimeChange = (selectedTime) => {
    const currentTime = selectedTime.nativeEvent.timestamp || date;
    hideDateTimePicker();
    let tempTime = new Date(currentTime);
    setFTime(tempTime.getHours().toString().padStart(2, "0") + tempTime.getMinutes().toString().padStart(2, "0")
    );
    setEventTime(tempTime.getHours().toString().padStart(2, "0") + ":" + tempTime.getMinutes().toString().padStart(2, "0")
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
    const startPostcode = startPostcodeInput.trim();
    const endPostcode = endPostcodeInput.trim();
    const useDate = fDate || "" 
    const useTime = fTime || ""
    const timeIs = timeOption || ""
    console.log(startPostcode)
    console.log(endPostcode)
    console.log(useDate)
    console.log(useTime)
    console.log("Time is", timeIs)
    console.log("Mode", selectedParams.mode)
    console.log("Walking speed", selectedParams.walkingSpeed)
    console.log("Taxi Only", selectedParams.taxiOnlyChecked)
    console.log("National search", selectedParams.nationalSearch)
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
      setRoute(data.journeys);
    } else {
      alert("Request failed.");
    }
  }


  async function createEvent() {
		const postcode = endPostcodeInput.trim()
		const date = eventDate + " " + eventTime
		const description = null
		const title = startPostcodeInput.trim() + " to " + endPostcodeInput.trim()
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
    const data = await response.json()
    console.log(data)

    if (response.status === 201) {
      alert("Event Created.");
      navigation.navigate("Dashboard")      
    } else {
      alert("Event creation failed, try again later.");
    }
  }


  return (
    <ScrollView style={styles.screen}>
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
      {/* {route
        ? route.map((r, index) => <Text key={index}>{r.summary}</Text>)
        : null} */}
        <SafeAreaView style={styles.container}>
          <View>
            {route ?
              <SlideBox slides={[
                {journey: route[0], content: 'Route 1', onSelect: () => {setFinalRoute(route[0]);createEvent()}}, 
                {journey: route[1], content: 'Route 2', onSelect: () => setFinalRoute(route[1])}, 
                {journey: route[2], content: 'Route 3', onSelect: () => setFinalRoute(route[2])}
                ]} />
              : null
              }
          </View>
        </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    height: "auto"
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
    height: "auto",
  }
});

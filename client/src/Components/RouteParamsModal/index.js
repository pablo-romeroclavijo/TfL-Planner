import { useState, useEffect } from "react";
import { Text, Modal, View, Pressable, StyleSheet, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from 'react-native-elements';
import AppButton from "../AppButton";
const { width, height } = Dimensions.get("window");
import GetAsync from "../AsyncStorageGet";

export default function RouteParamsModal({ closeModal, paramsModal, onParamsSelect }) {
  const [taxiOnlyChecked, setTaxiOnlyChecked] = useState(false)
  const [nationalSearch, setNationalSearch] = useState(false)
  const [journeyPref, setJourneyPref] = useState("")
  const [mode, setMode] = useState("")
  const [walkingSpeed, setWalkingSpeed] = useState("")
  const [effect, setEffect] = useState(false)

  useEffect(()=>{

    async function getPrefs(){
        const journeyPreferences = await GetAsync("journeyPreferences")
        setJourneyPref(journeyPreferences)
        console.log(journeyPreferences)
        const walkSpeed = await GetAsync("walkingSpeed")
        setWalkingSpeed(walkSpeed)
        console.log(walkSpeed)
        setEffect(true)
    }
        getPrefs()

  },[])
  

  const handleModalClose = () => {
    onParamsSelect({
      taxiOnlyChecked,
      nationalSearch,
      journeyPref,
      mode,
      walkingSpeed,
    });
    closeModal()
  };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={paramsModal}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.container}>
            <View>
            <Text style={styles.header1}>Preferences</Text>
            </View>

            <View>
            <Text style={styles.header2}>Select Journey Preference:</Text>
            <Picker style={styles.picker} selectedValue={journeyPref} onValueChange={(itemValue) => setJourneyPref(itemValue)}>
                <Picker.Item style={styles.pickerLabel} label="Least Walking" value="" />
                <Picker.Item style={styles.pickerLabel} label="Least Time Possible" value="leasttime" />
                <Picker.Item style={styles.pickerLabel} label="Least Interchange" value="leastinterchange" />
            </Picker>
            </View>

            <View>
            <Text style={styles.header2}>Select Mode:</Text>
            <Picker style={styles.picker} selectedValue={mode} onValueChange={(itemValue) => setMode(itemValue)}>
                <Picker.Item style={styles.pickerLabel} label="Any" value="" />
                <Picker.Item style={styles.pickerLabel} label="Overground" value="overground" />
                <Picker.Item style={styles.pickerLabel} label="Tube" value="tube" />
                <Picker.Item style={styles.pickerLabel} label="DLR" value="tube" />
                <Picker.Item style={styles.pickerLabel} label="National Rail" value="tube" />
                <Picker.Item style={styles.pickerLabel} label="Car" value="tube" />
                <Picker.Item style={styles.pickerLabel} label="Uber Boat" value="tube" />
            </Picker>
            </View>

            <View>
            <Text style={styles.header2}>Select Walking Speed:</Text>
            <Picker style={styles.picker} selectedValue={walkingSpeed} onValueChange={(itemValue) => setWalkingSpeed(itemValue)}>
                <Picker.Item style={styles.pickerLabel} label="Slow" value="slow" />
                <Picker.Item style={styles.pickerLabel} label="Average" value="average" />
                <Picker.Item style={styles.pickerLabel} label="Fast" value="fast" />
            </Picker>
            </View>

            <View>
            <CheckBox title="Taxi Only" checked={taxiOnlyChecked} onPress={() => setTaxiOnlyChecked(!taxiOnlyChecked)}
            checkedIcon="check-square-o"
            uncheckedIcon="square-o"
            checkedColor="rgb(71,141,185)"
            uncheckedColor="rgb(71,141,185)" 
            containerStyle={styles.box} 
            center
            iconRight
            size={30}
            textStyle={{ fontSize: 20 }}
            />
            </View>
            <View style={styles.button}>
                <AppButton title="Close" onPress={handleModalClose} />
            </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      height: height,
      backgroundColor: "white"
  },
  header1: {
  fontSize: 30,
  paddingTop: 30,
  paddingBottom: 10,
  fontWeight: "bold",
  textAlign: "center"
},
header2: {
  paddingTop: 20,
  fontSize: 20,
  textAlign: "left",
  paddingLeft: 50,
  fontWeight:'bold'
},
box: {
  backgroundColor: "white",
  borderColor: "white",
},
picker: {
  display: "flex",
  height: 80,
  width: 300,
  marginLeft:60
},
pickerLabel: {
  fontWeight: "bold",
  fontSize: 20,

},
button: {
  paddingTop: 30,
  display: "flex",
  alignItems: "center"
}
})
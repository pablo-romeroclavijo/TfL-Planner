import { useState } from "react";
import { Text, Modal, View, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {CheckBox} from 'react-native-elements';
import AppButton from "../AppButton";

export default function RouteParamsModal({closeModal, paramsModal, onParamsSelect}){
    const [taxiOnlyChecked, setTaxiOnlyChecked] = useState(false)
    const [nationalSearch, setNationalSearch] = useState(false)
    const [journeyPref, setJourneyPref] = useState("")
    const [mode, setMode] = useState("")
    const [walkingSpeed, setWalkingSpeed] = useState("")

    //date, time, timeIs, mode, walkingSpeed, userealtimearrivals

    const handleModalClose = () => {
        // Call the callback function with selected parameters
        onParamsSelect({
          taxiOnlyChecked,
          nationalSearch,
          journeyPref,
          mode,
          walkingSpeed,
        });
        closeModal()
      };

    return(
        <View>
            <Modal
                animationType="slide"
                visible = {paramsModal}
                onRequestClose={()=> closeModal()}
            >
                <View>
                    <Text>Preferences</Text>
                </View>

                <View>
                    <Text>Select Journey Preference:</Text>
                    <Picker selectedValue={journeyPref} onValueChange={(itemValue)=>setJourneyPref(itemValue)}>
                        <Picker.Item label="Select" value={""} />
                        <Picker.Item label="Least Time Possible" value="leasttime" />
                        <Picker.Item label="Most Time Possible" value="mosttime" />
                    </Picker>
                </View>

                <View>
                    <Text>Select Mode:</Text>
                    <Picker selectedValue={mode} onValueChange={(itemValue)=>setMode(itemValue)}>
                        <Picker.Item label="Select" value={""} />
                        <Picker.Item label="Overground" value="overground" />
                        <Picker.Item label="Tube" value="tube" />
                    </Picker>
                </View>

                <View>
                    <Text>Select Walking Speed:</Text>
                    <Picker selectedValue={walkingSpeed} onValueChange={(itemValue)=>setWalkingSpeed(itemValue)}>
                        <Picker.Item label="Select" value={""} />
                        <Picker.Item label="Slow" value="slow" />
                        <Picker.Item label="Average" value="average" />
                        <Picker.Item label="Fast" value="fast" />
                    </Picker>
                </View>

                <View>
                    <CheckBox title="Taxi Only" checked={taxiOnlyChecked} onPress={()=>setTaxiOnlyChecked(!taxiOnlyChecked)} />
                    <CheckBox title="National Search" checked={nationalSearch} onPress={()=>setNationalSearch(!nationalSearch)} />
                </View>

                <AppButton title="Close" onPress={handleModalClose} />


            </Modal>
        </View>
    )
}
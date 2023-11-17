import { useState } from "react";
import { Text, Modal, View, Pressable, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {CheckBox} from 'react-native-elements';
import AppButton from "../AppButton";

export default function RouteParamsModal({closeModal, paramsModal}){
    const [taxiOnlyChecked, setTaxiOnlyChecked] = useState(false)
    const [nationalSearch, setNationalSearch] = useState(false)
    const [journeyPref, setJourneyPref] = useState('')

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
                        <Picker.Item label="Least Time Possible" value="leasttime" />
                        <Picker.Item label="Most Time Possible" value="mosttime" />
                    </Picker>

                </View>

                <View>
                    <CheckBox title="Taxi Only" checked={taxiOnlyChecked} onPress={()=>setTaxiOnlyChecked(!taxiOnlyChecked)} />
                    <CheckBox title="National Search" checked={nationalSearch} onPress={()=>setNationalSearch(!nationalSearch)} />
                </View>

                <AppButton title="Close" onPress={()=>closeModal()} />


            </Modal>
        </View>
    )
}
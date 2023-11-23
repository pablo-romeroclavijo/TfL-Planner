import React, {useState} from "react";
import { Text, Modal, View, Pressable, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';

import CreateEventForm from "../CreateEvent";
import AppButton from "../AppButton";

export default function CreateEventModal({isVisible, closeModal, createEvent}){

    return(
        <View>
            <Modal
                animationType="slide"
                visible={createEvent}
                onRequestClose={() => closeModal()}
            >
                
                
                <View style={styles.row}>
                    <Text style={styles.headerText}>Create Event</Text>
                    <Pressable style={styles.cross} onPress={()=> closeModal()}>
                        <Entypo name="cross" size={24} color="black" />
                    </Pressable>
                </View>
                <CreateEventForm closeModal={closeModal}/>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 24
    },
      headerText: {
        flex: 1, // This will make the text take up the available space
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop:20
    },
    cross: {
        marginRight:25,
        marginTop: 25
    }
  });

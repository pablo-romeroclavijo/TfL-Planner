import React, { useState } from "react";
import { Text, View, StyleSheet, Modal, TouchableOpacity, Button } from "react-native";

import { AppTextInput, AppButton, LogoutButton } from "../../Components";


export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [postcodeInput, setPostcodeInput] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile Details</Text>
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.click}>Edit Profile</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text style={[styles.info]}>Email:</Text>
          <AppTextInput
            placeholder="Enter Email"
            icon="email"
            onChangeText={(text) => setEmailInput(text)}
          />
          <Text style={styles.info}>Password:</Text>
          <AppTextInput
            secureTextEntry={true}
            placeholder="Enter Password"
            icon="form-textbox-password"
            onChangeText={(text) => setPasswordInput(text)}
          />
          <Text style={styles.info}>Confirm Password:</Text>
          <AppTextInput
            secureTextEntry={true}
            placeholder="Confirm Password"
            icon="form-textbox-password"
            onChangeText={(text) => setConfirmPasswordInput(text)}
          />
          <Text style={styles.info}>Postcode:</Text>
          <AppTextInput
            placeholder="Enter Postcode"
            icon="post"
            onChangeText={(text) => setConfirmPasswordInput(text)}
          />
        </View>
        <View style={{alignSelf: "center", marginBottom: 20}}>
          <AppButton title="Cancel" onPress={closeModal} style={styles.info} />
        </View>  
      </Modal>
          {/* <LogoutButton /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
    marginTop: 55,
  },
  header: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontWeight: "bold",
    alignItems: "flex-start"
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  click: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 23
  }
});

import React, { useState } from "react";
import { Text, View, StyleSheet, Modal, TouchableOpacity, Linking } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import { AppTextInput, AppButton, LogoutButton } from "../../Components";
import { ScrollView } from "react-native-gesture-handler";

const openLink = (url) => {
  Linking.openURL(url);
};

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [postcodeInput, setPostcodeInput] = useState("");

  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  const [selectedHelpOption, setSelectedHelpOption] = useState(null);

  const helpModal = (option) => {
   setSelectedHelpOption(option);
   setModalHelpVisible(true);

  };



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


      <Text style={styles.header}>Help</Text>
    
      <TouchableOpacity onPress={() => helpModal(1)}>
      <Text style={styles.click}>FAQ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => helpModal(2)}>
      <Text style={styles.click}>About App</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => helpModal(3)}>
      <Text style={styles.click}>Delete my account</Text>
      </TouchableOpacity>



      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={() => closeModal()}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.info}>Email:</Text>
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
              onChangeText={(text) => setPostcodeInput(text)}
            />
            <View style={{ alignSelf: "center", marginBottom: 20 }}>
              <AppButton
                title="Cancel"
                onPress={closeModal}
                style={styles.info}
              />
            </View>
          </View>
        </Modal>

      <Modal
      animationType="slide"
      transparent={false}
      visible={modalHelpVisible}
      onRequestClose={() => setModalHelpVisible(false)}
      >
      <View style={styles.modalContainer}>
        {selectedHelpOption === 1 && (
          <View>
          <ScrollView>
          <Text style={styles.info}>Is my data safe?</Text>
            <Text style={styles.placeholderText}>
              Placeholder text for data safety goes here. You can find key information, privacy and security settings all in your Google Account. We have created easy-to-use tools like Dashboard and My Activity, which give you transparency data collected from your activity across Google services. There are also powerful privacy controls such as Activity Controls and Ad Settings, which allow you to switch the collection and use of data on or off to decide how all of Google can work better for you.
            </Text>

            <Text style={styles.info}>How to share my event on Social Media?</Text>
            <Text style={styles.placeholderText}>
              Placeholder text for sharing on social media goes here. You can find key information, privacy and security settings all in your Google Account. We have created easy-to-use tools like Dashboard and My Activity, which give you transparency data collected from your activity across Google services. There are also powerful privacy controls such as Activity Controls and Ad Settings, which allow you to switch the collection and use of data on or off to decide how all of Google can work better for you.
            </Text>

            <Text style={styles.info}>Can I use this app for businesses?</Text>
            <Text style={styles.placeholderText}>
              Placeholder text for using the app for businesses goes here. You can find key information, privacy and security settings all in your Google Account. We have created easy-to-use tools like Dashboard and My Activity, which give you transparency data collected from your activity across Google services. There are also powerful privacy controls such as Activity Controls and Ad Settings, which allow you to switch the collection and use of data on or off to decide how all of Google can work better for you.
            </Text>
              </ScrollView>
          </View>
          
        )}
        {selectedHelpOption === 2 && (
          <View>
    <Text style={styles.info}>Metro Mingle - to travel, to track</Text>
    <Text style={styles.placeholderText}>
      Placeholder text for Metro Mingle goes here. Describe the app's features, purpose, and any other relevant information.
    </Text>

    <Text style={styles.info}>Meet the team</Text>

    <TouchableOpacity onPress={() => openLink("https://github.com/JustaGlitch")}>
      <Text style={styles.link}>Justin, project lead</Text>
    </TouchableOpacity>
    
    <TouchableOpacity onPress={() => openLink("https://github.com/pablo-romeroclavijo")}>
      <Text style={styles.link}>Pablo, back end developer</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => openLink("https://github.com/olgaKhristo")}>
      <Text style={styles.link}>Sidique, front end developer</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => openLink("https://github.com/olgaKhristo")}>
      <Text style={styles.link}>Olga, front end developer</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => openLink("https://github.com/olgaKhristo")}>
      <Text style={styles.link}>Andrew, front end developer</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => openLink("https://github.com/olgaKhristo")}>
      <Text style={styles.link}>Anoop, front end developer</Text>
    </TouchableOpacity>
   
  </View>

          
        )}
        {selectedHelpOption === 3 && (
          <Text style={styles.info}>Delete my account content goes here</Text>
        )}
        
        <View style={{ alignSelf: "center", marginBottom: 20 }}>
          <AppButton
            title="Close"
            onPress={() => setModalHelpVisible(false)}
            style={styles.info}
          />
        </View>
      </View>
    </Modal>


      </GestureRecognizer>
      <View style={styles.logoutButton}>
     <LogoutButton />
     </View>
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
    marginTop: 20,
  },
  info: {
    fontWeight: "bold",
    alignItems: "flex-start",
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 55,
  },
  click: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 23,
  },
  logoutButton: {
    alignSelf: "center"
  },
  link: {
    color: 'blue', 
    // textDecorationLine: 'underline',
    marginVertical: 5, 
  },
  
});

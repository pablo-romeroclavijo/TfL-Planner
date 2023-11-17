import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Picker } from "@react-native-picker/picker";

import { AppTextInput, LogoutButton, Linear, GetAsync } from "../../Components";
import colors from "../../config/colors";

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [postcodeInput, setPostcodeInput] = useState("");
  const [journeyPreferences, setJourneyPreferences] = useState("");
  const [maxWalkingMinutes, setMaxWalkingMinutes] = useState(0);
  const [walkingSpeed, setWalkingSpeed] = useState("Average");
  const [accessibilityPreferences, setAccessibilityPreferences] =
    useState("None");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("")

  useEffect(() => {
    async function getToken() {
      setToken(await GetAsync("token"));
      setUsername(await GetAsync("username"))
    }
    getToken();
  }, []);

  // async function fetchData() {
  //   try {
  //     const response = await fetch(
  //       `https://metro-mingle.onrender.com/user/profile/${username}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           Authorization: token,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       const data = await response.json();
  //       setPostcodeInput(data.postcode);
  //       setJourneyPreferences(data.preferences.journeyPreferences);
  //       setMaxWalkingMinutes(data.preferences.maxWalkingMinutes);
  //       setWalkingSpeed(data.preferences.walkingSpeed);
  //       setAccessibilityPreferences(data.preferences.accessibilityPreferences);
  //     } else {
  //       console.error("Failed to fetch user preferences");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user preferences:", error.message);
  //   }
  // }
  
  // useEffect(() => {
  //   fetchData();
  // }, []);

  console.log(token);

  async function handleFormSubmit() {
    try {
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          postcode: postcodeInput,
          preferences: {
            journeyPreferences: journeyPreferences,
            maxWalkingMinutes: maxWalkingMinutes,
            walkingSpeed: walkingSpeed,
            accessibilityPreferences: accessibilityPreferences,
          },
        }),
      };

      const response = await fetch(
        "https://metro-mingle.onrender.com/user/preferences",
        options
      );
      console.log(response.status);
      if (response.status === 200) {
        // console.log(postcodeInput)
        // console.log(journeyPreferences)
        // console.log(maxWalkingMinutes)
        // console.log(walkingSpeed)
        // console.log(accessibilityPreferences)
        Alert.alert("Submit Successful", [
          {
            text: "OK",
            onPress: () => closeModal(),
          },
        ]);
      }
    } catch (error) {
      // console.log(postcodeInput)
      // console.log(journeyPreferences)
      // console.log(maxWalkingMinutes)
      // console.log(walkingSpeed)
      // console.log(accessibilityPreferences)
      console.error("Error submitting preferences:", error.message);
    }
  }

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
      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={() => closeModal()}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={[{ marginTop: 50 }, { paddingLeft: 75 }]}>
              <Text style={[styles.header]}>Change Your Preferences</Text>
            </View>
            <View style={styles.modalContainer}>
              <AppTextInput
                placeholder="Enter Postcode"
                icon="post"
                onChangeText={(text) => setPostcodeInput(text)}
              />
              <AppTextInput
                placeholder="How long are you willing to Walk?"
                icon="post"
                onChangeText={(text) => setMaxWalkingMinutes(text)}
              />

              <Text>What are your journey Preferences</Text>
              <Picker
                style={{ height: 30, width: "100%" }}
                selectedValue={journeyPreferences}
                onValueChange={(itemValue) => setJourneyPreferences(itemValue)}
              >
                <Picker.Item
                  label="Least interchange"
                  value="leastinterchange"
                />
                <Picker.Item label="Least walking" value="leastwalking" />
                <Picker.Item label="Least time" value="leasttime" />
              </Picker>

              <Text>What is your max walking speed</Text>
              <Picker
                style={{ height: 30, width: "100%" }}
                // selectedValue={walkingSpeed}
                onValueChange={(itemValue) => setWalkingSpeed(itemValue)}
              >
                <Picker.Item label="Slow" value="slow" />
                <Picker.Item label="Average" value="average" />
                <Picker.Item label="Fast" value="fast" />
              </Picker>

              <Text>Accessibility Preferences</Text>
              <Picker
                style={{ height: 30, width: "100%" }}
                // selectedValue={accessibilityPreferences}
                onValueChange={(itemValue) =>
                  setAccessibilityPreferences(itemValue)
                }
              >
                <Picker.Item label="None" value="none" />
                <Picker.Item label="No stairs" value="noSolidStairs" />
                <Picker.Item label="No escalators" value="noEscalators" />
                <Picker.Item label="No elavators" value="noElevators" />
                <Picker.Item
                  label="Step free access to Vehicle"
                  value="stepFreeToVehicle"
                />
                <Picker.Item
                  label="Step free access to pavement"
                  value="stepFreeToPlatform"
                />
              </Picker>

              <View style={{ alignSelf: "center", marginTop: 60 }}>
                <Linear
                  onPress={handleFormSubmit}
                  colors={["#FF7E5F", "#FFB270"]}
                  buttonText="Submit"
                />
                <View style={{ alignSelf: "center" }}>
                  <TouchableOpacity onPress={() => closeModal()}>
                    <Text
                      style={{
                        color: colors.secondary,
                        fontWeight: "700",
                        paddingLeft: 4,
                      }}
                    >
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </KeyboardAvoidingView>
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
  },
  info: {
    fontWeight: "bold",
    alignItems: "flex-start",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: -30,
  },
  click: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 23,
  },
  logoutButton: {
    alignSelf: "center",
  },
});

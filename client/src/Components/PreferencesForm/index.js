import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Dimensions, // Import Dimensions
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Picker } from "@react-native-picker/picker";
import AppTextInput from "../AppTextInput";
import Linear from "../LinearGradientButton";
import GetAsync from "../AsyncStorageGet";
import colors from "../../config/colors";

const { width, height } = Dimensions.get("window");

export default function PreferencesForm() {
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerModalJourney, setPickerModalJourney] = useState(false);
  const [pickerModalWalk, setPickerModalWalk] = useState(false);
  const [pickerModalAccessability, setPickerModalAccessability] =
    useState(false);
  const [postcodeInput, setPostcodeInput] = useState("");
  const [journeyPreferences, setJourneyPreferences] = useState("");
  const [maxWalkingMinutes, setMaxWalkingMinutes] = useState(0);
  const [walkingSpeed, setWalkingSpeed] = useState("Average");
  const [accessibilityPreferences, setAccessibilityPreferences] =
    useState("None");
  const [token, setToken] = useState("");
  const [originalPreferences, setOriginalPreferences] = useState({
    postcode: "",
    preferences: {
      journeyPreferences: "",
      maxWalkingMinutes: 0,
      walkingSpeed: "",
      accessibilityPreferences: "",
    },
  });

  useEffect(() => {
    async function getToken() {
      setToken(await GetAsync("token"));
    }
    getToken();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://metro-mingle.onrender.com/user/profile`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setPostcodeInput(data.postcode);
        setJourneyPreferences(data.preferences.journeyPreferences);
        setMaxWalkingMinutes(data.preferences.maxWalkingMinutes);
        setWalkingSpeed(data.preferences.walkingSpeed);
        setAccessibilityPreferences(data.preferences.accessibilityPreferences);
        setOriginalPreferences(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching user preferences:", error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, [token]);

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

      if (response.status === 200) {
        Alert.alert("Submit Successful", "Your Preferences have been updated", [
          {
            text: "OK",
            onPress: async () => {
              // Update the originalPreferences state when the changes are saved
              setOriginalPreferences({
                postcode: postcodeInput,
                preferences: {
                  journeyPreferences,
                  maxWalkingMinutes,
                  walkingSpeed,
                  accessibilityPreferences,
                },
              });

              closeModal();
            },
          },
        ]);
      }
    } catch (error) {
      console.error("Error submitting preferences:", error.message);
    }
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openPickerModalJourney = () => {
    setPickerModalJourney(true);
  };

  const closePickerModalJourney = () => {
    setPickerModalJourney(false);
  };

  const openPickerModalWalk = () => {
    setPickerModalWalk(true);
  };

  const closePickerModalWalk = () => {
    setPickerModalWalk(false);
  };

  const openPickerModalAccessability = () => {
    setPickerModalAccessability(true);
  };

  const closePickerModalAccessability = () => {
    setPickerModalAccessability(false);
  };

  const getLabelFromValue = (value) => {
    switch (value) {
      case "slow":
        return "Slow";
      case "average":
        return "Average";
      case "fast":
        return "Fast";
      case "leasttime":
        return "Least Time";
      case "leastinterchange":
        return "Least Interchange";
      case "leastwalking":
        return "Least Walking";
      case "none":
        return "None";
      case "noSolidStairs":
        return "No Stairs"
      case "noEscalators":
        return "No Escalators"
      case "noElevators":
        return "No Elevators"
      case "stepFreeToVehicle":
        return "Step Free Access To Vehicle"
      case "stepFreeToPlatform":
        return "Step Free Access To Platform"    
      default:
        return "";
    }
  };

  const resetForm = () => {
    // Reset the form to the original preferences fetched from the backend
    setPostcodeInput(originalPreferences.postcode);
    setJourneyPreferences(originalPreferences.preferences.journeyPreferences);
    setMaxWalkingMinutes(originalPreferences.preferences.maxWalkingMinutes);
    setWalkingSpeed(originalPreferences.preferences.walkingSpeed);
    setAccessibilityPreferences(
      originalPreferences.preferences.accessibilityPreferences
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <View style={styles.fullWidthUnderline} />
      <TouchableOpacity onPress={openModal}>
        <Text style={styles.click}>Edit Preferences {">"}</Text>
      </TouchableOpacity>

      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={() => {
          if (pickerModalJourney || pickerModalWalk || pickerModalAccessability) {
            return
          }
          resetForm();
          closeModal();
        }}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View
              style={[
                {
                  marginTop: height * 0.02,
                  paddingRight: width * 0.04,
                  marginBottom: height * 0.02,
                },
              ]}
            >
              <Text style={[styles.header, { paddingLeft: width * 0.05 }]}>
                Change Your Preferences
              </Text>
            </View>
            <Text style={[styles.label, { paddingRight: width * 0.7 }]}>
              Postcode
            </Text>
            <AppTextInput
              placeholder="Postcode"
              icon="post"
              onChangeText={(text) => setPostcodeInput(text)}
              value={postcodeInput === "null" ? "" : postcodeInput}
            />
            <Text style={[styles.label, { paddingRight: width * 0.09 }]}>
              On a given journey, how long are you willing to walk (minutes)
            </Text>
            <AppTextInput
              placeholder="Max time you are willing to walk"
              icon="post"
              onChangeText={(text) => setMaxWalkingMinutes(text)}
              value={maxWalkingMinutes}
            />

            {/* ------------------------------------------------------------------------- */}

            <TouchableOpacity
              style={[
                styles.label,
                { paddingRight: width * 0.25, marginBottom: height * 0.015 },
              ]}
              onPress={openPickerModalJourney}
            >
              <Text>What are your journey Preferences {">"}</Text>
            </TouchableOpacity>
              <Text>{getLabelFromValue(journeyPreferences)}</Text>
            <Modal
              animationType="slide"
              transparent={true}
              visible={pickerModalJourney}
              onRequestClose={closePickerModalJourney}
            >
              <View style={styles.modalContainerPicker}>
					    <View style={styles.modalContent}>
              <Text style={styles.title}>Select a Preference:</Text>
              <Picker
                style={{ height: height * 0.03, width: "100%" }}
                selectedValue={journeyPreferences}
                onValueChange={(itemValue) => setJourneyPreferences(itemValue)}
                value={journeyPreferences}
              >
                <Picker.Item
                  label="Least interchange"
                  value="leastinterchange"
                />
                <Picker.Item label="Least walking" value="leastwalking" />
                <Picker.Item label="Least time" value="leasttime" />
              </Picker>
              <TouchableOpacity onPress={closePickerModalJourney}>
                <Text>Submit</Text>
              </TouchableOpacity>
              </View>
              </View>
            </Modal>

            {/* ------------------------------------------------------------------------- */}

            <TouchableOpacity
              style={[
                styles.label,
                { paddingRight: width * 0.27, marginBottom: height * 0.015 },
              ]}
              onPress={openPickerModalWalk}
            >
            <Text>On Average how fast do you walk {">"}</Text>
            </TouchableOpacity>
            <Text>{getLabelFromValue(walkingSpeed)}</Text>
            <Modal
              animationType="slide"
              transparent={true}
              visible={pickerModalWalk}
              onRequestClose={closePickerModalWalk}
            >
              <View style={styles.modalContainerPicker}>
					    <View style={styles.modalContent}>
              <Text style={styles.title}>Select a Preference:</Text>
              <Picker
                style={{ height: height * 0.03, width: "100%" }}
                selectedValue={walkingSpeed}
                onValueChange={(itemValue) => setWalkingSpeed(itemValue)}
                value={walkingSpeed}
              >
                <Picker.Item label="Slow" value="slow" />
                <Picker.Item label="Average" value="average" />
                <Picker.Item label="Fast" value="fast" />
              </Picker>
              <TouchableOpacity onPress={closePickerModalWalk}>
                <Text>Submit</Text>
              </TouchableOpacity>
              </View>
              </View>
            </Modal>

            {/* ------------------------------------------------------------------------- */}

            <TouchableOpacity
              style={[
                styles.label,
                { paddingRight: width * 0.39, marginBottom: height * 0.015 },
              ]}
              onPress={openPickerModalAccessability}
            >
              <Text>Accessibility Preferences {">"}</Text>
            </TouchableOpacity>
            <Text>{getLabelFromValue(accessibilityPreferences)}</Text>
            <Modal
              animationType="slide"
              transparent={true}
              visible={pickerModalAccessability}
              onRequestClose={closePickerModalAccessability}
            >
              <View style={styles.modalContainerPicker}>
					    <View style={styles.modalContent}>
              <Text style={styles.title}>Select a Preference:</Text>
              <Picker
                style={{ height: height * 0.03, width: "100%" }}
                selectedValue={accessibilityPreferences}
                onValueChange={(itemValue) =>
                  setAccessibilityPreferences(itemValue)
                }
                value={accessibilityPreferences}
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
                  label="Step free access to Platform"
                  value="stepFreeToPlatform"
                />
              </Picker>
              <TouchableOpacity onPress={closePickerModalAccessability}>
                <Text>Submit</Text>
              </TouchableOpacity>
              </View>
              </View>
            </Modal>

            {/* ------------------------------------------------------------------------- */}

            <View style={{ alignSelf: "center", marginTop: height * 0.001 }}>
              <Linear
                onPress={handleFormSubmit}
                colors={["#FF7E5F", "#FFB270"]}
                buttonText="Submit"
              />
              <View style={{ alignSelf: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    resetForm(), closeModal();
                  }}
                >
                  <Text
                    style={{
                      color: colors.secondary,
                      fontWeight: "700",
                      paddingLeft: width * 0.01,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </GestureRecognizer>
    </View>
    // </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
  },
  header: {
    fontSize: height * 0.03,
    fontWeight: "300",
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
  },
  click: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: height * 0.033,
    textDecorationLine: "underline",
    paddingTop: 25,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width * 0.06,
    paddingTop: height * 0.02,
    marginTop: 0,
  },
  label: {
    fontWeight: "bold",
    marginVertical: height * 0.003,
  },
  fullWidthUnderline: {
    height: 1, // Height of the underline
    backgroundColor: colors.btn2, // Color of the underline
    width: "100%", // Full width
    // Space between the text and underline, adjust as needed
  },
  modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		width: "90%",
    height: "20%",
    borderWidth: 1.5,
    borderColor: colors.btn2
	},
  title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
  modalContainerPicker: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0)",
	},
});

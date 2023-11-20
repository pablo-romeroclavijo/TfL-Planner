import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { Picker } from "@react-native-picker/picker";
import { AppTextInput, LogoutButton, Linear, GetAsync, AppButton } from "../../Components";
import colors from "../../config/colors";

const openLink = (url) => {
  Linking.openURL(url);
};

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [postcodeInput, setPostcodeInput] = useState("");
  const [journeyPreferences, setJourneyPreferences] = useState("");
  const [maxWalkingMinutes, setMaxWalkingMinutes] = useState(0);
  const [walkingSpeed, setWalkingSpeed] = useState("Average");
  const [accessibilityPreferences, setAccessibilityPreferences] = useState("None");
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function getToken() {
      setToken(await GetAsync("token"));
      // setUsername(await GetAsync("username"));
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
        console.log(data)
      } else {
        console.error("Failed to fetch user preferences");
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
        Alert.alert(
          "Submit Successful",
          "Your Preferences have been updated",
          [
            { text: "OK", onPress: () => closeModal()},
          ]
        )
      }
    } catch (error) {
      console.error("Error submitting preferences:", error.message);
    }
  }

  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  const [selectedHelpOption, setSelectedHelpOption] = useState(null);

  const helpModal = (option) => {
    setSelectedHelpOption(option);
    setModalHelpVisible(true);
  };

  const closeHelpModal = () => {
    setModalHelpVisible(false)
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
                placeholder="Postcode"
                icon="post"
                onChangeText={(text) => setPostcodeInput(text)}
                value={postcodeInput}
              />
              <AppTextInput
                placeholder="Max time you are willing to walk"
                icon="post"
                onChangeText={(text) => setMaxWalkingMinutes(text)}
                value={maxWalkingMinutes}
              />

              <Text>What are your journey Preferences</Text>
              <Picker
                style={{ height: 30, width: "100%" }}
                selectedValue={journeyPreferences}
                onValueChange={(itemValue) => setJourneyPreferences(itemValue)}
                value={journeyPreferences}
              >
                <Picker.Item label="Least interchange" value="leastinterchange" />
                <Picker.Item label="Least walking" value="leastwalking" />
                <Picker.Item label="Least time" value="leasttime" />
              </Picker>

              <Text>What is your max walking speed</Text>
              <Picker
                style={{ height: 30, width: "100%" }}
                selectedValue={walkingSpeed}
                onValueChange={(itemValue) => setWalkingSpeed(itemValue)}
                value={walkingSpeed}
              >
                <Picker.Item label="Slow" value="slow" />
                <Picker.Item label="Average" value="average" />
                <Picker.Item label="Fast" value="fast" />
              </Picker>

              <Text>Accessibility Preferences</Text>
              <Picker
                style={{ height: 30, width: "100%" }}
                selectedValue={accessibilityPreferences}
                onValueChange={(itemValue) => setAccessibilityPreferences(itemValue)}
                value={accessibilityPreferences}
              >
                <Picker.Item label="None" value="none" />
                <Picker.Item label="No stairs" value="noSolidStairs" />
                <Picker.Item label="No escalators" value="noEscalators" />
                <Picker.Item label="No elavators" value="noElevators" />
                <Picker.Item label="Step free access to Vehicle" value="stepFreeToVehicle" />
                <Picker.Item label="Step free access to Pavement" value="stepFreeToPlatform" />
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
      
      <GestureRecognizer style={{ flex: 1 }} onSwipeDown={() => closeHelpModal()}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalHelpVisible}
        onRequestClose={() => setModalHelpVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedHelpOption === 1 && (
            <View style={{paddingTop: 65}}>
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
                <Text style={styles.link}>Justin, Project Lead</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/pablo-romeroclavijo")}>
                <Text style={styles.link}>Pablo, Backend Developer</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/swthes")}>
                <Text style={styles.link}>Sidique, Frontend Developer</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/olgaKhristo")}>
                <Text style={styles.link}>Olga, Frontend Developer</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/AndrewAmir003")}>
                <Text style={styles.link}>Andrew, Frontend Developer</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openLink("https://github.com/AnoopBhandal")}>
                <Text style={styles.link}>Anoop, Frontend Developer</Text>
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
  link: {
    color: "blue",
    marginVertical: 5,
  }
});

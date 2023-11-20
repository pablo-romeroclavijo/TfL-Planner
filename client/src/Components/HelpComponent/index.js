import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
  Image,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

import AppButton from "../AppButton";

const openLink = (url) => {
  Linking.openURL(url);
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

function Help() {
  const [modalHelpVisible, setModalHelpVisible] = useState(false);
  const [selectedHelpOption, setSelectedHelpOption] = useState(null);

  const helpModal = (option) => {
    setSelectedHelpOption(option);
    setModalHelpVisible(true);
  };

  const closeHelpModal = () => {
    setModalHelpVisible(false);
  };


  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.header}>Help</Text>

      <TouchableOpacity onPress={() => helpModal(1)}>
        <Text style={styles.click}>FAQ</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => helpModal(2)}>
        <Text style={styles.click}>About App</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => helpModal(3)}>
        <Text style={styles.click}>Delete Account</Text>
      </TouchableOpacity>

      <GestureRecognizer
        style={{ flex: 1 }}
        onSwipeDown={() => closeHelpModal()}
        config={{
          velocityThreshold: 0.9, // Adjust this value (default is 0.3) to control the velocity sensitivity
          directionalOffsetThreshold: 80, // Adjust this value (default is 80) to control the directional offset sensitivity
        }}
      >
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalHelpVisible}
          onRequestClose={() => setModalHelpVisible(false)}
        >
          <View style={styles.modalContainer}>
            {selectedHelpOption === 1 && (
              <View style={{ paddingTop: 65 }}>
                <ScrollView>
                  <Text style={styles.info}>How does Metro Mingle ensure the security of my data?</Text>
                  <Text style={styles.placeholderText}>                  
                  Ensuring the security of your data is our unwavering commitment. 
                  We employ robust encryption protocols and state-of-the-art security measures to safeguard
                  your information at every step. It's a top priority for us to provide you with a secure and 
                  trustworthy platform. Rest assured, we have a strict policy against sharing any of your data 
                  with third parties. Your privacy is respected, and your personal information remains confidential
                  within our system. We understand the sensitivity of the information you entrust to us, and we go 
                  the extra mile to ensure that it stays in safe hands. At Metro Mingle, transparency and security 
                  are at the core of our values. We want you to use our services with complete peace of mind, 
                  knowing that your data is handled with the utmost care and diligence. If you have any specific 
                  concerns or questions about our security practices, feel free to reach out. Your trust is important to us, 
                  and we are here to ensure that your experience with us is not only convenient but also secure.
                  </Text>

                  <Text style={styles.info}>
                  Can I use Metro Mingle for both personal and business events?
                  </Text>
                  <Text style={styles.placeholderText}>
                  Absolutely! Metro Mingle is versatile and designed to accommodate a wide range of events, 
                  whether they're personal gatherings or business functions. Plan, invite, and track seamlessly, 
                  regardless of the nature of your event.
                  </Text>

                  <Text style={styles.info}>
                  How does the invitation and tracking process work?
                  </Text>
                  <Text style={styles.placeholderText}>
                  Planning an event is easy with Metro Mingle. Simply create an event, 
                  invite guests through the app, and track their arrival status in real-time once they accept the invitation. 
                  It's a hassle-free way to stay organized and ensure everyone is accounted for.
                  </Text>

                  <Text style={styles.info}>
                  Can I check if all my guests arrived home safely after the event?
                  </Text>
                  <Text style={styles.placeholderText}>
                  Absolutely. Metro Mingle goes the extra mile by allowing you to check if your guests have reached 
                  home safely after the event. It's an additional feature to ensure the well-being of your attendees.
                  </Text>

                  <Text style={styles.info}>
                  What happens if I encounter technical issues while using Metro Mingle?
                  </Text>
                  <Text style={styles.placeholderText}>
                  Our dedicated support team is ready to assist you. If you encounter any technical issues 
                  or have questions about using Metro Mingle, please contact our support team through the app, 
                  and we'll promptly address your concerns.
                  </Text>



                </ScrollView>
              </View>




            )}
            {selectedHelpOption === 2 && (
              <View>
              <ScrollView>
                <Text style={styles.info}>
                  Metro Mingle. Elevate Your Events with Ease.
                </Text>
                <Text style={styles.placeholderText}>
                Plan, Invite, Track, and Ensure Safe Journeys - 
                Your All-in-One Event Companion, Now in Your Pocket!
                </Text>

                <Text style={styles.info}>Meet the Metro Mingle Team</Text>

                <TouchableOpacity
                  onPress={() => openLink("https://github.com/JustaGlitch")}
                >
                  <Image source={require('../../assets/ourImg/justin.png')} style={{ width: 100, height: 100}}/>
                  <Text style={styles.link}>Justin, Project Lead</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    openLink("https://github.com/pablo-romeroclavijo")
                  }
                >
                 <Image source={require('../../assets/ourImg/pablo.jpg')} style={{ width: 100, height: 100}}/>
                  <Text style={styles.link}>Pablo, Backend Developer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openLink("https://github.com/swthes")}
                >
                 <Image source={require('../../assets/ourImg/sidique.png')} style={{ width: 100, height: 100}}/>
                  <Text style={styles.link}>Sidique, Frontend Developer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openLink("https://github.com/olgaKhristo")}
                >
                 <Image source={require('../../assets/ourImg/olga.jpg')} style={{ width: 100, height: 100}}/>
                  <Text style={styles.link}>Olga, Frontend Developer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openLink("https://github.com/AndrewAmir003")}
                >
                 <Image source={require('../../assets/ourImg/andrew.jpg')} style={{ width: 100, height: 100}}/>
                  <Text style={styles.link}>Andrew, Frontend Developer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => openLink("https://github.com/AnoopBhandal")}
                >
                 <Image source={require('../../assets/ourImg/anoop.png')} style={{ width: 100, height: 100}}/>
                  <Text style={styles.link}>Anoop, Frontend Developer</Text>
                </TouchableOpacity>
                </ScrollView>
              </View>
            )}
            {selectedHelpOption === 3 && (
              <Text style={styles.info}>
                Delete my account content goes here
              </Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: windowWidth * 0.05, // Use 5% of the screen width as padding
    
  },
  header: {
   
    fontSize: windowWidth * 0.08, // Use 8% of the screen width as font size
    fontWeight: "bold",
    marginBottom: windowHeight * 0.02, // Use 2% of the screen height as margin
    marginTop: -windowHeight * 0.16, // Use 12% of the screen height as negative margin
  },
  info: {
    fontWeight: "bold",
    alignItems: "flex-start",
    marginVertical: windowHeight * 0.01, // Use 1% of the screen height as vertical margin
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: windowWidth * 0.1, // Use 10% of the screen width as padding
    marginTop: 22,
  },
  click: {
    fontWeight: "bold",
    textAlign: "left",
    fontSize: windowWidth * 0.06, // Use 6% of the screen width as font size
  },
  link: {
    color: "blue",
    marginVertical: windowHeight * 0.01, // Use 1% of the screen height as vertical margin
  }
});

export default Help;

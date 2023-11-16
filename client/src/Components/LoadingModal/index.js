import React from "react";
import { Modal, View, Text, ActivityIndicator, StyleSheet, StatusBar } from "react-native";

const LoadingModal = (props) => {
  // Props could include a 'loading' boolean to control visibility
  const { loading } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={loading}
      fullScreen={true}
      onRequestClose={() => {
        // Handle the request to close the modal
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.modalText}>Loading...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
	marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "transparent"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginTop: 15,
    textAlign: "center",
  },
});

export default LoadingModal;

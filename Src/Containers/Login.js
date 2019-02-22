/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList
} from "react-native";

type Props = {};
var countriesCode = [
  {
    id: "1",
    code: "+93"
  },
  {
    id: "2",
    code: "+355"
  },
  {
    id: "3",
    code: "+213"
  },
  {
    id: "4",
    code: "+376"
  },
  {
    id: "5",
    code: "+973"
  },
  {
    id: "6",
    code: "+880"
  },
  {
    id: "7",
    code: "+237"
  },
  {
    id: "8",
    code: "+1"
  },
  {
    id: "9",
    code: "+57"
  },
  {
    id: "10",
    code: "+45"
  },
  {
    id: "11",
    code: "+20"
  },
  {
    id: "12",
    code: "+358"
  },
  {
    id: "13",
    code: "+33"
  },
  {
    id: "14",
    code: "+49"
  },
  {
    id: "15",
    code: "+30"
  },
  {
    id: "16",
    code: "+852"
  },
  {
    id: "17",
    code: "+354"
  },
  {
    id: "18",
    code: "+91"
  }
];
export default class Login extends Component<Props> {
  constructor() {
    super();
    this.state = {
      phoneNumber: "", //Input value
      format: /[!@#$%^&*()_+\-=\[\]{};‘:“\\|,.<>\/?]/, // in-valid format
      modalVisible: false,
      selectedCode: "+91"
    };
    this.openModal = this.openModal.bind(this);
  }

  // To handle input value
  onChangeNumber = text => {
    let formattedText = text.split(" ").join(""); // phone number format
    if (isNaN(formattedText)) {
    } else if (formattedText.match(this.state.format)) {
    } else {
      if (formattedText.length <= 10) {
        if (formattedText.length > 0) {
          formattedText = formattedText
            .match(new RegExp(".{1,5}", "g"))
            .join(" ");
          this.setState({ phoneNumber: formattedText });
        } else {
          this.setState({ phoneNumber: "" });
        }
      } else {
      }
    }
  };
  // To open modal
  openModal() {
    this.setState({ modalVisible: true });
  }
  //To close modal
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  //when clicks on submit button
  onSubmit() {
    this.props.navigation.push("Otp");
  }

  //To selet country code
  onSelectCode(item) {
    this.setState(
      {
        selectedCode: item.code
      },
      () => {
        this.setState({
          modalVisible: false
        });
      }
    );
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.onSelectCode.bind(this, item)}>
        <View style={styles.rowStyle}>
          <Text style={styles.rowText}>{item.code}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { phoneNumber, selectedCode } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text style={styles.headerText}>Login</Text>
        </View>
        <View style={styles.subContainerView}>
          <View style={[styles.container, { flexDirection: "row" }]}>
            <View style={styles.leftView}>
              <View style={styles.leftBorderView}>
                <TouchableOpacity onPress={this.openModal}>
                  <TextInput
                    pointerEvents="none"
                    value={selectedCode}
                    style={styles.textStyle}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.rightView}>
              <View
                style={[
                  styles.rightBorderView,
                  {
                    borderColor:
                      phoneNumber.length === 0
                        ? "grey"
                        : phoneNumber.length != 11
                        ? "red"
                        : "grey"
                  }
                ]}
              >
                <TextInput
                  style={[
                    styles.textStyle,
                    { color: phoneNumber.length != 11 ? "red" : "black" }
                  ]}
                  value={phoneNumber}
                  onChangeText={this.onChangeNumber.bind(this)}
                  keyboardType="numeric"
                  contextMenuHidden
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.butonView}>
          {phoneNumber.length === 11 ? (
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={this.onSubmit.bind(this)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.disabledButtonStyle}>
              <Text style={styles.buttonText}>Submit</Text>
            </View>
          )}
        </View>
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View style={styles.modalContainerStyle}>
            <View style={styles.modalSubContainer}>
              <FlatList
                data={countriesCode}
                style={styles.flatListStyle}
                renderItem={this.renderItem.bind(this)}
              />
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
                style={styles.closeButtonView}
              >
                <Text style={styles.closeTextStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  subContainerView: {
    flex: 0.4
  },
  headerView: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center"
  },
  leftBorderView: {
    borderBottomWidth: 1,
    borderColor: "grey",
    height: Platform.OS === "ios" ? 35 : "auto"
  },
  rightBorderView: {
    borderBottomWidth: 1,
    height: Platform.OS === "ios" ? 35 : "auto",
    marginLeft: 10,
    width: 140
  },
  textStyle: {
    color: "black",
    fontWeight: "600",
    fontSize: 18
  },
  navbar: {
    height: 44,
    backgroundColor: "black"
  },
  butonView: {
    flex: 0.3
  },
  headerText: {
    fontSize: 30,
    fontWeight: "600",
    color: "black"
  },
  leftView: { flex: 0.4, justifyContent: "center", alignItems: "flex-end" },
  rightView: { flex: 0.6, justifyContent: "center", alignItems: "flex-start" },
  buttonStyle: {
    backgroundColor: "black",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    borderRadius: 5
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    paddingLeft: 10,
    paddingRight: 10
  },
  disabledButtonStyle: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    borderRadius: 5,
    backgroundColor: "lightgrey"
  },
  rowStyle: {
    height: 30,
    borderBottomWidth: 1,
    borderColor: "grey",
    alignItems: "center",
    justifyContent: "center"
  },
  rowText: { fontWeight: 16, fontWeight: "700", color: "black" },
  modalContainerStyle: {
    flex: 1,
    backgroundColor: "#24292e6b",
    alignItems: "center",
    justifyContent: "center"
  },
  modalSubContainer: {
    height: "auto",
    width: 300,
    backgroundColor: "white",
    borderRadius: 10
  },
  closeButtonView: {
    height: 30,
    width: 100,
    backgroundColor: "black",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10
  },
  closeTextStyle: { color: "white", fontWeight: "600", fontSize: 16 },
  flatListStyle: { marginTop: 20, marginBottom: 20 }
});

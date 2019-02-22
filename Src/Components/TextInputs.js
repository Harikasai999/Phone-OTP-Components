//This is an example code to make a Star Rating Bar //
import React, { Component } from "react";
//import react in our code.
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  AsyncStorage
} from "react-native";
import styles from "./Styles/TextInputStyles";
export default class TextInputs extends Component {
  constructor() {
    super();
    this.state = {
      firstInput: "", //first input value
      secondInput: "", // second input value
      thirdInput: "", // third input value
      forthInput: "", // forth input value
      format: /[!@#$%^&*()_+\-=\[\]{};‘:“\\|,.<>\/?]/, // in-valid format
      firstColor: "red",
      secondColor: "grey",
      thirdColor: "grey",
      forthColor: "grey"
    };
  }
  componentDidMount() {
    if (this.props.onRef != null) {
      this.props.onRef(this);
    }
  }
  focus() {
    this.textInput.focus();
  }
  onSubmit() {
    const { firstInput, secondInput, thirdInput, forthInput } = this.state;
    console.log(firstInput + secondInput + thirdInput + forthInput);
    this.props.navigation.push("RatingComponent");
  }
  render() {
    const {
      firstInput,
      secondInput,
      thirdInput,
      forthInput,
      firstColor,
      secondColor,
      thirdColor,
      forthColor
    } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus={this.props.autoFocus}
          ref={input => (this.textInput = input)}
          style={styles.inputBorderView}
          secureTextEntry
          onChangeText={text => this.props.onChangeText(text)}
          keyboardType="numeric"
          value={this.props.value}
          contextMenuHidden
        />
      </View>
    );
  }
}

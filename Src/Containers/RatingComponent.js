//This is an example code to make a Star Rating Bar //
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Platform,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Linking,
  Dimensions,
  AsyncStorage
} from "react-native";
// margin,textfont,heigth,font for the device windowSize
var windowSize = Dimensions.get("window");
var FONT = 17;
var Margin = 38;
var textFont = 20;
var height = 80;
if (windowSize.width == 768) {
  (FONT = 30), (Margin = 50), (textFont = 20);
  height = 120;
} else if (windowSize.width == 320) {
  textFont: 18;
  height = 60;
}
export default class RatingComponent extends Component {
  constructor() {
    super();
    this.state = {
      //default star rating
      default_Rating: 0,
      //image for before action and after action
      max_Rating: 5,
      starImg: require("./../Images/starfull.png"),
      starEmpImg: require("./../Images/staremty.png"),
      //for modal visible and disable
      modalVisible: true,
      animated: false,
      transparent: false,
      visible: true,
      hide: "false",
      hideno: "false",
      rated: false
    };
  }
  async componentWillMount() {
    AsyncStorage.removeItem("User", err => console.log("finished", err));
  }

  //this method is for close the modal
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  // after clicking the stars actions will be happens here
  UpdateRating(key) {
    this.setState({ default_Rating: key });
    //Keeping the Rating Selected in state
    setTimeout(
      function() {
        this.setState({ modalVisible: false });
      }.bind(this),
      2000
    );
    // navigation to app store and play store
    if (Platform.OS == "ios") {
      var browseurl =
        "https://itunes.apple.com/us/app/maxword/id1071412401?mt=8";
      console.log("appstore:");
    } else {
      var browseurl =
        "https://play.google.com/store/apps/details?id=com.maxwords&hl=en_US";
    }
    return Linking.openURL(browseurl);
  }

  RateNow() {
    setTimeout(
      function() {
        this.setState({ modalVisible: false });
      }.bind(this),
      100
    );
    // navigation to app store and play store
    if (Platform.OS == "ios") {
      var browseurl = "https://itunes.apple.com/in/app/uber/id368677368?mt=8";
      console.log("appstore:");
    } else {
      var browseurl =
        "https://play.google.com/store/apps/details?id=com.maxwords&hl=en_US";
    }
    return Linking.openURL(browseurl);
  }

  render() {
    let React_Native_Rating_Bar = [];
    //Array to hold the filled or empty Stars
    for (var i = 1; i <= this.state.max_Rating; i++) {
      React_Native_Rating_Bar.push(
        <TouchableOpacity
          activeOpacity={0.7}
          key={i}
          onPress={this.UpdateRating.bind(this, i)}
        >
          <Image
            style={styles.StarImage}
            source={
              i <= this.state.default_Rating
                ? this.state.starImg
                : this.state.starEmpImg
            }
          />
        </TouchableOpacity>
      );
    }
    return (
      <Modal
        animationType="slide"
        visible={this.state.modalVisible}
        transparent={true}
      >
        <View style={styles.colorDisable}>
          <View style={{ marginTop: windowSize.height / 3 }}>
            <View style={styles.heightDivision}>
              <View style={styles.container}>
                <View style={styles.MainContainer}>
                  <Text style={styles.textStyleSmall}>Please Rate Us</Text>
                  {/*View to hold our Stars*/}
                  <View style={styles.childView}>
                    {React_Native_Rating_Bar}
                  </View>

                  <Text style={styles.textStyle}>
                    {/*To show the rating selected*/}
                    {this.state.default_Rating} / {this.state.max_Rating}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ height: 50, marginRight: 25, marginLeft: 25 }}>
              <View style={{ flex: 1, flexDirection: "row" }}>
                {this.state.hide == "true" ? (
                  <TouchableOpacity style={styles.rateStyle}>
                    <View style={styles.container}>
                      <Text
                        allowFontScaling={false}
                        style={styles.buttonTextStyle}
                      >
                        Rate Now
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.rateStyle}
                    onPress={this.RateNow.bind(this)}
                  >
                    <View style={styles.container}>
                      <Text
                        allowFontScaling={false}
                        style={styles.buttonTextStyle}
                      >
                        Rate Now
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
                {this.state.hide == "true" ? (
                  <TouchableOpacity style={styles.askLaterStyle}>
                    <View style={styles.container}>
                      <Text
                        allowFontScaling={false}
                        style={styles.buttonTextStyle}
                      >
                        Ask Later
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.askLaterStyle}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <View style={styles.container}>
                      <Text
                        allowFontScaling={false}
                        style={styles.buttonTextStyle}
                      >
                        Ask Later
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 18 : 0
  },
  childView: {
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 10
  },

  StarImage: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    tintColor: "#edb12f",
    marginLeft: 5
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
    color: "#000"
  },
  textStyleSmall: {
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    marginTop: 15
  },
  rateStyle: {
    flex: 0.5,
    backgroundColor: "#27ae61",
    borderColor: "#27ae61",
    borderWidth: 2,
    borderBottomLeftRadius: 15
  },
  askLaterStyle: {
    flex: 0.5,
    backgroundColor: "#34475d",
    borderColor: "#34475d",
    borderWidth: 2,
    borderBottomRightRadius: 15
  },
  buttonTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 20
  },
  colorDisable: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  heightDivision: {
    height: windowSize.height / 5,
    backgroundColor: "white",
    marginRight: 25,
    marginLeft: 25,
    borderColor: "white",
    borderWidth: 2,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  }
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Text,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  AsyncStorage,
  View,
  Linking,
  Platform,
  StatusBar,
  Dimensions,
  StyleSheet
} from "react-native";
import { Card, CardItem, Body } from "native-base";
import { GoogleSignin, statusCodes } from "react-native-google-signin";
import ModalSelector from "react-native-modal-selector";
const { width, height } = Dimensions.get("window");
class GmailAuth extends Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      userInfo: null,
      showDetails: false,
      userDetails: null,
      spinner: true,

      loading: false
    };
    this.signIn = this.signIn.bind(this);
    this.revoke = this.revoke.bind(this);
    this.setupGoogleSignin = this.setupGoogleSignin.bind(this);
    this.onShowSignin = this.onShowSignin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Intially to load the gmail accounts
  componentWillMount() {
    this.setupGoogleSignin();
  }

  async signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  }

  onShowSignin() {
    this.signIn();
  }

  onSubmit() {
    // console.log('userDaata@@@ ', this.state.userInfo);
    const { userInfo, userDetails } = this.state;
    const { navigation } = this.props;

    this.setState({
      loading: true
    });
  }

  async setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });
      await GoogleSignin.configure({
        iosClientId:
          "138025433705-4ar8a1637rcnhld9manoto07jrfb8qm8.apps.googleusercontent.com",
        webClientId:
          Platform.OS === "ios"
            ? "138025433705-4ar8a1637rcnhld9manoto07jrfb8qm8.apps.googleusercontent.com"
            : "138025433705-seo88m97qvep5o2if1n697j87hig8rel.apps.googleusercontent.com",
        offlineAccess: false
      });
      AsyncStorage.getItem("Googleuser").then(value => {
        // alert(JSON.stringify(value));
        if (value) {
          // alert(JSON.stringify(value));
          const userInfo = JSON.parse(value);

          this.setState({
            userInfo: userInfo.user,
            showDetails: true,
            spinner: false
          });
        } else {
          // alert("else");
          this.setState({
            spinner: false
          });
          this.signIn();
        }
      });
    } catch (err) {
      Alert.alert("Google signin error", err.code + err.message);
    }
  }

  async revoke() {
    this.setState({
      loading: true
    });
    try {
      //  alert("hiiiiiiii")
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState(
        {
          loading: false
          // userInfo:null
        },
        () => {
          this.signIn(); // Remember to remove the user from your app's state as well
        }
      );
    } catch (error) {
      this.setState({
        loading: false
      });
      console.error(error);
    }
  }

  // Google SignIn functionality
  signIn = async () => {
    GoogleSignin.signIn()
      .then(user => {
        // alert(JSON.stringify(user));
        console.log("USER@@@@1236544 ", user);
        // alert('USER@@@@ '+ JSON.stringify(user));
        this.setState({ userInfo: user.user, userDetails: user }, () => {
          this.setState({
            showDetails: true,
            spinner: false
          });
        });
      })
      .catch(error => {
        this.setState({ spinner: false });
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          console.log("user cancelled the login flow");
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (f.e. sign in) is in progress already
          console.log("operation (f.e. sign in) is in progress already");
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          console.log("play services not available or outdated");
        } else {
          // some other error happened
          console.log("some other error happened", error);
        }
      })
      .done();
  };

  // Default user details view
  showGoogle() {
    const { spinner } = this.state;
    return spinner ? (
      <ActivityIndicator style={{ marginTop: 20 }} />
    ) : (
      <View style={styles.container}>
        <View
          style={{
            flex: 0.4,

            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <Image
            source={require("./../Images/user.png")}
            style={styles.placeholderImage}
          />
        </View>
        <View
          style={{
            flex: 0.3,

            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Card
            style={{
              borderRadius: 5,
              borderColor: "white",
              width: 300
            }}
          >
            <CardItem
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Body
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ textAlign: "center" }}>Username</Text>
              </Body>
            </CardItem>
          </Card>
          <Card
            style={{
              borderRadius: 5,
              width: 300,
              borderColor: "white"
            }}
          >
            <CardItem
              style={{
                height: 50,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Body
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text>Email</Text>
              </Body>
            </CardItem>
          </Card>
        </View>
        <View style={{ flex: 0.3 }}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={this.setupGoogleSignin}
          >
            <Text style={styles.continueText}>Google SignIn</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { userInfo, showDetails, loading } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          {showDetails ? (
            <View style={styles.container}>
              <View
                style={{
                  flex: 0.4,
                  justifyContent: "flex-end",
                  alignItems: "center"
                }}
              >
                <Image
                  source={{ uri: userInfo.photo }}
                  style={styles.userImageStyle}
                />
              </View>
              <View
                style={{
                  flex: 0.3,

                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Card
                  style={{
                    borderRadius: 5,
                    borderColor: "white",
                    width: 300
                  }}
                >
                  <CardItem
                    style={{
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Body
                      style={{
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Text style={{ textAlign: "center" }}>
                        {userInfo.givenName}
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
                <Card
                  style={{
                    borderRadius: 5,
                    width: 300,
                    borderColor: "white"
                  }}
                >
                  <CardItem
                    style={{
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Body
                      style={{
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Text>{userInfo.email}</Text>
                    </Body>
                  </CardItem>
                </Card>
              </View>
              <View style={{ flex: 0.3 }}>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={this.revoke}
                >
                  <Text style={styles.continueText}>Google SignIn</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            this.showGoogle()
          )}
        </View>

        {loading ? (
          <View style={styles.mainSpinner}>
            <ActivityIndicator
              color="#FF2929"
              size="large"
              style={styles.spinnerStyle}
            />
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  textInputContainerMainView: {
    flex: 0.2
    // justifyContent: "center"
  },
  emptyView: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 30
  },
  downArrowIcon: {
    tintColor: "black",
    height: 20,
    width: 20
  },
  userImage: {
    height: width / 9.3,
    width: width / 9.3,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: width / 18.7
  },
  userImageView: { flex: 0.2, alignItems: "center", justifyContent: "center" },
  userDetailsView: { flex: 0.8, justifyContent: "center", marginLeft: 10 },
  textView: { color: "#000000", fontSize: 14 },
  userDetailsTextStyle: {
    color: "#000000",
    fontSize: 8,
    marginTop: 2
  },
  userDetailsIconView: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center"
  },
  textInputContainerSubView: {
    flexDirection: "row",
    flex: 1
  },
  termsText: {
    textAlign: "center",
    color: "grey",
    marginLeft: 20,
    marginRight: 20,
    fontSize: 12
  },
  termsSubText: {
    color: "#4B00FF",
    fontSize: 12
  },
  continueButton: {
    width: width / 1.2,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "black",
    height: 50,
    borderRadius: 20
  },
  continueText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600"
  },

  mainSpinner: {
    height,
    width,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "transparent"
  },
  spinnerStyle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#0e0e0e5c" // 'rgba(0,0,0,0.2)'
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  placeholderImage: {
    height: 150,
    width: 150
  },
  userImageStyle: {
    height: 150,
    width: 150,
    borderRadius: 75
  }
});

export default GmailAuth;

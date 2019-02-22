import { StyleSheet, Platform } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputBorderView: {
    textAlign: "center"
  },
  inputView: {
    width: 30,
    height: Platform.OS === "ios" ? 35 : "auto",
    marginLeft: 15,
    borderBottomWidth: 1
  },
  firstInputView: {
    width: 30,
    height: Platform.OS === "ios" ? 35 : "auto",
    borderBottomWidth: 1
  },
  headerView: {
    flex: 0.3,
    alignItems: "center",
    justifyContent: "center"
  },
  inputMainView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  inputContainerView: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonView: { flex: 0.3, justifyContent: "center" },
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
  headerText: {
    fontSize: 30,
    fontWeight: "600",
    color: "black"
  }
});
export default styles;

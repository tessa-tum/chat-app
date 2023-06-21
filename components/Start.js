import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";

// define Start component
const Start = ({ navigation }) => {
  //create state for user's input text and color choice
  const [name, setName] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");

  // render Start component
  return (
    <ImageBackground
      source={require("../assets/start-bg-image.png")}
      resizeMode="cover"
      style={styles.backgroundImg}
    >
      <View style={styles.container}>
        <Text style={styles.appTitle}>Let's chat!</Text>

        <View style={styles.contentWrapper}>
          {/* text input for username*/}
          <TextInput
            style={styles.inputText}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
          {/* color choice headline and buttons */}
          <View>
            <Text style={styles.colorChoiceHeadline}>
              Choose your background color
            </Text>

            <View style={styles.colorChoiceWrapper}>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Press to choose background color"
                accessibilityHint="Pressing chooses light red as the background color for the chat."
                accessibilityRole="button"
                style={[styles.colorChoiceBtn, { backgroundColor: "#FFB6B9" }]}
                onPress={() => setBackgroundColor("#FFB6B9")}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Press to choose background color"
                accessibilityHint="Pressing chooses light orange as the background color for the chat."
                accessibilityRole="button"
                style={[styles.colorChoiceBtn, { backgroundColor: "#FAE3D9" }]}
                onPress={() => setBackgroundColor("#FAE3D9")}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Press to choose background color"
                accessibilityHint="Pressing chooses light green as the background color for the chat."
                accessibilityRole="button"
                style={[styles.colorChoiceBtn, { backgroundColor: "#BBDED6" }]}
                onPress={() => setBackgroundColor("#BBDED6")}
              ></TouchableOpacity>
              <TouchableOpacity
                accessible={true}
                accessibilityLabel="Press to choose background color"
                accessibilityHint="Pressing chooses light blue as the background color for the chat."
                accessibilityRole="button"
                style={[styles.colorChoiceBtn, { backgroundColor: "#8AC6D1" }]}
                onPress={() => setBackgroundColor("#8AC6D1")}
              ></TouchableOpacity>
            </View>
          </View>
          {/* submit button, nav to chat view */}
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Press to start chatting"
            accessibilityHint="Navigates to the chat."
            accessibilityRole="button"
            style={styles.submitBtn}
            onPress={() =>
              navigation.navigate("Chat", {
                name: name ? name : "User",
                backgroundColor: backgroundColor ? backgroundColor : "white",
              })
            }
          >
            <Text style={styles.submitBtnText}>Start chatting</Text>
          </TouchableOpacity>
        </View>
        {/*Fix keyboard hides the message input field on Android*/}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
        {/*Fix keyboard hides the message input field on iOS*/}
        {Platform.OS === "ios" ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </View>
    </ImageBackground>
  );
};

// styles

const styles = StyleSheet.create({
  backgroundImg: {
    flex: 1,
    // fallback:
    backgroundColor: "#ECF4F3",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 45,
    fontWeight: 600,
    marginTop: 70,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    width: "88%",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    borderWidth: 0.5,
    borderColor: "#B2B2B2",
    color: "#716F81",
    fontSize: 16,
    fontWeight: "300",
    padding: 15,
    width: "88%",
  },
  colorChoiceHeadline: {
    color: "#716F81",
    fontSize: 16,
    marginBottom: 10,
  },
  colorChoiceWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  colorChoiceBtn: {
    borderRadius: 20,
    height: 40,
    width: 40,
    margin: 5,
  },
  submitBtn: {
    alignItems: "center",
    backgroundColor: "#716F81",
    justifyContent: "center",
    padding: 16,
    width: "88%",
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
  },
});

export default Start;

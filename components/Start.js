import { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Start = ({ navigation }) => {
  //create state for user's input text and color choice
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

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
              Choose Background Color
            </Text>
            <View style={styles.colorChoiceWrapper}>
              <TouchableOpacity
                style={[styles.colorChoiceBtn, { backgroundColor: "#ECF4F3" }]}
                onPress={() => setColor("#ECF4F3")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorChoiceBtn, { backgroundColor: "#68B0AB" }]}
                onPress={() => setColor("#68B0AB")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorChoiceBtn, { backgroundColor: "#006A71" }]}
                onPress={() => setColor("#006A71")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[styles.colorChoiceBtn, { backgroundColor: "#FF7E67" }]}
                onPress={() => setColor("#FF7E67")}
              ></TouchableOpacity>
            </View>
          </View>
          {/* submit button, nav to chat view */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={() =>
              navigation.navigate("Chat", {
                name: name ? name : "User",
                color: color ? color : "white",
              })
            }
          >
            <Text style={styles.submitBtnText}>Start chatting</Text>
          </TouchableOpacity>
        </View>
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
    padding: 40,
    backgroundColor: "#fff",
    width: "88%",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputText: {
    borderWidth: 0.5,
    borderColor: "#B2B2B2",
    color: "#3C4048",
    fontSize: 16,
    fontWeight: "300",
    padding: 15,
    width: "88%",
  },
  colorChoiceHeadline: {
    color: "#3C4048",
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
    backgroundColor: "#3C4048",
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

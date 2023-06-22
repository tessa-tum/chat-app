import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView } from "react-native";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  SystemMessage,
  Day,
  ChatFooter,
} from "react-native-gifted-chat";
import Ionicons from "react-native-vector-icons/Ionicons";

// define Chat component
const Chat = ({ route, navigation }) => {
  // extract name and color from route params passed through props
  const { name, backgroundColor } = route.params;

  // set state for messages using useState hook
  const [messages, setMessages] = useState([]);

  // set title of the chat room after component mounts
  // set initial message and system message
  useEffect(() => {
    navigation.setOptions({ title: name });
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: "You have entered the chat",
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // handle message sending, update messages state
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderInputToolbar = (props) => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  // customize chat bubbles
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#716F81",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
        textStyle={{
          right: {
            color: "#FFF",
          },
          left: {
            color: "#716F81",
          },
        }}
      />
    );
  };

  // customize send btn
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <Ionicons
          name="md-send"
          size={20}
          color="#716F81"
          style={{ marginRight: 10, marginTop: 28 }}
        />
      </Send>
    );
  };

  // customize welcome system message
  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        textStyle={{
          color: "#716F81",
        }}
      />
    );
  };

  // customize date display
  const renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{
          color: "#716F81",
        }}
      />
    );
  };

  // add footer space
  renderChatFooter = () => {
    return <View style={{ height: 30 }}></View>;
  };

  // render Chat component
  return (
    <View style={[{ backgroundColor: backgroundColor }, styles.container]}>
      <GiftedChat
        messages={messages}
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderDay={renderDay}
        alwaysShowSend
        renderChatFooter={renderChatFooter}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
          name,
        }}
        renderSend={renderSend}
      />
      {/*Fix keyboard hides the message input field on Android*/}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {/*Fix keyboard hides the message input field on iOS*/}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

// styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputToolbar: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 25,
    height: 47,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

export default Chat;

import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
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
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

// define Chat component
const Chat = ({ route, navigation, db }) => {
  // extract name, bgcolor and userID from route params
  const { name, backgroundColor, userID } = route.params; 
  // set state for messages using useState hook
  const [messages, setMessages] = useState([]);

  // fetch messages from Firestore database in real-time
  // function executes when component is mounted or updated
  useEffect(() => {
    navigation.setOptions({ title: name });
    // define query conditions for fetching messages (by their creation date in descending order)
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    // create the onSnapshot() listener on a query that targets the messages collection (executes in real-time)
    const unsubscribeMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });

    // unsubscribe from real-time updates when the component will be unmounted
    return () => {
      if (unsubscribeMessages) unsubscribeMessages();
    };
  }, []);

  // add new message to Firestore collection
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  // customizations

  // customize InputToolbar
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
        renderInputToolbar={renderInputToolbar}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderDay={renderDay}
        renderChatFooter={renderChatFooter}
        alwaysShowSend
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {/*fix keyboard hides the message input field on Android*/}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {/*fix keyboard hides the message input field on iOS*/}
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

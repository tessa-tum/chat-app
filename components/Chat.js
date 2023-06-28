// import from react
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
import AsyncStorage from "@react-native-async-storage/async-storage";

// import from firebase
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Chat = ({ route, navigation, db, isConnected }) => {
  // extract name, bgcolor and userID from route params
  // set state for messages using useState hook
  const { name, backgroundColor, userID } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubscribeMessages;

  // fetch messages from Firestore database in real-time
  useEffect(() => {
    if (isConnected === true) {
      // check internet connection
      navigation.setOptions({ title: name });

      // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      if (unsubscribeMessages) unsubscribeMessages();
      unsubscribeMessages = null;

      // define query conditions for fetching messages (by their creation date in descending order)
      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      // create the onSnapshot() listener on a query that targets the messages collection
      unsubscribeMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });

        // cache messages, update state
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      // load cached messages if there is no internet connection
      loadCachedMessages();
    }

    // unsubscribe from real-time updates when connectivity state changes
    return () => {
      if (unsubscribeMessages) unsubscribeMessages();
    };
  }, [isConnected]);

  // load messages from AsyncStorage
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // cache messages in AsyncStorage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // add messages to Firestore database
  const addMessage = async (newMessage) => {
    try {
      const newMessageRef = await addDoc(
        collection(db, "messages"),
        newMessage[0]
      );

      if (!newMessageRef.id) {
        Alert.alert("Unable to add message. Please try again later.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // send new messages
  const onSend = (newMessages) => {
    addMessage(newMessages);
  };

  // customizations

  // input toolbar
  const renderInputToolbar = (props) => {
    if (isConnected)
      return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
    else return null;
  };

  // chat bubbles
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

  // send btn
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

  // system message
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

  // date display
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

  // add chat footer space
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

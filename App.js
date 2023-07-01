// import from react
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert } from "react-native";
// import from firebase
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// create navigator (react nav library)
const Stack = createNativeStackNavigator();

const App = () => {
  // check network connectivity
  const connectionStatus = useNetInfo();

  // add firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyB0cqPOSWlu1bA_8_7Wwl1jEzjmARTim2w",
    authDomain: "hello-world-cf.firebaseapp.com",
    projectId: "hello-world-cf",
    storageBucket: "hello-world-cf.appspot.com",
    messagingSenderId: "993531059809",
    appId: "1:993531059809:web:423630be863bd3e2581420",
  };

  // initialize firebase, cloud firestore db and storage
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  // check network connectivity in real-time
  // stop firebase from re-connecting to firestore (default)
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]); // if value of dependency array changes, useEffect will be re-executed

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {/* pass props to the chat component */}
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

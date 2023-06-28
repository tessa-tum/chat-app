// import from react
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { Alert } from "react-native";

// import from firebase
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

// import screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// create navigator (react nav library)
const Stack = createNativeStackNavigator();

const App = () => {
  // check for network connectivity state
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

  // initialize firebase
  const app = initializeApp(firebaseConfig);

  // initialize cloud firestore and get reference to the service
  const db = getFirestore(app);

  // check for network connectivity state in real-time
  // stop Firebase from attempting to re-connect to Firestore
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]); // if the value of the dependency array changes, the useEffect code will be re-executed

  return (
    <NavigationContainer>
      <Stack.Navigator
        // first screen to be loaded when starting the app
        initialRouteName="Start"
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {/* passes props to the chat component */}
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

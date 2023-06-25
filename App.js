// import react nav library
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import firebase, firestore
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import screens
import Start from "./components/Start";
import Chat from "./components/Chat";

// create navigator (react nav library)
const Stack = createNativeStackNavigator();

const App = () => {
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

  return (
    <NavigationContainer>
      <Stack.Navigator
        // first screen to be loaded when starting the app
        initialRouteName="Start"
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {/* passes props to Chat component */}
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

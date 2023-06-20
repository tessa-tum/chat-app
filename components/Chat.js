import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const Chat = ({ route, navigation }) => {
  // display username in nav header bar
  // display color background chosen by user
  const { name, color } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    <View style={[{ backgroundColor: color }, styles.container]}>
      <Text>Hello world ...</Text>
    </View>
  );
};

// styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Chat;

# Chat app

## Objective

A chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

## Visuals

Mobile view of home page

![Screenshot of main view](https://github.com/tessa-tum/chat-app/blob/main/assets/screenshots-chat-app.png)

## Built with

### Languages

- Javascript, JSX

### Framework, Libraries, Tools

- React Native
  - React navigation
- Expo
-   Expo CLI and Expo Go App
- Gifted Chat
- Google Firebase / Firestore
- Android Studio (for testing)

### Global
- `expo-CLI` to work with Expo

### Dependencies
- `expo` to set up, develop and test the native app
- `expo-image-picker` to gain access to native image library/camera 
- `expo-location` to gain access to native geo location
- `firebase` to enable real-time chat/saving of messages/images and anonymous sign-in
- `react`
- `react-native` 
- `react-native-gifted-chat` as library for developing chat apps
- `react-native-safe-area-context`
- `react-native-screens`
- `react-native-maps` to use MapView component for geo location display 
- `@react-native-async-storage/async-storage` to store messages offline
- `@react-native-community/netinfo` to check on- or offline status
- `react-navigation` to navigate between screens
- `@react-navigation/native`
- `@react-navigation/native-stack`

## Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

## How to run

- Create an - or use your - Expo account and download Expo Go on your mobile device
- It's recommended to also set up a device emulator via Android Studio
- Before you clone the project, check your current Node version and if necessary downgrade to 16.19.0
- Then:
  - clone the repo
  - `cd` into project folder and
  - `npm install`
- Log into expo accouunt via the terminal (`expo login`)
- You can check the currently logged-in account via `expo whoami`
- Start the project via `npm start` or `npx expo start` (starts Metro Bundler)
- Open your mobile device and open the Expo Go App
- Open the project, which will start the build
- To stop expo, use `control c` 




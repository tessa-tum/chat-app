# Chat app

## Project description

A chat app for mobile devices using React Native. The app will provide users with a chat interface and options to share images and their location.

## Key features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

## Built with

- React Native
  - JSX
  - JavaScript
- Expo
- Google Firebase / Firestore
- Android Studio (for testing)

## Interface

![Screenshot of main view](https://github.com/tessa-tum/chat-app/blob/main/assets/scrnshot-start-screen-.PNG)

## Project deliverables

- Building Native Applications with JavaScript: Set up the development environment to work with React Native and Expo. Created the app’s layout using native UI components.
- Chat UIs & Accessibility: Built the chat screen and the chat functionality with the Gifted Chat library.
- Real-Time Applications & Data Storage: Authenticated users anonymously with Firebase. Stored conversations in the Firestore Database.
- Storing Data on the Client-Side: Stored chats locally using asyncStorage for offline availability. Authenticated users and stored chat messages in Firestore as well as on the device when users are online.
- Communication Features: Implemented image picking from the device’s library, taking pictures with the device’s camera app, storing images in Google Firebase Cloud Storage, and sending images via Gifted Chat. Implemented location sending in a map view via Gifted Chat. Applied accessibility considerations to app design and development.

## Run the project

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




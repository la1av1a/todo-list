import * as WebBrowser from "expo-web-browser";
import { initializeApp } from "firebase/app";
import { createContext, useState } from "react";
import UserContext from "./userContext";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./components/StackNavigator";

const firebaseConfig = {
  apiKey: "AIzaSyCxu5QY13NTwrfyHRtdg5gTSyx1yfeGx4s",
  authDomain: "todolistapp-86e03.firebaseapp.com",
  projectId: "todolistapp-86e03",
  storageBucket: "todolistapp-86e03.appspot.com",
  messagingSenderId: "134437110366",
  appId: "1:134437110366:android:e216a93ec5e648dd856acf",
  measurementId: "G-XXXXXXXXXX",
};

initializeApp(firebaseConfig);

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

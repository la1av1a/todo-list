import * as WebBrowser from "expo-web-browser";
import { createContext, useEffect, useState } from "react";
import UserContext from "./userContext";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./components/StackNavigator";
import { firebaseConfig } from "./util/firebase";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebaseConfig();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </UserContext.Provider>
  );
}

import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { Button, View, Text } from "react-native"; // Text component added

// Initialize Firebase
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
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "207479923509-nav69m41ilh13au06kqnhlds28k1cap0.apps.googleusercontent.com",
  });

  const [user, setUser] = React.useState(null); // added state for user

  React.useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      const { id_token } = response.params;

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          // on success, update the user state
          setUser(userCredential.user);
        })
        .catch((error) => {
          // Here you can handle errors happened during the sign-in
          console.error(error);
        });
    }
  }, [response]);

  return (
    <View>
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
      {user && ( // if user is logged in, display their info
        <Text>Logged in as: {user.email}</Text>
      )}
    </View>
  );
}

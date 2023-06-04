import * as React from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import {
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import userContext from "../userContext";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "207479923509-nav69m41ilh13au06kqnhlds28k1cap0.apps.googleusercontent.com",
  });

  const { user, setUser } = React.useContext(userContext);
  const navigation = useNavigation();

  const handleStartEditing = (initialValue) => {
    setEditValue(initialValue);
    setEditing(true);
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      const { id_token } = response.params;

      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          setUser(userCredential.user);
          navigation.navigate("result");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={!request}
        onPress={() => {
          promptAsync();
        }}
      >
        <Image
          source={require("../assets/btn_google_signin_light_normal_web.png")}
          style={styles.button}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200, // Or whatever size you need
    height: 50, // Or whatever size you need
  },
});

export default LoginScreen;

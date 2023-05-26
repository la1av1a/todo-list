import * as React from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { Button, View, Text } from "react-native";
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
};

export default LoginScreen;

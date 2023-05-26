import { useContext } from "react";
import UserContext from "../userContext";
import { Text, View } from "react-native";

const LoginResult = () => {
  const { user } = useContext(UserContext);

  return (
    <View>
      <Text>Logged in as: {user.email}</Text>
    </View>
  );
};

export default LoginResult;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screen/loginScreen";
import LoginResult from "../screen/loginResult";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="result"
        component={LoginResult}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

import { useContext, useEffect, useState } from "react";
import UserContext from "../userContext";
import {
  Platform,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  getFirestore,
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
  where,
  query,
  addDoc,
} from "firebase/firestore";
import Constants from "expo-constants";
import TodoItems from "../components/TodoItems";
import ActionButton from "react-native-action-button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Timestamp } from "firebase/firestore";

const LoginResult = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [isInputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    getData();
  }, [date]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
    console.log(date);
  };

  const getData = async () => {
    const db = getFirestore();
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const startTimestamp = Timestamp.fromDate(startOfDay);
    const endTimestamp = Timestamp.fromDate(endOfDay);

    const querySnapshot = await getDocs(
      query(
        collection(db, user.email),
        where("date", ">=", startTimestamp),
        where("date", "<=", endTimestamp)
      )
    );
    const arr = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setData(arr);
  };

  const handleDeleteItem = async (id) => {
    const db = getFirestore();
    await deleteDoc(doc(db, user.email, id));
    getData();
  };

  const handleDeleteAll = async () => {
    const db = getFirestore();
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const startTimestamp = Timestamp.fromDate(startOfDay);
    const endTimestamp = Timestamp.fromDate(endOfDay);

    const querySnapshot = await getDocs(
      query(
        collection(db, user.email),
        // Add where clauses to filter by date range
        where("date", ">=", startTimestamp),
        where("date", "<=", endTimestamp)
      )
    );

    if (querySnapshot.empty) {
      return;
    }

    querySnapshot.forEach((document) => {
      deleteDoc(doc(db, user.email, document.id));
    });

    getData();
  };

  const handleToggleSuccess = async (id, currentValue) => {
    const db = getFirestore();
    await updateDoc(doc(db, user.email, id), {
      isSuccess: !currentValue,
    });
    await getData();
  };

  const handleToggleInput = () => {
    setInputVisible(true);
    Keyboard.dismiss();
  };
  const handleUpdateItem = async (id, newValue) => {
    const db = getFirestore();
    await updateDoc(doc(db, user.email, id), {
      title: newValue,
    });
    getData();
  };
  const handleAddItem = async () => {
    if (inputValue !== "") {
      const db = getFirestore();
      const timestamp = Timestamp.fromDate(date);
      await addDoc(collection(db, user.email), {
        title: inputValue,
        isSuccess: false,
        date: timestamp,
      });
      setInputValue("");
      setInputVisible(false);
      await getData();
    }
  };

  const dismissKeyboard = () => {
    setInputVisible(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            setShowDatePicker(true);
          }}
        >
          <Text style={styles.loginText}>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleDeleteAll}>
          <Text style={styles.buttonText}>Delete All</Text>
        </TouchableOpacity>
        <TodoItems
          data={data}
          handleDeleteItem={handleDeleteItem}
          handleToggleSuccess={handleToggleSuccess}
          handleUpdateItem={handleUpdateItem}
        />
        {isInputVisible && (
          <TextInput
            style={styles.textInput}
            placeholder="New item..."
            autoFocus={true}
            onBlur={dismissKeyboard}
            value={inputValue}
            onChangeText={setInputValue}
            onSubmitEditing={handleAddItem}
          />
        )}
        {!isInputVisible && (
          <ActionButton
            buttonColor="rgba(231,76,60,1)"
            onPress={handleToggleInput}
            fixNativeFeedbackRadius={true}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#f67280",
    borderRadius: 20,
    padding: 10,
    textAlign: "center",
    backgroundColor: "#ffe2e2",
  },
  button: {
    backgroundColor: "#35477d",
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  textInput: {
    height: 60,
    width: "100%",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: Platform.OS === "ios" ? 20 : 0,
  },
});

export default LoginResult;

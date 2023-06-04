import { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { updateDoc } from "firebase/firestore";
import { getFirestore, doc } from "firebase/firestore";
import UserContext from "../userContext";

const TodoItems = ({
  data,
  handleDeleteItem,
  handleUpdateItem,
  handleToggleSuccess,
}) => {
  const [isEditing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const handleStartEditing = (initialValue) => {
    setEditValue(initialValue);
    setEditing(true);
  };

  return (
    <View>
      {data.map((item) => (
        <View style={styles.itemContainer} key={item.id}>
          <TouchableOpacity onPress={() => handleStartEditing(item.title)}>
            {isEditing ? (
              <TextInput
                style={styles.editInput}
                autoFocus={true}
                onBlur={() => setEditing(false)}
                value={editValue}
                onChangeText={setEditValue}
                onSubmitEditing={() => handleUpdateItem(item.id, editValue)}
              />
            ) : (
              <View style={styles.itemContent}>
                <TouchableOpacity
                  onPress={() => handleToggleSuccess(item.id, item.isSuccess)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      item.isSuccess && styles.checkboxSelected,
                    ]}
                  />
                </TouchableOpacity>
                <Text
                  style={[styles.itemText, item.isSuccess && styles.strikeText]}
                >
                  {item.title}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteItem(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#c7ceea",
    borderRadius: 20,
    padding: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 18,
    color: "#35477d",
    marginLeft: 10,
  },
  strikeText: {
    textDecorationLine: "line-through",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  deleteButton: {
    backgroundColor: "#f67280",
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  editInput: {
    flex: 1,
    fontSize: 18,
    color: "#35477d",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#35477d",
    marginRight: 10,
  },
  checkboxSelected: {
    backgroundColor: "#35477d",
  },
});

export default TodoItems;

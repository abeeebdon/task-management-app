import { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { createTaskStyles as styles } from "../styles/create-task.style";
import { categories } from "../components/data";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationTypes, Task } from "../types";
import { Colors } from "../components/constants";

const TASKS_KEY = "TASKS_LIST";

const CreateTaskScreen: FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationTypes>>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completionDate, setCompletionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState("Personal");

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setCompletionDate(selectedDate);
  };

  const saveTask = async () => {
    if (!title || !description || !category) {
      alert("Please fill in all fields.");
      return;
    }
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completionDate: completionDate.toISOString(),
      status: "pending",
      category,
    };

    try {
      const stored = await AsyncStorage.getItem(TASKS_KEY);
      const tasks = stored ? JSON.parse(stored) : [];
      const updated = [...tasks, newTask];
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
      alert("Task saved!");
      setTitle("");
      setDescription("");
      setCategory("Personal");
      setCompletionDate(new Date());
      navigation.navigate("Tasks");
    } catch (error) {
      console.log("Error saving task:", error);
      alert("Failed to save task.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.headContainer}>
              <Text style={styles.title}>Create A New Task</Text>

              {/* input for title  */}
              <View style={{ marginTop: 16 }}>
                <Text style={[styles.label, { color: "#fff" }]}>Title</Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: "#fff", color: "blue" },
                  ]}
                  placeholder="Task title"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
              <View>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Write your task description here"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                />

                <Text style={styles.label}>Category</Text>
                <View style={styles.categoriesContainer}>
                  {categories.map((level) => (
                    <Pressable
                      key={level}
                      onPress={() => setCategory(level)}
                      style={[
                        styles.categoriesBtn,
                        {
                          backgroundColor:
                            category === level ? Colors.primary : "#ccc",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          color: category === level ? "white" : "#817a92ff",
                        }}
                      >
                        {level}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Text style={styles.label}>Completion Date :</Text>
                <Pressable
                  style={styles.datePicker}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    {completionDate.toDateString()}
                  </Text>
                  <Entypo name="chevron-small-down" color="white" />
                </Pressable>
                {showDatePicker && (
                  <DateTimePicker
                    value={completionDate}
                    mode="date"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <TouchableOpacity onPress={saveTask} style={styles.submitButton}>
                <Text style={{ color: "white", textAlign: "center" }}>
                  Save Task
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateTaskScreen;

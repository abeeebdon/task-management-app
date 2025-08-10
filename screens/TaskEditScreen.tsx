import { FC, useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { createTaskStyles as styles } from "../styles/create-task.style";
import { categories } from "../components/data";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationTypes, Task } from "../types";
import { Picker } from "@react-native-picker/picker";
import { Colors } from "../components/constants";

const TASKS_KEY = "TASKS_LIST";

type NavigationProp = NativeStackNavigationProp<
  RootNavigationTypes,
  "taskEdit"
>;
type RouteProps = RouteProp<RootNavigationTypes, "taskEdit">;
const statusArray = ["Pending", "In Progress", "Completed"];
const TaskEditScreen: FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { id } = route.params; // Task ID passed from list screen

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completionDate, setCompletionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("pending");

  // Load existing task
  useEffect(() => {
    const loadTask = async () => {
      try {
        const stored = await AsyncStorage.getItem(TASKS_KEY);
        if (!stored) return;

        const tasks: Task[] = JSON.parse(stored);
        const taskToEdit = tasks.find((t) => t.id === id);
        if (taskToEdit) {
          setTitle(taskToEdit.title);
          setDescription(taskToEdit.description);
          setCompletionDate(new Date(taskToEdit.completionDate));
          setCategory(taskToEdit.category);
          setStatus(taskToEdit.status);
        }
      } catch (error) {
        console.log("Error loading task:", error);
      }
    };

    loadTask();
  }, [id]);

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setCompletionDate(selectedDate);
  };

  const saveTask = async () => {
    if (!title || !description || !category) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const stored = await AsyncStorage.getItem(TASKS_KEY);
      let tasks: Task[] = stored ? JSON.parse(stored) : [];

      tasks = tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              title,
              description,
              completionDate: completionDate.toISOString(),
              category,
              status,
            }
          : t
      );

      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      Alert.alert("Success", "Task updated!");
      navigation.navigate("taskList");
    } catch (error) {
      console.log("Error saving task:", error);
      Alert.alert("Error", "Failed to save task.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
            <View style={styles.headContainer}>
              <Text style={styles.title}>Edit Task</Text>

              {/* Title input */}
              <View style={{ marginTop: 16 }}>
                <Text style={[styles.label, { color: "#fff" }]}>Title</Text>
                <TextInput
                  style={[
                    styles.input,
                    { backgroundColor: "#fff", color: Colors.primary },
                  ]}
                  placeholder="Task title"
                  value={title}
                  onChangeText={setTitle}
                />
              </View>
            </View>

            <ScrollView contentContainerStyle={styles.container}>
              {/* Description */}
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
              <Text style={styles.label}>Status</Text>
              <Picker selectedValue={status} onValueChange={setStatus}>
                {statusArray.map((level) => (
                  <Picker.Item key={level} label={level} value={level} />
                ))}
              </Picker>
              {/* Category */}
              <Text style={styles.label}>Category</Text>
              <View style={styles.categoriesContainer}>
                {categories.map((level) => (
                  <Pressable
                    key={level}
                    onPress={() => setCategory(level)}
                    style={[styles.categoriesBtn]}
                  >
                    <Text
                      style={{
                        color: category === level ? "#007BFF" : "white",
                      }}
                    >
                      {level}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {/* Date picker */}
              <Text style={styles.label}>Completion Date :</Text>
              <Pressable
                style={styles.datePicker}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={{ color: "white", fontSize: 16 }}>
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

              {/* Save button */}
              <TouchableOpacity onPress={saveTask} style={styles.submitButton}>
                <Text style={{ color: "white", textAlign: "center" }}>
                  Save Changes
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default TaskEditScreen;

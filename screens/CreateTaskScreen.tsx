import { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

const TASKS_KEY = "TASKS_LIST";

type Task = {
  id: string;
  title: string;
  description: string;
  completionDate: string;
  status: string;
  category: string;
  priority: "Low" | "Medium" | "High";
};

const CreateTaskScreen: FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completionDate, setCompletionDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [status, setStatus] = useState("Todo");
  const [category, setCategory] = useState("Personal");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setCompletionDate(selectedDate);
  };

  const saveTask = async () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completionDate: completionDate.toISOString(),
      status,
      category,
      priority,
    };

    try {
      const stored = await AsyncStorage.getItem(TASKS_KEY);
      const tasks = stored ? JSON.parse(stored) : [];
      const updated = [...tasks, newTask];
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updated));
      alert("Task saved!");
      setTitle("");
      setDescription("");
      setStatus("Todo");
      setCategory("Personal");
      setPriority("Medium");
      setCompletionDate(new Date());
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
          <View>
            <View style={styles.headContainer}>
              <Text style={styles.title}>Create A new Task</Text>
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
            <ScrollView contentContainerStyle={styles.container}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
              />
              <Text style={styles.label}>Completion Date</Text>
              <Button
                title={completionDate.toDateString()}
                onPress={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={completionDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={handleDateChange}
                />
              )}
              <Text style={styles.label}>Status</Text>
              <Picker
                selectedValue={status}
                onValueChange={(value) => setStatus(value)}
              >
                <Picker.Item label="Todo" value="Todo" />
                <Picker.Item label="In Progress" value="In Progress" />
                <Picker.Item label="Done" value="Done" />
              </Picker>

              <Text style={styles.label}>Category</Text>
              <Picker
                selectedValue={category}
                onValueChange={(value) => setCategory(value)}
              >
                <Picker.Item label="Personal" value="Personal" />
                <Picker.Item label="Work" value="Work" />
                <Picker.Item label="Errands" value="Errands" />
              </Picker>

              <Text style={styles.label}>Priority</Text>
              <View style={styles.priorityContainer}>
                {(["Low", "Medium", "High"] as const).map((level) => (
                  <Button
                    key={level}
                    title={level}
                    color={priority === level ? "#007BFF" : undefined}
                    onPress={() => setPriority(level)}
                  />
                ))}
              </View>

              <TouchableOpacity style={styles.submitButton}>
                <Button title="Save Task" onPress={saveTask} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    backgroundColor: "#fff",
  },
  headContainer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "blue",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  label: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "blue",
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: "blue",
  },
});

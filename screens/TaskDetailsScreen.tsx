import { FC, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationTypes } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";
import { deleteFunc } from "../components/func";
import { Colors } from "../components/constants";
import EditTaskModal from "../components/EditModal";
import ConfirmDeleteModal from "../components/DeleteModal";
import { taskDetailsStyles as styles } from "../styles/task.details.style";

// Correctly type the route
type TaskDetailsRouteProp = RouteProp<RootNavigationTypes, "taskDetails">;

// Correctly type the navigation
type NavigationProp = NativeStackNavigationProp<
  RootNavigationTypes,
  "taskDetails"
>;
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return { backgroundColor: Colors.primary };
    case "completed":
      return { backgroundColor: "green" };

    default:
      return { backgroundColor: "#666" };
  }
};
const TaskDetailsScreen: FC = () => {
  const route = useRoute<TaskDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const { title, completionDate, description, status, category, id } =
    route.params.task;

  const handleSaveEdit = async (updatedTask: any) => {
    const stored = await AsyncStorage.getItem(TASKS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    const updatedList = parsed.map((t: any) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedList));
    navigation.navigate("taskList");
    // loadTaskFromStorage(); // optional refresh method
  };
  const TASKS_KEY = "TASKS_LIST";

  const handleDelete = async () => {
    const status = await deleteFunc(id);
    if (status == "deleted") {
      Alert.alert("Success", "Task deleted successfully.");
      navigation.goBack();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={[styles.titleContainer, getStatusStyle(status)]}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
            <FeatherIcon name="arrow-left" size={24} color="white" />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Completion Date:</Text>
          <Text style={styles.value}>
            {new Date(completionDate).toDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.value}>{description || "No description"}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{status}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{category}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setEditVisible(true)}
            style={[styles.actionBtn, { backgroundColor: "green" }]}
          >
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDeleteVisible(true)}
            style={[styles.actionBtn, { backgroundColor: "darkred" }]}
          >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <EditTaskModal
          visible={editVisible}
          onClose={() => setEditVisible(false)}
          task={route.params.task}
          onSave={handleSaveEdit}
        />

        <ConfirmDeleteModal
          visible={deleteVisible}
          onCancel={() => setDeleteVisible(false)}
          onConfirm={handleDelete}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskDetailsScreen;

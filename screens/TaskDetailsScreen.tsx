import { FC } from "react";
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

// Correctly type the route
type TaskDetailsRouteProp = RouteProp<RootNavigationTypes, "taskDetails">;

// Correctly type the navigation
type NavigationProp = NativeStackNavigationProp<
  RootNavigationTypes,
  "taskDetails"
>;
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "in progress":
      return { backgroundColor: "orange" };
    case "pending":
      return { backgroundColor: "goldenrod" };
    case "completed":
      return { backgroundColor: "green" };
    case "archived":
      return { backgroundColor: "gray" };
    default:
      return { backgroundColor: "#666" };
  }
};
const TaskDetailsScreen: FC = () => {
  const route = useRoute<TaskDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { title, completionDate, description, status, category, priority, id } =
    route.params.task;

  const handleEdit = () => {};
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

        <View style={styles.section}>
          <Text style={styles.label}>Priority:</Text>
          <Text style={styles.value}>{priority}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("taskEdit", { id: id })}
            style={[styles.actionBtn, { backgroundColor: "green" }]}
          >
            <Text style={styles.btnText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={[styles.actionBtn, { backgroundColor: "darkred" }]}
          >
            <Text style={styles.btnText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    // padding: 16,
  },
  titleContainer: {
    backgroundColor: "blue",
    padding: 16,
    // height: 100,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  section: {
    marginBottom: 12,
    padding: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#222",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  actionBtn: {
    backgroundColor: "#dad1d1ff",
    elevation: 2,
    width: "40%",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  btnText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationTypes, Task } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcons from "react-native-vector-icons/Feather";
const TASKS_KEY = "TASKS_LIST";

type NavigationProp = NativeStackNavigationProp<
  RootNavigationTypes,
  "taskList"
>;

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>(); // ✅ moved inside component
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem(TASKS_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setTasks(parsed);
    } catch (error) {
      console.log("Failed to load tasks:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  useEffect(() => {
    loadTasks();
  }, [isFocused]);

  const renderItem = ({ item }: { item: Task }) => (
    <TouchableOpacity
      style={styles.taskCard}
      onPress={() => navigation.navigate("taskDetails", { task: item })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.meta}>
        Due: {new Date(item.completionDate).toDateString()}
      </Text>
      <Text style={styles.meta}>Status: {item.status}</Text>
      <Text style={styles.meta}>Category: {item.category}</Text>
      <Text style={[styles.priority, styles[`priority_${item.priority}`]]}>
        Priority: {item.priority}
      </Text>
      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Task List
        </Text>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Search tasks..." style={styles.searchInput} />
          <TouchableOpacity style={styles.featherIcon}>
            <FeatherIcons name="filter" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.empty}>No tasks found.</Text>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskListScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    borderWidth: 1,
    flex: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  featherIcon: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0ff",
  },
  taskCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  meta: {
    fontSize: 14,
    marginTop: 4,
  },
  priority: {
    fontWeight: "600",
    marginTop: 4,
  },
  priority_Low: {
    color: "green",
  },
  priority_Medium: {
    color: "orange",
  },
  priority_High: {
    color: "red",
  },
  description: {
    marginTop: 8,
    fontStyle: "italic",
    color: "#555",
  },
  empty: {
    marginTop: 40,
    textAlign: "center",
    color: "#888",
  },
});

import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationTypes, Task } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcons from "react-native-vector-icons/Feather";
import { taskListStyles as styles } from "../styles/task-list.style";
import { deleteFunc } from "../components/func";
import { Colors } from "../components/constants";
import TaskItem from "../components/TaskItem";

const TASKS_KEY = "TASKS_LIST";

type NavigationProp = NativeStackNavigationProp<
  RootNavigationTypes,
  "taskList"
>;

const taskStatus = ["All", "Pending", "Completed"];

// ✅ Separated item component so hooks are safe here

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filterBy === "all") return true;
        return task.status.toLowerCase() === filterBy;
      })
      .filter((task) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return (
          task.title.toLowerCase().includes(query) ||
          task.description?.toLowerCase().includes(query) ||
          task.category?.toLowerCase().includes(query)
        );
      });
  }, [tasks, filterBy, searchQuery]);

  const handleDelete = async (id: string) => {
    const status = await deleteFunc(id);
    if (status === "deleted") {
      Alert.alert("Success", "Task deleted successfully.");
      loadTasks();
    }
  };

  const handleSaveEdit = async (updatedTask: Task) => {
    const stored = await AsyncStorage.getItem(TASKS_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    const updatedList = parsed.map((t: Task) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedList));
    loadTasks();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        My Tasks
      </Text>
      <Pressable
        style={styles.addButton}
        onPress={() => navigation.navigate("Create")}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Add New Task
        </Text>
      </Pressable>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search tasks..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <FeatherIcons name="search" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <View style={styles.filterContainer}>
        {taskStatus.map((status, i) => (
          <Pressable
            key={i}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  filterBy === status.toLowerCase() ? Colors.primary : "#ccc",
              },
            ]}
            onPress={() => setFilterBy(status.toLowerCase())}
          >
            <Text
              style={{
                color:
                  filterBy === status.toLowerCase() ? "white" : "#88878780",
              }}
            >
              {status}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Task List */}
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredTasks.length > 0 ? (
          filteredTasks.map((item, index) => (
            <View key={item.id}>
              <TaskItem
                item={item}
                onSave={handleSaveEdit}
                onDelete={handleDelete}
              />
            </View>
          ))
        ) : (
          <Text style={styles.empty}>No tasks found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TaskListScreen;

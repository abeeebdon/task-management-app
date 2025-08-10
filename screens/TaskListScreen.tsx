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

const TASKS_KEY = "TASKS_LIST";

type NavigationProp = NativeStackNavigationProp<
  RootNavigationTypes,
  "taskList"
>;

const taskStatus = ["All", "Pending", "Completed"];

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

  // ✅ Memoized filtered & searched tasks
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

  const renderItem = ({ item }: { item: Task }) => {
    const handleDelete = async () => {
      const status = await deleteFunc(item.id);
      if (status === "deleted") {
        Alert.alert("Success", "Task deleted successfully.");
        loadTasks();
      }
    };

    return (
      <TouchableOpacity
        style={styles.taskCard}
        onPress={() => navigation.navigate("taskDetails", { task: item })}
      >
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.meta}>
            Due: {new Date(item.completionDate).toDateString()}
          </Text>
          <Text style={styles.meta}>Status: {item.status}</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("taskEdit", { id: item.id })}
          >
            <Text style={{ color: "green" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={{ color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Task List
        </Text>
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate("Create")}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Add New Task
          </Text>
        </Pressable>
        {/* ✅ Search Box */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search tasks..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.featherIcon}>
            <FeatherIcons name="search" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* ✅ Filter Buttons */}
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
                  color: filterBy === status.toLowerCase() ? "white" : "black",
                }}
              >
                {status}
              </Text>
            </Pressable>
          ))}
        </View>
        {/* ✅ Filtered + Searched Task List */}
        <FlatList
          data={filteredTasks}
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

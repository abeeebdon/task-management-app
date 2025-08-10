import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootNavigationTypes, Task } from "../types";
import { taskListStyles } from "../styles/task-list.style";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "in progress":
      return { color: "orange" };
    case "pending":
      return { color: "goldenrod" };
    case "completed":
      return { color: "green" };
    case "archived":
      return { color: "gray" };
    default:
      return { color: "#666" };
  }
};
const getIcon = (category: string) => {
  let iconName: string;

  switch (category.toLowerCase()) {
    case "work":
      iconName = "briefcase";
      break;
    case "personal":
      iconName = "user";
      break;
    case "shopping":
      iconName = "shopping-cart";
      break;
    case "health":
      iconName = "heart";
      break;
    case "finance":
      iconName = "dollar-sign";
      break;
    case "study":
      iconName = "book";
      break;
    default:
      iconName = "tag";
      break;
  }
  return iconName;
};

type NavigationProp = NativeStackNavigationProp<
  RootNavigationTypes,
  "taskList"
>;
const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from AsyncStorage whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const loadTasks = async () => {
        setLoading(true);
        try {
          const storedTasks = await AsyncStorage.getItem("TASKS_LIST");
          if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
          } else {
            setTasks([]);
          }
        } catch (error) {
          console.error("Error loading tasks:", error);
        }
        setLoading(false);
      };
      loadTasks();
    }, [])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.welcomeText}>Welcome !!!</Text>
          <Text style={styles.username}>
            Organise your tasks like and get them done
          </Text>
        </View>
        <View style={styles.headerIcon}>
          <Feather name="user" size={24} color="blue" />
        </View>
      </View>

      {/* Recent Tasks */}
      <View style={styles.recentTasksContainer}>
        <Text style={styles.sectionTitle}>Recent Tasks</Text>

        {loading ? (
          <Text>Loading...</Text>
        ) : tasks.length === 0 ? (
          <Text style={{ color: "#666" }}>You have no task yet</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
          >
            {tasks.slice(0, 4).map((item) => (
              <View key={item.id} style={styles.card}>
                <Feather
                  name={getIcon(item.category)}
                  size={28}
                  color="blue"
                  style={styles.cardIcon}
                />
                <Text style={styles.cardName}>{item.title}</Text>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={[styles.status, getStatusStyle(item.status)]}>
                  {item.status}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Pending Tasks */}
      <View style={styles.recentTasksContainer}>
        <Text style={styles.sectionTitle}>Pending Tasks</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : tasks.filter((t) => t.status === "pending").length === 0 ? (
          <Text style={{ color: "#666" }}>No pending tasks</Text>
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.taskContainer}
          >
            {tasks
              .filter((t) => t.status === "pending")
              .map((item) => (
                <TouchableOpacity
                  style={styles.cardP}
                  key={item.id}
                  onPress={() => navigation.navigate("Tasks")}
                >
                  <Feather
                    name={getIcon(item.category)}
                    size={28}
                    color="blue"
                    style={styles.cardIcon}
                  />

                  <View>
                    <Text style={taskListStyles.title}>{item.title}</Text>
                    <Text style={taskListStyles.meta}>
                      Due: {new Date(item.completionDate).toDateString()}
                    </Text>
                    <Text style={taskListStyles.meta}>
                      Status: {item.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  welcomeText: {
    fontSize: 16,
    color: "#777070ff",
  },
  username: {
    fontSize: 14,
    fontWeight: "medium",
  },
  headerIcon: {
    padding: 6,
    borderWidth: 2,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "blue",
    borderRadius: 20,
  },
  recentTasksContainer: {
    padding: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  contentContainer: {
    paddingRight: 16,
  },
  card: {
    width: 120,
    height: 150,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    shadowColor: "#000",
    elevation: 3,
  },
  cardIcon: {
    marginBottom: 8,
  },
  status: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
    textTransform: "capitalize",
  },
  cardName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  taskContainer: {
    gap: 10,
  },
  cardP: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "white",
    elevation: 2,
    padding: 10,
    borderRadius: 10,
  },
});

import React, { useState, useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootNavigationTypes, Task } from "../types";
import { taskListStyles } from "../styles/task-list.style";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import { homeStyles as styles } from "../styles/home.styles";
import { Colors } from "../components/constants";
import { formatMonthYear } from "../components/func";
// Helper function to determine status color
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return { color: "goldenrod" };
    case "completed":
      return { color: "green" };
    default:
      return { color: "#666" };
  }
};

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "work":
      return "briefcase";
    case "personal":
      return "user";
    case "shopping":
      return "shopping-cart";
    case "health":
      return "heart";
    case "finance":
      return "dollar-sign";
    case "study":
      return "book";
    default:
      return "tag";
  }
};

type NavigationProp = NativeStackNavigationProp<RootNavigationTypes, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadTasks = async () => {
        setLoading(true);
        try {
          const storedTasks = await AsyncStorage.getItem("TASKS_LIST");
          setTasks(storedTasks ? JSON.parse(storedTasks) : []);
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
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.welcomeText}>Welcome {user.username} !!!</Text>
            <Text style={styles.username}>
              Organise your tasks and get them done
            </Text>
          </View>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate("Settings")}
          >
            <Image
              source={require("../assets/user_icon.png")}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>

        {/* Recent Tasks */}
        <View style={styles.recentTasksContainer}>
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
                  <Text style={{ color: "white", textAlign: "right" }}>
                    {formatMonthYear(new Date(item.completionDate))}
                  </Text>
                  <View
                    style={{
                      marginVertical: 12,
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Feather
                      name={getIcon(item.category)}
                      size={32}
                      color={Colors.white}
                      style={styles.cardIcon}
                    />
                  </View>
                  <Text style={styles.cardName}>{item.title}</Text>
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
        </View>
        {loading ? (
          <Text>Loading...</Text>
        ) : tasks.filter((t) => t.status.toLowerCase() === "pending").length ===
          0 ? (
          <Text style={{ color: "#666", margin: 10 }}>No pending tasks</Text>
        ) : (
          <View style={styles.taskContainer}>
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
                    color={Colors.primary}
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
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

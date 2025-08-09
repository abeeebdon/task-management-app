import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { Task } from "../types";
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
const HomeScreen = () => {
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
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.username}>Abeebdon!</Text>
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
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            {tasks.slice(0, 5).map((item) => (
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
            style={styles.container}
          >
            {tasks
              .filter((t) => t.status === "pending")
              .map((item) => (
                <View key={item.id} style={styles.card}>
                  <Feather
                    name={getIcon(item.category)}
                    size={28}
                    color="blue"
                    style={styles.cardIcon}
                  />
                  <Text style={styles.cardName}>{item.title}</Text>
                  <Text style={styles.cardCategory}>{item.category}</Text>
                </View>
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
    color: "#555",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerIcon: {
    padding: 5,
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
  container: {
    paddingHorizontal: 4,
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
});

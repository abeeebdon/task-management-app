import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Feather from "react-native-vector-icons/Feather";
import { data } from "../constants/data"; // Ensure this contains { id, name, category, icon }

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

const HomeScreen = () => {
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {data.slice(0, 5).map((item) => (
            <View key={item.id} style={styles.card}>
              <Feather
                name={item.icon}
                size={28}
                color="blue"
                style={styles.cardIcon}
              />
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
              <Text style={[styles.status, getStatusStyle(item.status)]}>
                {item.status}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* in progress, pending, completed, archived */}
      <View style={styles.recentTasksContainer}>
        <Text style={styles.sectionTitle}>Pending Tasks</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.progressContainer}
        >
          {data.slice(0, 5).map((item) => (
            <View key={item.id} style={styles.card}>
              <Feather
                name={item.icon}
                size={28}
                color="blue"
                style={styles.cardIcon}
              />
              <Text style={styles.cardName}>{item.name}</Text>
              <Text style={styles.cardCategory}>{item.category}</Text>
            </View>
          ))}
        </ScrollView>
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
    borderRadius: 20, // half of width/height
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
    elevation: 3, // Android shadow
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

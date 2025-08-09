import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootNavigationTypes } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";
import FeatherIcon from "react-native-vector-icons/Feather";

// Correctly type the route
type TaskDetailsRouteProp = RouteProp<RootNavigationTypes, "taskDetails">;

// Correctly type the navigation
type NavigationProp = NativeStackNavigationProp<
  RootNavigationTypes,
  "taskDetails"
>;

const TaskDetailsScreen: React.FC = () => {
  const route = useRoute<TaskDetailsRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { title, completionDate, description, status, category, priority } =
    route.params.task;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.titleContainer}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
            <FeatherIcon name="arrow-left" size={24} color="black" />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Completion Date:</Text>
          <Text style={styles.value}>{completionDate}</Text>
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
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flexShrink: 1,
  },
  section: {
    marginBottom: 12,
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
});

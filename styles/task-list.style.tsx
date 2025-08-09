import { StyleSheet } from "react-native";

export const taskListStyles = StyleSheet.create({
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

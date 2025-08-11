import { StyleSheet } from "react-native";
import { Colors } from "../components/constants";

export const taskListStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    padding: 12,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    color: Colors.textDark,
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  meta: {
    fontSize: 14,
    marginTop: 4,
    textTransform: "capitalize",
    color: "#645b5bff",
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
  filterContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
    elevation: 1,
  },
  taskList: {
    flex: 1,
  },
  addButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    marginVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
});

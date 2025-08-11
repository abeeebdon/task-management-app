import { StyleSheet } from "react-native";
import { Colors } from "../components/constants";

export const createTaskStyles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    justifyContent: "space-between",
    flex: 1,
  },
  headContainer: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 16,
    paddingVertical: 20,
    backgroundColor: Colors.primary,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  label: {
    fontWeight: "600",
    fontSize: 16,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
    borderRadius: 6,
    marginTop: 6,
  },
  datePicker: {
    backgroundColor: Colors.primary,
    padding: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  categoriesContainer: {
    flexDirection: "row",
    marginTop: 6,
    gap: 6,
    flexWrap: "wrap",
  },
  categoriesBtn: {
    padding: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 12,
  },
});

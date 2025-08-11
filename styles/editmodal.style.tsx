import { StyleSheet } from "react-native";
import { Colors } from "../components/constants";

export const editModalstyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    color: Colors.primary,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    width: "48%",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
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
    marginBottom: 10,
  },
  dateText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

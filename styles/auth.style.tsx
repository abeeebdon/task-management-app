import { StyleSheet } from "react-native";
import { Colors } from "../components/constants";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    color: "#222",
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 8,
  },

  buttonText: { color: Colors.white, fontSize: 16, textAlign: "center" },
  link: { color: Colors.primary, marginTop: 15, textAlign: "center" },
  error: { color: Colors.error, marginBottom: 10, textAlign: "center" },
});

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
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: Colors.white, fontSize: 16, textAlign: "center" },
  link: { color: Colors.primary, marginTop: 15, textAlign: "center" },
  error: { color: Colors.error, marginBottom: 10, textAlign: "center" },
});

export const signupStyles = StyleSheet.create({
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
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: { color: Colors.white, fontSize: 16, textAlign: "center" },
  link: { color: Colors.primary, marginTop: 15, textAlign: "center" },
  error: { color: Colors.error, marginBottom: 10, textAlign: "center" },
});

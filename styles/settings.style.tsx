import { StyleSheet } from "react-native";
import { Colors } from "../components/constants";

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "space-between",
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
  },
  info: {
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 6,
    color: "#423f46ff",
  },
  infoValue: {
    color: "#2c2828ff",
    fontSize: 20,
    fontWeight: "600", // fixed incorrect "semibold"
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

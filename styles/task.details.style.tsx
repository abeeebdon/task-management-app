import { StyleSheet } from "react-native";

export const taskDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    // padding: 16,
  },
  titleContainer: {
    padding: 16,
    height: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
    gap: 24,
  },
  title: {
    fontSize: 24,
    marginTop: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  section: {
    marginBottom: 12,
    padding: 10,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 16,
  },
  actionBtn: {
    backgroundColor: "#dad1d1ff",
    elevation: 2,
    width: "40%",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  btnText: {
    fontSize: 16,
    textAlign: "center",
    color: "white",
  },
});

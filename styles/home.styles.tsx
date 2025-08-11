import { StyleSheet } from "react-native";
import { Colors } from "../components/constants";

export const homeStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 20,
  },
  welcomeText: {
    fontSize: 22,
    color: "#0b0ffcff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  username: {
    fontSize: 14,
    fontWeight: "medium",
  },
  headerIcon: {
    padding: 6,
    borderWidth: 2,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.primary,
    borderRadius: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  recentTasksContainer: {
    padding: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: Colors.primary,
  },

  contentContainer: {
    paddingRight: 16,
  },
  card: {
    width: 150,
    height: 250,
    backgroundColor: "#4454e9ff",
    borderRadius: 12,
    marginRight: 12,
    shadowColor: "#000",
    elevation: 3,
    justifyContent: "space-between",
    padding: 10,
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
    fontSize: 24,
    marginTop: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  taskContainer: {
    gap: 10,
    padding: 10,
  },
  cardP: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: "white",
    elevation: 2,
    padding: 10,
    borderRadius: 10,
  },
});

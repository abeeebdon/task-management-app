import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import SettingsScreen from "../screens/SettingsScreen";
import TaskNavigation from "./TaskNavigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();
const BottomNNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Create"
        component={CreateTaskScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="plus" color={color} size={size} />
          ),
          tabBarLabel: () => null,
          tabBarStyle: {
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      />

      <Tab.Screen
        name="Tasks"
        component={TaskNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="task" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomNNavigation;

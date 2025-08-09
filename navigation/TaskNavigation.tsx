import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskListScreen from "../screens/TaskListScreen";
import TaskEditScreen from "../screens/TaskEditScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";

const Stack = createNativeStackNavigator();
const TaskNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="taskList" component={TaskListScreen} />
      <Stack.Screen name="taskDetails" component={TaskDetailsScreen} />
      <Stack.Screen name="taskEdit" component={TaskEditScreen} />
    </Stack.Navigator>
  );
};

export default TaskNavigation;

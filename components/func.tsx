import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_KEY = "TASKS_LIST";

export const deleteFunc = async (id: string) => {
  try {
    // Get all stored tasks
    const stored = await AsyncStorage.getItem(TASKS_KEY);
    if (!stored) return;

    const tasks = JSON.parse(stored);

    // Remove the task with the matching id
    const updatedTasks = tasks.filter((task: { id: string }) => task.id !== id);

    // Save updated list
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));

    // Optional: show confirmation
    return "deleted";
  } catch (error) {
    console.error("Error deleting task:", error);
    alert("Failed to delete the task.");
  }
};

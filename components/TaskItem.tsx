import { Text, TouchableOpacity, View } from "react-native";
import ConfirmDeleteModal from "./DeleteModal";
import EditTaskModal from "./EditModal";
import { useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { RootNavigationTypes, Task } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { taskListStyles as styles } from "../styles/task-list.style";

type NavigationProp = NativeStackNavigationProp<RootNavigationTypes>;
const TaskItem: FC<{
  item: Task;
  onSave: (updatedTask: Task) => void;

  onDelete: (id: string) => void;
}> = ({ item, onSave, onDelete }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      style={[
        styles.taskCard,
        {
          backgroundColor:
            item.status.toLowerCase() === "completed" ? "#d4dbeeff" : "#fff",
        },
      ]}
      onPress={() => navigation.navigate("taskDetails", { task: item })}
    >
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.meta}>
          Due: {new Date(item.completionDate).toDateString()}
        </Text>
        <Text style={styles.meta}>Status: {item.status}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TouchableOpacity onPress={() => setEditVisible(true)}>
          <Text style={{ color: "green" }}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setDeleteVisible(true)}>
          <Text style={{ color: "red" }}>Delete</Text>
        </TouchableOpacity>
      </View>

      <EditTaskModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        task={item}
        onSave={onSave}
      />

      <ConfirmDeleteModal
        visible={deleteVisible}
        onCancel={() => setDeleteVisible(false)}
        onConfirm={() => {
          onDelete(item.id);
          setDeleteVisible(false);
        }}
      />
    </TouchableOpacity>
  );
};
export default TaskItem;

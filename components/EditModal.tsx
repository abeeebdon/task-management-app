import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import { Colors } from "./constants";
import Entypo from "react-native-vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Task } from "../types";
import { Picker } from "@react-native-picker/picker";
import { categories } from "./data";

interface EditTaskModalProps {
  visible: boolean;
  onClose: () => void;
  task: Task;
  onSave: (updatedTask: Task) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  visible,
  onClose,
  task,
  onSave,
}) => {
  const [form, setForm] = useState<Task>(task);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field: keyof Task, value: string | Date) => {
    setForm({ ...form, [field]: value as any });
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleChange("completionDate", selectedDate.toISOString());
    }
  };

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Edit Task</Text>

          <TextInput
            style={styles.input}
            placeholder="Title"
            value={form.title}
            onChangeText={(text) => handleChange("title", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={form.description}
            onChangeText={(text) => handleChange("description", text)}
          />
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              {categories.map((cat, i) => (
                <Picker.Item key={i} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
          <Pressable
            style={styles.datePicker}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{form.completionDate}</Text>
            <Entypo name="chevron-small-down" color="white" size={20} />
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={new Date(form.completionDate) || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={handleDateChange}
            />
          )}

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Completed" value="Completed" />
            </Picker>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
              onPress={handleSave}
            >
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "darkred" }]}
              onPress={onClose}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditTaskModal;

const styles = StyleSheet.create({
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

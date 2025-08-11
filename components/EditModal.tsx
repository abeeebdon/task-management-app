import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { editModalstyles as styles } from "../styles/editmodal.style";
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

          {/* Title */}
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task title"
            value={form.title}
            onChangeText={(text) => handleChange("title", text)}
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter task description"
            value={form.description}
            onChangeText={(text) => handleChange("description", text)}
          />

          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              {categories.map((cat, i) => (
                <Picker.Item key={i} label={cat} value={cat} color="#222" />
              ))}
            </Picker>
          </View>

          {/* Completion Date */}
          <Text style={styles.label}>Completion Date</Text>
          <Pressable
            style={styles.datePicker}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {form.completionDate
                ? new Date(form.completionDate).toLocaleDateString()
                : "Select a date"}
            </Text>
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

          {/* Status */}
          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={form.status}
              onValueChange={(value) => handleChange("status", value)}
            >
              <Picker.Item label="Pending" value="pending" />
              <Picker.Item label="Completed" value="completed" />
            </Picker>
          </View>

          {/* Buttons */}
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

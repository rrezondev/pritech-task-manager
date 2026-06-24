import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from "react-native";

import { Task } from "../types/Task";
import { useTasks } from "../hooks/useTasks";

export default function AddTaskScreen({ navigation }: any) {
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert(
        "Validation Error",
        "Task title is required"
      );
      return;
    }

    if (title.trim().length < 3) {
      Alert.alert(
        "Validation Error",
        "Title must contain at least 3 characters"
      );
      return;
    }

    if (!description.trim()) {
      Alert.alert(
        "Validation Error",
        "Description is required"
      );
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addTask(newTask);

    setTitle("");
    setDescription("");

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Task Title
      </Text>

      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />

      <Text style={styles.label}>
        Description
      </Text>

      <TextInput
        style={[styles.input, styles.descriptionInput]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        multiline
      />
      <View
        style={{
          marginTop: 10,
        }}
      >
      </View>
      <Button
        title="Save Task"
        onPress={handleAdd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },

  descriptionInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
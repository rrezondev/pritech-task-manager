import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

import { Task } from "../types/Task";

interface Props {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onDetails: () => void;
}

export default function TaskCard({
  task,
  onDelete,
  onToggle,
  onDetails,
}: Props) {

  return (
  <View style={styles.card}>
    <Text style={styles.title}>
      {task.title}
    </Text>

    <Text style={styles.description}>
      {task.description}
    </Text>

    <Text style={styles.date}>
      📅 {new Date(task.createdAt).toLocaleDateString()}
    </Text>

    <Text
      style={[
        styles.status,
        task.completed
          ? styles.completed
          : styles.pending,
      ]}
    >
      {task.completed
        ? "✅ Completed"
        : "⏳ Pending"}
    </Text>

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Button
        title={
          task.completed
            ? "Undo"
            : "Complete"
        }
        onPress={() => onToggle(task.id)}
      />

      <Button
        title="Details"
        onPress={onDetails}
      />

      <Button
        title="Delete"
        onPress={() => onDelete(task.id)}
      />
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  description: {
    marginBottom: 8,
  },

  date: {
    marginBottom: 8,
    color: "#666",
  },

  status: {
    fontWeight: "bold",
    marginBottom: 12,
  },

  completed: {
    color: "green",
  },

  pending: {
    color: "orange",
  },

  buttonContainer: {
    marginBottom: 8,
  },
});
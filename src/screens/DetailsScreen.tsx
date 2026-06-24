import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function DetailsScreen({ route }: any) {
  const { task } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {task.title}
        </Text>

        <Text style={styles.description}>
          {task.description}
        </Text>

        <Text style={styles.status}>
          {task.completed
            ? "✅ Completed"
            : "⏳ Pending"}
        </Text>

        <Text style={styles.date}>
          📅 {new Date(task.createdAt).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    elevation: 3,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  description: {
    fontSize: 16,
    marginBottom: 15,
  },

  status: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },

  date: {
    color: "#666",
  },
});
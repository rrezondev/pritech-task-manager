import React, { useState } from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";

import TaskCard from "../components/TaskCard";
import { useTasks } from "../hooks/useTasks";
import { Task } from "../types/Task";
import { useThemeContext } from "../context/ThemeContext";

export default function TasksScreen({ navigation }: any) {
  const {
    tasks,
    loading,
    deleteTask,
    toggleTask,
  } = useTasks();

  const { darkMode, setDarkMode } =
    useThemeContext();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const colors = darkMode
    ? {
        background: "#121212",
        card: "#1E1E1E",
        text: "#FFFFFF",
        input: "#2A2A2A",
      }
    : {
        background: "#F5F5F5",
        card: "#FFFFFF",
        text: "#000000",
        input: "#FFFFFF",
      };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const filteredTasks = tasks.filter(
    (task: Task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all"
          ? true
          : filter === "completed"
          ? task.completed
          : !task.completed;

      return (
        matchesSearch &&
        matchesFilter
      );
    }
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor:
          colors.background,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent:
            "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Dark Mode
        </Text>

        <Switch
          value={darkMode}
          onValueChange={
            setDarkMode
          }
        />
      </View>

      <TextInput
        placeholder="Search tasks..."
        placeholderTextColor={
          darkMode
            ? "#999"
            : "#666"
        }
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor:
            colors.input,
          color: colors.text,
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          margin: 10,
          borderRadius: 12,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent:
            "space-around",
          marginBottom: 15,
        }}
      >
        {[
          "all",
          "completed",
          "pending",
        ].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() =>
              setFilter(item)
            }
            style={{
              paddingVertical: 10,
              paddingHorizontal: 18,
              borderRadius: 20,
              backgroundColor:
                filter === item
                  ? "#2563EB"
                  : "#D1D5DB",
            }}
          >
            <Text
              style={{
                color:
                  filter === item
                    ? "#fff"
                    : "#000",
                fontWeight:
                  "600",
              }}
            >
              {item
                .charAt(0)
                .toUpperCase() +
                item.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) =>
          item.id
        }
        ListEmptyComponent={
          <Text
            style={{
              textAlign: "center",
              marginTop: 50,
              fontSize: 18,
              color: colors.text,
            }}
          >
            No tasks found.
            Create your first task.
          </Text>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onDetails={() =>
              navigation.navigate(
                "Details",
                {
                  task: item,
                }
              )
            }
          />
        )}
      />

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "AddTask"
          )
        }
        style={{
          position: "absolute",
          bottom: 25,
          right: 25,
          width: 65,
          height: 65,
          borderRadius: 35,
          backgroundColor:
            "#2563EB",
          justifyContent:
            "center",
          alignItems: "center",
          elevation: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
}
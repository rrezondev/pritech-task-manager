import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Task } from "../types/Task";

import {
  getTasks,
  saveTasks,
} from "../storage/storage";

import {
  fetchTasks,
} from "../services/api";

const TaskContext = createContext<any>(null);

export const TaskProvider = ({
  children,
}: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const saved = await getTasks();

      if (saved.length > 0) {
        setTasks(saved);
      } else {
        const api = await fetchTasks();

        setTasks(api);

        await saveTasks(api);
      }
    } catch (error) {
      console.log("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = (task: Task) => {
    setTasks((prev) => {
      const updated = [
        task,
        ...prev,
      ];

      saveTasks(updated);

      return updated;
    });
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.filter(
        (task) => task.id !== id
      );

      saveTasks(updated);

      return updated;
    });
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => {
      const updated = prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      );

      saveTasks(updated);

      return updated;
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        deleteTask,
        toggleTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
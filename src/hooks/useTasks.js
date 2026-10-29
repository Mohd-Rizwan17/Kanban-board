import { useEffect, useState } from "react";
import { STORAGE_KEY } from "../utils/constants";

const loadTasks = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

export default function useTasks() {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (data) => {
    const newTask = {
      ...data,
      id: crypto.randomUUID(),
      status: "todo",
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id, data) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...data } : task)),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (id, status) => updateTask(id, { status });

  return { tasks, addTask, updateTask, deleteTask, moveTask };
}

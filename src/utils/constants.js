import { Archive, CircleCheck, Clock, ListTodo } from "lucide-react";

export const STATUSES = [
  {
    value: "todo",
    label: "Todo",
    icon: ListTodo,
    accent: "bg-blue-100 text-brand-blue",
  },
  {
    value: "in-progress",
    label: "In Progress",
    icon: Clock,
    accent: "bg-amber-100 text-amber-600",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CircleCheck,
    accent: "bg-emerald-100 text-emerald-600",
  },
  {
    value: "backlog",
    label: "Backlog",
    icon: Archive,
    accent: "bg-violet-100 text-brand-violet",
  },
];

export const PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const STORAGE_KEY = "kanban-tasks";

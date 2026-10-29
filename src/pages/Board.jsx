import { useEffect, useRef, useState } from "react";
import { ClipboardList, SearchX } from "lucide-react";
import useTasks from "../hooks/useTasks";
import { STATUSES } from "../utils/constants";
import Toolbar from "../components/Toolbar";
import Column from "../components/Column";
import TaskModal from "../components/TaskModal";
import DeleteModal from "../components/DeleteModal";
import EmptyState from "../components/EmptyState";
import Toast from "../components/Toast";

export default function Board() {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTasks();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const showToast = (message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 2500);
  };

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || task.priority === priorityFilter;
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleSave = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
      showToast("Task updated");
    } else {
      addTask(data);
      showToast("Task added");
    }
    closeModal();
  };

  const confirmDelete = () => {
    deleteTask(deletingTask.id);
    setDeletingTask(null);
    showToast("Task deleted");
  };

  const clearFilters = () => {
    setSearch("");
    setPriorityFilter("all");
    setStatusFilter("all");
  };

  const searchText = search.trim();

  return (
    <>
      <Toolbar
        search={search}
        onSearchChange={setSearch}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onAdd={openAddModal}
      />

      {tasks.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No tasks yet"
          message="Create your first task to get started."
          actionLabel="Add task"
          onAction={openAddModal}
        />
      ) : visibleTasks.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No matching tasks"
          message={
            searchText
              ? `Nothing found for "${searchText}". Try a different search or clear the filters.`
              : "No task matches the selected filters."
          }
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {STATUSES.map((status) => (
            <Column
              key={status.value}
              status={status}
              tasks={visibleTasks.filter(
                (task) => task.status === status.value,
              )}
              onEdit={openEditModal}
              onDelete={setDeletingTask}
              onMove={moveTask}
            />
          ))}
        </div>
      )}

      {isModalOpen && (
        <TaskModal
          key={editingTask?.id ?? "new"}
          task={editingTask}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {deletingTask && (
        <DeleteModal
          task={deletingTask}
          onConfirm={confirmDelete}
          onClose={() => setDeletingTask(null)}
        />
      )}

      <Toast message={toast} />
    </>
  );
}

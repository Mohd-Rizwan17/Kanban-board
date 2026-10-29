import { useState } from "react";
import TaskCard from "./TaskCard";

export default function Column({ status, tasks, onEdit, onDelete, onMove }) {
  const [isOver, setIsOver] = useState(false);
  const Icon = status.icon;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOver(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) onMove(id, status.value);
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      aria-label={status.label}
      className={`glass min-w-0 rounded-2xl p-3 transition ${
        isOver ? "ring-2 ring-brand-blue/50" : ""
      }`}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${status.accent}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 className="font-semibold">{status.label}</h2>
        </div>
        <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-xs font-medium">
          {tasks.length}
        </span>
      </div>

      <div className="flex min-h-24 flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 py-6 text-center text-sm text-muted">
            No tasks here
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))
        )}
      </div>
    </section>
  );
}

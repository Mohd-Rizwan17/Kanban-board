import { useState } from "react";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { STATUSES } from "../utils/constants";
import Select from "./Select";

const priorityStyles = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function TaskCard({ task, onEdit, onDelete, onMove }) {
  const [isDragging, setIsDragging] = useState(false);

  const today = new Date().toLocaleDateString("en-CA");
  const isOverdue = task.status !== "completed" && task.dueDate < today;

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", task.id);
    e.dataTransfer.effectAllowed = "move";
    setIsDragging(true);
  };

  return (
    <article
      draggable
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
      className={`cursor-grab rounded-2xl border border-white bg-white/85 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <span
        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${priorityStyles[task.priority]}`}
      >
        {task.priority}
      </span>

      <h3 className="mt-2 break-words font-semibold">{task.title}</h3>

      {task.description && (
        <p className="mt-1 break-words text-sm leading-relaxed text-ink/75">
          {task.description}
        </p>
      )}

      <p
        className={`mt-3 flex items-center gap-1.5 text-xs ${
          isOverdue ? "font-medium text-rose-600" : "text-muted"
        }`}
      >
        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
        {formatDate(task.dueDate)}
        {isOverdue && <span>· Overdue</span>}
      </p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <Select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
          aria-label={`Change status of ${task.title}`}
          wrapperClass="w-36"
          className="py-1.5 text-xs"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>

        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            aria-label={`Edit ${task.title}`}
            className="rounded-lg p-2 text-brand-blue transition hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
          >
            <Pencil className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => onDelete(task)}
            aria-label={`Delete ${task.title}`}
            className="rounded-lg p-2 text-rose-500 transition hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

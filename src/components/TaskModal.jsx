import { useState } from "react";
import { X } from "lucide-react";
import { PRIORITIES } from "../utils/constants";
import Modal from "./Modal";
import Select from "./Select";

const emptyForm = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

const inputClass =
  "w-full rounded-xl border bg-white/80 px-3 py-2.5 text-sm text-ink placeholder:text-muted transition focus:outline-none focus:ring-2 focus:ring-brand-blue/30";

export default function TaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState(
    task
      ? {
          title: task.title,
          description: task.description,
          priority: task.priority,
          dueDate: task.dueDate,
        }
      : emptyForm,
  );
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const title = form.title.trim();

    if (!title) {
      newErrors.title = "Title is required";
    } else if (title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!form.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
    });
  };

  return (
    <Modal onClose={onClose} labelId="task-modal-title">
      <form onSubmit={handleSubmit} noValidate className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="task-modal-title" className="text-lg font-semibold">
            {task ? "Edit Task" : "Add New Task"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-muted transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1 block text-sm font-medium"
            >
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              id="task-title"
              name="title"
              value={form.title}
              onChange={handleChange}
              maxLength={80}
              autoFocus
              placeholder="Enter task title..."
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "task-title-error" : undefined}
              className={`${inputClass} ${
                errors.title ? "border-rose-400" : "border-slate-200"
              }`}
            />
            {errors.title && (
              <p id="task-title-error" className="mt-1 text-xs text-rose-600">
                {errors.title}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-1 block text-sm font-medium"
            >
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter task description..."
              className={`${inputClass} border-slate-200`}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="task-priority"
                className="mb-1 block text-sm font-medium"
              >
                Priority
              </label>
              <Select
                id="task-priority"
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="py-2.5"
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label
                htmlFor="task-due-date"
                className="mb-1 block text-sm font-medium"
              >
                Due date <span className="text-rose-500">*</span>
              </label>
              <input
                id="task-due-date"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? "task-due-error" : undefined}
                className={`${inputClass} ${
                  errors.dueDate ? "border-rose-400" : "border-slate-200"
                }`}
              />
              {errors.dueDate && (
                <p id="task-due-error" className="mt-1 text-xs text-rose-600">
                  {errors.dueDate}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm text-muted transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-blue/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 active:scale-95"
          >
            {task ? "Save Changes" : "Add Task"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

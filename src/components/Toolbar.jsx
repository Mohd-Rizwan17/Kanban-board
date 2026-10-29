import { useEffect, useRef } from "react";
import { Plus, Search } from "lucide-react";
import { PRIORITIES, STATUSES } from "../utils/constants";
import Select from "./Select";

export default function Toolbar({
  search,
  onSearchChange,
  priorityFilter,
  onPriorityChange,
  statusFilter,
  onStatusChange,
  onAdd,
}) {
  const searchRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative lg:flex-1">
        <Search
          aria-hidden="true"
          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        />
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title..."
          aria-label="Search tasks by title"
          className="glass w-full rounded-xl py-2.5 pl-10 pr-16 text-sm text-ink placeholder:text-muted transition focus:outline-none focus:ring-2 focus:ring-brand-blue/40"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md bg-white/70 px-1.5 py-0.5 text-xs text-muted md:block">
          Ctrl K
        </kbd>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:flex">
        <Select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value)}
          aria-label="Filter by priority"
          wrapperClass="lg:w-44"
          className="py-2.5"
        >
          <option value="all">All priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </Select>

        <Select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          aria-label="Filter by status"
          wrapperClass="lg:w-44"
          className="py-2.5"
        >
          <option value="all">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </div>

      <button
        onClick={onAdd}
        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-blue/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 active:scale-95"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add task
      </button>
    </div>
  );
}

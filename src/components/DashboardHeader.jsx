import { ListChecks } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="glass sticky top-3 z-10 flex items-center justify-between rounded-2xl px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-violet text-white shadow-md">
          <ListChecks className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-lg font-semibold leading-tight">Kanban Board</h1>
          <p className="text-xs text-muted">Plan. Track. Get Things Done.</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-brand-pink text-xs font-semibold text-white">
            U
        </span>
        <span className="hidden text-sm font-medium sm:block">User</span>
      </div>
    </header>
  );
}

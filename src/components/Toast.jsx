import { CircleCheck } from "lucide-react";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="glass fixed bottom-4 right-4 z-30 flex animate-pop items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
    >
      <CircleCheck className="h-4 w-4 text-emerald-500" aria-hidden="true" />
      {message}
    </div>
  );
}

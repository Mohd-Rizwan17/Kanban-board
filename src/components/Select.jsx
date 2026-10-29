import { ChevronDown } from "lucide-react";

export default function Select({
  className = "",
  wrapperClass = "",
  children,
  ...props
}) {
  return (
    <div className={`relative ${wrapperClass}`}>
      <select
        {...props}
        className={`w-full appearance-none rounded-xl border border-slate-200 bg-white/80 py-2 pl-3 pr-8 text-sm text-ink transition focus:outline-none focus:ring-2 focus:ring-brand-blue/40 ${className}`}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
}

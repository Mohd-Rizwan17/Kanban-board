export default function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  onAction,
}) {
  return (
    <div className="glass mt-10 rounded-2xl border-dashed py-16 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-brand-blue">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="mx-auto mt-1 max-w-sm px-4 text-sm text-ink/75">
        {message}
      </p>
      <button
        onClick={onAction}
        className="mt-5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-violet px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-blue/30 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50 active:scale-95"
      >
        {actionLabel}
      </button>
    </div>
  );
}

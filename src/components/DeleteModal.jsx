import { TriangleAlert } from "lucide-react";
import Modal from "./Modal";

export default function DeleteModal({ task, onConfirm, onClose }) {
  return (
    <Modal onClose={onClose} labelId="delete-title" className="max-w-sm">
      <div className="p-6">
        <div className="flex gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            <TriangleAlert className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 id="delete-title" className="text-lg font-semibold">
              Delete Task?
            </h2>
            <p className="mt-1 break-words text-sm text-ink/75">
              "{task.title}" will be removed. This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-rose-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-rose-500/30 transition hover:bg-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

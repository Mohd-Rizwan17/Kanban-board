import { useEffect } from "react";

export default function Modal({
  onClose,
  labelId,
  className = "max-w-md",
  children,
}) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-20 flex animate-fade items-center justify-center bg-ink/30 p-4 backdrop-blur-sm"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        onClick={(e) => e.stopPropagation()}
        className={`max-h-full w-full animate-pop overflow-y-auto rounded-[20px] border border-white bg-white/90 shadow-2xl backdrop-blur-xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

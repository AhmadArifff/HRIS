"use client";
import React, { useEffect } from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-5 right-5 z-[200000] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onClose: (id: string) => void }> = ({
  toast,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const typeStyles = {
    success: "bg-white dark:bg-slate-900 border-emerald-500/40 text-emerald-900 dark:text-emerald-300 shadow-emerald-500/10",
    error: "bg-white dark:bg-slate-900 border-rose-500/40 text-rose-900 dark:text-rose-300 shadow-rose-500/10",
    warning: "bg-white dark:bg-slate-900 border-amber-500/40 text-amber-900 dark:text-amber-300 shadow-amber-500/10",
    info: "bg-white dark:bg-slate-900 border-brand-500/40 text-brand-900 dark:text-brand-300 shadow-brand-500/10",
  };

  const iconMap = {
    success: (
      <div className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-sm shrink-0">
        ✓
      </div>
    ),
    error: (
      <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-sm shrink-0">
        ✕
      </div>
    ),
    warning: (
      <div className="w-7 h-7 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-sm shrink-0">
        ⚠️
      </div>
    ),
    info: (
      <div className="w-7 h-7 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold text-sm shrink-0">
        ℹ️
      </div>
    ),
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl transition-all duration-300 animate-slide-in ${typeStyles[toast.type]}`}
    >
      {iconMap[toast.type]}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold leading-snug">{toast.title}</h4>
        <p className="text-[11px] opacity-90 leading-tight mt-0.5">{toast.message}</p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs font-bold p-1 rounded-md transition"
      >
        ✕
      </button>
    </div>
  );
};

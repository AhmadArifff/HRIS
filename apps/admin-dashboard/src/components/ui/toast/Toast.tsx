"use client";
import React, { useEffect } from "react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onClose }) => {
  return (
    <>
      {/* Keyframe animation for progress strip */}
      <style jsx global>{`
        @keyframes toastProgressStrip {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
      <div className="fixed top-5 right-5 z-[200000] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={onClose} />
        ))}
      </div>
    </>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onClose: (id: string) => void }> = ({
  toast,
  onClose,
}) => {
  const DURATION_MS = 4000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";
  const isWarning = toast.type === "warning";

  const stripBgColor = isSuccess
    ? "bg-emerald-500"
    : isError
    ? "bg-rose-500"
    : isWarning
    ? "bg-amber-500"
    : "bg-brand-500";

  return (
    <div
      className={`pointer-events-auto relative overflow-hidden flex items-start gap-3 p-4 pb-5 rounded-2xl border shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-x-0 ${
        isSuccess
          ? "bg-white/95 dark:bg-gray-900/95 border-emerald-500/30 text-gray-900 dark:text-white shadow-emerald-500/10"
          : isError
          ? "bg-white/95 dark:bg-gray-900/95 border-rose-500/30 text-gray-900 dark:text-white shadow-rose-500/10"
          : isWarning
          ? "bg-white/95 dark:bg-gray-900/95 border-amber-500/30 text-gray-900 dark:text-white shadow-amber-500/10"
          : "bg-white/95 dark:bg-gray-900/95 border-brand-500/30 text-gray-900 dark:text-white shadow-brand-500/10"
      }`}
    >
      {/* Icon */}
      <div className="shrink-0 pt-0.5">
        {isSuccess && (
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold text-sm">
            ✓
          </div>
        )}
        {isError && (
          <div className="w-8 h-8 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center font-bold text-sm">
            ✕
          </div>
        )}
        {isWarning && (
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold text-sm">
            ⚠️
          </div>
        )}
        {!isSuccess && !isError && !isWarning && (
          <div className="w-8 h-8 rounded-xl bg-brand-500/10 dark:bg-brand-500/20 text-brand-500 flex items-center justify-center font-bold text-sm">
            ℹ
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-xs font-bold leading-tight mb-0.5">{toast.title}</h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{toast.message}</p>
      </div>

      {/* Close button */}
      <button
        onClick={() => onClose(toast.id)}
        className="shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xs p-1"
      >
        ✕
      </button>

      {/* Limit Progress Strip Bar Line (Countdown Animation 100% -> 0%) */}
      <div
        className={`absolute bottom-0 left-0 h-1.5 ${stripBgColor} rounded-b-2xl`}
        style={{
          animation: `toastProgressStrip ${DURATION_MS}ms linear forwards`,
        }}
      />
    </div>
  );
};

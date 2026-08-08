"use client";
import React from "react";

export const TicketStatsCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Total Tickets */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400 flex-shrink-0">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.5c-1.2 0-2.25-.65-2.79-1.63L16 6.5h1.5v2H20V8.5z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
            5,347
          </h3>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Total tickets
          </p>
        </div>
      </div>

      {/* Pending Tickets */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400 flex-shrink-0">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V18H8v-1.5l4-4 4 4zM16 6V7.5l-4 4-4-4V6h8z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
            1,230
          </h3>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Pending tickets
          </p>
        </div>
      </div>

      {/* Solved Tickets */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400 flex-shrink-0">
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
            4,117
          </h3>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Solved tickets
          </p>
        </div>
      </div>
    </div>
  );
};

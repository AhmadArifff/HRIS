"use client";
import React from "react";

export const TicketHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-6 border-b border-gray-100 dark:border-gray-800">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Ticket #346520 - Sidebar not responsive on mobile
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Mon, 3:20 PM (2 days ago)
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          4 of 120
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

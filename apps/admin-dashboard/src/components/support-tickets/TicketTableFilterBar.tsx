"use client";
import React from "react";

interface TicketTableFilterBarProps {
  activeTab: "All" | "Solved" | "Pending";
  onTabChange: (tab: "All" | "Solved" | "Pending") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const TicketTableFilterBar: React.FC<TicketTableFilterBarProps> = ({
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between p-5 border-b border-gray-100 dark:border-gray-800">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Support Tickets
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Your most recent support tickets list
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {/* Filter Tabs */}
        <div className="flex items-center rounded-xl bg-gray-100/70 p-1 dark:bg-gray-800">
          {(["All", "Solved", "Pending"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-xs dark:bg-gray-900 dark:text-white"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-56 rounded-xl border border-gray-200 bg-gray-50/80 pl-9 pr-4 py-2 text-xs text-gray-800 outline-none focus:border-brand-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-white dark:focus:border-brand-500 transition"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        {/* Filter Action Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition shadow-xs"
        >
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
      </div>
    </div>
  );
};

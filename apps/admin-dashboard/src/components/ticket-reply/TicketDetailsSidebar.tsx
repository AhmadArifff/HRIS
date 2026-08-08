"use client";
import React from "react";

interface TicketDetailsSidebarProps {
  customer: string;
  email: string;
  ticketId: string;
  category: string;
  created: string;
  status: "In-Progress" | "Solved" | "On-Hold";
}

export const TicketDetailsSidebar: React.FC<TicketDetailsSidebarProps> = ({
  customer,
  email,
  ticketId,
  category,
  created,
  status,
}) => {
  const getStatusBadge = (st: string) => {
    switch (st) {
      case "In-Progress":
        return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
      case "Solved":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "On-Hold":
      default:
        return "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="text-base font-bold text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-gray-800">
        Ticket Details
      </h3>

      <div className="mt-6 space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800/60">
          <span className="text-gray-500 dark:text-gray-400">Customer</span>
          <span className="font-bold text-gray-900 dark:text-white">{customer}</span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800/60">
          <span className="text-gray-500 dark:text-gray-400">Email</span>
          <span className="font-medium text-gray-800 dark:text-gray-200 truncate max-w-[170px]">{email}</span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800/60">
          <span className="text-gray-500 dark:text-gray-400">Ticket ID</span>
          <span className="font-bold text-gray-900 dark:text-white">{ticketId}</span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800/60">
          <span className="text-gray-500 dark:text-gray-400">Category</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{category}</span>
        </div>

        <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800/60">
          <span className="text-gray-500 dark:text-gray-400">Created</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{created}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-gray-500 dark:text-gray-400">Status</span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadge(
              status
            )}`}
          >
            {status === "In-Progress" ? "In Progress" : status}
          </span>
        </div>
      </div>
    </div>
  );
};

"use client";
import React, { useState } from "react";

export interface TicketItem {
  id: string;
  requestedBy: {
    name: string;
    email: string;
  };
  subject: string;
  createDate: string;
  status: "Solved" | "Pending";
}

interface TicketDataTableProps {
  tickets: TicketItem[];
}

export const TicketDataTable: React.FC<TicketDataTableProps> = ({ tickets }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleSelectAll = () => {
    if (selectedIds.length === tickets.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(tickets.map((t) => t.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-50/50 text-[11px] font-semibold text-gray-500 uppercase tracking-wider dark:bg-gray-800/40 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
          <tr>
            <th className="p-4 w-10">
              <input
                type="checkbox"
                checked={tickets.length > 0 && selectedIds.length === tickets.length}
                onChange={toggleSelectAll}
                className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900"
              />
            </th>
            <th className="p-4">Ticket ID</th>
            <th className="p-4">
              <div className="flex items-center gap-1 cursor-pointer select-none">
                Requested By
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
            </th>
            <th className="p-4">Subject</th>
            <th className="p-4">
              <div className="flex items-center gap-1 cursor-pointer select-none">
                Create Date
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
            </th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
          {tickets.map((ticket) => {
            const isSelected = selectedIds.includes(ticket.id);
            return (
              <tr
                key={ticket.id}
                className={`hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition ${
                  isSelected ? "bg-brand-50/30 dark:bg-brand-500/5" : ""
                }`}
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelectRow(ticket.id)}
                    className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900"
                  />
                </td>

                <td className="p-4 font-bold text-gray-900 dark:text-white">
                  {ticket.id}
                </td>

                <td className="p-4">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {ticket.requestedBy.name}
                  </div>
                  <div className="text-[11px] text-gray-400">
                    {ticket.requestedBy.email}
                  </div>
                </td>

                <td className="p-4 font-medium text-gray-800 dark:text-gray-200">
                  {ticket.subject}
                </td>

                <td className="p-4 text-gray-500 dark:text-gray-400">
                  {ticket.createDate}
                </td>

                <td className="p-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      ticket.status === "Solved"
                        ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>

                <td className="p-4 text-right relative">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === ticket.id ? null : ticket.id)
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>

                  {activeDropdown === ticket.id && (
                    <div className="absolute right-4 mt-1 w-36 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900 z-20 text-left">
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(null)}
                        className="w-full rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
                      >
                        View Ticket
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(null)}
                        className="w-full rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
                      >
                        Reply Ticket
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveDropdown(null)}
                        className="w-full rounded-lg px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 transition"
                      >
                        Close Ticket
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Showing 1 to {tickets.length} of 12
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 transition disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
              currentPage === 1
                ? "bg-brand-500 text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            }`}
          >
            1
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition ${
              currentPage === 2
                ? "bg-brand-500 text-white"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
            }`}
          >
            2
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

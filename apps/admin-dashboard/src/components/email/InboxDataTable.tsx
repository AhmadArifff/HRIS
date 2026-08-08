"use client";
import React, { useState } from "react";
import Link from "next/link";

export interface EmailItem {
  id: string;
  sender: string;
  snippet: string;
  badge?: {
    text: string;
    color: "red" | "green" | "blue";
  };
  time: string;
  starred?: boolean;
}

interface InboxDataTableProps {
  emails: EmailItem[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

export const InboxDataTable: React.FC<InboxDataTableProps> = ({
  emails,
  selectedIds,
  onToggleSelect,
}) => {
  const [starredIds, setStarredIds] = useState<string[]>(["1"]);

  const toggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (starredIds.includes(id)) {
      setStarredIds(starredIds.filter((i) => i !== id));
    } else {
      setStarredIds([...starredIds, id]);
    }
  };

  const getBadgeStyle = (color: "red" | "green" | "blue") => {
    switch (color) {
      case "red":
        return "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400";
      case "green":
        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
      case "blue":
      default:
        return "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-between">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-700 dark:text-gray-300">
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {emails.map((email) => {
              const isSelected = selectedIds.includes(email.id);
              const isStarred = starredIds.includes(email.id);

              return (
                <tr
                  key={email.id}
                  className={`group cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/40 transition ${
                    isSelected ? "bg-brand-50/30 dark:bg-brand-500/5" : ""
                  }`}
                >
                  <td className="p-4 w-10" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleSelect(email.id)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </td>

                  <td className="py-4 pr-3 w-8" onClick={(e) => toggleStar(e, email.id)}>
                    <svg
                      className={`w-4 h-4 transition ${
                        isStarred
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300 hover:text-amber-400 dark:text-gray-600"
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </td>

                  <td className="p-4 w-44 font-bold text-gray-900 dark:text-white truncate">
                    <Link href="/inbox-details" className="block truncate">
                      {email.sender}
                    </Link>
                  </td>

                  <td className="p-4">
                    <Link href="/inbox-details" className="flex items-center gap-3">
                      <span className="text-gray-600 dark:text-gray-300 truncate max-w-md sm:max-w-xl">
                        {email.snippet}
                      </span>
                      {email.badge && (
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold flex-shrink-0 ${getBadgeStyle(
                            email.badge.color
                          )}`}
                        >
                          {email.badge.text}
                        </span>
                      )}
                    </Link>
                  </td>

                  <td className="p-4 text-right whitespace-nowrap text-[11px] text-gray-400 w-28">
                    {email.time}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Showing 1 of 159
        </p>

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

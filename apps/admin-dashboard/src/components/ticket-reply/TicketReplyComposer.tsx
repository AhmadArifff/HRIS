"use client";
import React, { useState } from "react";

interface TicketReplyComposerProps {
  onSendReply: (replyText: string) => void;
  status: "In-Progress" | "Solved" | "On-Hold";
  onStatusChange: (status: "In-Progress" | "Solved" | "On-Hold") => void;
}

export const TicketReplyComposer: React.FC<TicketReplyComposerProps> = ({
  onSendReply,
  status,
  onStatusChange,
}) => {
  const [replyText, setReplyText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onSendReply(replyText.trim());
    setReplyText("");
  };

  return (
    <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-5">
      {/* Textarea Composer Card */}
      <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-gray-900/60">
        <textarea
          rows={4}
          placeholder="Type your reply here..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="w-full text-xs text-gray-800 outline-none bg-transparent dark:text-white placeholder-gray-400 resize-none"
        />

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            Attach
          </button>

          <button
            type="submit"
            className="rounded-xl bg-brand-500 px-6 py-2.5 text-xs font-medium text-white hover:bg-brand-600 transition shadow-theme-xs"
          >
            Reply
          </button>
        </div>
      </form>

      {/* Status Radio Selector */}
      <div className="flex items-center gap-4 text-xs font-medium text-gray-600 dark:text-gray-300">
        <span className="text-gray-500 dark:text-gray-400 font-semibold">Status:</span>

        {(["In-Progress", "Solved", "On-Hold"] as const).map((item) => (
          <label key={item} className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="ticket-status"
              checked={status === item}
              onChange={() => onStatusChange(item)}
              className="h-4 w-4 text-brand-500 focus:ring-brand-500 border-gray-300 dark:border-gray-700 dark:bg-gray-900"
            />
            <span className={status === item ? "font-bold text-gray-900 dark:text-white" : ""}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

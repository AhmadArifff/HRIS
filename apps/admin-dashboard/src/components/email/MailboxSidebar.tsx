"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComposeModal } from "./ComposeModal";

export const MailboxSidebar: React.FC = () => {
  const pathname = usePathname();
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const isInboxActive = pathname === "/inbox" || pathname === "/inbox-details";

  return (
    <div className="flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Compose Button */}
      <button
        type="button"
        onClick={() => setIsComposeOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-xs font-semibold text-white hover:bg-brand-600 transition shadow-theme-xs mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Compose
      </button>

      <div className="space-y-6 overflow-y-auto pr-1 no-scrollbar flex-1 max-h-[640px]">
        {/* MAILBOX SECTION */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 px-3">
            MAILBOX
          </h4>
          <ul className="space-y-1">
            <li>
              <Link
                href="/inbox"
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                  isInboxActive
                    ? "bg-brand-50/70 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 font-bold"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M20 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  Inbox
                </div>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                  3
                </span>
              </Link>
            </li>

            <li>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Sent
                </div>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Drafts
                </div>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Spam
                </div>
                <span className="text-[11px] font-bold text-gray-400">2</span>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Trash
                </div>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  Archive
                </div>
              </button>
            </li>
          </ul>
        </div>

        {/* FILTER SECTION */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 px-3">
            FILTER
          </h4>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Starred
                </div>
              </button>
            </li>

            <li>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 7h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z" />
                  </svg>
                  Important
                </div>
              </button>
            </li>
          </ul>
        </div>

        {/* LABEL SECTION */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-3 px-3">
            LABEL
          </h4>
          <ul className="space-y-1 text-xs font-medium text-gray-700 dark:text-gray-300">
            <li>
              <button type="button" className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Personal
              </button>
            </li>
            <li>
              <button type="button" className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                Work
              </button>
            </li>
            <li>
              <button type="button" className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                Payments
              </button>
            </li>
            <li>
              <button type="button" className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                Invoices
              </button>
            </li>
            <li>
              <button type="button" className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                Blank
              </button>
            </li>
          </ul>
        </div>
      </div>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSend={() => setIsComposeOpen(false)}
      />
    </div>
  );
};

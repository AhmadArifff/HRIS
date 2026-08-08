"use client";
import React from "react";

export const OrderHistoryCard: React.FC = () => {
  const handleResend = () => alert("Receipt email resent.");
  const handleForward = () => alert("Receipt forwarded.");
  const handlePreview = () => alert("Previewing email receipt.");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
        Order History
      </h3>

      <div className="relative space-y-6 pl-2">
        {/* Timeline item 1 */}
        <div className="relative flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.04199 4C2.48971 4 2.04199 4.44772 2.04199 5C2.04199 5.55228 2.48971 6 3.04199 6H4.25866L6.25866 14C6.44784 14.7567 7.13066 15.2857 7.90866 15.2857H15.042C15.7725 15.2857 16.4258 14.8118 16.6578 14.1157L18.9078 7.36571C19.1214 6.72491 18.6441 6 17.9678 6H6.75866L6.25866 4H3.04199ZM7.25866 8H16.892L15.2253 13H8.50866L7.25866 8Z"/>
            </svg>
          </div>
          <div className="flex flex-1 justify-between text-sm">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Checkout Started</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">via adminarif.dev</p>
            </div>
            <div className="text-right text-xs text-gray-400 dark:text-gray-500">
              <p>12:54</p>
              <p>12th Apr 28</p>
            </div>
          </div>
        </div>

        {/* Timeline item 2 */}
        <div className="relative flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3 4C2.44772 4 2 4.44772 2 5V15C2 15.5523 2.44772 16 3 16H17C17.5523 16 18 15.5523 18 15V5C18 4.44772 17.5523 4 17 4H3ZM3.5 5.5H16.5V7.5H3.5V5.5ZM3.5 10H7.5V11.5H3.5V10ZM3.5 13H16.5V14.5H3.5V13Z"/>
            </svg>
          </div>
          <div className="flex flex-1 justify-between text-sm">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Purchased</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">for US$4,235 via PayPal</p>
            </div>
            <div className="text-right text-xs text-gray-400 dark:text-gray-500">
              <p>12:58</p>
              <p>12th Apr 28</p>
            </div>
          </div>
        </div>

        {/* Timeline item 3 */}
        <div className="relative flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3 4C2.44772 4 2 4.44772 2 5V15C2 15.5523 2.44772 16 3 16H17C17.5523 16 18 15.5523 18 15V5C18 4.44772 17.5523 4 17 4H3ZM3.61803 5.5L10 9.75464L16.382 5.5H3.61803ZM16.5 6.88197L10.382 10.9607C10.1501 11.1153 9.8499 11.1153 9.61803 10.9607L3.5 6.88197V14.5H16.5V6.88197Z"/>
            </svg>
          </div>
          <div className="flex flex-1 justify-between text-sm">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Receipt Email Sent</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receipt #1734535</p>
            </div>
            <div className="text-right text-xs text-gray-400 dark:text-gray-500">
              <p>12:58</p>
              <p>12th Apr 28</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end gap-2 border-t border-gray-100 pt-5 dark:border-gray-800">
        <button
          type="button"
          onClick={handleResend}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
        >
          Resend
        </button>

        <button
          type="button"
          onClick={handleForward}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
        >
          Forward
        </button>

        <button
          type="button"
          onClick={handlePreview}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
        >
          Preview
        </button>
      </div>
    </div>
  );
};

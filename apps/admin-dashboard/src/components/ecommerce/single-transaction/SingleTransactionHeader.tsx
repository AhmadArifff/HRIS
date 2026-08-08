"use client";
import React, { useState } from "react";

interface SingleTransactionHeaderProps {
  orderId?: string;
  dueDate?: string;
  status?: "Completed" | "Pending" | "Failed";
  onViewReceipt?: () => void;
  onRefund?: () => void;
}

export const SingleTransactionHeader: React.FC<SingleTransactionHeaderProps> = ({
  orderId = "#34834",
  dueDate = "25 August 2025",
  status = "Completed",
  onViewReceipt,
  onRefund,
}) => {
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const handleReceiptClick = () => {
    if (onViewReceipt) {
      onViewReceipt();
    } else {
      setIsReceiptOpen(true);
    }
  };

  const handleRefundClick = () => {
    if (onRefund) {
      onRefund();
    } else {
      alert(`Refund initiated for Order ${orderId}.`);
    }
  };

  return (
    <>
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">
              Order ID : <span className="font-bold">{orderId}</span>
            </h3>

            <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
              {status}
            </span>

            <span className="text-gray-300 dark:text-gray-700">|</span>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Due date: <span className="font-medium text-gray-700 dark:text-gray-300">{dueDate}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReceiptClick}
              className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              View Receipt
            </button>

            <button
              type="button"
              onClick={handleRefundClick}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
            >
              Refund
            </button>
          </div>
        </div>
      </div>

      {/* Receipt Modal */}
      {isReceiptOpen && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Transaction Receipt
              </h3>
              <button
                type="button"
                onClick={() => setIsReceiptOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                &times;
              </button>
            </div>

            <div className="py-5 space-y-4 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-500">Order ID:</span>
                <span className="font-semibold text-gray-900 dark:text-white">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status:</span>
                <span className="font-semibold text-success-600 dark:text-success-500">{status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">PayPal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Paid:</span>
                <span className="font-bold text-gray-900 dark:text-white">$4,235.00</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3 dark:border-gray-800">
                <span className="text-gray-500">Transaction Date:</span>
                <span>12th Apr 2028, 12:58</span>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setIsReceiptOpen(false)}
                className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

"use client";
import React from "react";

export const TransactionsHeader: React.FC = () => {
  return (
    <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Transactions
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Your most recent transactions list
      </p>
    </div>
  );
};

"use client";
import React from "react";

interface TransactionsFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  onExportCSV?: () => void;
}

export const TransactionsFilter: React.FC<TransactionsFilterProps> = ({
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onExportCSV,
}) => {
  return (
    <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 sm:flex-initial">
          <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.04199 9.37337C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none sm:w-[280px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500"
          />
        </div>

        {/* Date Filter & Export CSV */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className="h-11 appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pr-9 pl-4 text-sm font-medium text-gray-700 shadow-theme-xs focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
            <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" />
              </svg>
            </span>
          </div>

          <button
            type="button"
            onClick={onExportCSV}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
          >
            <svg
              className="w-4 h-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.33333 13.3333V15.4167C3.33333 16.107 3.89298 16.6667 4.58333 16.6667H15.4167C16.107 16.6667 16.6667 16.107 16.6667 15.4167V13.3333C16.6667 12.8731 17.0398 12.5 17.5 12.5C17.9602 12.5 18.3333 12.8731 18.3333 13.3333V15.4167C18.3333 17.0275 17.0275 18.3333 15.4167 18.3333H4.58333C2.9725 18.3333 1.66667 17.0275 1.66667 15.4167V13.3333C1.66667 12.8731 2.03976 12.5 2.5 12.5C2.96024 12.5 3.33333 12.8731 3.33333 13.3333ZM9.16667 3.33333V11.6667C9.16667 12.1269 9.53976 12.5 10 12.5C10.4602 12.5 10.8333 12.1269 10.8333 11.6667V3.33333C10.8333 2.8731 10.4602 2.5 10 2.5C9.53976 2.5 9.16667 2.8731 9.16667 3.33333ZM6.09428 6.42742C5.76884 6.10198 5.76884 5.57434 6.09428 5.2489L9.42761 1.91557C9.75305 1.59013 10.2807 1.59013 10.6061 1.91557L13.9394 5.2489C14.2649 5.57434 14.2649 6.10198 13.9394 6.42742C13.614 6.75286 13.0864 6.75286 12.7609 6.42742L10 3.66649L7.23907 6.42742C6.91363 6.75286 6.38599 6.75286 6.09428 6.42742Z"
              />
            </svg>
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
};

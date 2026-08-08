"use client";

import React from "react";

export const ChatHeader = () => {
  return (
    <div className="mb-4 flex items-center justify-between xl:p-4">
      <div className="relative">
        <button 
          onClick={() => alert("Mock: Open chat options")}
          className="flex items-center gap-3 rounded-lg bg-transparent px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          Generate responsive login
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-4 transition-transform duration-150"
          >
            <path
              d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
      <button 
        onClick={() => alert("Mock: Share chat")}
        className="flex items-center gap-1.5 rounded-[10px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="none"
          className="size-4"
        >
          <path
            d="M9.50005 1.8335L14.1667 6.50016L9.50005 11.1668V8.11765C5.82077 8.11765 2.74683 10.7094 2.00431 14.1668C1.89233 13.6454 1.83337 13.1042 1.83337 12.5493C1.83337 8.31514 5.26586 4.88265 9.50005 4.88265V1.8335Z"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        Share
      </button>
    </div>
  );
};

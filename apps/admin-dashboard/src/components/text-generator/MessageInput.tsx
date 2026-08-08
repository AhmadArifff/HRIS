"use client";

import React, { useState } from "react";
import Image from "next/image";

export const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        alert("Mock: Prompt submitted: " + message);
        setMessage("");
      }
    }
  };

  return (
    <div className="fixed bottom-5 lg:bottom-10 left-1/2 z-20 w-full -translate-x-1/2 transform px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-gray-200 bg-white p-3 shadow-xs dark:border-gray-700 dark:bg-white/5">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your prompt here... (Press Enter to submit)"
          className="h-20 w-full resize-none border-none bg-transparent p-2 font-normal text-gray-800 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white"
        ></textarea>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <div className="relative">
              <button 
                onClick={() => alert("Mock: Open file picker")}
                className="flex size-9 items-center justify-center gap-1.5 rounded-lg border border-gray-100 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="size-5"
                >
                  <path
                    d="M5 10.0002H15.0006M10.0002 5V15.0006"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                aria-expanded="false"
                className="flex items-center dark:hover:bg-gray-900 h-9 gap-1.5 px-2.5 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700 dark:text-gray-400"
              >
                <div className="relative h-[18px] w-[18px]">
                  <Image
                    fill
                    alt="claude"
                    src="/images/brand/claude.svg"
                  />
                </div>
                <span>Claude Sonnet 4.6</span>
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-150"
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
              onClick={() => setIsRecording(!isRecording)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition ${isRecording ? "bg-red-500 text-white" : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white/90 dark:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-white/90"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 20 20"
                fill="none"
                className="size-5"
              >
                <path
                  d="M9.99996 15.2082C6.7783 15.2082 4.16663 12.5965 4.16663 9.37484M9.99996 15.2082C13.2216 15.2082 15.8333 12.5965 15.8333 9.37484M9.99996 15.2082V17.7082M8.33329 17.7082H11.6666M9.99999 12.7082C8.15905 12.7082 6.66668 11.2158 6.66668 9.37486V5.62481C6.66668 3.78388 8.15905 2.2915 9.99999 2.2915C11.8409 2.2915 13.3333 3.78388 13.3333 5.62481V9.37486C13.3333 11.2158 11.8409 12.7082 9.99999 12.7082Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

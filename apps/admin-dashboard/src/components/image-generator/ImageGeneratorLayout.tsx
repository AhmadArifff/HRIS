import React from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { ChatSidebar } from "./ChatSidebar";

export const ImageGeneratorLayout = () => {
  return (
    <div className="relative h-[calc(100vh-134px)] xl:h-[calc(100vh-76px)] px-4 xl:flex xl:px-0 -mx-4 xl:-mx-6 -mt-6">
      <div className="my-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 xl:hidden dark:border-gray-800 dark:bg-gray-900 mx-4">
        <h4 className="pl-2 text-lg font-medium text-gray-800 dark:text-white/90">
          Chats History
        </h4>
        <button className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            className="size-6"
          >
            <path
              d="M4 6L20 6M4 18L20 18M4 12L20 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>

      <div className="flex-1 xl:pb-10">
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </div>

      <div className="relative">
        <ChatSidebar />
      </div>
    </div>
  );
};

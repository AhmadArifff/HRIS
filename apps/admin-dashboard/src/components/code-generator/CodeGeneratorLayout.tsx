"use client";

import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import CodeChatSidebar from "./CodeChatSidebar";
import { Menu } from "lucide-react";

export default function CodeGeneratorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative h-[calc(100vh-134px)] xl:h-[calc(100vh-76px)] px-4 xl:flex xl:px-0">
      {/* Mobile Sidebar Toggle */}
      <div className="my-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-3 xl:hidden dark:border-gray-800 dark:bg-gray-900">
        <h4 className="pl-2 text-lg font-medium text-gray-800 dark:text-white/90">
          Chats History
        </h4>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-gray-300 text-gray-700 dark:border-gray-700 dark:text-gray-400"
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 xl:pb-10 relative">
        <ChatHeader />
        <MessageList />
        <MessageInput />
      </div>

      {/* Right Sidebar */}
      <div className={`xl:block ${sidebarOpen ? "block absolute right-0 top-0 bottom-0 z-50 bg-white dark:bg-gray-900" : "hidden"}`}>
         <CodeChatSidebar />
      </div>
    </div>
  );
}

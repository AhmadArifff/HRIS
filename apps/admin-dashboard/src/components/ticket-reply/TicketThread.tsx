"use client";
import React from "react";

export interface ThreadMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderAvatar: string;
  timestamp: string;
  content: string;
  isCustomer: boolean;
}

interface TicketThreadProps {
  messages: ThreadMessage[];
}

export const TicketThread: React.FC<TicketThreadProps> = ({ messages }) => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Guide Note Thread */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2 leading-relaxed border-b border-gray-100 dark:border-gray-800 pb-6">
        <p>
          Thanks for reaching out! It's great to hear you're customizing AdminArif for your project. Adding custom pages like a "Reports" section is straightforward. Here's a quick guide to help you get started:
        </p>
        <p className="font-semibold text-gray-700 dark:text-gray-300 pt-1">
          To include your new page in the sidebar:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Go to the sidebar configuration file (sidebarData.ts or similar)</li>
          <li>Add a new entry with the label "Reports" and route /reports</li>
        </ul>
      </div>

      {/* Dynamic Messages Stream */}
      {messages.map((msg) => (
        <div key={msg.id} className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                {msg.senderAvatar ? (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                    {msg.senderName.charAt(0)}
                  </span>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                  {msg.senderName}
                </h4>
                <p className="text-[11px] text-gray-400">{msg.senderEmail}</p>
              </div>
            </div>

            <span className="text-[11px] text-gray-400">{msg.timestamp}</span>
          </div>

          <div className="rounded-2xl bg-gray-50/60 p-4 text-xs text-gray-700 dark:bg-gray-800/40 dark:text-gray-300 leading-relaxed border border-gray-100 dark:border-gray-800">
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

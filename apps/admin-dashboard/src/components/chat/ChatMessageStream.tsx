"use client";
import React, { useState } from "react";
import { ChatContact } from "./ChatSidebar";

export interface MessageItem {
  id: string;
  senderName: string;
  senderAvatar: string;
  isSelf: boolean;
  text?: string;
  image?: string;
  time: string;
}

interface ChatMessageStreamProps {
  activeContact: ChatContact;
  messages: MessageItem[];
}

export const ChatMessageStream: React.FC<ChatMessageStreamProps> = ({
  activeContact,
  messages,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
      {/* Active Conversation Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-200">
              {activeContact.avatar ? (
                <img
                  src={activeContact.avatar}
                  alt={activeContact.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                activeContact.name.charAt(0)
              )}
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 bg-emerald-500" />
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              {activeContact.name}
            </h4>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              {activeContact.role}
            </p>
          </div>
        </div>

        {/* Action Buttons: Call, Video, More */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition"
            title="Call"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition"
            title="Video Call"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-1 w-40 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900 z-20">
                <button
                  type="button"
                  onClick={() => setShowOptions(false)}
                  className="w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
                >
                  Clear History
                </button>
                <button
                  type="button"
                  onClick={() => setShowOptions(false)}
                  className="w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 transition"
                >
                  Block User
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Message History Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[500px] no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.isSelf ? "justify-end" : "justify-start"
            }`}
          >
            {/* Sender Avatar (only for incoming) */}
            {!msg.isSelf && (
              <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 mt-1">
                {msg.senderAvatar ? (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300">
                    {msg.senderName.charAt(0)}
                  </span>
                )}
              </div>
            )}

            <div className={`max-w-[75%] space-y-1.5 ${msg.isSelf ? "text-right" : "text-left"}`}>
              {/* Image Preview Card */}
              {msg.image && (
                <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-xs max-w-sm">
                  <img
                    src={msg.image}
                    alt="Attachment Preview"
                    className="w-full h-44 object-cover"
                  />
                </div>
              )}

              {/* Text Bubble */}
              {msg.text && (
                <div
                  className={`inline-block rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    msg.isSelf
                      ? "bg-brand-500 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {/* Timestamp & Sender Name */}
              <p className="text-[10px] text-gray-400">
                {!msg.isSelf && `${msg.senderName}, `}
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

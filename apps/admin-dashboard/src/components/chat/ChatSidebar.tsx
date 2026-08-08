"use client";
import React, { useState } from "react";

export interface ChatContact {
  id: string;
  name: string;
  role: string;
  time: string;
  avatar: string;
  status: "online" | "offline" | "idle" | "busy";
  unread?: number;
}

interface ChatSidebarProps {
  contacts: ChatContact[];
  activeContactId: string;
  onSelectContact: (id: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  contacts,
  activeContactId,
  onSelectContact,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: ChatContact["status"]) => {
    switch (status) {
      case "online":
        return "bg-emerald-500";
      case "idle":
        return "bg-amber-500";
      case "busy":
        return "bg-rose-500";
      case "offline":
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Chats
        </h3>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-1 w-40 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900 z-20">
              <button
                type="button"
                onClick={() => setShowDropdown(false)}
                className="w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                Mark all as read
              </button>
              <button
                type="button"
                onClick={() => setShowDropdown(false)}
                className="w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
              >
                Archive all chats
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Input */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-gray-50/80 pl-10 pr-4 py-2.5 text-xs text-gray-800 outline-none focus:border-brand-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-white dark:focus:border-brand-500 transition"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      {/* Contact List */}
      <div className="mt-4 flex-1 overflow-y-auto space-y-1.5 pr-1 no-scrollbar max-h-[580px]">
        {filteredContacts.map((contact) => {
          const isActive = contact.id === activeContactId;
          return (
            <button
              key={contact.id}
              type="button"
              onClick={() => onSelectContact(contact.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition text-left ${
                isActive
                  ? "bg-brand-50/60 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400 font-medium"
                  : "hover:bg-gray-50 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/60"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar with Status Badge */}
                <div className="relative flex-shrink-0">
                  <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-200">
                    {contact.avatar ? (
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      contact.name.charAt(0)
                    )}
                  </div>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-900 ${getStatusColor(
                      contact.status
                    )}`}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {contact.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                    {contact.role}
                  </p>
                </div>
              </div>

              <span className="text-[10px] text-gray-400 flex-shrink-0 ml-2">
                {contact.time}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

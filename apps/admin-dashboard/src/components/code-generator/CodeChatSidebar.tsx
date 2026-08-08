"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Edit2,
  Trash2,
} from "lucide-react";

export default function CodeChatSidebar() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const todayChats = [
    { id: 1, title: "Write a follow-up email to a client" },
    { id: 2, title: "Generate responsive login form layout" },
    { id: 3, title: "Create a warning state modal" },
    { id: 4, title: "Suggest color palette for dark theme" },
  ];

  const yesterdayChats = [
    { id: 5, title: "Improve login page accessibility" },
    { id: 6, title: "Create a warning state modal" },
    { id: 7, title: "Add password visibility toggle" },
    { id: 8, title: "Write validation logic for form" },
    { id: 9, title: "Fix mobile responsiveness" },
  ];

  const toggleDropdown = (id: number) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <aside className="z-50 w-[280px] flex-col h-full border-l border-gray-200 bg-white p-6 ease-in-out dark:border-gray-800 dark:bg-gray-900 hidden xl:flex relative">
      <button 
        onClick={() => alert("Mock: New Chat started!")}
        className="bg-brand-500 hover:bg-brand-600 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition"
      >
        <Plus className="size-5" />
        New Chat
      </button>

      <div className="mt-5">
        <form>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
              <Search className="size-5 text-gray-500 dark:text-gray-400" />
            </span>
            <input
              placeholder="Search..."
              className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-3.5 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              type="text"
            />
          </div>
        </form>
      </div>

      <div className="custom-scrollbar mt-6 h-full flex-1 space-y-3 overflow-y-auto text-sm">
        <div>
          <p className="mb-3 pl-3 text-xs text-gray-400 uppercase">Today</p>
          <ul className="space-y-1">
            {todayChats.map((chat) => (
              <li
                key={chat.id}
                className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950"
              >
                <div className="flex cursor-pointer items-center justify-between">
                  <Link
                    href="#"
                    className="block truncate text-sm text-gray-700 dark:text-gray-400"
                  >
                    {chat.title}
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(chat.id);
                    }}
                    className="invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                  >
                    <MoreHorizontal className="size-4" strokeWidth={3} />
                  </button>
                </div>
                {activeDropdown === chat.id && (
                  <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg bg-white p-1.5 shadow-theme-md dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <ul className="space-y-1">
                      <li>
                        <button 
                          onClick={() => { alert("Mock: Starred chat"); setActiveDropdown(null); }}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
                        >
                          <Star className="size-4" /> Add Starred
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => { alert("Mock: Rename chat"); setActiveDropdown(null); }}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
                        >
                          <Edit2 className="size-4" /> Rename
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => { alert("Mock: Delete chat"); setActiveDropdown(null); }}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2 className="size-4" /> Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <p className="mb-3 pl-3 text-xs text-gray-400 uppercase">Yesterday</p>
          <ul className="space-y-1">
            {yesterdayChats.map((chat) => (
              <li
                key={chat.id}
                className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950"
              >
                <div className="flex cursor-pointer items-center justify-between">
                  <Link
                    href="#"
                    className="block truncate text-sm text-gray-700 dark:text-gray-400"
                  >
                    {chat.title}
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(chat.id);
                    }}
                    className="invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                  >
                    <MoreHorizontal className="size-4" strokeWidth={3} />
                  </button>
                </div>
                {activeDropdown === chat.id && (
                  <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg bg-white p-1.5 shadow-theme-md dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <ul className="space-y-1">
                      <li>
                        <button 
                          onClick={() => { alert("Mock: Starred chat"); setActiveDropdown(null); }}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
                        >
                          <Star className="size-4" /> Add Starred
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => { alert("Mock: Rename chat"); setActiveDropdown(null); }}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
                        >
                          <Edit2 className="size-4" /> Rename
                        </button>
                      </li>
                      <li>
                        <button 
                          onClick={() => { alert("Mock: Delete chat"); setActiveDropdown(null); }}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                        >
                          <Trash2 className="size-4" /> Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}

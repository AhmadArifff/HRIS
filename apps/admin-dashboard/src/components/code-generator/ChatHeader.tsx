"use client";
import React, { useState } from "react";
import { ChevronDown, Star, Edit2, Trash2, Share } from "lucide-react";

export default function ChatHeader() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  const handleAction = (action: string) => {
    alert(`Mock: ${action}`);
    setDropdownOpen(false);
  };

  return (
    <div className="mb-4 flex items-center justify-between xl:p-4">
      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 rounded-lg bg-transparent px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          Generate responsive login
          <ChevronDown
            className={`size-4 transition-transform duration-150 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {dropdownOpen && (
          <ul className="absolute top-full left-0 z-30 mt-1 w-45 space-y-0.5 rounded-xl bg-white p-1.5 shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <li>
              <button 
                onClick={() => { setIsStarred(!isStarred); setDropdownOpen(false); }}
                className={`flex w-full items-center gap-2 rounded-lg bg-transparent px-1.5 py-2 hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-white/90 ${isStarred ? "text-brand-500" : "text-gray-700 dark:text-gray-400"}`}
              >
                <Star className={`size-5 ${isStarred ? "fill-current" : ""}`} /> {isStarred ? "Starred" : "Add Starred"}
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleAction("Rename chat")}
                className="flex w-full items-center gap-2 rounded-lg bg-transparent px-1.5 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
              >
                <Edit2 className="size-5" /> Rename
              </button>
            </li>
            <hr className="my-1 border-gray-200 dark:border-white/10" />
            <li>
              <button 
                onClick={() => handleAction("Delete chat")}
                className="flex w-full items-center gap-2 rounded-lg bg-transparent px-1.5 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <Trash2 className="size-5" /> Delete
              </button>
            </li>
          </ul>
        )}
      </div>

      <button 
        onClick={() => alert("Mock: Open share dialog")}
        className="flex items-center gap-1.5 rounded-[10px] border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-900"
      >
        <Share className="size-4" /> Share
      </button>
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Paperclip, Mic, ChevronDown, Check } from "lucide-react";

export default function MessageInput() {
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState("Claude Sonnet 4.6");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        alert("Mock: Prompt submitted: " + message);
        setMessage("");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert("Mock: File attached - " + e.target.files[0].name);
    }
  };

  return (
    <div className="fixed bottom-5 lg:bottom-10 left-1/2 z-20 w-full -translate-x-1/2 transform px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[720px] rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-xs dark:border-gray-700 dark:bg-white/5">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your prompt here... (Press Enter to submit)"
          className="h-20 w-full resize-none border-none bg-transparent p-2 font-normal text-gray-800 outline-none placeholder:text-gray-400 focus:ring-0 dark:text-white"
        ></textarea>
        <div className="flex items-center justify-between pt-2">
          <span className="inline-flex">
            <label className="flex size-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-300">
              <input 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="sr-only" 
                type="file" 
              />
              <Paperclip className="size-5" />
            </label>
          </span>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 text-sm text-gray-700 dark:text-gray-400"
              >
                <Image
                  width={18}
                  height={18}
                  alt={selectedModel}
                  src="/images/brand/claude.svg"
                />
                <span>{selectedModel}</span>
                <ChevronDown className={`size-4 transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              {dropdownOpen && (
                <ul className="absolute bottom-full right-0 z-30 mb-2 w-48 space-y-0.5 rounded-xl bg-white p-1.5 shadow-md dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  {["Claude Sonnet 4.6", "GPT-4o", "Gemini Pro"].map((model) => (
                    <li key={model}>
                      <button 
                        onClick={() => { setSelectedModel(model); setDropdownOpen(false); }}
                        className="flex w-full items-center justify-between gap-2 rounded-lg bg-transparent px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white/90"
                      >
                        {model}
                        {selectedModel === model && <Check className="size-4" />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button 
              onClick={() => setIsRecording(!isRecording)}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition text-white ${
                isRecording 
                  ? "bg-red-500 hover:bg-red-600 animate-pulse" 
                  : "bg-gray-900 hover:bg-gray-800 dark:bg-white/90 dark:text-gray-800 dark:hover:bg-gray-900 dark:hover:text-white/90"
              }`}
            >
              <Mic className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

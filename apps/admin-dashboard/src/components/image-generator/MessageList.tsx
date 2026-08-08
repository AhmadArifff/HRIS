"use client";

import React, { useState } from "react";
import { Check, Download, RefreshCw, Copy, Edit2 } from "lucide-react";

export const MessageList = () => {
  const [copiedUser, setCopiedUser] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [copiedImageLink, setCopiedImageLink] = useState(false);

  const userMessage = "Minimalist building facade with vertical panels and greenery in a planter, set against a clear blue sky for a modern aesthetic.";

  const copyUserText = () => {
    navigator.clipboard.writeText(userMessage);
    setCopiedUser(true);
    setTimeout(() => setCopiedUser(false), 2000);
  };

  const handleDownload = () => {
    alert("Mock: Downloading image...");
  };

  const handleRefresh = () => {
    alert("Mock: Regenerating image...");
  };

  const copyImageUrl = () => {
    navigator.clipboard.writeText("https://example.com/image-mock-url");
    setCopiedImageLink(true);
    setTimeout(() => setCopiedImageLink(false), 2000);
  };
  return (
    <>
      <div className="relative mx-auto items-center max-w-[720px]">
        <div className="custom-scrollbar relative z-20 max-h-[50vh] flex-1 mx-auto space-y-7 w-full overflow-y-auto pb-16">
          <div className="flex justify-end">
            <div className="max-w-[480px] w-full">
              <div className="ml-auto w-full max-w-[480px]">
                <div className="shadow-theme-xs bg-gray-100 dark:bg-gray-800 rounded-xl rounded-tr-xs px-4 py-3">
                {isEditing ? (
                  <textarea className="w-full bg-transparent outline-none text-gray-800 dark:text-white/90 border border-gray-300 dark:border-gray-600 rounded p-1" defaultValue={userMessage} />
                ) : (
                  <p className="text-left text-base leading-6 font-normal text-gray-800 dark:text-white/90">
                    {userMessage}
                  </p>
                )}
                </div>
                <div className="mt-2 flex justify-end">
                  <span className="inline-flex">
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={`group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium hover:bg-gray-100 dark:border-white/5 dark:hover:bg-gray-800 transition-colors ${isEditing ? "bg-gray-200 text-brand-500 dark:bg-gray-700" : "text-gray-800 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-900 dark:hover:text-white/90"}`}
                    >
                      <Edit2 className="size-4" />
                    </button>
                  </span>
                  <span className="inline-flex">
                    <button 
                      onClick={copyUserText}
                      className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90"
                    >
                      {copiedUser ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start">
            <div>
              <div className="max-w-[480px]">
                <p className="mb-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <img
                    alt="model"
                    src="/images/brand/brand-01.svg"
                  />
                  Nano Banana 2.0
                </p>
                <p className="mb-2 text-base leading-6 text-gray-800 dark:text-white/90">
                  I have generated Minimalist building facade with vertical
                  panels and greenery in a planter, set against a clear blue sky
                  for a modern aesthetic.
                </p>
                <div className="group relative w-full max-w-[300px] overflow-hidden rounded-xl">
                  <img
                    className="w-full rounded-xl border border-gray-100 object-cover dark:border-gray-700"
                    alt=""
                    src="/images/cards/card-01.png"
                  />
                  <div className="absolute right-0 bottom-0 left-0 flex translate-y-full items-center justify-between px-3 py-3 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex">
                        <button 
                          onClick={handleDownload}
                          className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur-sm transition hover:bg-white"
                        >
                          <Download className="size-4" />
                        </button>
                      </span>
                      <span className="inline-flex">
                        <button 
                          onClick={handleRefresh}
                          className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur-sm transition hover:bg-white"
                        >
                          <RefreshCw className="size-4" />
                        </button>
                      </span>
                      <span className="inline-flex">
                        <button 
                          onClick={copyImageUrl}
                          className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur-sm transition hover:bg-white"
                        >
                          {copiedImageLink ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                        </button>
                      </span>
                    </div>
                    <span className="inline-flex">
                      <button className="inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow backdrop-blur-sm transition hover:bg-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 18 18"
                          fill="none"
                          className="size-4"
                        >
                          <path
                            d="M15.0003 12V13.875C15.0003 14.4963 14.4966 15 13.8753 15H4.12463C3.50331 15 2.99963 14.4963 2.99963 13.875V12M9.00112 12L9.00112 3M5.53091 8.53155L8.99954 11.998L12.4684 8.53155"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

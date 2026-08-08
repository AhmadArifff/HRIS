"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Copy, Edit2, ThumbsUp, ThumbsDown, RefreshCw } from "lucide-react";

export const MessageList = () => {
  const [copiedUser, setCopiedUser] = useState(false);
  const [copiedAI, setCopiedAI] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const userMessage = "Can you generate some random, creative, and engaging placeholder text for me? It doesn't need to follow any specific structure—just something fun or interesting to fill space temporarily.";
  const aiMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat.";

  const handleCopy = (text: string, setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="relative mx-auto items-center max-w-[720px]">
      <div className="custom-scrollbar relative z-20 max-h-[50vh] flex-1 mx-auto space-y-7 w-full overflow-y-auto pb-16">
        {/* User Message 1 */}
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
                    onClick={() => handleCopy(userMessage, setCopiedUser)}
                    className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90"
                  >
                    {copiedUser ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Message 1 */}
        <div className="flex justify-start">
          <div>
            <div className="max-w-[480px]">
              <p className="mb-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <span className="relative h-[18px] w-[18px] inline-block">
                  <Image
                    fill
                    alt="model"
                    src="/images/brand/claude.svg"
                  />
                </span>
                Claude Sonnet 4.6
              </p>
              <p className="mb-2 text-base leading-6 text-gray-800 dark:text-white/90">
                {aiMessage}
              </p>
            </div>
            <div className="relative inline-flex mt-3">
              <span className="inline-flex">
                <button 
                  onClick={() => handleCopy(aiMessage, setCopiedAI)}
                  className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90"
                >
                  {copiedAI ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
                </button>
              </span>
              <span className="inline-flex">
                <button 
                  onClick={() => alert("Mock: Liked response")}
                  className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium hover:bg-gray-100 dark:border-white/5 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  <ThumbsUp className="size-4 transition-colors duration-200 dark:group-hover:text-white/90 text-gray-800 dark:text-gray-400" />
                </button>
              </span>
              <span className="inline-flex">
                <button 
                  onClick={() => alert("Mock: Disliked response")}
                  className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium hover:bg-gray-100 dark:border-white/5 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  <ThumbsDown className="size-4 transition-colors duration-200 dark:group-hover:text-white/90 text-gray-800 dark:text-gray-400" />
                </button>
              </span>
              <span className="inline-flex">
                <button 
                  onClick={() => alert("Mock: Regenerated response")}
                  className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90"
                >
                  <RefreshCw className="size-4" />
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* User Message 2 */}
        <div className="flex justify-end">
          <div className="max-w-[480px] w-full">
            <div className="ml-auto w-full max-w-[480px]">
              <div className="shadow-theme-xs bg-gray-100 dark:bg-gray-800 rounded-xl rounded-tr-xs px-4 py-3">
                <p className="text-left text-base leading-6 font-normal text-gray-800 dark:text-white/90">
                  I'm looking for a block of random, imaginative text—something quirky or unexpected to use as placeholder content.
                </p>
              </div>
              <div className="mt-2 flex justify-end">
                <span className="inline-flex">
                  <button 
                    onClick={() => alert("Mock: Edit message")}
                    className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90"
                  >
                    <Edit2 className="size-4" />
                  </button>
                </span>
                <span className="inline-flex">
                  <button 
                    onClick={() => alert("Mock: Copied user text")}
                    className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90"
                  >
                    <Copy className="size-4" />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Message 2 */}
        <div className="flex justify-start">
          <div>
            <div className="max-w-[480px]">
              <p className="mb-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <span className="relative h-[18px] w-[18px] inline-block">
                  <Image
                    fill
                    alt="model"
                    src="/images/brand/claude.svg"
                  />
                </span>
                Claude Sonnet 4.6
              </p>
              <p className="mb-2 text-base leading-6 text-gray-800 dark:text-white/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat.
              </p>
              <p className="mb-2 text-base leading-6 text-gray-800 dark:text-white/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et varius tortor. Aenean dui magna, vehicula in lacinia non, euismod sed odio. Aliquam erat volutpat.
              </p>
            </div>
            <div className="relative inline-flex mt-3">
              <span className="inline-flex">
                <button 
                  onClick={() => alert("Mock: Copied response")}
                  className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90"
                >
                  <Copy className="size-4" />
                </button>
              </span>
              <span className="inline-flex">
                <button 
                  onClick={() => alert("Mock: Liked response")}
                  className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium hover:bg-gray-100 dark:border-white/5 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  <ThumbsUp className="size-4 transition-colors duration-200 dark:group-hover:text-white/90 text-gray-800 dark:text-gray-400" />
                </button>
              </span>
              <span className="inline-flex">
                <button 
                  onClick={() => alert("Mock: Disliked response")}
                  className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium hover:bg-gray-100 dark:border-white/5 dark:bg-gray-900 dark:hover:bg-gray-800"
                >
                  <ThumbsDown className="size-4 transition-colors duration-200 dark:group-hover:text-white/90 text-gray-800 dark:text-gray-400" />
                </button>
              </span>
              <span className="inline-flex">
                <button 
                  onClick={() => alert("Mock: Regenerated response")}
                  className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90"
                >
                  <RefreshCw className="size-4" />
                </button>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

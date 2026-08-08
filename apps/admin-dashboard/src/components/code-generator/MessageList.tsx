"use client";

import React from "react";
import Image from "next/image";
import { Copy, Code2, Check } from "lucide-react";

export default function MessageList() {
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedUser, setCopiedUser] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const userMessage = "Create a login form in HTML with Google and GitHub authentication.";

  const codeSnippet = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Form</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 20px; }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="login-header">
      <h1>Login Form</h1>
    </div>
  </div>
</body>
</html>`;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const copyUserText = () => {
    navigator.clipboard.writeText(userMessage);
    setCopiedUser(true);
    setTimeout(() => setCopiedUser(false), 2000);
  };

  return (
    <div className="relative mx-auto items-center max-w-[720px]">
      <div className="no-scrollbar relative z-20 max-h-[50vh] space-y-7 overflow-y-auto pb-16">
        {/* User Message */}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="size-4"
                    >
                      <path
                        d="M9.90891 4.06479L11.9346 6.09047M12.5149 2.87346L13.1264 3.48492C13.5169 3.87545 13.5169 4.50861 13.1264 4.89914L6.26837 11.7572C6.15231 11.8732 6.00946 11.9589 5.85243 12.0067L3.17969 12.8202L3.99313 10.1474C4.04092 9.99041 4.12663 9.84756 4.2427 9.7315L11.1007 2.87346C11.4913 2.48294 12.1244 2.48294 12.5149 2.87346Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </span>
                <span className="inline-flex">
                  <button 
                    onClick={copyUserText}
                    className="group flex size-8 items-center justify-center rounded-lg p-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:text-gray-900 dark:border-white/5 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white/90"
                  >
                    {copiedUser ? <Check className="size-4 text-green-500" /> : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="size-4"
                      >
                        <path
                          d="M11.3253 11.3301H5.67033C5.11804 11.3301 4.67033 10.8824 4.67033 10.3301V4.67513M11.3253 11.3301L11.3253 12.3327C11.3253 12.885 10.8776 13.3327 10.3253 13.3327H3.66772C3.11544 13.3327 2.66772 12.885 2.66772 12.3327V5.67513C2.66772 5.12285 3.11544 4.67513 3.66772 4.67513H4.67033M11.3253 11.3301H12.3321C12.8844 11.3301 13.3321 10.8824 13.3321 10.3301L13.3321 3.66699C13.3321 3.11471 12.8844 2.66699 12.3321 2.66699H5.67033C5.11804 2.66699 4.67033 3.11471 4.67033 3.66699V4.67513"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    )}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Message */}
        <div className="flex lg:justify-start mb-6">
          <div>
            <div className="max-w-[480px]">
              <p className="mb-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <Image
                  width={18}
                  height={18}
                  alt="model"
                  src="/images/brand/claude.svg"
                />
                Claude Sonnet 4.6
              </p>
              <p className="mb-3 text-base leading-6 text-gray-800 dark:text-white/90">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                et varius tortor. Aenean dui magna, vehicula in lacinia non,
                euismod sed odio. Aliquam erat volutpat.
              </p>
            </div>

            <div className="flex-1 w-full mt-4">
              <div className="bg-white dark:bg-white/5 border dark:border-gray-800 border-gray-200 shadow-theme-xs rounded-[20px] w-full lg:max-w-3xl relative overflow-hidden">
                <div className="w-full flex-1">
                  {/* Code Header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b dark:border-gray-800 border-gray-200 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <Code2 className="size-4" />
                      <p className="text-sm">HTML</p>
                    </div>
                    <div>
                      <div className="flex gap-2">
                        <span className="inline-flex">
                          <button
                            onClick={copyCode}
                            className="inline-flex size-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                            title="Copy code"
                          >
                            {copiedCode ? (
                              <Check className="size-4 text-green-500" />
                            ) : (
                              <Copy className="size-4" />
                            )}
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Code Body */}
                  <div className="py-4 px-5 max-h-[350px] w-full overflow-y-auto custom-scrollbar bg-[#1e1e1e]">
                    <pre className="rounded-lg overflow-x-auto text-sm text-gray-300 font-mono">
                      <code>{codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm leading-5 text-gray-500 dark:text-gray-400">
                Here is the code for login form with google and github authentication as described.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

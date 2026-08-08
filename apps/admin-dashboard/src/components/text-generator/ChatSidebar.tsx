"use client";

import React from "react";
import Link from "next/link";

export const ChatSidebar = () => {
  return (
    <aside className="z-50 w-[280px] flex-col h-full border-l border-gray-200 bg-white p-6 ease-in-out dark:border-gray-800 dark:bg-gray-900 hidden xl:flex relative">
      <button 
        onClick={() => alert("Mock: New Chat started!")}
        className="bg-brand-500 hover:bg-brand-600 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          fill="none"
          className="size-5"
        >
          <path
            d="M5 10.0002H15.0006M10.0002 5V15.0006"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        New Chat
      </button>

      <div className="mt-5">
        <form>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2">
              <svg
                className="size-5 fill-gray-500 dark:fill-gray-400"
                width="1em"
                height="1em"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                  fill=""
                ></path>
              </svg>
            </span>
            <input
              placeholder="Search..."
              className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-3.5 pl-[42px] text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
              type="text"
              defaultValue=""
            />
          </div>
        </form>
      </div>

      <div className="custom-scrollbar mt-6 h-full flex-1 space-y-3 overflow-y-auto text-sm">
        <div>
          <p className="mb-3 pl-3 text-xs text-gray-400 uppercase">Today</p>
          <ul className="space-y-1">
            <li className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
              <div className="flex cursor-pointer items-center justify-between">
                <Link
                  href="#"
                  className="block truncate text-sm text-gray-700 dark:text-gray-400"
                >
                  Write a follow-up email to a client
                </Link>
                <button 
                  onClick={() => alert("Mock: Open chat options")}
                  className="dropdown-toggle invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
            <li className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
              <div className="flex cursor-pointer items-center justify-between">
                <Link
                  href="#"
                  className="block truncate text-sm text-gray-700 dark:text-gray-400"
                >
                  Generate responsive login form layout
                </Link>
                <button 
                  onClick={() => alert("Mock: Open chat options")}
                  className="dropdown-toggle invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
            <li className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
              <div className="flex cursor-pointer items-center justify-between">
                <Link
                  href="#"
                  className="block truncate text-sm text-gray-700 dark:text-gray-400"
                >
                  Create a warning state modal
                </Link>
                <button 
                  onClick={() => alert("Mock: Open chat options")}
                  className="dropdown-toggle invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
            <li className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
              <div className="flex cursor-pointer items-center justify-between">
                <Link
                  href="#"
                  className="block truncate text-sm text-gray-700 dark:text-gray-400"
                >
                  Suggest color palette for dark theme
                </Link>
                <button 
                  onClick={() => alert("Mock: Open chat options")}
                  className="dropdown-toggle invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
        </div>

        <div className="relative">
          <p className="mb-3 pl-3 text-xs text-gray-400 uppercase">Yesterday</p>
          <ul className="space-y-1">
            <li className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
              <div className="flex cursor-pointer items-center justify-between">
                <Link
                  href="#"
                  className="block truncate text-sm text-gray-700 dark:text-gray-400"
                >
                  Improve login page accessibility
                </Link>
                <button 
                  onClick={() => alert("Mock: Open chat options")}
                  className="dropdown-toggle invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
            <li className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
              <div className="flex cursor-pointer items-center justify-between">
                <Link
                  href="#"
                  className="block truncate text-sm text-gray-700 dark:text-gray-400"
                >
                  Create a warning state modal with animation
                </Link>
                <button 
                  onClick={() => alert("Mock: Open chat options")}
                  className="dropdown-toggle invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
            <li className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
              <div className="flex cursor-pointer items-center justify-between">
                <Link
                  href="#"
                  className="block truncate text-sm text-gray-700 dark:text-gray-400"
                >
                  Add password visibility toggle
                </Link>
                <button 
                  onClick={() => alert("Mock: Open chat options")}
                  className="dropdown-toggle invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
            <li className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
              <div className="flex cursor-pointer items-center justify-between">
                <Link
                  href="#"
                  className="block truncate text-sm text-gray-700 dark:text-gray-400"
                >
                  Write validation logic for login form...
                </Link>
                <button 
                  onClick={() => alert("Mock: Open chat options")}
                  className="dropdown-toggle invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
            <li className="group relative rounded-full px-3 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-950">
              <div className="flex cursor-pointer items-center justify-between">
                <Link
                  href="#"
                  className="block truncate text-sm text-gray-700 dark:text-gray-400"
                >
                  Fix mobile responsiveness of login UI...
                </Link>
                <button 
                  onClick={() => alert("Mock: Open chat options")}
                  className="dropdown-toggle invisible ml-2 rounded-full p-1 text-gray-700 group-hover:visible hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M4.5 9.00384L4.5 8.99634M13.5 9.00384V8.99634M9 9.00384V8.99634"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
          </ul>
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-8 w-full bg-gradient-to-t from-white to-transparent dark:from-gray-900"></div>
        </div>

        <div className="mt-4 pl-3">
          <button className="text-primary-500 flex w-full items-center justify-between text-xs font-medium text-gray-400">
            <span>Show more...</span>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 ml-2 transition-transform "
            >
              <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </aside>
  );
};

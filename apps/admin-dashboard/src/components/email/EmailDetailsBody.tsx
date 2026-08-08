"use client";
import React from "react";

export const EmailDetailsBody: React.FC = () => {
  return (
    <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Sender Profile & Subject */}
        <div className="flex items-center gap-4">
          <div className="h-11 w-11 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0">
            <img
              src="/images/user/user-01.jpg"
              alt="Codescandy"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Contact For "Website Design"
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Codescandy <span className="text-gray-400">hello@example.com</span>
            </p>
          </div>
        </div>

        {/* Rich Email Text Body */}
        <div className="space-y-4 text-xs text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl">
          <p className="font-medium">Hello Dear Alexander,</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut rutrum mi. Aenean ac leo non justo suscipit consectetur. Nam vestibulum eleifend magna quis porta. ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut rutrum mi. Aenean ac leo
          </p>
          <p>
            Praesent ut rutrum mi. Aenean ac leo non justo suscipit consectetur. Nam vestibulum eleifend magna quis porta.
          </p>
          <p>
            Nullam tincidunt sodales diam, quis rhoncus dolor aliquet a. Nulla a rhoncus lectus. In nunc neque, pellentesque non massa ornare, accumsan ornare massa. odales diam, quis rhoncus dolor aliquet a. Nulla a rhoncus lectus. In nunc neque
          </p>
          <p>
            Suspendisse semper vel turpis vitae aliquam. Aenean semper dui in consequat ullamcorper.
          </p>
          <p>
            Nullam tincidunt sodales diam, quis rhoncus dolor aliquet a. Nulla a rhoncus lectus. In nunc neque, pellentesque non massa ornare, accumsan ornare massa. sodales diam, quis rhoncus dolor aliquet a. Nulla a rhoncus lectus. In nunc neque
          </p>
          <p>
            Praesent ut rutrum mi. Aenean ac leo non justo suscipit consectetur. Nam vestibulum eleifend magna quis porta.
          </p>
        </div>

        {/* Attachments Section */}
        <div className="rounded-2xl bg-gray-50/60 p-5 border border-gray-100 dark:bg-gray-800/40 dark:border-gray-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
            2 Attachments
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Guidelines PDF */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-xs dark:border-gray-700 dark:bg-gray-900 min-w-[200px]">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-500/10 font-bold text-[10px]">
                PDF
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-900 dark:text-white">
                  Guidelines.pdf
                </h5>
                <p className="text-[11px] text-gray-400">PDF • Download</p>
              </div>
            </div>

            {/* Branding Assets */}
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-xs dark:border-gray-700 dark:bg-gray-900 min-w-[200px]">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.2l5.5 3.4-5.5 3.4-5.5-3.4L12 4.2z" />
                </svg>
              </div>
              <div>
                <h5 className="text-xs font-bold text-gray-900 dark:text-white">
                  Branding Assets
                </h5>
                <p className="text-[11px] text-gray-400">Media • Download</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="flex items-center gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition shadow-xs"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          Reply
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition shadow-xs"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          Reply all
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition shadow-xs"
        >
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 10H11a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6" />
          </svg>
          Forward
        </button>
      </div>
    </div>
  );
};

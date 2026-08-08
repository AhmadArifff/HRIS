"use client";
import React from "react";

export interface FolderItem {
  id: string;
  name: string;
  filesCount: string;
  size: string;
}

const mockFolders: FolderItem[] = [
  { id: "1", name: "Images", filesCount: "345 Files", size: "26.40 GB" },
  { id: "2", name: "Documents", filesCount: "130 Files", size: "26.40 GB" },
  { id: "3", name: "Apps", filesCount: "130 Files", size: "26.40 GB" },
  { id: "4", name: "Downloads", filesCount: "345 Files", size: "26.40 GB" },
];

export const AllFoldersSection: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          All Folders
        </h3>
        <button
          type="button"
          onClick={() => alert("Viewing all folders")}
          className="text-xs font-semibold text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          View All &rarr;
        </button>
      </div>

      <div className="p-5 lg:p-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mockFolders.map((folder) => (
          <div
            key={folder.id}
            className="group flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-theme-xs transition hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700"
          >
            <div className="flex items-center justify-between mb-4">
              {/* Folder Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500 dark:bg-amber-500/15 dark:text-amber-400">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2 5a2 2 0 012-2h3.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                </svg>
              </div>

              {/* Options Menu */}
              <button
                type="button"
                onClick={() => alert(`Options for ${folder.name}`)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6 10C6 10.8284 5.32843 11.5 4.5 11.5C3.67157 11.5 3 10.8284 3 10C3 9.17157 3.67157 8.5 4.5 8.5C5.32843 8.5 6 9.17157 6 10ZM11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10ZM15.5 11.5C16.3284 11.5 17 10.8284 17 10C17 9.17157 16.3284 8.5 15.5 8.5C14.6716 8.5 14 9.17157 14 10C14 10.8284 14.6716 11.5 15.5 11.5Z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                  {folder.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {folder.filesCount}
                </p>
              </div>

              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                {folder.size}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

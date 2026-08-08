"use client";
import React from "react";

export interface RecentFile {
  id: string;
  name: string;
  category: "Video" | "Image" | "Document" | string;
  size: string;
  dateModified: string;
}

const mockRecentFiles: RecentFile[] = [
  { id: "1", name: "Video_947954.mp4", category: "Video", size: "89 MB", dateModified: "12 Jan, 2027" },
  { id: "2", name: "Travel.jpg", category: "Image", size: "5.4 MB", dateModified: "10 Feb, 2027" },
  { id: "3", name: "Document.pdf", category: "Document", size: "1.2 MB", dateModified: "8 Mar, 2027" },
  { id: "4", name: "Video_947954_028.mp4", category: "Video", size: "489 MB", dateModified: "29 Apr, 2027" },
  { id: "5", name: "Mountain.png", category: "Image", size: "5.4 MB", dateModified: "10 Feb, 2027" },
  { id: "6", name: "CV.pdf", category: "Document", size: "12 MB", dateModified: "17 Jun, 2027" },
  { id: "7", name: "Video_09783_882943.mp4", category: "Video", size: "309 MB", dateModified: "27 Jul, 2027" },
];

export const RecentFilesTable: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Recent Files
        </h3>
        <button
          type="button"
          onClick={() => alert("Viewing all recent files")}
          className="text-xs font-semibold text-brand-500 hover:text-brand-600 dark:text-brand-400"
        >
          View All &rarr;
        </button>
      </div>

      <div className="p-5 lg:p-6">
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
            <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
              <tr>
                <th className="px-6 py-4">File Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4">Date Modified</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {mockRecentFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                      </div>
                      <span>{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{file.category}</td>
                  <td className="px-6 py-4">{file.size}</td>
                  <td className="px-6 py-4">{file.dateModified}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => alert(`Downloading ${file.name}`)}
                        className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        title="Download"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm7-11a1 1 0 011 1v5.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 8.586V4a1 1 0 011-1z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => alert(`Previewing ${file.name}`)}
                        className="text-gray-400 hover:text-brand-500 dark:hover:text-brand-400"
                        title="View"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => alert(`Deleted ${file.name}`)}
                        className="text-gray-400 hover:text-error-500 dark:hover:text-error-400"
                        title="Delete"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M9 2C8.44772 2 8 2.44772 8 3V4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6H5V16C5 17.1046 5.89543 18 7 18H13C14.1046 18 15 17.1046 15 16V6H16C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12V3C12 2.44772 11.5523 2 11 2H9ZM7 8C7.55228 8 8 8.44772 8 9V14C8 14.5523 7.55228 15 7 15C6.44772 15 6 14.5523 6 14V9C6 8.44772 6.44772 8 7 8ZM13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44772 11 9V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V9Z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

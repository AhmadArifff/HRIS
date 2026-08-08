"use client";
import React, { useState } from "react";

export interface MediaStat {
  id: string;
  title: string;
  usedPercentage: string;
  filesCount: string;
  size: string;
  iconBg: string;
  iconColor: string;
  type: "image" | "video" | "audio" | "app" | "document" | "download";
}

const mockMediaStats: MediaStat[] = [
  { id: "1", title: "Image", usedPercentage: "17% Used", filesCount: "245 files", size: "26.40 GB", iconBg: "bg-success-50 dark:bg-success-500/15", iconColor: "text-success-600 dark:text-success-400", type: "image" },
  { id: "2", title: "Videos", usedPercentage: "22% Used", filesCount: "245 files", size: "26.40 GB", iconBg: "bg-pink-50 dark:bg-pink-500/15", iconColor: "text-pink-600 dark:text-pink-400", type: "video" },
  { id: "3", title: "Audios", usedPercentage: "23% Used", filesCount: "830 files", size: "18.90 GB", iconBg: "bg-brand-50 dark:bg-brand-500/15", iconColor: "text-brand-600 dark:text-brand-400", type: "audio" },
  { id: "4", title: "Apps", usedPercentage: "65% Used", filesCount: "1200 files", size: "85.30 GB", iconBg: "bg-orange-50 dark:bg-orange-500/15", iconColor: "text-orange-600 dark:text-orange-400", type: "app" },
  { id: "5", title: "Documents", usedPercentage: "10% Used", filesCount: "78 files", size: "5.40 GB", iconBg: "bg-amber-50 dark:bg-amber-500/15", iconColor: "text-amber-600 dark:text-amber-400", type: "document" },
  { id: "6", title: "Downloads", usedPercentage: "16% Used", filesCount: "245 files", size: "26.40 GB", iconBg: "bg-purple-50 dark:bg-purple-500/15", iconColor: "text-purple-600 dark:text-purple-400", type: "download" },
];

export const AllMediaSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const renderIcon = (type: string) => {
    switch (type) {
      case "image":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4 3C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3H4ZM14.5 7C14.5 7.82843 13.8284 8.5 13 8.5C12.1716 8.5 11.5 7.82843 11.5 7C11.5 6.17157 12.1716 5.5 13 5.5C13.8284 5.5 14.5 6.17157 14.5 7ZM16 14.5L12.5 10L9.5 13.5L7.5 11.5L4 15.5H16V14.5Z" />
          </svg>
        );
      case "video":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4 3C2.89543 3 2 3.89543 2 5V15C2 16.1046 2.89543 17 4 17H16C17.1046 17 18 16.1046 18 15V5C18 3.89543 17.1046 3 16 3H4ZM8.29289 7.29289C8.68342 6.90237 9.31658 6.90237 9.70711 7.29289L13.7071 11.2929C14.0976 11.6834 14.0976 12.3166 13.7071 12.7071L9.70711 16.7071C9.31658 17.0976 8.68342 17.0976 8.29289 16.7071C7.90237 16.3166 7.90237 15.6834 8.29289 15.2929L11.5858 12L8.29289 8.70711C7.90237 8.31658 7.90237 7.68342 8.29289 7.29289Z" />
          </svg>
        );
      case "audio":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.382 3.026a1 1 0 0 1 1.099.217l5 5A1 1 0 0 1 15 10h-2v4a3 3 0 1 1-6 0v-4.586l-2.293 2.293a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.089-.267z" />
          </svg>
        );
      case "app":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zm8-8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
          </svg>
        );
      case "document":
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
          </svg>
        );
      case "download":
      default:
        return (
          <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3 14a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm7-11a1 1 0 011 1v5.586l1.293-1.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 8.586V4a1 1 0 011-1z" />
          </svg>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header Bar */}
      <div className="border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white">
            All Media
          </h3>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-800 shadow-theme-xs focus:border-brand-500 focus:outline-none sm:w-64 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 fill-current text-gray-400"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5873 10.495 12.8856 11.4714L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4714 12.8856C10.495 13.5873 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" />
              </svg>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              &#43; Upload File
            </button>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="p-5 lg:p-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockMediaStats
          .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((stat) => (
            <div
              key={stat.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-theme-xs transition hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}>
                  {renderIcon(stat.type)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {stat.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.usedPercentage}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-gray-800 dark:text-white">
                  {stat.filesCount}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.size}
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Upload File Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Upload New File
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="py-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl my-4 bg-gray-50 dark:bg-gray-800/50">
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Drag and drop files here, or click to browse
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Supports Images, Videos, PDFs, Zip files up to 50MB
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 dark:border-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("File upload simulated!");
                  setIsModalOpen(false);
                }}
                className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
              >
                Upload Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

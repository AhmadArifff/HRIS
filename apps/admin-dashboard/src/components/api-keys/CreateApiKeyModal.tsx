"use client";
import React, { useState } from "react";

interface CreateApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateKey: (name: string, expiration: string) => void;
}

export const CreateApiKeyModal: React.FC<CreateApiKeyModalProps> = ({
  isOpen,
  onClose,
  onCreateKey,
}) => {
  const [name, setName] = useState("");
  const [expiration, setExpiration] = useState("Never");
  const [readPermission, setReadPermission] = useState(true);
  const [writePermission, setWritePermission] = useState(true);
  const [deletePermission, setDeletePermission] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreateKey(name.trim(), expiration);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Create New API Key
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Key Name Input */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Key Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Staging Server Key"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-800 outline-none focus:border-brand-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-white dark:focus:border-brand-500"
            />
          </div>

          {/* Expiration Select */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Expiration Period
            </label>
            <select
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-800 outline-none focus:border-brand-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-white dark:focus:border-brand-500"
            >
              <option value="Never">Never Expire</option>
              <option value="30 Days">30 Days</option>
              <option value="60 Days">60 Days</option>
              <option value="90 Days">90 Days</option>
              <option value="1 Year">1 Year</option>
            </select>
          </div>

          {/* Permissions Checkboxes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Access Permissions
            </label>
            <div className="grid grid-cols-3 gap-3">
              <label className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 dark:border-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={readPermission}
                  onChange={(e) => setReadPermission(e.target.checked)}
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">Read</span>
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 dark:border-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={writePermission}
                  onChange={(e) => setWritePermission(e.target.checked)}
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">Write</span>
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 dark:border-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={deletePermission}
                  onChange={(e) => setDeletePermission(e.target.checked)}
                  className="rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-xs text-gray-700 dark:text-gray-300">Delete</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-medium text-white hover:bg-brand-600 transition"
            >
              Generate Key
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

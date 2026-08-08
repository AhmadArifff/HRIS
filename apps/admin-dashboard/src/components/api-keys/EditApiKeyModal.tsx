"use client";
import React, { useState, useEffect } from "react";
import { ApiKeyItem } from "./ApiKeyTableCard";

interface EditApiKeyModalProps {
  isOpen: boolean;
  apiKey: ApiKeyItem | null;
  onClose: () => void;
  onSaveKey: (id: string, newName: string) => void;
}

export const EditApiKeyModal: React.FC<EditApiKeyModalProps> = ({
  isOpen,
  apiKey,
  onClose,
  onSaveKey,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (apiKey) {
      setName(apiKey.name);
    }
  }, [apiKey]);

  if (!isOpen || !apiKey) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSaveKey(apiKey.id, name.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Edit API Key
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
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Key Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-800 outline-none focus:border-brand-500 focus:bg-white dark:border-gray-800 dark:bg-gray-900/60 dark:text-white dark:focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Key Value (Readonly)
            </label>
            <input
              type="text"
              readOnly
              value={apiKey.value}
              className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-xs font-mono text-gray-500 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-400 cursor-not-allowed"
            />
          </div>

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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

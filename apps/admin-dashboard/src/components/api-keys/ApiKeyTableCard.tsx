"use client";
import React, { useState } from "react";

export interface ApiKeyItem {
  id: string;
  name: string;
  value: string;
  status: "Active" | "Disabled" | "Revoked";
  created: string;
  lastUsed: string;
  enabled: boolean;
}

interface ApiKeyTableCardProps {
  apiKeys: ApiKeyItem[];
  onOpenCreateModal: () => void;
  onOpenEditModal: (apiKey: ApiKeyItem) => void;
  onToggleStatus: (id: string) => void;
  onRegenerateKey: (id: string) => void;
  onDeleteKey: (id: string) => void;
}

export const ApiKeyTableCard: React.FC<ApiKeyTableCardProps> = ({
  apiKeys,
  onOpenCreateModal,
  onOpenEditModal,
  onToggleStatus,
  onRegenerateKey,
  onDeleteKey,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8 dark:border-gray-800 dark:bg-white/[0.03]">
      {/* Header Section inside Card */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            API Keys
          </h3>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            API keys are used to authentication requests to the AdminArif API
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-medium text-white hover:bg-brand-600 transition shadow-theme-xs"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 2.91667V11.0833M2.91667 7H11.0833" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add API Key
        </button>
      </div>

      {/* Table Section */}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th className="pb-4 text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[320px]">
                Name
              </th>
              <th className="pb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="pb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                Created
              </th>
              <th className="pb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                Last used
              </th>
              <th className="pb-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                Disable/Enable
              </th>
              <th className="pb-4 text-xs font-medium text-right text-gray-500 dark:text-gray-400">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-xs">
            {apiKeys.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400">
                  No API keys found. Click "Add API Key" to generate one.
                </td>
              </tr>
            ) : (
              apiKeys.map((item) => (
                <tr key={item.id} className="group">
                  {/* Name & Key Input Group */}
                  <td className="py-5 pr-6 align-middle">
                    <div className="space-y-2">
                      <span className="block text-xs font-semibold text-gray-800 dark:text-gray-200">
                        {item.name}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* Key Input + Copy Button */}
                        <div className="inline-flex items-center rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/60 overflow-hidden shadow-theme-xs">
                          <input
                            type="text"
                            readOnly
                            value={item.value}
                            className="w-56 bg-transparent px-3 py-2 text-xs font-mono text-gray-700 dark:text-gray-300 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleCopy(item.id, item.value)}
                            className="flex items-center gap-1.5 border-l border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
                          >
                            {copiedId === item.id ? (
                              <span className="text-emerald-500 font-bold">Copied!</span>
                            ) : (
                              <>
                                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                </svg>
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Regenerate Refresh Button */}
                        <button
                          type="button"
                          onClick={() => onRegenerateKey(item.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400 dark:hover:text-white transition shadow-theme-xs"
                          title="Regenerate Key"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-5 pr-6 align-middle">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Active" && item.enabled
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
                      }`}
                    >
                      {item.enabled ? item.status : "Disabled"}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td className="py-5 pr-6 align-middle text-gray-600 dark:text-gray-400">
                    {item.created}
                  </td>

                  {/* Last used */}
                  <td className="py-5 pr-6 align-middle text-gray-600 dark:text-gray-400">
                    {item.lastUsed}
                  </td>

                  {/* Disable / Enable Toggle Switch */}
                  <td className="py-5 pr-6 align-middle">
                    <button
                      type="button"
                      onClick={() => onToggleStatus(item.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                        item.enabled ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
                          item.enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Action Icons */}
                  <td className="py-5 align-middle text-right">
                    <div className="inline-flex items-center justify-end gap-3 text-gray-400">
                      {/* Delete Icon */}
                      <button
                        type="button"
                        onClick={() => onDeleteKey(item.id)}
                        className="hover:text-rose-600 transition"
                        title="Delete Key"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                      {/* Edit Icon */}
                      <button
                        type="button"
                        onClick={() => onOpenEditModal(item)}
                        className="hover:text-brand-500 dark:hover:text-brand-400 transition"
                        title="Edit Key"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

"use client";
import React from "react";
import { IntegrationItem } from "./IntegrationCard";

interface IntegrationDetailsModalProps {
  isOpen: boolean;
  integration: IntegrationItem | null;
  onClose: () => void;
  onToggleConnected: (id: string) => void;
}

export const IntegrationDetailsModal: React.FC<IntegrationDetailsModalProps> = ({
  isOpen,
  integration,
  onClose,
  onToggleConnected,
}) => {
  if (!isOpen || !integration) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
              {integration.logo}
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {integration.name}
              </h3>
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                  integration.connected
                    ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {integration.connected ? "Connected" : "Disconnected"}
              </span>
            </div>
          </div>

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

        <div className="mt-6 space-y-4 text-xs text-gray-600 dark:text-gray-300">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">About Integration</h4>
            <p className="leading-relaxed text-gray-500 dark:text-gray-400">
              {integration.description}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Category:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">{integration.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Permissions:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">Read & Write Access</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Sync Status:</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">Auto-sync (Realtime)</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              onToggleConnected(integration.id);
              onClose();
            }}
            className={`rounded-xl px-5 py-2.5 text-xs font-medium text-white transition ${
              integration.connected
                ? "bg-rose-500 hover:bg-rose-600"
                : "bg-brand-500 hover:bg-brand-600"
            }`}
          >
            {integration.connected ? "Disconnect" : "Connect Integration"}
          </button>
        </div>
      </div>
    </div>
  );
};

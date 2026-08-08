"use client";
import React, { useState } from "react";

export interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  description: string;
  connected: boolean;
  logo: React.ReactNode;
}

interface IntegrationCardProps {
  integration: IntegrationItem;
  onToggleConnected: (id: string) => void;
  onOpenDetails: (integration: IntegrationItem) => void;
  onDeleteIntegration: (id: string) => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onToggleConnected,
  onOpenDetails,
  onDeleteIntegration,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs transition dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-md">
      <div>
        {/* Top Header Row: Logo & Options */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 p-2.5 dark:bg-gray-800/60 dark:border-gray-700/60">
            {integration.logo}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-1 w-36 rounded-xl border border-gray-100 bg-white p-1.5 shadow-xl dark:border-gray-800 dark:bg-gray-900 z-20">
                <button
                  type="button"
                  onClick={() => {
                    onOpenDetails(integration);
                    setShowDropdown(false);
                  }}
                  className="w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
                >
                  View Details
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onToggleConnected(integration.id);
                    setShowDropdown(false);
                  }}
                  className="w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition"
                >
                  {integration.connected ? "Disconnect" : "Connect"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeleteIntegration(integration.id);
                    setShowDropdown(false);
                  }}
                  className="w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10 transition"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Integration Name & Description */}
        <h4 className="text-base font-bold text-gray-900 dark:text-white">
          {integration.name}
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {integration.description}
        </p>
      </div>

      {/* Bottom Controls Row */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 dark:border-gray-800/60 pt-4">
        <div className="flex items-center gap-2">
          {/* Settings Gear Button */}
          <button
            type="button"
            onClick={() => onOpenDetails(integration)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-400 dark:hover:text-white transition shadow-theme-xs"
            title="Settings"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>

          {/* Details Button */}
          <button
            type="button"
            onClick={() => onOpenDetails(integration)}
            className="rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:bg-gray-800 transition shadow-theme-xs"
          >
            Details
          </button>
        </div>

        {/* Active Toggle Switch */}
        <button
          type="button"
          onClick={() => onToggleConnected(integration.id)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
            integration.connected ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${
              integration.connected ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

"use client";
import React from "react";

export const MapTwoCard: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Map 2
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Clear view of locations at a glance
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 min-h-[300px] flex items-center justify-center">
        {/* Open in Maps Overlay Button */}
        <div className="absolute top-4 left-4 z-10">
          <a
            href="https://maps.google.com/?q=Pimjo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-xs hover:bg-white dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-200 backdrop-blur-xs transition"
          >
            Open in Maps
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Map iframe */}
        <iframe
          title="Pimjo Map View"
          src="https://maps.google.com/maps?q=Embassy%20of%20People's%20Republic%20of%20China%20Dhaka&t=&z=14&ie=UTF8&iwloc=&output=embed"
          className="w-full h-[300px] border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
};

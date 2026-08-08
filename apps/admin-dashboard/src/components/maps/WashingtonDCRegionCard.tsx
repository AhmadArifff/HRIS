"use client";
import React, { useState } from "react";

export const WashingtonDCRegionCard: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Washington D.C. Region
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Interactive map with Home and Office Pinned
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-emerald-50/20 dark:bg-gray-900 min-h-[340px] flex items-center justify-center">
        {/* Map iframe */}
        <iframe
          title="Washington DC Region Map"
          src="https://maps.google.com/maps?q=Alexandria%20VA&t=&z=12&ie=UTF8&iwloc=&output=embed"
          className="w-full h-[340px] border-0 transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
          loading="lazy"
        />

        {/* Pinned Badges Overlay */}
        <div className="absolute left-[30%] bottom-[35%] z-10 flex flex-col items-center gap-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-500 shadow-lg border border-brand-100 font-bold text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-gray-800 shadow-md border border-gray-100">
            Home
          </span>
        </div>

        <div className="absolute right-[32%] top-[28%] z-10 flex flex-col items-center gap-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg border border-blue-100 font-bold text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-gray-800 shadow-md border border-gray-100">
            Office
          </span>
        </div>

        {/* Floating Zoom Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-1 rounded-lg border border-gray-200 bg-white/90 p-1 shadow-md dark:border-gray-700 dark:bg-gray-900/90 backdrop-blur-xs z-10">
          <button
            type="button"
            onClick={handleZoomIn}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 font-bold transition text-xs"
            title="Zoom In"
          >
            +
          </button>
          <div className="h-px bg-gray-200 dark:bg-gray-700" />
          <button
            type="button"
            onClick={handleZoomOut}
            className="flex h-7 w-7 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 font-bold transition text-xs"
            title="Zoom Out"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

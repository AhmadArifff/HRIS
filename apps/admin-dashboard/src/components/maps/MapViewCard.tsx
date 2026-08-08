"use client";
import React, { useState } from "react";

export const MapViewCard: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          Map View
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Clear view of locations at a glance
        </p>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 bg-amber-50/20 dark:bg-gray-900 min-h-[300px] flex items-center justify-center">
        {/* OpenStreetMap Iframe Container */}
        <iframe
          title="Map View Washington"
          src="https://maps.google.com/maps?q=Washington%20DC&t=&z=11&ie=UTF8&iwloc=&output=embed"
          className="w-full h-[300px] border-0 transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel})` }}
          loading="lazy"
        />

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

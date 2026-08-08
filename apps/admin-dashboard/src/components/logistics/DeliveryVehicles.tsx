import React from "react";
import Image from "next/image";
import { HorizontaLDots } from "@/icons";

export const DeliveryVehicles = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-4 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Delivery Vehicles
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Vehicles operating on the road
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <HorizontaLDots />
        </button>
      </div>

      <div className="flex items-end justify-between mt-4">
        <div>
          <h4 className="text-3xl font-bold text-gray-800 dark:text-white/90">
            29
          </h4>
          <p className="mt-1 text-sm text-success-500">
            +5.85% <span className="text-gray-500 dark:text-gray-400">than last week</span>
          </p>
          
          <div className="mt-6 flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03] w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">On-route</span>
          </div>
        </div>
        
        <div className="relative h-24 w-32 shrink-0">
          <div className="absolute -bottom-6 -right-2 h-28 w-40">
             {/* Using SVG as fallback for truck image */}
             <svg viewBox="0 0 200 120" className="w-full h-full text-gray-400" fill="currentColor">
               <path d="M180,60 h-20 V30 c0,-11 -9,-20 -20,-20 H20 C9,10 0,19 0,30 v60 c0,11 9,20 20,20 h10 c0,16.6 13.4,30 30,30 s30,-13.4 30,-30 h40 c0,16.6 13.4,30 30,30 s30,-13.4 30,-30 h10 v-20 L180,60 z M60,120 c-11,0 -20,-9 -20,-20 s9,-20 20,-20 s20,9 20,20 S71,120 60,120 z M160,120 c-11,0 -20,-9 -20,-20 s9,-20 20,-20 s20,9 20,20 S171,120 160,120 z M150,70 V40 h20 l20,30 H150 z" opacity="0.5"/>
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

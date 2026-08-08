import React from "react";
import Image from "next/image";
import { HorizontaLDots } from "@/icons";

export const TrackingDelivery = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Tracking Delivery
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last viewed delivery history
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
          <HorizontaLDots />
        </button>
      </div>

      <div className="mb-6 h-[200px] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 relative">
        <Image 
          src="/images/map/map-01.png" 
          alt="Map tracking" 
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 opacity-50 bg-black/5 dark:bg-white/5">
          {/* Placeholder if image is missing */}
        </div>
      </div>

      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tracking ID</p>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">#28745-72809bjk</h4>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-success-50 px-2.5 py-1 text-sm font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
          In Transit
        </span>
      </div>

      <div className="relative mb-6">
        <div className="absolute left-[19px] top-6 bottom-6 w-0.5 border-l-2 border-dashed border-gray-200 dark:border-gray-800"></div>

        <div className="relative mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400 ring-8 ring-white dark:ring-gray-900 z-10">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">12 Apr 2028</p>
              <h5 className="font-semibold text-gray-800 dark:text-white/90">Picked up</h5>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">12:54</span>
          </div>
        </div>

        <div className="relative mb-6 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white shadow-sm ring-8 ring-white dark:ring-gray-900 z-10">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-500">12 Apr 2028</p>
              <h5 className="font-semibold text-gray-800 dark:text-white/90">In Transit</h5>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">12:58</span>
          </div>
        </div>

        <div className="relative flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-400 dark:border-gray-700 dark:bg-gray-800 ring-8 ring-white dark:ring-gray-900 z-10">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">13 Apr 2028</p>
              <h5 className="font-semibold text-gray-800 dark:text-white/90">Delivered</h5>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">---</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 pt-6 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full">
            <Image
              src="/images/user/user-03.jpg"
              alt="Courier avatar"
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Courier</p>
            <h5 className="font-semibold text-gray-800 dark:text-white/90">David walthen</h5>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

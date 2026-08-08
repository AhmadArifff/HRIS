"use client";
import React from "react";

import { MoreDotIcon } from "@/icons";

const sourceData = [
  {
    brandImg: "/images/brand/brand-05.svg",
    name: "Google",
    percentage: 79,
  },
  {
    brandImg: "/images/brand/brand-06.svg",
    name: "Youtube",
    percentage: 55,
  },
  {
    brandImg: "/images/brand/brand-02.svg",
    name: "Facebook",
    percentage: 48,
  },
  {
    brandImg: "/images/brand/brand-04.svg",
    name: "Instagram",
    percentage: 48,
  },
];

export const TopTrafficSource = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Top Traffic Source
          </h3>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>
      <div>
        {sourceData.map((source, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 dark:border-gray-800"
          >
            <div className="flex items-center gap-4">
              <div className="items-center w-full rounded-full max-w-8">
                <img
                  alt="brand"
                  src={source.brandImg}
                />
              </div>
              <div>
                <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-300 whitespace-nowrap">
                  {source.name}
                </p>
              </div>
            </div>
            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
                  style={{ width: `${source.percentage}%` }}
                ></div>
              </div>
              <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                {source.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="mt-6 flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white p-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] whitespace-nowrap"
      >
        View All
      </a>
    </div>
  );
};

import React from "react";
import Image from "next/image";
import { ArrowUpIcon, ArrowDownIcon } from "@/icons";

const watchlist = [
  {
    symbol: "AAPL",
    name: "Apple, Inc",
    price: "$4,008.65",
    change: "11.01%",
    isPositive: true,
    logo: "/images/brand/brand-07.svg",
  },
  {
    symbol: "SPOT",
    name: "Spotify.com",
    price: "$392.53",
    change: "3.59%",
    isPositive: true,
    logo: "/images/brand/brand-11.svg",
  },
  {
    symbol: "ABNB",
    name: "Airbnb, Inc",
    price: "$192.53",
    change: "9.05%",
    isPositive: false,
    logo: "/images/brand/brand-12.svg",
  },
  {
    symbol: "ENVT",
    name: "Envato",
    price: "$192.53",
    change: "9.05%",
    isPositive: false,
    logo: "/images/brand/brand-13.svg",
  },
];

export const MyWatchlist = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          My Watchlist
        </h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.2441 6C10.2441 5.0335 11.0276 4.25 11.9941 4.25H12.0041C12.9706 4.25 13.7541 5.0335 13.7541 6C13.7541 6.9665 12.9706 7.75 12.0041 7.75H11.9941C11.0276 7.75 10.2441 6.9665 10.2441 6ZM10.2441 18C10.2441 17.0335 11.0276 16.25 11.9941 16.25H12.0041C12.9706 16.25 13.7541 17.0335 13.7541 18C13.7541 18.9665 12.9706 19.75 12.0041 19.75H11.9941C11.0276 19.75 10.2441 18.9665 10.2441 18ZM11.9941 10.25C11.0276 10.25 10.2441 11.0335 10.2441 12C10.2441 12.9665 11.0276 13.75 11.9941 13.75H12.0041C12.9706 13.75 13.7541 12.9665 13.7541 12C13.7541 11.0335 12.9706 10.25 12.0041 10.25H11.9941Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex h-[372px] flex-col">
        <div className="flex flex-col h-auto pr-3 overflow-y-auto custom-scrollbar">
          {watchlist.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between pt-4 pb-4 border-b border-gray-200 first:pt-0 last:border-b-0 last:pb-0 dark:border-gray-800"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10">
                  <Image width={40} height={40} alt={item.name} src={item.logo} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {item.symbol}
                  </h3>
                  <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                    {item.name}
                  </span>
                </div>
              </div>
              <div>
                <h4 className="mb-1 font-medium text-right text-gray-700 text-theme-sm dark:text-gray-400">
                  {item.price}
                </h4>
                <span
                  className={`flex items-center justify-end gap-1 font-medium text-theme-xs ${
                    item.isPositive
                      ? "text-success-600 dark:text-success-500"
                      : "text-error-600 dark:text-error-500"
                  }`}
                >
                  {item.isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  {item.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

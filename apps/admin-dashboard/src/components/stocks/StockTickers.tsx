import React from "react";
import Image from "next/image";
import { ArrowUpIcon, ArrowDownIcon } from "@/icons";

const tickers = [
  {
    name: "Apple, Inc",
    symbol: "Apple, Inc",
    price: "$1,232.00",
    change: "11.01%",
    isPositive: true,
    logo: "/images/brand/brand-07.svg",
  },
  {
    name: "Paypal, Inc",
    symbol: "Paypal, Inc",
    price: "$965.00",
    change: "9.05%",
    isPositive: false,
    logo: "/images/brand/brand-08.svg",
  },
  {
    name: "Tesla, Inc",
    symbol: "Tesla, Inc",
    price: "$1,232.00",
    change: "11.01%",
    isPositive: true,
    logo: "/images/brand/brand-09.svg",
  },
  {
    name: "Amazon.com, Inc",
    symbol: "Amazon.com, Inc",
    price: "$2,567.00",
    change: "11.01%",
    isPositive: true,
    logo: "/images/brand/brand-10.svg",
  },
];

export const StockTickers = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 xl:grid-cols-4">
      {tickers.map((ticker, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white px-6 pb-5 pt-6 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10">
              <Image
                width={40}
                height={40}
                alt={ticker.name}
                src={ticker.logo}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                {ticker.name}
              </h3>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                {ticker.symbol}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                {ticker.price}
              </h4>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-sm ${
                ticker.isPositive
                  ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                  : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
              }`}
            >
              <span className="mr-1">
                {ticker.isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </span>
              {ticker.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

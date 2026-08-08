"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowUpIcon, ArrowDownIcon } from "@/icons";

const trendingStocks = [
  {
    name: "TSLA",
    company: "Tesla, Inc",
    price: "$192.53",
    change: "1.01%",
    isPositive: true,
    logo: "/images/brand/brand-09.svg",
  },
  {
    name: "AAPL",
    company: "Apple, Inc",
    price: "$192.53",
    change: "3.59%",
    isPositive: true,
    logo: "/images/brand/brand-07.svg",
  },
  {
    name: "SPOT",
    company: "Spotify, Inc",
    price: "$192.53",
    change: "3.59%",
    isPositive: true,
    logo: "/images/brand/brand-11.svg",
  },
];

export const TrendingStocks = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Trending Stocks
        </h3>
        <div className="relative flex items-center gap-1.5">
          <button className="swiper-button-prev-custom flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1667 4L6 8.16667L10.1667 12.3333"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <button className="swiper-button-next-custom flex items-center justify-center text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.83333 12.6667L10 8.50002L5.83333 4.33335"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            480: {
              slidesPerView: 2,
            },
          }}
        >
          {trendingStocks.map((stock, idx) => (
            <SwiperSlide key={idx}>
              <div className="rounded-2xl bg-gray-100 p-5 dark:bg-white/[0.03]">
                <div className="flex items-center justify-between pb-5 mb-5 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10">
                      <Image
                        width={40}
                        height={40}
                        alt="brand"
                        src={stock.logo}
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                        {stock.name}
                      </h3>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {stock.company}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <h4 className="mb-1 font-medium text-right text-gray-700 text-theme-sm dark:text-gray-400">
                        {stock.price}
                      </h4>
                    </div>
                    <span
                      className={`flex items-center justify-end gap-1 font-medium text-theme-xs ${
                        stock.isPositive
                          ? "text-success-600 dark:text-success-500"
                          : "text-error-600 dark:text-error-500"
                      }`}
                    >
                      {stock.isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
                      {stock.change}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white p-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                    Short Stock
                  </button>
                  <button className="flex items-center justify-center w-full p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm shadow-theme-xs hover:bg-brand-600">
                    Buy Stock
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

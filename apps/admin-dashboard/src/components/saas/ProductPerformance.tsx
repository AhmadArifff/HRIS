"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { HorizontaLDots } from "@/icons";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const ProductPerformance = () => {
  const [activeTab, setActiveTab] = useState("Daily Sales");

  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#465fff"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6b7280",
          fontSize: "12px",
        },
      },
      max: 400,
      tickAmount: 4,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val.toString();
        },
      },
    },
    grid: {
      show: false,
    },
  };

  const series = [
    {
      name: "Sales",
      data: [160, 380, 190, 290, 180, 190, 150],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Product Performance
          </h3>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <HorizontaLDots />
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-6 flex rounded-lg border border-gray-200 p-1 dark:border-gray-800 w-full justify-between">
        {["Daily Sales", "Online Sales", "New Users"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-1/3 rounded-md py-1.5 text-xs font-medium ${
              activeTab === tab
                ? "bg-white text-gray-800 shadow-sm dark:bg-gray-800 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Metrics */}
      <div className="mb-6 grid grid-cols-2 gap-4 border-b border-gray-200 pb-6 dark:border-gray-800">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Digital Product</p>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 13.3333V2.66667M8 2.66667L3.33337 7.33333M8 2.66667L12.6667 7.33333" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">790</h4>
          </div>
        </div>
        <div className="border-l border-gray-200 pl-4 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Physical Product</p>
          <div className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2.66667V13.3333M8 13.3333L3.33337 8.66667M8 13.3333L12.6667 8.66667" stroke="#F04438" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">572</h4>
          </div>
        </div>
      </div>

      {/* Average Daily Sales */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Daily Sales</p>
          <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">$2,950</h4>
        </div>
        <div>
          <span className="flex items-center gap-1 rounded-full bg-error-50 px-2 py-0.5 text-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1.66667V8.33333M5 8.33333L1.66663 5M5 8.33333L8.33329 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            0.52%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div id="chartTwentyFour" className="-ml-4 -mr-5">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={260}
        />
      </div>
    </div>
  );
};

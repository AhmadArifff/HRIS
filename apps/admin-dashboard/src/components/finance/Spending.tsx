"use client";
import React, { useState } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamically import ReactApexChart to prevent SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Spending() {

  const [periodOpen, setPeriodOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Yearly');
  const periods = ['Yearly', 'Monthly', 'Weekly'];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      fontFamily: "'Outfit', sans-serif",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "100%",
        borderRadius: 2,
      },
    },
    colors: ["#7592FF", "#7CD4FD", "#BDB4FE", "#FE9EFE", "#6FEAA6", "#D0D5DD"],
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    legend: { show: false },
    grid: { show: false },
    tooltip: {
      theme: "light",
      y: { formatter: (val) => val + "%" }
    }
  };

  const series = [
    { name: "Activity", data: [45] },
    { name: "Online Purchases", data: [25] },
    { name: "Groceries", data: [15] },
    { name: "Digital Goods", data: [20] },
    { name: "Stationery", data: [10] },
    { name: "Others", data: [30] },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 md:col-span-1 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Spending</h3>
        <div className="relative">
          <button type="button" className="flex h-9 items-center justify-center gap-1 rounded-lg border border-gray-200 pr-2 pl-3 text-sm font-medium text-gray-700 shadow-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-900">
            <span>Yearly</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform ">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
      <div>
        <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">Total</p>
        <h4 className="mb-4 text-3xl font-medium text-gray-800 dark:text-white/90">$10,758</h4>
      </div>
      
      <div className="-ml-1 w-full h-[65px]">
        <ReactApexChart options={options} series={series} type="bar" height={80} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#7592FF]"></span>
          <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Activity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#7CD4FD]"></span>
          <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Online Purchases</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#BDB4FE]"></span>
          <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Groceries</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#FE9EFE]"></span>
          <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Digital Goods</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#6FEAA6]"></span>
          <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Stationery</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#D0D5DD]"></span>
          <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Others</span>
        </div>
      </div>
    </div>
  );
}

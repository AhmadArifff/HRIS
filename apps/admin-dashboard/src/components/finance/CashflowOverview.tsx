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

export default function CashflowOverview() {

  const [yearOpen, setYearOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2025');
  const years = ['2025', '2024', '2023'];

  const [monthOpen, setMonthOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('3 Month');
  const months = ['3 Month', '6 Month', '12 Month'];

  const options: ApexOptions = {
    colors: ["#465fff", "#9cb9ff"],
    chart: {
      type: "bar",
      fontFamily: "'Outfit', sans-serif",
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 2,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: { colors: "#98a2b3", fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#98a2b3", fontSize: "12px" },
        formatter: (value) => {
          return value >= 1000 ? value / 1000 + "K" : value.toString();
        },
      },
    },
    legend: { show: false },
    grid: {
      borderColor: "#e9edf5",
      strokeDashArray: 0,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val) => "$" + val,
      },
    },
  };

  const series = [
    {
      name: "Income",
      data: [9500, 6400, 14000, 7500, 9500, 10200, 7000, 11600, 9200, 12500, 7600, 6400],
    },
    {
      name: "Expense",
      data: [6200, 4100, 9200, 5000, 6300, 6800, 4600, 7600, 6000, 8200, 5000, 4100],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex flex-col justify-between gap-5 sm:flex-row">
        <div>
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Cashflow Overview</h3>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            
<div className="relative">
<button onClick={() => setYearOpen(!yearOpen)} className="dropdown-toggle flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-2.5 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
  <span>{selectedYear}</span>
  <svg className="transition-transform " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
</button>
<Dropdown isOpen={yearOpen} onClose={() => setYearOpen(false)} className="w-32 p-2">
  {years.map((year) => (
    <DropdownItem key={year} onItemClick={() => { setSelectedYear(year); setYearOpen(false); }} className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
      {year}
      {selectedYear === year && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#465FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </DropdownItem>
  ))}
</Dropdown>
</div>

          </div>
          <div className="relative">
            
<div className="relative">
<button onClick={() => setMonthOpen(!monthOpen)} className="dropdown-toggle flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-2.5 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
  <span>{selectedMonth}</span>
  <svg className="transition-transform " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
</button>
<Dropdown isOpen={monthOpen} onClose={() => setMonthOpen(false)} className="w-32 p-2">
  {months.map((month) => (
    <DropdownItem key={month} onItemClick={() => { setSelectedMonth(month); setMonthOpen(false); }} className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
      {month}
      {selectedMonth === month && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#465FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </DropdownItem>
  ))}
</Dropdown>
</div>

          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="mb-1.5 text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
          <div className="flex items-center gap-3">
            <h4 className="text-2xl font-medium text-gray-800 dark:text-white/90">$9,758.00</h4>
            <span className="flex items-center gap-1 rounded-full bg-success-50 px-2 py-0.5 text-xs font-medium text-success-600 dark:bg-success-500/10 dark:text-success-500">
              +7.96%
            </span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <button className="flex cursor-pointer items-center gap-2 select-none transition-opacity duration-200 hover:opacity-80 ">
            <span className="block size-2.5 rounded-full bg-brand-500"></span>
            <span className="text-sm font-normal text-gray-800 dark:text-white/90">Income</span>
          </button>
          <button className="flex cursor-pointer items-center gap-2 select-none transition-opacity duration-200 hover:opacity-80 ">
            <span className="block size-2.5 rounded-full bg-brand-300"></span>
            <span className="text-sm font-normal text-gray-800 dark:text-white/90">Expense</span>
          </button>
        </div>
      </div>
      
      <div className="-ml-4 h-[250px]">
        <ReactApexChart options={options} series={series} type="bar" height={265} />
      </div>
    </div>
  );
}

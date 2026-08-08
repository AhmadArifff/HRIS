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

export default function TotalBalance() {

  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({ label: 'USD', flag: '🇺🇸' });
  const currencies = [
    { label: 'USD', flag: '🇺🇸' },
    { label: 'EUR', flag: '🇪🇺' },
    { label: 'GBP', flag: '🇬🇧' },
    { label: 'JPY', flag: '🇯🇵' },
  ];

  const [dateOpen, setDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('June 2025');
  const dates = ['June 2025', 'July 2025', 'August 2025'];

  const options: ApexOptions = {
    chart: {
      type: "area",
      fontFamily: "'Outfit', sans-serif",
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    colors: ["#465fff"],
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
      marker: { show: false },
    },
  };

  const series = [
    {
      name: "Balance",
      data: [54.4, 51.68, 52.36, 51, 47.6, 44.2, 40.8, 47.6, 46.24, 45.56, 48.28, 48.96, 49.64, 48.28, 37.4, 28.56, 20.4, 13.6, 19.04, 21.76, 10.2, 14.28, 15.64, 17],
    },
  ];

  return (
    <div className="rounded-[18px] border border-gray-200 bg-gray-100 p-1.5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col justify-between rounded-xl bg-white p-6 dark:bg-gray-900">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-5">
          <div>
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">Total Balance</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Overview of your current funds</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              
<button onClick={() => setCurrencyOpen(!currencyOpen)} className="dropdown-toggle flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
  <span className="flex items-center gap-1.5">
    <span>{selectedCurrency.flag}</span>
    {selectedCurrency.label}
  </span>
  <svg className="transition-transform " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
</button>
<Dropdown isOpen={currencyOpen} onClose={() => setCurrencyOpen(false)} className="w-32 p-2">
  {currencies.map((curr) => (
    <DropdownItem key={curr.label} onItemClick={() => { setSelectedCurrency(curr); setCurrencyOpen(false); }} className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
      <span className="flex items-center gap-2"><span>{curr.flag}</span> {curr.label}</span>
      {selectedCurrency.label === curr.label && (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#465FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </DropdownItem>
  ))}
</Dropdown>

            </div>
            <div className="relative">
              
<button onClick={() => setDateOpen(!dateOpen)} className="dropdown-toggle flex h-9 items-center justify-center gap-2 rounded-lg border border-gray-300 px-3 text-sm font-medium text-gray-700 shadow-xs dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400">
  <span>{selectedDate}</span>
  <svg className="transition-transform " width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.3125 7.21875L9 11.9063L13.6875 7.21875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </svg>
</button>
<Dropdown isOpen={dateOpen} onClose={() => setDateOpen(false)} className="w-40 p-2">
  {dates.map((date) => (
    <DropdownItem key={date} onItemClick={() => { setSelectedDate(date); setDateOpen(false); }} className="flex w-full items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
      {date}
      {selectedDate === date && (
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

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-medium text-gray-800 dark:text-white/90">19,857.00</h2>
            <p className="mt-2 flex items-center gap-1.5 text-sm font-normal text-gray-500 dark:text-gray-400">
              <span className="text-success-600 flex items-center gap-1 font-medium">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.9974 2.66602L7.9974 13.3336M4 6.66334L7.99987 2.66602L12 6.66334" stroke="#039855" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                3.2%
              </span>
              than last month
            </p>
          </div>
          <div className="w-[150px]">
            <ReactApexChart options={options} series={series} type="area" height={70} />
          </div>
        </div>

        <div className="pt-7.5 mt-5 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:items-center gap-2 sm:flex-row">
            <p className="shrink-0 text-sm text-gray-700 dark:text-gray-400">Primary Account:</p>
            <div className="flex items-center gap-2">
              <p className="shrink-0 text-lg font-medium text-gray-700 dark:text-gray-400">•••• •••• •••• 5332</p>
              <div className="shrink-0">
                <button type="button" className="relative flex h-8 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-700 shadow-xs hover:bg-gray-100 dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/5">
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20" className="absolute">
                    <path d="M14.1559 14.1628H7.08724C6.39688 14.1628 5.83724 13.6032 5.83724 12.9128V5.84416M14.1559 14.1628V15.4161C14.1559 16.1065 13.5963 16.6661 12.9059 16.6661H4.58398C3.89363 16.6661 3.33398 16.1065 3.33398 15.4161V7.09416C3.33398 6.4038 3.89363 5.84416 4.58398 5.84416H5.83724M14.1559 14.1628H15.4144C16.1048 14.1628 16.6644 13.6032 16.6644 12.9128V4.58398C16.6644 3.89363 16.1048 3.33398 15.4144 3.33398H7.08724C6.39688 3.33398 5.83724 3.89363 5.83724 4.58398V5.84416" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
              </div>
              <button className="flex h-8 shrink-0 items-center justify-center rounded-lg border border-gray-300 px-3 text-sm text-gray-700 shadow-xs hover:bg-gray-100 dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/5">See Details</button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-5 pb-4 mt-5 border-t border-gray-100 dark:border-gray-800">
          <button className="flex h-11 flex-1 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-medium text-white hover:bg-brand-600">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9968 5.00356L5 15.0003M14.9977 12.4949L14.9953 5.00214L7.49917 4.99951" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            Transfer
          </button>
          <button className="flex h-11 flex-1 shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.00095 14.9963L14.9977 4.99954M5 7.50539L5.00238 14.9981L12.4985 15.0007" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            Received
          </button>
          <button className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 transition dark:border-gray-700 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:bg-white/5">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 10.0002H15.0006M10.0002 5V15.0006" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

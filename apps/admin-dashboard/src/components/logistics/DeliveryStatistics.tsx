"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const DeliveryStatistics = () => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#BFDBFE", "#3B82F6"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 4,
        borderRadiusApplication: "end",
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
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
        formatter: (val) => {
          return val + "%";
        },
      },
      max: 100,
      tickAmount: 5,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      markers: {
        shape: "circle",
      },
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: function (val) {
          return val + "%";
        },
      },
    },
  };

  const series = [
    {
      name: "Shipment",
      data: [78, 60, 70, 40, 62, 50, 48, 65, 20, 50, 60, 75],
    },
    {
      name: "Delivery",
      data: [88, 50, 65, 25, 78, 68, 62, 88, 30, 70, 88, 92],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Delivery Statistics
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total number of deliveries 70.5K
          </p>
        </div>
        <div>
          <select className="dark:bg-gray-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none dark:border-gray-700 dark:text-white/90">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>
      <div className="-ml-4 -mr-5">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={280}
        />
      </div>
    </div>
  );
};

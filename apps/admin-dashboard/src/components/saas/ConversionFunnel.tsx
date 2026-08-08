"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const ConversionFunnel = () => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      fontFamily: "Outfit, sans-serif",
      toolbar: {
        show: false,
      },
    },
    colors: ["#3f2b96", "#3B82F6", "#60A5FA", "#93C5FD"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 8,
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
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
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
      },
      max: 120,
      tickAmount: 6,
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
          return val.toString();
        },
      },
    },
  };

  const series = [
    {
      name: "Ad Impressions",
      data: [40, 42, 41, 44, 25, 43, 41, 40],
    },
    {
      name: "Website Session",
      data: [15, 25, 23, 24, 20, 22, 23, 25],
    },
    {
      name: "App Download",
      data: [15, 10, 11, 13, 10, 15, 12, 10],
    },
    {
      name: "New Users",
      data: [15, 25, 25, 21, 22, 10, 25, 25],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Conversion Funnel
          </h3>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar pl-2">
        <div className="-ml-5 min-w-[700px] xl:min-w-full" style={{ minHeight: "330px" }}>
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={315}
          />
        </div>
      </div>
    </div>
  );
};

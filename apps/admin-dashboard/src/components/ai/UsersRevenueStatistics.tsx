"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const UsersRevenueStatistics = () => {
  const [activeTab, setActiveTab] = useState("Monthly");

  const formatYAxis = (val: number) => {
    return (val / 1000) + "k";
  };

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#465FFF", "#9CB9FF"], 
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 450,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {},
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      curve: "straight",
      width: [2, 2],
      colors: ["#465FFF", "#9CB9FF"],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
        formatter: formatYAxis,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },

    tooltip: {
      y: {
        formatter: (val) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Users",
      data: [15000, 22000, 19000, 24000, 18000, 17000, 21000, 14000, 26000, 31000, 25000, 16000],
    },
    {
      name: "Revenue",
      data: [10000, 15000, 13000, 18000, 14000, 12000, 16000, 9000, 21000, 24000, 19000, 11000],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Users &amp; Revenue Statistics
          </h3>
          <p className="mt-1 text-theme-sm text-gray-500 dark:text-gray-400">
            Visualize month-to-month progress and engagement.
          </p>
        </div>
        <div className="inline-flex h-11 w-fit items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
          {["Monthly", "Quarterly", "Annually"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-theme-sm h-10 rounded-md px-3 py-2.5 font-medium transition-colors ${
                activeTab === tab
                  ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="custom-scrollbar max-w-full overflow-x-auto">
        <div className="-ml-4 min-w-0 flex-shrink-0 pl-2 xl:min-w-full">
          <Chart options={options} series={series} type="area" height={450} />
        </div>
      </div>
    </div>
  );
};

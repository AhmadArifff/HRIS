"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { Dropdown } from "../ui/dropdown/Dropdown";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const ActiveUsers = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "area",
      height: 155,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.05,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (seriesName) {
            return "";
          },
        },
      },
      marker: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: "Active Users",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Active Users
        </h3>
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      
      <div className="mt-6 flex items-end gap-1.5">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-5 h-5 rounded-full ripple bg-error-500/10">
            <div className="h-1.5 w-1.5 rounded-full bg-error-500 "></div>
          </div>
          <span className="font-semibold text-gray-800 activeUsers text-title-sm dark:text-white/90">
            364
          </span>
        </div>
        <span className="block mb-1 text-gray-500 text-theme-sm dark:text-gray-400">
          Live visitors
        </span>
      </div>
      
      <div className="my-5 min-h-[155px] rounded-xl bg-gray-50 dark:bg-gray-900">
        <div className="h-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={155}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-6">
        <div>
          <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90">
            224
          </p>
          <p className="mt-0.5 text-center text-theme-xs text-gray-500 dark:text-gray-400">
            Avg, Daily
          </p>
        </div>
        <div className="w-px bg-gray-200 h-11 dark:bg-gray-800"></div>
        <div>
          <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90">
            1.4K
          </p>
          <p className="mt-0.5 text-center text-theme-xs text-gray-500 dark:text-gray-400">
            Avg, Weekly
          </p>
        </div>
        <div className="w-px bg-gray-200 h-11 dark:bg-gray-800"></div>
        <div>
          <p className="text-lg font-semibold text-center text-gray-800 dark:text-white/90">
            22.1K
          </p>
          <p className="mt-0.5 text-center text-theme-xs text-gray-500 dark:text-gray-400">
            Avg, Monthly
          </p>
        </div>
      </div>
    </div>
  );
};

"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export const ApiTokenUsages = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const options: ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "Outfit, sans-serif",
    },
    colors: ["#7592FF", "#7CD4FD", "#BDB4FE"],
    labels: ["xGPT", "Gemini", "xAI"],
    legend: {
      show: false, // We use custom legend below
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "24px",
              fontWeight: 600,
            },
            value: {
              show: true,
              fontSize: "12px",
              fontWeight: 400,
              color: "#667085",
            },
            total: {
              show: true,
              label: "13.5M",
              fontSize: "24px",
              fontWeight: 600,
              color: "#000000",
              formatter: function (w) {
                return "2450";
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
  };

  const series = [900, 700, 850];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-3 py-2 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-3 flex items-center justify-between gap-5 px-4 pt-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            API Token Usages
          </h3>
        </div>
        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown isOpen={isOpen} onClose={closeDropdown} className="w-40 p-2 right-0">
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <Chart options={options} series={series} type="donut" height={250} />
        </div>
        <div className="px-4 pb-4">
          <div className="flex flex-col gap-4">
            {/* xGPT */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f7ff] dark:bg-white/5 text-[#7592FF]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">xGPT</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 API keys configured</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-sm font-semibold text-gray-800 dark:text-white/90">2m</span>
                <span className="block text-[10px] text-gray-500 dark:text-gray-400">Tokens used</span>
              </div>
            </div>

            {/* Gemini */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f7ff] dark:bg-white/5 text-[#7CD4FD]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">Gemini</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 API key configured</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-sm font-semibold text-gray-800 dark:text-white/90">2m</span>
                <span className="block text-[10px] text-gray-500 dark:text-gray-400">Tokens used</span>
              </div>
            </div>

            {/* xAI */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f4f7ff] dark:bg-white/5 text-[#BDB4FE]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 dark:text-white/90">xAI</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 API keys configured</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block text-sm font-semibold text-gray-800 dark:text-white/90">8.5m</span>
                <span className="block text-[10px] text-gray-500 dark:text-gray-400">Tokens used</span>
              </div>
            </div>
          </div>
          
          <button className="mt-6 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
            View All Usage Details
          </button>
        </div>
      </div>
    </div>
  );
};

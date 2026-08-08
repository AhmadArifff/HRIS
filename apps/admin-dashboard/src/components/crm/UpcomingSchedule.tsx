import React from "react";
import { MoreDotIcon } from "@/icons";

const scheduleData = [
  {
    date: "Wed, 11 Jan",
    time: "09:20 AM",
    title: "Business Analytics Press",
    description: "Exploring the Future of Data-Driven +6 more",
  },
  {
    date: "Fri, 15 Feb",
    time: "10:35 AM",
    title: "Business Sprint",
    description: "Techniques from Business Sprint +2 more",
  },
  {
    date: "Thu, 18 Mar",
    time: "1:15 AM",
    title: "Customer Review Meeting",
    description: "Insights from the Customer Review Meeting +8 more",
  },
];

export const UpcomingSchedule = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Upcoming Schedule
        </h3>
        <div className="relative inline-block">
          <button className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[500px] xl:min-w-full">
          <div className="flex flex-col gap-2">
            {scheduleData.map((item, index) => (
              <div
                key={index}
                className="flex cursor-pointer items-center gap-9 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-white/[0.03]"
              >
                <div className="flex items-start gap-3">
                  <div>
                    <label className="flex items-center space-x-3 group cursor-pointer ">
                      <div className="relative w-5 h-5">
                        <input
                          className="peer w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                          type="checkbox"
                        />
                        <svg
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                            stroke="white"
                            strokeWidth="1.94437"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                  <div>
                    <span className="mb-0.5 block text-theme-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {item.date}
                    </span>
                    <span className="font-medium text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="block mb-1 font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                    {item.title}
                  </span>
                  <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                    {item.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

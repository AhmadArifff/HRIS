import React from "react";
import Image from "next/image";
import { HorizontaLDots } from "@/icons";

export const Activities = () => {
  const activities = [
    {
      name: "Francisco Grbbs",
      action: "created invoice",
      invoice: "PQ-4491C",
      time: "Just Now",
      avatar: "/images/user/user-17.jpg",
    },
    {
      name: "Courtney Henry",
      action: "created invoice",
      invoice: "HK-234G",
      time: "15 minutes ago",
      avatar: "/images/user/user-18.jpg",
    },
    {
      name: "Bessie Cooper",
      action: "created invoice",
      invoice: "LH-2891C",
      time: "5 months ago",
      avatar: "/images/user/user-19.jpg",
    },
    {
      name: "Theresa Web",
      action: "created invoice",
      invoice: "CK-125NH",
      time: "2 weeks ago",
      avatar: "/images/user/user-20.jpg",
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="mb-6 flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Activities
          </h3>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <HorizontaLDots />
          </button>
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-6 bottom-10 left-5 w-px bg-gray-200 dark:bg-gray-800"></div>
        
        {activities.map((activity, idx) => (
          <div key={idx} className="relative mb-6 flex">
            <div className="z-10 flex-shrink-0">
              <div className="size-10 rounded-full bg-gray-200 dark:bg-gray-700 ring-4 ring-white dark:ring-gray-800 flex items-center justify-center overflow-hidden">
                <Image 
                  src={activity.avatar} 
                  alt={activity.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="ml-4">
              <div className="mb-1 flex items-center gap-1">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5.0625H14.0625L12.5827 8.35084C12.4506 8.64443 12.4506 8.98057 12.5827 9.27416L14.0625 12.5625H10.125C9.50368 12.5625 9 12.0588 9 11.4375V10.875M3.9375 10.875H9M3.9375 3.375H7.875C8.49632 3.375 9 3.87868 9 4.5V10.875M3.9375 15.9375V2.0625" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <p className="text-theme-xs text-success-500 font-medium">New invoice</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                <h3 className="text-theme-sm font-medium text-gray-800 dark:text-white/90">{activity.name}</h3>
                <span className="text-theme-sm font-normal text-gray-500 dark:text-gray-400">
                  {activity.action}
                </span>
              </div>
              <p className="text-theme-sm font-medium text-gray-800 dark:text-white/90 my-0.5">{activity.invoice}</p>
              <p className="text-theme-sm font-normal text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

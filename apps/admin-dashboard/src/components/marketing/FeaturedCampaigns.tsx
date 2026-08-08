"use client";
import React from "react";
import Image from "next/image";
import { MoreDotIcon } from "@/icons";

const campaignData = [
  {
    userImg: "/images/user/user-17.jpg",
    userName: "Wilson Gouse",
    brandImg: "/images/brand/brand-07.svg",
    campaignName: "Grow your brand by...",
    type: "Ads campaign",
    status: "Success",
  },
  {
    userImg: "/images/user/user-18.jpg",
    userName: "Wilson Gouse",
    brandImg: "/images/brand/brand-08.svg",
    campaignName: "Make Better Ideas...",
    type: "Ads campaign",
    status: "Pending",
  },
  {
    userImg: "/images/user/user-19.jpg",
    userName: "Wilson Gouse",
    brandImg: "/images/brand/brand-09.svg",
    campaignName: "Increase your website tra...",
    type: "Ads campaign",
    status: "Success",
  },
  {
    userImg: "/images/user/user-20.jpg",
    userName: "Wilson Gouse",
    brandImg: "/images/brand/brand-10.svg",
    campaignName: "Grow your brand by...",
    type: "Ads campaign",
    status: "Failed",
  },
  {
    userImg: "/images/user/user-01.jpg",
    userName: "Wilson Gouse",
    brandImg: "/images/brand/brand-11.svg",
    campaignName: "Grow your brand by...",
    type: "Ads campaign",
    status: "Success",
  },
  {
    userImg: "/images/user/user-02.jpg",
    userName: "Wilson Gouse",
    brandImg: "/images/brand/brand-12.svg",
    campaignName: "Grow your brand by...",
    type: "Ads campaign",
    status: "Success",
  },
];

export const FeaturedCampaigns = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex justify-between gap-2 mb-4 sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Featured Campaigns
          </h3>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle">
            <MoreDotIcon />
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[617px] 2xl:min-w-[808px]">
          <table className="min-w-full">
            <thead className="border-gray-100 border-y dark:border-gray-800">
              <tr>
                <th className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Products
                </th>
                <th className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Campaign
                </th>
                <th className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {campaignData.map((campaign, index) => (
                <tr key={index}>
                  <td className="py-3">
                    <div className="flex items-center gap-[18px]">
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <Image
                          alt="user"
                          src={campaign.userImg}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div>
                        <p className="text-gray-700 text-theme-sm dark:text-gray-400">
                          {campaign.userName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center w-full gap-5">
                      <div className="w-full max-w-8">
                        <Image
                          alt="brand"
                          src={campaign.brandImg}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="truncate">
                        <p className="mb-0.5 truncate text-theme-sm font-medium text-gray-700 dark:text-gray-400">
                          {campaign.campaignName}
                        </p>
                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                          {campaign.type}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs ${
                        campaign.status === "Success"
                          ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                          : campaign.status === "Pending"
                          ? "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400"
                          : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

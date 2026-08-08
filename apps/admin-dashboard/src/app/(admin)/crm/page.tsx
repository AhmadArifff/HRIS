import React from "react";
import { Metadata } from "next";
import { CrmMetrics } from "@/components/crm/CrmMetrics";
import { StatisticsChart } from "@/components/crm/StatisticsChart";
import { EstimatedRevenue } from "@/components/crm/EstimatedRevenue";
import { SalesCategory } from "@/components/crm/SalesCategory";
import { UpcomingSchedule } from "@/components/crm/UpcomingSchedule";
import { RecentOrders } from "@/components/crm/RecentOrders";

export const metadata: Metadata = {
  title:
    "CRM Dashboard | ahmad-arif-admin - Next.js Admin Dashboard Template",
  description: "This is React.js CRM Dashboard page for ahmad-arif-admin - React.js Admin Dashboard",
};

export default function CrmPage() {
  return (
    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12">
          <CrmMetrics />
        </div>
        <div className="col-span-12 xl:col-span-8">
          <StatisticsChart />
        </div>
        <div className="col-span-12 xl:col-span-4">
          <EstimatedRevenue />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <SalesCategory />
        </div>
        <div className="col-span-12 xl:col-span-6">
          <UpcomingSchedule />
        </div>
        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </div>
  );
}

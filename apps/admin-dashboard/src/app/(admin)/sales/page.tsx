import React from "react";
import type { Metadata } from "next";

import SalesMetrics from "@/components/sales/SalesMetrics";
import UsersRevenueStatistics from "@/components/sales/UsersRevenueStatistics";
import UserRetention from "@/components/sales/UserRetention";
import SalesByChannel from "@/components/sales/SalesByChannel";
import SalesByCountry from "@/components/sales/SalesByCountry";
import TopProducts from "@/components/sales/TopProducts";

export const metadata: Metadata = {
  title: "Sales Dashboard | Arif.Dev - Next.js Admin Dashboard Template",
  description: "This is Sales Dashboard page for Arif.Dev - Next.js Admin Dashboard",
};

export default function SalesDashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <SalesMetrics />
      </div>

      <div className="col-span-12">
        <UsersRevenueStatistics />
      </div>

      <div className="col-span-12">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
          <UserRetention />
          <SalesByChannel />
          <SalesByCountry />
        </div>
      </div>

      <div className="col-span-12">
        <TopProducts />
      </div>
    </div>
  );
}

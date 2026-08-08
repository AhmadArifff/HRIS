import type { Metadata } from "next";
import React from "react";
import { AiMetrics } from "@/components/ai/AiMetrics";
import { UsersRevenueStatistics } from "@/components/ai/UsersRevenueStatistics";
import { ApiTokenUsages } from "@/components/ai/ApiTokenUsages";
import { AiAnalytics } from "@/components/ai/AiAnalytics";
import { RecentTransactions } from "@/components/ai/RecentTransactions";

export const metadata: Metadata = {
  title: "AI Dashboard | Next.js AdminArif Template",
  description: "This is the AI Dashboard for AdminArif Template",
};

export default function AiDashboard() {
  return (
    <div className="space-y-6">
      <div className="col-span-12">
        <AiMetrics />
      </div>
      
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <UsersRevenueStatistics />
        </div>
        <div className="xl:col-span-4">
          <ApiTokenUsages />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <AiAnalytics />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-12">
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
}

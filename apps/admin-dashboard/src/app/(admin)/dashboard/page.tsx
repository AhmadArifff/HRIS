import type { Metadata } from "next";
import { HrisMetrics } from "@/components/hris/HrisMetrics";
import { DashboardSummaryCards } from "@/components/hris/DashboardSummaryCards";
import { RecentActivities } from "@/components/hris/RecentActivities";
import React from "react";

export const metadata: Metadata = {
  title: "HRISCorp.dev Admin Dashboard | Sistem Pengelolaan SDM Enterprise",
  description: "Dashboard utama untuk manajemen sumber daya manusia HRISCorp.dev terintegrasi Supabase.",
};

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <HrisMetrics />
      </div>

      {/* Ringkasan Cepat Dinamis dari Database Supabase */}
      <DashboardSummaryCards />

      {/* Aktivitas Presensi Real-Time dari Database */}
      <div className="col-span-12">
        <RecentActivities />
      </div>
    </div>
  );
}

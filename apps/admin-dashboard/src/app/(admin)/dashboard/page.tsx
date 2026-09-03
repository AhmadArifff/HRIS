import type { Metadata } from "next";
import { HrisMetrics } from "@/components/hris/HrisMetrics";
import { DashboardSummaryCards } from "@/components/hris/DashboardSummaryCards";
import React from "react";

export const metadata: Metadata = {
  title: "HRISCorp.dev Admin Dashboard | Sistem Pengelolaan SDM Enterprise",
  description: "Dashboard utama untuk manajemen sumber daya manusia HRISCorp.dev.",
};

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <HrisMetrics />
      </div>

      {/* Ringkasan Cepat */}
      <DashboardSummaryCards />

      {/* Aktivitas Terbaru */}
      <div className="col-span-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Aktivitas Terbaru HRISCorp.dev</h4>
          <div className="space-y-4">
            {[
              { time: "08:15", text: "Budi Santoso melakukan Clock-In dengan Verifikasi Wajah", type: "info" },
              { time: "08:30", text: "Siti Rahayu mengajukan Cuti Tahunan (12-14 Ags)", type: "warning" },
              { time: "09:00", text: "Payroll Bulan Juli telah di-generate", type: "success" },
              { time: "10:15", text: "Fajar Nugraha lolos ke tahap Interview ATS", type: "info" },
              { time: "11:00", text: "Rina Maharani memulai proses Offboarding Clearance", type: "error" },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.type === "success" ? "bg-success-500" :
                  activity.type === "warning" ? "bg-orange-400" :
                  activity.type === "error" ? "bg-error-500" : "bg-brand-400"
                }`}></span>
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{activity.text}</p>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

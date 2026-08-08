import type { Metadata } from "next";
import { HrisMetrics } from "@/components/hris/HrisMetrics";
import React from "react";

export const metadata: Metadata = {
  title: "HRIS Admin Dashboard | Sistem Pengelolaan SDM Enterprise",
  description: "Dashboard utama untuk manajemen sumber daya manusia.",
};

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <HrisMetrics />
      </div>

      {/* Ringkasan Cepat */}
      <div className="col-span-12 lg:col-span-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Kehadiran Hari Ini</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-800 dark:text-white/90">42</span>
            <span className="text-sm text-gray-500 mb-1">/ 45 karyawan</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3 dark:bg-gray-700">
            <div className="bg-success-500 h-2 rounded-full" style={{ width: "93%" }}></div>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Pengajuan Cuti Pending</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-orange-500">5</span>
            <span className="text-sm text-gray-500 mb-1">perlu diproses</span>
          </div>
          <p className="text-xs text-gray-400 mt-3">3 Cuti Tahunan · 2 Cuti Sakit</p>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Lowongan Aktif</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-brand-500">3</span>
            <span className="text-sm text-gray-500 mb-1">posisi terbuka</span>
          </div>
          <p className="text-xs text-gray-400 mt-3">156 total pelamar masuk</p>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="col-span-12">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Aktivitas Terbaru</h4>
          <div className="space-y-4">
            {[
              { time: "08:15", text: "Budi Santoso melakukan Clock-In", type: "info" },
              { time: "08:30", text: "Siti Rahayu mengajukan Cuti Tahunan (12-14 Ags)", type: "warning" },
              { time: "09:00", text: "Payroll Bulan Juli telah di-generate", type: "success" },
              { time: "10:15", text: "Fajar Nugraha lolos ke tahap Interview", type: "info" },
              { time: "11:00", text: "Rina Maharani memulai proses Offboarding", type: "error" },
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

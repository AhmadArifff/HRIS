"use client";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";

export const DashboardSummaryCards: React.FC = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    presentToday: 0,
    attendancePercentage: 0,
    pendingLeaves: 0,
    activeJobs: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/dashboard/stats`);
        const result = await res.json();
        if (result.success && result.data) {
          setStats(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard summary stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <div className="col-span-12 lg:col-span-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Kehadiran Hari Ini</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-800 dark:text-white/90">{stats.presentToday}</span>
            <span className="text-sm text-gray-500 mb-1">/ {stats.totalEmployees} karyawan</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3 dark:bg-gray-700">
            <div className="bg-success-500 h-2 rounded-full" style={{ width: `${stats.attendancePercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Pengajuan Cuti Pending</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-orange-500">{stats.pendingLeaves}</span>
            <span className="text-sm text-gray-500 mb-1">perlu diproses</span>
          </div>
          <p className="text-xs text-gray-400 mt-3">Sinkronisasi langsung dengan tabel database Supabase</p>
        </div>
      </div>

      <div className="col-span-12 lg:col-span-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Lowongan Aktif</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-brand-500">{stats.activeJobs}</span>
            <span className="text-sm text-gray-500 mb-1">posisi terbuka</span>
          </div>
          <p className="text-xs text-gray-400 mt-3">Pipeline Rekrutmen ATS Terintegrasi</p>
        </div>
      </div>
    </>
  );
};

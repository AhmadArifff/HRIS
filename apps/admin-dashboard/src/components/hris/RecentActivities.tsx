"use client";
import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";

interface ActivityItem {
  id: string;
  time: string;
  text: string;
  type: "success" | "warning" | "error" | "info";
}

export const RecentActivities: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/attendance`);
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: ActivityItem[] = json.data.slice(0, 8).map((att: any) => {
            const timeStr = att.clockIn || att.date || "Hari Ini";
            return {
              id: att.id || String(Math.random()),
              time: timeStr,
              text: `${att.name || "Karyawan"} (${att.department || "Divisi"}) melakukan ${
                att.clockOut && att.clockOut !== "--:--" ? "Clock-Out" : "Clock-In"
              } [${att.status || "Hadir"}]`,
              type: att.status === "Hadir" ? "success" : att.status === "Terlambat" ? "warning" : "info",
            };
          });
          setActivities(mapped);
        } else {
          setActivities([]);
        }
      } catch (err) {
        console.error("Failed to fetch live activities:", err);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">Aktivitas Terbaru</h4>
        <span className="text-xs text-slate-400 font-mono">Live Database Supabase</span>
      </div>

      {loading ? (
        <div className="py-8 text-center text-sm text-gray-400 animate-pulse">
          Memuat aktivitas terbaru dari database...
        </div>
      ) : activities.length > 0 ? (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
            >
              <span
                className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.type === "success"
                    ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    : activity.type === "warning"
                    ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                    : activity.type === "error"
                    ? "bg-rose-500"
                    : "bg-sky-400"
                }`}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{activity.text}</p>
                <span className="text-xs text-gray-400 font-mono">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Belum ada aktivitas presensi hari ini.
          </p>
          <span className="text-xs text-gray-400">
            Aktivitas presensi karyawan dari database Supabase akan ditampilkan secara otomatis di sini.
          </span>
        </div>
      )}
    </div>
  );
};

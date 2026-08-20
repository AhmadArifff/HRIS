"use client";

import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";

interface RedisStats {
  used_memory_human: string;
  connected_clients: string;
  uptime_in_days: string;
  keyspace_hits: string;
  keyspace_misses: string;
  redis_version: string;
  os: string;
  raw_output: string;
}

export default function RedisMonitorPage() {
  const [stats, setStats] = useState<RedisStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3002/api/infrastructure/redis");
      const result = await res.json();
      
      if (result.success && result.data) {
        setStats(result.data);
        setLastRefreshed(new Date());
      } else {
        setError(result.message || "Failed to fetch stats");
      }
    } catch (err: any) {
      setError(err.message || "Network error while fetching Redis stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const hitRate = stats
    ? (
        (parseInt(stats.keyspace_hits) /
          (parseInt(stats.keyspace_hits) + parseInt(stats.keyspace_misses) || 1)) *
        100
      ).toFixed(2)
    : "0.00";

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Redis Monitor" />

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">Infrastruktur Cache</h2>
          <p className="text-sm text-gray-500">Memantau performa dan penggunaan Upstash Redis (Vercel KV)</p>
        </div>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 disabled:opacity-50 transition-colors"
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 dark:bg-red-500/10 dark:border-red-500/20">
          <p className="font-semibold">Error Occurred</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Memory */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Memory Usage</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-800 dark:text-white/90">
              {stats?.used_memory_human || "-"}
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Dikelola oleh Upstash</p>
        </div>

        {/* Clients */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Active Clients</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-brand-500">
              {stats?.connected_clients || "-"}
            </span>
            <span className="text-sm text-gray-500 mb-1">koneksi</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Termasuk frontend & backend pool</p>
        </div>

        {/* Hit Rate */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Cache Hit Rate</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-success-500">{stats ? hitRate : "-"}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3 dark:bg-gray-700">
            <div
              className="bg-success-500 h-1.5 rounded-full"
              style={{ width: `${stats ? hitRate : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Server Info */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Server Uptime</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-orange-500">
              {stats?.uptime_in_days || "-"}
            </span>
            <span className="text-sm text-gray-500 mb-1">Hari</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Versi: {stats?.redis_version || "-"}</p>
        </div>
      </div>

      {/* Raw Output Terminal */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">INFO Command Output (Raw)</h4>
          <span className="text-xs text-gray-400">
            Diperbarui: {lastRefreshed ? lastRefreshed.toLocaleTimeString() : "-"}
          </span>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 overflow-x-auto">
          {loading && !stats ? (
            <p className="text-gray-400 text-sm font-mono animate-pulse">Memuat data dari Upstash...</p>
          ) : (
            <pre className="text-xs text-green-400 font-mono">
              {stats?.raw_output || "Tidak ada data."}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import { ToastContainer, ToastMessage } from "../ui/toast/Toast";

export const ClockIn = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isLocating, setIsLocating] = useState(true);
  const [locationStatus, setLocationStatus] = useState<"success" | "error" | "pending">("pending");
  const [latenessResult, setLatenessResult] = useState<{ isLate: boolean; lateMinutes: number } | null>(null);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const newToast: ToastMessage = { id: String(Date.now()), type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const assignedShift = {
    name: "Shift Pagi (Normal)",
    startTime: "08:00",
    endTime: "17:00",
    toleranceMinutes: 15,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      const dateString = now.toLocaleDateString('id-ID', options);
      const timeString = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(`${dateString} - ${timeString}`);
    }, 1000);

    setTimeout(() => {
      setIsLocating(false);
      setLocationStatus("success");
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    // PRD §7.1: Guard Clause: Live Tracking / Geofencing
    if (locationStatus !== "success") {
      addToast("error", "Geofencing Gagal", "Guard Clause: Anda harus berada di radius 100m dari Kantor untuk melakukan absensi.");
      return;
    }

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // Selisih telat
    const shiftStartInMinutes = 8 * 60 + assignedShift.toleranceMinutes;
    const nowInMinutes = currentHours * 60 + currentMinutes;

    let isLate = false;
    let lateMinutes = 0;

    if (nowInMinutes > shiftStartInMinutes) {
      isLate = true;
      lateMinutes = nowInMinutes - (8 * 60);
    }

    setLatenessResult({ isLate, lateMinutes });
    setClockedIn(true);

    if (isLate) {
      addToast(
        "warning",
        "Clock-In Terlambat",
        `📸 Foto Berhasil Diambil! Anda melakukan Clock-In pukul ${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')} (Terlambat ${lateMinutes} menit).`
      );
    } else {
      addToast(
        "success",
        "Clock-In Berhasil!",
        `📸 Foto Berhasil Diambil! Clock-In Tepat Waktu untuk ${assignedShift.name} (08:00 - 17:00). Selamat Bekerja!`
      );
    }

    console.log("[AUDIT_LOG] CLOCK_IN_WITH_SHIFT", {
      shift: assignedShift.name,
      is_late: isLate,
      late_duration_minutes: lateMinutes,
      timestamp: new Date().toISOString()
    });
  };

  const handleClockOut = () => {
    addToast("info", "Clock-Out Berhasil", `Clock-Out berhasil pada ${currentTime}. Sampai jumpa besok!`);
    console.log("[AUDIT_LOG] CLOCK_OUT", { timestamp: new Date().toISOString() });
    setClockedIn(false);
    setLatenessResult(null);
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 max-w-2xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white/90">
          Live Clock-In / Clock-Out
        </h3>
        <p className="text-gray-500 mt-2 font-mono">{currentTime || "Memuat waktu lokal..."}</p>

        {/* Assigned Shift Card Info */}
        <div className="mt-4 p-3 bg-brand-50/50 border border-brand-100 rounded-xl inline-flex flex-col sm:flex-row items-center gap-3 text-xs dark:bg-brand-500/10 dark:border-brand-500/20">
          <span className="font-semibold text-brand-600 dark:text-brand-400">📅 Jadwal Hari Ini:</span>
          <span className="text-gray-700 dark:text-gray-300">{assignedShift.name} ({assignedShift.startTime} - {assignedShift.endTime})</span>
          <Badge color="warning">Toleransi: {assignedShift.toleranceMinutes}m</Badge>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        {/* Geofencing Status */}
        <div className="w-full max-w-md p-4 rounded-xl border border-gray-200 bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700 text-center">
          <p className="text-xs text-gray-500 mb-1">Status Geofencing GPS Kantor:</p>
          {isLocating ? (
            <span className="text-xs text-brand-500 animate-pulse font-medium">📍 Mendeteksi Koordinat GPS Anda...</span>
          ) : locationStatus === "success" ? (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">✓ Di dalam radius 100m (Kantor Pusat Jakarta)</span>
          ) : (
            <span className="text-xs text-rose-500 font-semibold">✕ Di luar radius (Gagal Absensi)</span>
          )}
        </div>

        {/* Camera Preview Simulator */}
        <div className="w-64 h-64 rounded-full border-4 border-dashed border-brand-500/40 bg-slate-900 flex flex-col items-center justify-center text-slate-400 text-xs text-center p-4 relative overflow-hidden shadow-inner">
          <div className="w-32 h-40 border-2 border-brand-400/60 rounded-3xl mb-2 flex items-center justify-center">
            <span className="text-[10px] text-brand-300">Posisikan Wajah</span>
          </div>
          <span>Verifikasi Foto Selfie</span>
        </div>

        {/* Action Button */}
        {!clockedIn ? (
          <Button
            onClick={handleClockIn}
            className="w-full max-w-md py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-500/20"
          >
            📸 Ambil Foto & Clock-In
          </Button>
        ) : (
          <Button
            onClick={handleClockOut}
            className="w-full max-w-md py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-rose-500/20"
          >
            🏃 Selesaikan Jam Kerja (Clock-Out)
          </Button>
        )}
      </div>
    </div>
  );
};

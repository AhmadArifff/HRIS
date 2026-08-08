"use client";
import React, { useState, useEffect } from "react";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";

export const ClockIn = () => {
  const [clockedIn, setClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isLocating, setIsLocating] = useState(true);
  const [locationStatus, setLocationStatus] = useState<"success" | "error" | "pending">("pending");
  const [latenessResult, setLatenessResult] = useState<{ isLate: boolean; lateMinutes: number } | null>(null);

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
      alert("⚠️ Guard Clause: Gagal memverifikasi lokasi. Anda harus berada di radius 100m dari Kantor untuk melakukan absensi.");
      return;
    }

    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // Asumsi jam shift 08:00 + 15 menit toleransi (08:15)
    // Hitung selisih telat untuk demo jika absensi setelah 08:15
    const shiftStartInMinutes = 8 * 60 + assignedShift.toleranceMinutes;
    const nowInMinutes = currentHours * 60 + currentMinutes;

    let isLate = false;
    let lateMinutes = 0;

    if (nowInMinutes > shiftStartInMinutes) {
      isLate = true;
      lateMinutes = nowInMinutes - (8 * 60); // Telat dihitung dari jam 08:00
    }

    setLatenessResult({ isLate, lateMinutes });
    setClockedIn(true);

    if (isLate) {
      alert(`📸 Foto Berhasil Diambil!\n⚠️ Anda melakukan Clock-In pukul ${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')} (Terlambat ${lateMinutes} menit dari jadwal Shift Pagi 08:00).`);
    } else {
      alert(`📸 Foto Berhasil Diambil!\n✅ Clock-In Tepat Waktu untuk ${assignedShift.name} (08:00 - 17:00). Selamat Bekerja!`);
    }

    console.log("[AUDIT_LOG] CLOCK_IN_WITH_SHIFT", {
      shift: assignedShift.name,
      is_late: isLate,
      late_duration_minutes: lateMinutes,
      timestamp: new Date().toISOString()
    });
  };

  const handleClockOut = () => {
    if (confirm("Apakah Anda yakin ingin melakukan Clock-Out sekarang?")) {
      alert(`✅ Clock-Out berhasil pada ${currentTime}. Sampai jumpa besok!`);
      console.log("[AUDIT_LOG] CLOCK_OUT", { timestamp: new Date().toISOString() });
      setClockedIn(false);
      setLatenessResult(null);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 max-w-2xl mx-auto">
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

      <div className="flex flex-col items-center gap-6">
        {/* Mock GPS Map */}
        <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/4093/2724.png')] bg-cover opacity-50 blur-[1px]"></div>
          <div className="relative z-10 flex flex-col items-center">
            {isLocating ? (
              <>
                <svg className="w-8 h-8 text-gray-500 animate-spin mb-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <Badge color="light">Memverifikasi Lokasi GPS...</Badge>
              </>
            ) : locationStatus === "success" ? (
              <>
                <svg className="w-8 h-8 text-brand-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <Badge color="success">Lokasi Sesuai (Radius Kantor Pusat)</Badge>
              </>
            ) : (
              <>
                <svg className="w-8 h-8 text-error-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                <Badge color="error">Di Luar Jangkauan Kantor</Badge>
              </>
            )}
          </div>
        </div>

        {/* Mock Camera UI */}
        <div className="w-full h-64 bg-gray-900 rounded-xl flex items-center justify-center border-4 border-dashed border-gray-700 relative overflow-hidden">
          <p className="text-gray-400 absolute z-0 text-sm">Webcam / Kamera Aktif</p>
          <div className="w-32 h-40 border-2 border-brand-500 rounded-3xl opacity-70 z-10 relative flex items-center justify-center">
            {clockedIn && <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>}
          </div>
        </div>

        {latenessResult && (
          <div className="w-full p-4 rounded-xl text-sm border flex items-center justify-between transition-all bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <span>Status Absensi Hari Ini:</span>
            {latenessResult.isLate ? (
              <Badge color="error">⚠️ Terlambat (+{latenessResult.lateMinutes} Menit)</Badge>
            ) : (
              <Badge color="success">✓ Hadir Tepat Waktu</Badge>
            )}
          </div>
        )}

        <div className="w-full">
          {!clockedIn ? (
            <Button 
              size="lg" 
              className="w-full text-lg py-4 bg-brand-500 hover:bg-brand-600 text-white disabled:opacity-50" 
              onClick={handleClockIn}
              disabled={isLocating}
            >
              <svg className="w-6 h-6 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              AMBIL FOTO & CLOCK-IN
            </Button>
          ) : (
            <Button 
              size="lg" 
              className="w-full text-lg py-4 bg-error-500 hover:bg-error-600 text-white border-none" 
              onClick={handleClockOut}
            >
              <svg className="w-6 h-6 mr-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              KLIK UNTUK CLOCK-OUT
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import Link from "next/link";

export default function EmployeeDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 p-6 sm:p-8 text-white shadow-xl shadow-brand-500/10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            Employee Self-Service
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang Kembali, Budi Santoso 👋
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/80">
            Software Engineer · Divisi IT (Kantor Pusat Jakarta). Semoga harimu menyenangkan dan produktif!
          </p>
        </div>
        {/* Background Decorative Circles */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Clock-in Status Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Absensi Hari Ini
            </span>
            <span className="w-8 h-8 rounded-xl bg-success-500/10 text-success-500 flex items-center justify-center">
              ✓
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              07:55 WIB
            </span>
            <p className="text-xs text-success-600 font-medium mt-1">
              • Tepat Waktu (Kantor Pusat)
            </p>
          </div>
          <Link
            href="/attendance"
            className="mt-4 block text-center text-xs font-semibold text-brand-500 hover:text-brand-600 bg-brand-50 dark:bg-brand-500/10 py-2 rounded-xl transition"
          >
            Buka Fitur Absensi &rarr;
          </Link>
        </div>

        {/* Leave Allowance Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Sisa Cuti Tahunan
            </span>
            <span className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
              🌴
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              12 Hari
            </span>
            <p className="text-xs text-gray-400 mt-1">Dari total 14 hari tahunan</p>
          </div>
          <Link
            href="/leave"
            className="mt-4 block text-center text-xs font-semibold text-brand-500 hover:text-brand-600 bg-brand-50 dark:bg-brand-500/10 py-2 rounded-xl transition"
          >
            Ajukan Cuti &rarr;
          </Link>
        </div>

        {/* Payslip Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Slip Gaji Terbaru
            </span>
            <span className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              💰
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Juli 2026
            </span>
            <p className="text-xs text-gray-400 mt-1">Status: Terbayar</p>
          </div>
          <Link
            href="/payroll"
            className="mt-4 block text-center text-xs font-semibold text-brand-500 hover:text-brand-600 bg-brand-50 dark:bg-brand-500/10 py-2 rounded-xl transition"
          >
            Unduh Slip PDF &rarr;
          </Link>
        </div>

        {/* KPI / Performance Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Review KPI 360
            </span>
            <span className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              📊
            </span>
          </div>
          <div className="mt-3">
            <span className="text-2xl font-bold text-orange-500">
              Open
            </span>
            <p className="text-xs text-gray-400 mt-1">Batas akhir: 31 Ags 2026</p>
          </div>
          <Link
            href="/performance"
            className="mt-4 block text-center text-xs font-semibold text-brand-500 hover:text-brand-600 bg-brand-50 dark:bg-brand-500/10 py-2 rounded-xl transition"
          >
            Isi Kuesioner &rarr;
          </Link>
        </div>
      </div>

      {/* Main Feature Quick Links */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          Akses Fitur Utama
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <Link
            href="/attendance"
            className="group p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] hover:border-brand-500 dark:hover:border-brand-400 transition-all shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🕒
            </div>
            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white group-hover:text-brand-500">
              Live Absensi & Camera Clock-In
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Absen masuk/keluar dengan verifikasi foto selfie dan lokasi GPS kantor.
            </p>
          </Link>

          <Link
            href="/leave"
            className="group p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] hover:border-brand-500 dark:hover:border-brand-400 transition-all shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🌴
            </div>
            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white group-hover:text-brand-500">
              Pengajuan Cuti & Izin
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Form pengajuan cuti tahunan, sakit, atau izin melahirkan secara mandiri.
            </p>
          </Link>

          <Link
            href="/payroll"
            className="group p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] hover:border-brand-500 dark:hover:border-brand-400 transition-all shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              💵
            </div>
            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white group-hover:text-brand-500">
              Riwayat & Download Slip Gaji
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Rincian Take Home Pay, potongan BPJS, PPh 21, dan cetak slip gaji.
            </p>
          </Link>

          <Link
            href="/performance"
            className="group p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] hover:border-brand-500 dark:hover:border-brand-400 transition-all shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white group-hover:text-brand-500">
              Penilaian Kinerja (KPI 360)
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Form survei evaluasi kinerja mandiri (Self-Review) dan rekan kerja.
            </p>
          </Link>

          <Link
            href="/reimbursement"
            className="group p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] hover:border-brand-500 dark:hover:border-brand-400 transition-all shadow-sm"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              🧾
            </div>
            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white group-hover:text-brand-500">
              Klaim Reimbursement
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Pengajuan pengembalian dana medis & transportasi dengan upload foto struk.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

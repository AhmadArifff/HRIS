"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export const PayrollGenerateForm = () => {
  const [periodMonth, setPeriodMonth] = useState("Agustus");
  const [periodYear, setPeriodYear] = useState("2026");
  const [isGenerating, setIsGenerating] = useState(false);

  // PRD §7.4: Hitung Payroll - Guard: pastikan bulan dan tahun dipilih
  const handleGeneratePayroll = (e: React.FormEvent) => {
    e.preventDefault();

    if (!periodMonth || !periodYear) {
      alert("⚠️ Guard Clause: Pilih bulan dan tahun penggajian terlebih dahulu.");
      return;
    }

    setIsGenerating(true);
    console.log("[AUDIT_LOG] INITIATE_PAYROLL_GENERATION", { period: `${periodMonth} ${periodYear}`, timestamp: new Date().toISOString() });

    // Simulasi loading
    setTimeout(() => {
      setIsGenerating(false);
      alert(`✅ Berhasil Generate Payroll untuk periode ${periodMonth} ${periodYear}!\nSlip gaji (draft) telah dibuat untuk 45 Karyawan Aktif.`);
      console.log("[AUDIT_LOG] PAYROLL_GENERATION_SUCCESS", { total_slips: 45, timestamp: new Date().toISOString() });
    }, 1500);
  };

  const handleCancel = () => {
    alert("✅ Batal Generate Payroll. Form akan direset.");
    setPeriodMonth("Agustus");
    setPeriodYear("2026");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 max-w-2xl mx-auto">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Generate Payroll Bulanan
      </h3>
      <p className="text-sm text-gray-500 mb-6">Pilih periode penggajian dan pastikan seluruh data absensi karyawan untuk bulan tersebut sudah direkap dan divalidasi sebelum melakukan perhitungan (Generate) Payroll.</p>
      
      <form className="flex flex-col gap-6" onSubmit={handleGeneratePayroll}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label>Bulan Penggajian <span className="text-error-500">*</span></Label>
            <select
              value={periodMonth}
              onChange={(e) => setPeriodMonth(e.target.value)}
              className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            >
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
            </select>
          </div>
          <div>
            <Label>Tahun <span className="text-error-500">*</span></Label>
            <select
              value={periodYear}
              onChange={(e) => setPeriodYear(e.target.value)}
              className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-800 dark:text-white/90 mb-2">Status Data Absensi (Bulan {periodMonth} {periodYear}):</h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>✅ 45 Karyawan Aktif direkap.</li>
            <li>✅ 0 Data Absen Bentrok/Anomali.</li>
            <li>✅ Persetujuan Cuti selesai diproses.</li>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={handleCancel}
            disabled={isGenerating}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isGenerating}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menghitung...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Hitung (Generate) Payroll
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

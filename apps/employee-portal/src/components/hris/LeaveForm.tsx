"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export const LeaveForm = () => {
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PRD §7.5: Guard Clauses Pengajuan Cuti
    if (!type) {
      alert("⚠️ Guard Clause: Pilih Jenis Cuti terlebih dahulu.");
      return;
    }
    if (!startDate || !endDate) {
      alert("⚠️ Guard Clause: Tanggal Mulai dan Selesai wajib diisi.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      alert("⚠️ Guard Clause: Tanggal Selesai tidak boleh lebih awal dari Tanggal Mulai.");
      return;
    }
    if (!reason || reason.trim().length < 5) {
      alert("⚠️ Guard Clause: Alasan cuti wajib diisi dengan jelas.");
      return;
    }
    if (type === "Sakit" && !file) {
      alert("⚠️ Guard Clause: Cuti Sakit WAJIB melampirkan Surat Keterangan Dokter.");
      return;
    }

    // Hitung durasi (asumsi kasar tanpa memotong weekend)
    const diffTime = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (type === "Tahunan" && diffDays > 10) {
      alert("⚠️ Guard Clause: Saldo Cuti Tahunan Anda (10 Hari) tidak mencukupi untuk durasi pengajuan ini.");
      return;
    }

    alert(`✅ Pengajuan ${type} selama ${diffDays} hari berhasil dikirim!\nStatus: PENDING (Menunggu Persetujuan Manajer).`);
    console.log("[AUDIT_LOG] LEAVE_REQUEST_SUBMITTED", { 
      type, duration_days: diffDays, reason_length: reason.length, has_attachment: !!file, timestamp: new Date().toISOString() 
    });

    // Reset Form
    setType("");
    setStartDate("");
    setEndDate("");
    setReason("");
    setFile(null);
  };

  const handleCancel = () => {
    if (confirm("Apakah Anda yakin ingin membatalkan pengisian form cuti ini?")) {
      setType("");
      setStartDate("");
      setEndDate("");
      setReason("");
      setFile(null);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 max-w-3xl mx-auto">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Form Pengajuan Cuti
      </h3>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label>Jenis Cuti <span className="text-error-500">*</span></Label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            >
              <option value="">Pilih Jenis Cuti</option>
              <option value="Tahunan">Cuti Tahunan</option>
              <option value="Sakit">Cuti Sakit (Wajib Surat Dokter)</option>
              <option value="Melahirkan">Cuti Melahirkan</option>
              <option value="Penting">Cuti Alasan Penting</option>
            </select>
          </div>
          <div>
            <Label>Sisa Saldo Cuti Tahunan</Label>
            <Input type="text" value="10 Hari" disabled className="bg-gray-50 dark:bg-gray-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label>Tanggal Mulai <span className="text-error-500">*</span></Label>
            <Input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label>Tanggal Selesai <span className="text-error-500">*</span></Label>
            <Input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Alasan Cuti / Keterangan <span className="text-error-500">*</span></Label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-4 text-sm text-gray-800 border border-gray-300 rounded-xl bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            rows={4}
            placeholder="Tuliskan alasan pengajuan cuti secara singkat..."
          ></textarea>
        </div>

        <div>
          <Label>Lampiran Dokumen (Opsional, Wajib untuk Cuti Sakit)</Label>
          <label className="mt-2 w-full p-4 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer transition-colors relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const selectedFile = e.target.files[0];
                  if (selectedFile.size > 2 * 1024 * 1024) {
                    alert("⚠️ Ukuran file maksimal 2MB.");
                    return;
                  }
                  setFile(selectedFile);
                }
              }}
            />
            {file ? (
              <div className="flex items-center text-success-500 font-medium text-sm">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {file.name}
              </div>
            ) : (
              <span className="text-sm">Klik untuk unggah Surat Dokter / Dokumen Pendukung (Maks. 2MB)</span>
            )}
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition"
          >
            Kirim Pengajuan
          </button>
        </div>
      </form>
    </div>
  );
};

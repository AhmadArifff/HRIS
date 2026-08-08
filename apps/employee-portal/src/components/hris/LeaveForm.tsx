"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { ToastContainer, ToastMessage } from "../ui/toast/Toast";

export const LeaveForm = () => {
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const newToast: ToastMessage = { id: String(Date.now()), type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PRD §7.5: Guard Clauses Pengajuan Cuti
    if (!type) {
      addToast("error", "Validasi Gagal", "Guard Clause: Pilih Jenis Cuti terlebih dahulu.");
      return;
    }
    if (!startDate || !endDate) {
      addToast("error", "Validasi Gagal", "Guard Clause: Tanggal Mulai dan Selesai wajib diisi.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      addToast("error", "Validasi Gagal", "Guard Clause: Tanggal Selesai tidak boleh lebih awal dari Tanggal Mulai.");
      return;
    }
    if (!reason || reason.trim().length < 5) {
      addToast("error", "Validasi Gagal", "Guard Clause: Alasan cuti wajib diisi dengan jelas.");
      return;
    }
    if (type === "Sakit" && !file) {
      addToast("error", "Validasi Gagal", "Guard Clause: Cuti Sakit WAJIB melampirkan Surat Keterangan Dokter.");
      return;
    }

    // Hitung durasi
    const diffTime = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (type === "Tahunan" && diffDays > 10) {
      addToast("error", "Validasi Gagal", "Guard Clause: Saldo Cuti Tahunan Anda (10 Hari) tidak mencukupi untuk durasi pengajuan ini.");
      return;
    }

    addToast(
      "success",
      "Pengajuan Cuti Terkirim!",
      `Pengajuan Cuti ${type} selama ${diffDays} hari berhasil dikirim! Status: PENDING (Menunggu Persetujuan Manajer).`
    );
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

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 relative max-w-2xl mx-auto">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Form Pengajuan Cuti Online
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
              <option value="Tahunan">Cuti Tahunan (Sisa: 10 Hari)</option>
              <option value="Sakit">Cuti Sakit (Wajib Surat Dokter)</option>
              <option value="Melahirkan">Cuti Melahirkan / Istri Melahirkan</option>
              <option value="Penting">Cuti Alasan Penting</option>
            </select>
          </div>

          <div>
            <Label>Tanggal Mulai Cuti <span className="text-error-500">*</span></Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <Label>Tanggal Selesai Cuti <span className="text-error-500">*</span></Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div>
            <Label>Unggah Berkas Pendukung (Format PDF/JPG)</Label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
                  addToast("warning", "Ukuran File Terlalu Besar", "Ukuran berkas lampiran maksimal 2MB.");
                  return;
                }
                setFile(selectedFile || null);
              }}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-500/10 file:text-brand-500 hover:file:bg-brand-500/20 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <Label>Alasan Pengajuan Cuti <span className="text-error-500">*</span></Label>
          <textarea
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Tuliskan keterangan lengkap alasan mengambil cuti..."
            className="w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button size="sm" className="bg-brand-500 hover:bg-brand-600 font-semibold rounded-xl">
            Kirim Pengajuan Cuti
          </Button>
        </div>
      </form>
    </div>
  );
};

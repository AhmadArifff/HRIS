"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { ToastContainer, ToastMessage } from "../ui/toast/Toast";

export const ReimbursementForm = () => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
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

    // PRD §7.6: Reimbursement - Guard Clauses
    if (!type) {
      addToast("error", "Validasi Gagal", "Guard Clause: Pilih Jenis Klaim terlebih dahulu.");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      addToast("error", "Validasi Gagal", "Guard Clause: Nominal Klaim tidak valid.");
      return;
    }
    if (!date) {
      addToast("error", "Validasi Gagal", "Guard Clause: Tanggal Transaksi wajib diisi.");
      return;
    }
    if (!description || description.trim().length < 10) {
      addToast("error", "Validasi Gagal", "Guard Clause: Keterangan terlalu singkat. Mohon jelaskan lebih detail (min 10 karakter).");
      return;
    }
    if (!file) {
      addToast("error", "Validasi Gagal", "Guard Clause: Bukti transaksi/struk WAJIB diunggah untuk keperluan audit keuangan.");
      return;
    }

    addToast(
      "success",
      "Ajuan Klaim Terkirim!",
      `Klaim Reimbursement (${type}) sebesar Rp${Number(amount).toLocaleString("id-ID")} berhasil diajukan! Status: PENDING REVIEW.`
    );
    console.log("[AUDIT_LOG] REIMBURSEMENT_SUBMITTED", { 
      type, amount, date, file_name: file.name, timestamp: new Date().toISOString() 
    });

    // Reset Form
    setType("");
    setAmount("");
    setDate("");
    setDescription("");
    setFile(null);
  };

  const handleCancel = () => {
    setType("");
    setAmount("");
    setDate("");
    setDescription("");
    setFile(null);
    addToast("info", "Form Direset", "Form reimbursement telah direset.");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 relative max-w-2xl mx-auto">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Form Pengajuan Reimbursement / Klaim Biaya
      </h3>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label>Kategori Klaim <span className="text-error-500">*</span></Label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            >
              <option value="">Pilih Kategori</option>
              <option value="Kesehatan (Medical)">Kesehatan (Medical / Obat)</option>
              <option value="Perjalanan Dinas">Perjalanan Dinas / Bensin / Tol</option>
              <option value="Kebutuhan Kantor">Kebutuhan Alat / Operational Office</option>
              <option value="Klien & Entertainment">Klien & Entertainment Meeting</option>
            </select>
          </div>

          <div>
            <Label>Nominal Pengajuan (Rp) <span className="text-error-500">*</span></Label>
            <Input
              type="number"
              placeholder="Contoh: 350000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <Label>Tanggal Transaksi Struk <span className="text-error-500">*</span></Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <Label>Unggah Struk / Bukti Bayar <span className="text-error-500">*</span></Label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
                  addToast("warning", "File Terlalu Besar", "Ukuran bukti transaksi maksimal 5MB.");
                  return;
                }
                setFile(selectedFile || null);
              }}
              className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-500/10 file:text-brand-500 hover:file:bg-brand-500/20 cursor-pointer"
            />
          </div>
        </div>

        <div>
          <Label>Keterangan & Rincian Pengeluaran <span className="text-error-500">*</span></Label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Jelaskan tujuan dan rincian penggunaan biaya untuk klaim..."
            className="w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
          >
            Batal
          </button>
          <Button size="sm" className="bg-brand-500 hover:bg-brand-600 font-semibold rounded-xl">
            Kirim Pengajuan Reimbursement
          </Button>
        </div>
      </form>
    </div>
  );
};

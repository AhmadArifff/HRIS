"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export const ReimbursementForm = () => {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PRD §7.6: Reimbursement - Guard Clauses
    if (!type) {
      alert("⚠️ Guard Clause: Pilih Jenis Klaim terlebih dahulu.");
      return;
    }
    if (!amount || Number(amount) <= 0) {
      alert("⚠️ Guard Clause: Nominal Klaim tidak valid.");
      return;
    }
    if (!date) {
      alert("⚠️ Guard Clause: Tanggal Transaksi wajib diisi.");
      return;
    }
    if (!description || description.trim().length < 10) {
      alert("⚠️ Guard Clause: Keterangan terlalu singkat. Mohon jelaskan dengan lebih detail (minimal 10 karakter).");
      return;
    }
    if (!file) {
      alert("⚠️ Guard Clause: Bukti transaksi/struk WAJIB diunggah untuk keperluan audit keuangan.");
      return;
    }

    alert(`✅ Klaim Reimbursement (${type}) sebesar Rp${Number(amount).toLocaleString("id-ID")} berhasil diajukan!\nStatus: PENDING REVIEW.`);
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
    if (confirm("Apakah Anda yakin ingin membatalkan pengisian form ini? Data yang belum dikirim akan hilang.")) {
      setType("");
      setAmount("");
      setDate("");
      setDescription("");
      setFile(null);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 max-w-3xl mx-auto">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Klaim Reimbursement
      </h3>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label>Jenis Klaim <span className="text-error-500">*</span></Label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            >
              <option value="">Pilih Jenis Klaim</option>
              <option value="Medis">Kesehatan / Medis (Rawat Jalan)</option>
              <option value="Transportasi">Transportasi / Perjalanan Dinas</option>
              <option value="Akomodasi">Akomodasi / Penginapan</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <Label>Nominal Klaim (Rp) <span className="text-error-500">*</span></Label>
            <Input 
              type="number" 
              placeholder="Contoh: 150000" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label>Tanggal Transaksi <span className="text-error-500">*</span></Label>
          <Input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <Label>Keterangan / Deskripsi Keperluan <span className="text-error-500">*</span></Label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 text-sm text-gray-800 border border-gray-300 rounded-xl bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            rows={3}
            placeholder="Tuliskan detail penggunaan dana (Contoh: Taksi dari Kantor ke Bandara Soekarno Hatta)..."
          ></textarea>
        </div>

        <div>
          <Label>Upload Bukti Transaksi / Struk (Wajib) <span className="text-error-500">*</span></Label>
          <label className="mt-2 w-full p-6 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 cursor-pointer transition-colors text-center relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  const selectedFile = e.target.files[0];
                  if (selectedFile.size > 5 * 1024 * 1024) {
                    alert("⚠️ Ukuran file maksimal 5MB.");
                    return;
                  }
                  setFile(selectedFile);
                }
              }}
            />
            {file ? (
              <div className="flex flex-col items-center">
                <svg className="w-8 h-8 mb-2 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-sm font-medium text-gray-800 dark:text-white">{file.name}</span>
                <span className="text-xs text-success-500 mt-1">File siap diunggah</span>
              </div>
            ) : (
              <>
                <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                <span className="text-sm font-medium">Klik untuk unggah Foto/PDF Struk</span>
                <span className="text-xs text-gray-400 mt-1">Maksimal 5MB per file (.jpg, .png, .pdf)</span>
              </>
            )}
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
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
            Kirim Ajuan Klaim
          </button>
        </div>
      </form>
    </div>
  );
};

"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Label from "../form/Label";
import { ToastContainer, ToastMessage } from "../ui/toast/Toast";

export const PerformanceForm = () => {
  const [target, setTarget] = useState("self");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [feedback, setFeedback] = useState("");

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const newToast: ToastMessage = { id: String(Date.now()), type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSaveDraft = () => {
    addToast("info", "Draft Disimpan", "Form evaluasi kinerja telah disimpan sebagai DRAFT.");
    console.log("[AUDIT_LOG] KPI_REVIEW_DRAFT_SAVED", { target, timestamp: new Date().toISOString() });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Guard Clause: Pastikan semua radio button terpilih
    if (!q1 || !q2) {
      addToast("error", "Validasi Gagal", "Guard Clause: Mohon isi semua pertanyaan pilihan ganda sebelum mengirim evaluasi.");
      return;
    }

    addToast(
      "success",
      "Evaluasi Terkirim!",
      `Evaluasi KPI untuk target "${target === "self" ? "Self-Review" : target}" berhasil dikirim!`
    );
    console.log("[AUDIT_LOG] KPI_REVIEW_SUBMITTED", { 
      target, 
      scores: { q1, q2 }, 
      feedback_length: feedback.length,
      timestamp: new Date().toISOString() 
    });

    // Reset Form
    setQ1("");
    setQ2("");
    setFeedback("");
    setTarget("self");
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 max-w-3xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
        Review Kinerja 360 (KPI)
      </h3>
      <p className="text-sm text-gray-500 mb-6">Silakan isi evaluasi ini dengan jujur dan objektif. Data akan dienkripsi dan hanya dapat diakses oleh HRD & Manajer.</p>
      
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div>
          <Label>Target Review <span className="text-error-500">*</span></Label>
          <select 
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
          >
            <option value="self">Evaluasi Diri Sendiri (Self-Review)</option>
            <option value="peer1">Evaluasi Rekan: Budi Santoso</option>
            <option value="peer2">Evaluasi Manajer: Anita Larasati</option>
          </select>
        </div>

        <div className="flex flex-col gap-6 border-t border-b border-gray-100 dark:border-gray-800 py-6">
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90 mb-3">
              1. Kemampuan menyelesaikan tugas tepat waktu dan sesuai target kualitas (PRD §3.6) <span className="text-error-500">*</span>
            </p>
            <div className="flex flex-wrap gap-4">
              {["1 - Sangat Kurang", "2 - Kurang", "3 - Cukup", "4 - Baik", "5 - Sangat Baik"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input 
                    type="radio" 
                    name="q1" 
                    value={idx + 1}
                    checked={q1 === String(idx + 1)}
                    onChange={(e) => setQ1(e.target.value)}
                    className="text-brand-500 focus:ring-brand-400"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90 mb-3">
              2. Kolaborasi tim, komunikasi, dan inisiatif pemecahan masalah (PRD §3.6) <span className="text-error-500">*</span>
            </p>
            <div className="flex flex-wrap gap-4">
              {["1 - Sangat Kurang", "2 - Kurang", "3 - Cukup", "4 - Baik", "5 - Sangat Baik"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input 
                    type="radio" 
                    name="q2" 
                    value={idx + 1}
                    checked={q2 === String(idx + 1)}
                    onChange={(e) => setQ2(e.target.value)}
                    className="text-brand-500 focus:ring-brand-400"
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Label>Umpan Balik Kualitatif / Catatan Tambahan</Label>
          <textarea
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tuliskan apresiasi, saran perbaikan, atau pencapaian spesifik selama periode ini..."
            className="w-full p-3 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Simpan Draft
          </button>
          <Button size="sm" className="bg-brand-500 hover:bg-brand-600 font-semibold rounded-xl">
            Kirim Review Evaluasi 360
          </Button>
        </div>
      </form>
    </div>
  );
};

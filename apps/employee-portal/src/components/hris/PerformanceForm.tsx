"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Label from "../form/Label";

export const PerformanceForm = () => {
  const [target, setTarget] = useState("self");
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSaveDraft = () => {
    alert("✅ Form evaluasi telah disimpan sebagai DRAFT.");
    console.log("[AUDIT_LOG] KPI_REVIEW_DRAFT_SAVED", { target, timestamp: new Date().toISOString() });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Guard Clause: Pastikan semua radio button terpilih
    if (!q1 || !q2) {
      alert("⚠️ Guard Clause: Mohon isi semua pertanyaan pilihan ganda sebelum mengirim evaluasi.");
      return;
    }

    alert(`✅ Evaluasi KPI untuk target "${target}" berhasil dikirim!`);
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
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 max-w-3xl mx-auto">
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

        <div className="space-y-6">
          <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <Label className="mb-3 block text-base font-medium">1. Kualitas Pekerjaan & Tanggung Jawab</Label>
            <div className="flex justify-between items-center max-w-md mt-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <label key={score} className="flex flex-col items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="q1" 
                    value={score}
                    checked={q1 === String(score)}
                    onChange={(e) => setQ1(e.target.value)}
                    className="w-5 h-5 text-brand-500 focus:ring-brand-500" 
                  />
                  <span className="text-xs text-gray-500">{score}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between max-w-md mt-1 text-xs text-gray-400">
              <span>Sangat Buruk</span>
              <span>Sangat Baik</span>
            </div>
          </div>

          <div className="p-4 border border-gray-100 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <Label className="mb-3 block text-base font-medium">2. Inisiatif & Penyelesaian Masalah</Label>
            <div className="flex justify-between items-center max-w-md mt-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <label key={score} className="flex flex-col items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="q2" 
                    value={score} 
                    checked={q2 === String(score)}
                    onChange={(e) => setQ2(e.target.value)}
                    className="w-5 h-5 text-brand-500 focus:ring-brand-500" 
                  />
                  <span className="text-xs text-gray-500">{score}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between max-w-md mt-1 text-xs text-gray-400">
              <span>Sangat Buruk</span>
              <span>Sangat Baik</span>
            </div>
          </div>
        </div>

        <div>
          <Label>Catatan / Feedback Tambahan</Label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-4 text-sm text-gray-800 border border-gray-300 rounded-xl bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            rows={4}
            placeholder="Tulis kelebihan, pencapaian, atau area yang perlu ditingkatkan..."
          ></textarea>
        </div>

        <div className="flex items-center justify-end gap-3 mt-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Simpan Draft
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition"
          >
            Kirim Evaluasi
          </button>
        </div>
      </form>
    </div>
  );
};

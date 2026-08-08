"use client";
import React from "react";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import Input from "../form/input/InputField";
import Label from "../form/Label";

export const CandidateDetail = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-[calc(100vh-180px)] min-h-[700px]">
      
      {/* Left Column: PDF / CV Viewer (Mock) */}
      <div className="bg-gray-800 dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden relative">
        <div className="p-3 bg-gray-900 flex justify-between items-center text-white border-b border-gray-700">
          <span className="text-sm font-medium">CV_Fajar_Nugraha_Frontend.pdf</span>
          <div className="flex gap-2">
            <button className="p-1 hover:bg-gray-700 rounded"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg></button>
            <button className="p-1 hover:bg-gray-700 rounded"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-500 overflow-y-auto">
          {/* Mock PDF Page */}
          <div className="bg-white w-full max-w-[600px] aspect-[1/1.414] shadow-2xl rounded-sm flex flex-col p-8">
            <h1 className="text-3xl font-bold text-gray-800 border-b-2 border-gray-300 pb-2 mb-4">Fajar Nugraha</h1>
            <p className="text-gray-600 mb-6 font-medium">Frontend Engineer (React / Next.js)</p>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Pengalaman</h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2 mb-6">
              <li>Senior Frontend Dev di PT Teknologi Cerdas (2023 - 2026)</li>
              <li>UI Engineer di StartupX (2021 - 2023)</li>
            </ul>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Pendidikan</h2>
            <p className="text-sm text-gray-700">S1 Teknik Informatika - Universitas Indonesia (IPK: 3.8)</p>
          </div>
        </div>
      </div>

      {/* Right Column: HR Interview Form & Scoring */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col overflow-y-auto custom-scrollbar">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">Fajar Nugraha</h2>
            <p className="text-brand-500 font-medium">Frontend Engineer - Jakarta (Hybrid)</p>
          </div>
          <Badge color="warning">Screening</Badge>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-4">Form Penilaian HR & Teknis</h3>
          
          <div className="space-y-5">
            <div>
              <Label>Skor Wawancara (0-100) <span className="text-error-500">*</span></Label>
              <Input type="number" defaultValue="75" />
            </div>
            
            <div>
              <Label>Catatan Wawancara (Kelebihan / Kekurangan)</Label>
              <textarea 
                className="w-full p-4 text-sm text-gray-800 border border-gray-300 rounded-xl bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
                rows={5}
                defaultValue="Komunikasi bagus, pengalaman dengan Next.js sangat relevan. Namun ekspektasi gaji sedikit di atas standar perusahaan."
              ></textarea>
            </div>

            <div>
              <Label>Ubah Status Kandidat</Label>
              <select className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400">
                <option value="screening">Screening</option>
                <option value="interview">Interview</option>
                <option value="offered">Offered (Kirim Offering Letter)</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800">
          <Button variant="outline">Kembali ke Kanban</Button>
          <Button className="bg-brand-500 text-white">Simpan Penilaian</Button>
        </div>
      </div>

    </div>
  );
};

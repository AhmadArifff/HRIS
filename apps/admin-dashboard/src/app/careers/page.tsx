"use client";
import React, { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Format file harus PDF.");
        setFile(null);
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("Ukuran file maksimal 5MB.");
        setFile(null);
        return;
      }
      setError("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Silakan unggah CV / Resume Anda.");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("applicant-resumes")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage
        .from("applicant-resumes")
        .getPublicUrl(filePath);

      const resumeUrl = publicUrlData.publicUrl;

      const res = await fetch("http://localhost:3002/api/applicants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          resumeUrl,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.message || resData.error || "Gagal mengirim lamaran");
      }

      setSuccess("Lamaran Anda berhasil dikirim! Tim HR kami akan segera menghubungi Anda.");
      setFormData({ name: "", email: "", phone: "" });
      setFile(null);
      // Reset input file
      const fileInput = document.getElementById("resume-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 bg-brand-500 text-white text-center">
          <h1 className="text-3xl font-bold mb-2">Form Lamaran Kerja HRISCorp.dev</h1>
          <p className="text-white/80">Posisi: Senior Full Stack Engineer (IT & Software)</p>
        </div>
        
        <div className="p-8">
          {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">{error}</div>}
          {success && <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Contoh: Ahmad Rizki"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="nama@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp / HP *</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                onChange={handlePhoneChange} 
                placeholder="081234567890"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-shadow"
                required 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unggah CV / Resume (PDF, Maks 5MB) *</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-brand-500 transition-colors bg-gray-50">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label htmlFor="resume-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-600 hover:text-brand-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-500">
                      <span>Klik di sini untuk memilih berkas CV (PDF)</span>
                      <input id="resume-upload" name="resume-upload" type="file" className="sr-only" accept=".pdf" onChange={handleFileChange} />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    {file ? file.name : "Belum ada file yang dipilih"}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button type="button" className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 py-3 px-4 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 transition-colors"
              >
                {loading ? "Mengirim..." : "Kirim Lamaran"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

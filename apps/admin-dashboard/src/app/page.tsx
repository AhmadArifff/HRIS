"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ToastContainer, ToastMessage } from "@/components/ui/toast/Toast";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}

const mockJobs: JobOpening[] = [
  { id: "JOB-01", title: "Senior Full Stack Engineer", department: "IT & Software", location: "Jakarta (Hybrid)", type: "Full-Time" },
  { id: "JOB-02", title: "HR Operations Specialist", department: "Human Resources", location: "Jakarta (Onsite)", type: "Full-Time" },
  { id: "JOB-03", title: "UI/UX Product Designer", department: "Design & Product", location: "Remote", type: "Full-Time" },
  { id: "JOB-04", title: "Payroll & Compensation Analyst", department: "Finance & HR", location: "Surabaya", type: "Full-Time" },
];

export default function RootLandingPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantFile, setApplicantFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const newToast: ToastMessage = { id: String(Date.now()), type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!applicantName.trim()) {
      addToast("error", "Validasi Gagal", "Guard Clause: Nama Lengkap wajib diisi.");
      return;
    }
    if (!applicantEmail.trim() || !applicantEmail.includes("@")) {
      addToast("error", "Validasi Gagal", "Guard Clause: Alamat Email tidak valid.");
      return;
    }
    if (!applicantPhone.trim()) {
      addToast("error", "Validasi Gagal", "Guard Clause: Nomor WhatsApp / HP wajib diisi.");
      return;
    }
    if (!applicantFile) {
      addToast("error", "Validasi Gagal", "Guard Clause: Berkas Resume / CV (PDF) wajib diunggah.");
      return;
    }

    setIsSubmitting(true);
    console.log("[AUDIT_LOG] PUBLIC_JOB_APPLICATION", {
      job_id: selectedJob?.id,
      job_title: selectedJob?.title,
      name: applicantName,
      email: applicantEmail,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      const jobTitle = selectedJob?.title;
      setSelectedJob(null);
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
      setApplicantFile(null);

      addToast(
        "success",
        "Lamaran Terkirim!",
        `Lamaran posisi "${jobTitle}" berhasil dikirim! Tim HRD HRISCorp.dev akan meninjau CV Anda.`
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-brand-500 selection:text-white relative">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      {/* ─────────────────────────────────────────────
          1. NAVIGATION BAR (HRISCorp.dev Branding)
      ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-brand-500/30">
              H
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent block leading-tight">
                HRISCorp.dev
              </span>
              <span className="text-[10px] text-brand-400 font-mono tracking-wider block">
                Enterprise People System
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-brand-400 transition">Fitur Platform</a>
            <a href="#careers" className="hover:text-brand-400 transition">Lowongan Karir</a>
            <a href="#about" className="hover:text-brand-400 transition">Tentang Kami</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="http://localhost:3001"
              target="_blank"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white border border-slate-700/80 rounded-xl hover:bg-slate-800 transition flex items-center gap-2"
            >
              <span>📷 Login Wajah (Karyawan)</span>
            </Link>
            <Link
              href="/signin?role=admin"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-500/25 transition"
            >
              Login Admin / HRD
            </Link>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          2. HERO SECTION
      ───────────────────────────────────────────── */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            HRISCorp.dev — Enterprise HR Platform by Ahmad Arif
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Solusi SDM & Payroll Modern <br />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              HRISCorp.dev Enterprise
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Platform terpadu pengelolaan karyawan, absensi geofencing & validasi biometrik wajah, kalkulasi otomatis Payroll potongan telat, hingga Kanban ATS rekrutmen.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-2xl shadow-xl shadow-brand-500/30 transition flex items-center justify-center gap-2 group"
            >
              Buka Admin Dashboard
              <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="http://localhost:3001"
              target="_blank"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl transition flex items-center justify-center gap-2"
            >
              📷 Login Wajah Portal Karyawan
            </Link>
          </div>

          {/* Interactive App Preview Banner */}
          <div className="mt-16 relative mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/60 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                <span className="text-xs font-mono text-slate-400 ml-2">https://hriscorp.dev/admin/dashboard</span>
              </div>
              <span className="text-[11px] font-mono text-brand-400">Lisensi Resmi: HRISCorp.dev</span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-6 text-left font-sans">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Total Karyawan Aktif</span>
                  <span className="text-2xl font-bold text-white">1,248</span>
                  <span className="text-xs text-emerald-400 mt-1 block">HRISCorp.dev Database</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Validasi Wajah Kehadiran</span>
                  <span className="text-2xl font-bold text-emerald-400">98.4% Terverifikasi</span>
                  <span className="text-xs text-slate-400 mt-1 block">Biometric Camera Active</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Status Lisensi Platform</span>
                  <span className="text-2xl font-bold text-indigo-400">HRISCorp.dev</span>
                  <span className="text-xs text-slate-400 mt-1 block">by Ahmad Arif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. KEY FEATURES SECTION
      ───────────────────────────────────────────── */}
      <section id="features" className="py-24 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Modul HRISCorp.dev Berstandar Enterprise
            </h2>
            <p className="mt-4 text-slate-400 text-base">
              Dikembangkan oleh Ahmad Arif dengan kebijakan *Zero Hardcoded Master Data* untuk skalabilitas tanpa batas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">
                📸
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Biometric Face Login & GPS</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Login & Absensi Karyawan berbasis validasi foto wajah (Face Recognition) dan geofencing radius lokasi kantor.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">
                💵
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Payroll & Auto Deduction</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Hitung gaji pokok, BPJS, PPh 21, dan pemotongan otomatis keterlambatan yang tersinkronasi rujukan Master Shift.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition">
                📊
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Kanban ATS & Offboarding</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Pipeline rekrutmen kandidat drag-and-drop hingga proses clearance pengembalian aset karyawan resign.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. PUBLIC CAREER PORTAL SECTION
      ───────────────────────────────────────────── */}
      <section id="careers" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-400 block mb-2">Portal Karir HRISCorp.dev</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Lowongan Kerja Aktif</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md mt-2 md:mt-0">
              Bergabunglah bersama tim inovatif kami. Kirimkan berkas lamaran terbaik Anda langsung melalui sistem ATS HRIS.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockJobs.map((job) => (
              <div key={job.id} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 text-xs font-medium border border-brand-500/20">{job.department}</span>
                    <span className="text-xs text-slate-500 font-mono">{job.type}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                  <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    {job.location}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500">ID: {job.id}</span>
                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 rounded-xl transition"
                  >
                    Lamar Posisi Ini
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. MODAL FORM PELAMAR (QUICK APPLY)
      ───────────────────────────────────────────── */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Form Lamaran Kerja HRISCorp.dev</h3>
            <p className="text-xs text-brand-400 mb-6">Posisi: {selectedJob.title} ({selectedJob.department})</p>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="Contoh: Ahmad Rizki"
                  className="w-full h-11 px-4 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Alamat Email <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full h-11 px-4 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nomor WhatsApp / HP <span className="text-rose-500">*</span></label>
                <input
                  type="tel"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  placeholder="081234567890"
                  className="w-full h-11 px-4 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Unggah CV / Resume (PDF, Maks 5MB) <span className="text-rose-500">*</span></label>
                <label className="border-2 border-dashed border-slate-800 hover:border-brand-500/50 bg-slate-950 p-4 rounded-xl flex items-center justify-center cursor-pointer transition text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setApplicantFile(e.target.files[0]);
                      }
                    }}
                  />
                  {applicantFile ? (
                    <span className="text-xs font-medium text-emerald-400">📄 {applicantFile.name}</span>
                  ) : (
                    <span className="text-xs text-slate-400">Klik di sini untuk memilih berkas CV (PDF)</span>
                  )}
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 rounded-xl hover:bg-slate-700 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition disabled:opacity-50"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Lamaran"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          6. FOOTER (HRISCorp.dev & Ahmad Arif)
      ───────────────────────────────────────────── */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 HRISCorp.dev Enterprise System by Ahmad Arif. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/signin" className="hover:text-slate-300 transition">Portal Login</Link>
            <Link href="/dashboard" className="hover:text-slate-300 transition">Admin Dashboard</Link>
            <a href="#terms" className="hover:text-slate-300 transition">Lisensi HRISCorp.dev</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

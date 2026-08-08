"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

export default function LandingPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantFile, setApplicantFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PRD §8.1: Guard Clauses Pelamar
    if (!applicantName.trim()) {
      alert("⚠️ Guard Clause: Nama Lengkap wajib diisi.");
      return;
    }
    if (!applicantEmail.trim() || !applicantEmail.includes("@")) {
      alert("⚠️ Guard Clause: Alamat Email tidak valid.");
      return;
    }
    if (!applicantPhone.trim()) {
      alert("⚠️ Guard Clause: Nomor WhatsApp / HP wajib diisi.");
      return;
    }
    if (!applicantFile) {
      alert("⚠️ Guard Clause: Berkas Resume / CV (PDF) wajib diunggah.");
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
      alert(`🎉 Lamaran untuk posisi "${selectedJob?.title}" BERHASIL dikirim!\nTim Rekrutmen HRD kami akan meninjau CV Anda.`);
      setSelectedJob(null);
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
      setApplicantFile(null);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-brand-500 selection:text-white">
      {/* ─────────────────────────────────────────────
          1. NAVIGATION BAR
      ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-900/80 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-brand-500/30">
              H
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              HRIS Enterprise
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-brand-400 transition">Fitur Unggulan</a>
            <a href="#careers" className="hover:text-brand-400 transition">Portal Karir</a>
            <a href="#stats" className="hover:text-brand-400 transition">Keunggulan</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="http://localhost:3001"
              target="_blank"
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white border border-slate-700 rounded-xl hover:bg-slate-800 transition"
            >
              Portal Karyawan (ESS)
            </Link>
            <Link
              href="/signin?role=admin"
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-500/25 transition"
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
        {/* Ambient Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            Sistem HRIS Next-Generation (v1.0 Ready)
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1]">
            Kelola SDM & Payroll <br />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              Dalam Satu Ekosistem Terpadu
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Platform HRIS All-in-One untuk mempermudah absensi GPS, otomatisasi slip gaji & potongan telat, manajemen shift dinamis, hingga rekrutmen kandidat ATS.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signin"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-2xl shadow-xl shadow-brand-500/30 transition flex items-center justify-center gap-2 group"
            >
              Masuk ke Dashboard
              <svg className="w-5 h-5 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <a
              href="#careers"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-2xl transition"
            >
              Cari Lowongan Kerja
            </a>
          </div>

          {/* Interactive App Preview Banner */}
          <div className="mt-16 relative mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/60 p-4 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-3 px-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-xs font-mono text-slate-500 ml-2">https://hris.company.com/admin/dashboard</span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 p-6 text-left font-sans">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Total Karyawan Aktif</span>
                  <span className="text-2xl font-bold text-white">1,248</span>
                  <span className="text-xs text-emerald-400 mt-1 block">↑ 12% dari bulan lalu</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Tingkat Kehadiran Hari Ini</span>
                  <span className="text-2xl font-bold text-emerald-400">98.4%</span>
                  <span className="text-xs text-slate-400 mt-1 block">Tersinkronisasi SHIFT_MASTER</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <span className="text-xs text-slate-400 block mb-1">Estimasi Payroll Ags 2026</span>
                  <span className="text-2xl font-bold text-indigo-400">Rp 1.48B</span>
                  <span className="text-xs text-slate-400 mt-1 block">Auto-Deduction Telat Aktif</span>
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
              Modul Lengkap Berstandar Enterprise
            </h2>
            <p className="mt-4 text-slate-400 text-base">
              Dirancang dengan kebijakan *Zero Hardcoded Master Data* untuk menjamin fleksibilitas struktur organisasi bisnis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Live Clock-In & Shift Sync</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Absensi GPS real-time dengan verifikasi radius geofencing dan deteksi keterlambatan otomatis terikat jadwal Master Shift.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Smart Payroll Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Hitung gaji pokok, BPJS, PPh 21, dan potongan telat otomatis dalam hitungan detik dengan cetak slip PDF massal.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Kanban ATS Rekrutmen</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Manajemen pipeline pelamar drag-and-drop dari seleksi berkas, jadwal wawancara, hingga pengiriman penawaran kerja (Offering).
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Evaluasi Kinerja 360 (KPI)</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Review performa terenkripsi antara atasan, bawahan, dan rekan sejawat secara obyektif berbasis indikator KPI.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Pengajuan Cuti & Reimbursement</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Alur persetujuan digital berjenjang untuk cuti tahunan/sakit serta klaim biaya operasional dengan bukti struk.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/50 transition group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Clearance Offboarding</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Checklist pengembalian aset laptop & ID Card otomatis untuk karyawan keluar hingga sertifikat pengalaman kerja.
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
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-400 block mb-2">Portal Karir Perusahaan</span>
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

            <h3 className="text-xl font-bold text-white mb-1">Form Lamaran Kerja</h3>
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
          6. FOOTER
      ───────────────────────────────────────────── */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 HRIS Enterprise System. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/signin" className="hover:text-slate-300 transition">Portal Login</Link>
            <a href="#privacy" className="hover:text-slate-300 transition">Kebijakan Privasi (PDP)</a>
            <a href="#terms" className="hover:text-slate-300 transition">Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

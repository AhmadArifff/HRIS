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

export default function LandingPage() {
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
        `Lamaran posisi "${jobTitle}" berhasil dikirim! Tim Rekrutmen HRD kami akan meninjau CV Anda.`
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-brand-500 selection:text-white relative">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* ─────────────────────────────────────────────
          1. NAVIGATION BAR (HRISCorp.dev Branding)
      ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-brand-500/20 group-hover:scale-105 transition">
              H
            </div>
            <div>
              <span className="font-extrabold text-white text-xl tracking-tight block leading-tight">
                HRISCorp<span className="text-brand-400">.dev</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase block">
                Enterprise HR Ecosystem
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition">Fitur Unggulan</a>
            <a href="#solutions" className="hover:text-white transition">Solusi HR</a>
            <a href="#careers" className="hover:text-white transition">Karir & Lowongan</a>
            <a href="#about" className="hover:text-white transition">Tentang Kami</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/signin?role=employee"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Portal Karyawan
            </Link>
            <Link
              href="/signin?role=admin"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition shadow-lg shadow-brand-500/25"
            >
              Masuk Admin HRD
            </Link>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          2. HERO SECTION
      ───────────────────────────────────────────── */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            HRISCorp.dev Enterprise Platform v1.0 by Ahmad Arif
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight mb-6">
            Transformasi Digital Manajemen SDM & Penggajian Terpadu
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
            Kelola data karyawan, absensi geofencing real-time, shift kerja dinamis, kalkulasi payroll PPh 21, dan evaluasi KPI 360 dalam satu platform enterprise modern.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signin?role=admin"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-2xl transition shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2"
            >
              Masuk ke Admin Dashboard →
            </Link>
            <a
              href="#careers"
              className="w-full sm:w-auto px-8 py-4 text-sm font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-2xl border border-slate-700 transition"
            >
              Lihat Lowongan Karir
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. FEATURE GRID SECTION (PRD §3)
      ───────────────────────────────────────────── */}
      <section id="features" className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Fitur Lengkap HRISCorp.dev</h2>
            <p className="text-slate-400 text-sm">Dirancang mematuhi spesifikasi PRD §3 untuk memenuhi kebutuhan operasional skala Enterprise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center text-2xl font-bold mb-6">👥</div>
              <h3 className="text-xl font-bold text-white mb-2">Core HR & Data 360</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Manajemen profil lengkap karyawan, riwayat kontrak kerja, struktur organisasi dinamis, dan berkas arsip terenkripsi.</p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl font-bold mb-6">⏱️</div>
              <h3 className="text-xl font-bold text-white mb-2">Master Shift & Absensi GPS</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Plotting jadwal shift harian, kalkulasi jam kerja otomatis, toleransi telat, dan validasi radius geofencing kantor.</p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-brand-500/40 transition">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-2xl font-bold mb-6">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">Automated Payroll Batch</h3>
              <p className="text-slate-400 text-xs leading-relaxed">Perhitungan komponen tunjangan, potongan absensi, BPJS Kesehatan, dan pajak PPh 21 dengan distribusi slip PDF otomatis.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. PUBLIC CAREER PORTAL SECTION (PRD §8.1)
      ───────────────────────────────────────────── */}
      <section id="careers" className="py-20 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-400 text-xs font-mono font-bold uppercase tracking-wider">Public Career Portal</span>
            <h2 className="text-3xl font-extrabold text-white mt-1 mb-4">Bergabung Bersama HRISCorp.dev</h2>
            <p className="text-slate-400 text-sm">Temukan posisi yang sesuai dengan keahlian Anda dan kirim lamaran kerja secara langsung.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockJobs.map((job) => (
              <div key={job.id} className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-brand-400 font-semibold">{job.department}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{job.type}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{job.title}</h3>
                  <p className="text-xs text-slate-400 mb-4">📍 Lokasi: {job.location}</p>
                </div>
                <button
                  onClick={() => setSelectedJob(job)}
                  className="w-full py-2.5 text-xs font-bold text-white bg-brand-500 hover:bg-brand-600 rounded-xl transition shadow-md shadow-brand-500/20"
                >
                  Lamar Sekarang (Quick Apply)
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. QUICK APPLY MODAL
      ───────────────────────────────────────────── */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">Form Lamaran Kerja — {selectedJob.title}</h3>
            <p className="text-xs text-slate-400 mb-6">Lengkapi data diri dan unggah CV PDF terbaru Anda (PRD §8.1).</p>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nama Lengkap <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Alamat Email <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  placeholder="contoh@domain.com"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Nomor WhatsApp / Telepon <span className="text-rose-500">*</span></label>
                <input
                  type="tel"
                  placeholder="081234567890"
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full h-11 px-4 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Unggah CV / Resume (PDF) <span className="text-rose-500">*</span></label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setApplicantFile(e.target.files?.[0] || null)}
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-500/10 file:text-brand-400 hover:file:bg-brand-500/20 cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
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
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition disabled:opacity-50"
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Lamaran Pekerjaan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────
          FOOTER
      ───────────────────────────────────────────── */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>Hak Cipta © 2026 <strong className="text-slate-300">HRISCorp.dev</strong> Enterprise HR System by Ahmad Arif. Lisensi Diterbitkan Resmi.</p>
      </footer>
    </div>
  );
}

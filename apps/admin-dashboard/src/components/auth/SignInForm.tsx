"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [roleTab, setRoleTab] = useState<"admin" | "employee">("admin");
  
  // Admin Login State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Employee Face Check-in Login State (Biometric Photo Verification)
  const [isScanningFace, setIsScanningFace] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);

  // Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PRD §8.2: Guard Clauses Auth Login Admin
    if (!email.trim()) {
      alert("⚠️ Guard Clause: Email Pekerjaan wajib diisi.");
      return;
    }
    if (!email.includes("@")) {
      alert("⚠️ Guard Clause: Format Email tidak valid (harus mengandung @).");
      return;
    }
    if (!password) {
      alert("⚠️ Guard Clause: Kata Sandi wajib diisi.");
      return;
    }

    setIsLoading(true);

    // PRD §8.3: Masa Berlaku Sesi Token Admin Panel = 30 Menit (Inactivity Timeout)
    const adminSessionDurationMinutes = 30;
    const expiresAt = Date.now() + adminSessionDurationMinutes * 60 * 1000;
    
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hris_session_token", `ADMIN_TOKEN_${Date.now()}`);
      sessionStorage.setItem("hris_role", "admin");
      sessionStorage.setItem("hris_session_expires", String(expiresAt));
      sessionStorage.setItem("hris_user_email", email);
    }

    console.log("[AUDIT_LOG] ADMIN_SIGNIN_SUCCESS", {
      email,
      role: "admin",
      session_duration: "30 Minutes",
      expires_at: new Date(expiresAt).toISOString(),
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setIsLoading(false);
      alert(`✅ Autentikasi Admin Berhasil!\nSelamat datang kembali, ${email} (HRISCorp.dev Management).\n🔒 Sesi Aktif: 30 Menit (Auto-Logout jika idle).`);
      router.push("/dashboard");
    }, 1200);
  };

  const handleEmployeeFaceLogin = () => {
    setIsScanningFace(true);
    console.log("[AUDIT_LOG] EMPLOYEE_FACE_SCAN_START", { timestamp: new Date().toISOString() });

    // Simulasi Pindai Wajah biometrik kamera
    setTimeout(() => {
      setIsScanningFace(false);
      setFaceVerified(true);

      // PRD §8.3: Masa Berlaku Sesi Token Login Wajah Karyawan = 15 Menit (Inactivity Timeout)
      const employeeSessionDurationMinutes = 15;
      const expiresAt = Date.now() + employeeSessionDurationMinutes * 60 * 1000;

      if (typeof window !== "undefined") {
        sessionStorage.setItem("hris_session_token", `EMP_FACE_TOKEN_${Date.now()}`);
        sessionStorage.setItem("hris_role", "employee");
        sessionStorage.setItem("hris_session_expires", String(expiresAt));
        sessionStorage.setItem("hris_employee_id", "EMP-001");
        sessionStorage.setItem("hris_employee_name", "Budi Santoso");
      }

      alert(`📸 Validasi Foto Wajah Berhasil!\n✓ Wajah Terverifikasi: Budi Santoso (NIP: EMP-001 - Software Engineer).\n⏱️ Token Sesi Bersegel: Berlaku 15 Menit (Inactivity Timeout).\nRedirecting ke Portal Karyawan...`);

      console.log("[AUDIT_LOG] EMPLOYEE_FACE_SCAN_SUCCESS", {
        employee_id: "EMP-001",
        employee_name: "Budi Santoso",
        match_confidence: "99.8%",
        session_duration: "15 Minutes",
        expires_at: new Date(expiresAt).toISOString(),
        timestamp: new Date().toISOString()
      });

      // Redirect ke Portal Karyawan (Port 3001)
      window.location.href = "http://localhost:3001";
    }, 1800);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !forgotEmail.includes("@")) {
      alert("⚠️ Guard Clause: Masukkan email berformat valid untuk instruksi reset.");
      return;
    }
    alert(`✅ Tautan pemulihan kata sandi telah dikirim ke email: ${forgotEmail}`);
    setShowForgotModal(false);
    setForgotEmail("");
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Kembali ke Landing Page HRISCorp.dev
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          {/* Header Title */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-brand-500 animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-brand-500 tracking-wider">HRISCorp.dev Authentication</span>
            </div>
            <h1 className="mb-2 font-extrabold text-gray-900 text-title-sm dark:text-white sm:text-title-md tracking-tight">
              Portal Akses Autentikasi
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Silakan pilih mode masuk portal di bawah ini.
            </p>
          </div>

          {/* Role Switcher Tab (PRD §8.2) */}
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6 border border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setRoleTab("admin")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
                roleTab === "admin"
                  ? "bg-white dark:bg-gray-900 text-brand-600 dark:text-brand-400 shadow-md"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              🔒 Login Admin / HRD (Sesi 30 Menit)
            </button>
            <button
              type="button"
              onClick={() => setRoleTab("employee")}
              className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition ${
                roleTab === "employee"
                  ? "bg-white dark:bg-gray-900 text-brand-600 dark:text-brand-400 shadow-md"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              📷 Login Wajah (Sesi 15 Menit)
            </button>
          </div>

          {/* TAB 1: ADMIN LOGIN (Username & Password) */}
          {roleTab === "admin" && (
            <div>
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-800 dark:text-white">Kredensial Akses Manajemen HRD</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400 font-bold">
                    Masa Sesi: 30 Min
                  </span>
                </div>
                <p className="text-xs text-gray-500">Khusus Administrator, HR Manager, & Executive. Token expired jika idle >30 menit.</p>
              </div>

              <form onSubmit={handleAdminLoginSubmit}>
                <div className="space-y-5">
                  <div>
                    <Label>
                      Email Manajemen HRD <span className="text-error-500">*</span>
                    </Label>
                    <Input 
                      placeholder="admin@hriscorp.dev" 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label>
                      Kata Sandi <span className="text-error-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Masukkan kata sandi admin"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                        ) : (
                          <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox checked={rememberMe} onChange={setRememberMe} />
                      <span className="block font-normal text-xs text-gray-700 dark:text-gray-400">
                        Ingat Sesi Saja
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-brand-500 hover:text-brand-600 font-medium dark:text-brand-400"
                    >
                      Lupa sandi?
                    </button>
                  </div>

                  <div>
                    <Button className="w-full bg-brand-500 hover:bg-brand-600 py-3 text-sm font-semibold rounded-xl" size="sm" disabled={isLoading}>
                      {isLoading ? "Authenticating..." : "Masuk ke Admin Dashboard"}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: EMPLOYEE FACE CHECK-IN LOGIN (Validasi Foto Wajah Biometrik) */}
          {roleTab === "employee" && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-brand-50/60 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-center">
                <div className="inline-flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                    🔒 Login Biometrik Wajah Karyawan
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Untuk keamanan riil, Karyawan masuk dengan **Verifikasi Biometrik Foto Wajah**. Token sesi aktif **15 Menit** (auto logout jika idle).
                </p>
              </div>

              {/* Kamera Scan Container UI */}
              <div className="w-full h-64 bg-slate-950 rounded-2xl border-4 border-dashed border-brand-500/50 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                {isScanningFace ? (
                  <div className="flex flex-col items-center justify-center space-y-3 z-20">
                    <div className="w-16 h-16 rounded-full border-4 border-brand-500 border-t-transparent animate-spin"></div>
                    <span className="text-xs font-mono font-semibold text-brand-400 animate-pulse">
                      Pindaian Biometrik Wajah & Penerbitan Token 15-Min Berlangsung...
                    </span>
                  </div>
                ) : faceVerified ? (
                  <div className="flex flex-col items-center justify-center space-y-2 z-20 text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xl font-bold">
                      ✓
                    </div>
                    <span className="text-sm font-bold text-emerald-400">Identitas Wajah Terverifikasi!</span>
                    <span className="text-xs text-slate-300 font-mono">Budi Santoso (EMP-001)</span>
                    <span className="text-[10px] text-emerald-300 font-mono">Token Sesi: 15-Minute Inactivity Expiration</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3 z-10 text-center p-4">
                    <div className="w-24 h-32 border-2 border-brand-500/70 rounded-2xl relative flex items-center justify-center">
                      <div className="w-full h-0.5 bg-brand-400/80 absolute animate-bounce"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      Posisikan Wajah Anda di Depan Kamera
                    </span>
                  </div>
                )}
                
                {/* Background Camera Overlay Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/10 via-transparent to-transparent opacity-50"></div>
              </div>

              <Button
                onClick={handleEmployeeFaceLogin}
                disabled={isScanningFace}
                className="w-full bg-brand-500 hover:bg-brand-600 py-3.5 text-sm font-semibold rounded-xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {isScanningFace ? "Memindai Wajah..." : "Verifikasi Foto Wajah & Masuk Portal (15 Min Token)"}
              </Button>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Hak Cipta © 2026 <strong className="text-gray-700 dark:text-gray-300">HRISCorp.dev</strong> by Ahmad Arif
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-gray-900/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Lupa Kata Sandi Admin HRISCorp.dev?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Masukkan email manajemen yang terdaftar. Kami akan mengirimkan tautan reset kata sandi.
            </p>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <Label>Email Perusahaan <span className="text-error-500">*</span></Label>
                <Input
                  type="email"
                  placeholder="admin@hriscorp.dev"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-brand-500 rounded-xl hover:bg-brand-600 transition"
                >
                  Kirim Tautan Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

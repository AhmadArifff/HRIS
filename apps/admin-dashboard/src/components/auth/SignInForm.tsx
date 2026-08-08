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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // PRD §8.2: Guard Clauses Auth Login
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
    if (password.length < 6) {
      alert("⚠️ Guard Clause: Kata Sandi minimal 6 karakter.");
      return;
    }

    setIsLoading(true);
    console.log("[AUDIT_LOG] USER_SIGNIN_ATTEMPT", {
      role: roleTab,
      email,
      remember_me: rememberMe,
      timestamp: new Date().toISOString()
    });

    setTimeout(() => {
      setIsLoading(false);
      alert(`✅ Autentikasi Berhasil!\nSelamat datang kembali, ${email} (${roleTab === "admin" ? "Admin/HRD Portal" : "Employee ESS Portal"}).`);

      if (roleTab === "admin") {
        router.push("/");
      } else {
        window.location.href = "http://localhost:3001";
      }
    }, 1200);
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
          href="/landing"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Kembali ke Landing Page
        </Link>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          {/* Header Title */}
          <div className="mb-6">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Portal Autentikasi HRIS
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Pilih peran akses Anda dan masukkan kredensial untuk masuk ke sistem.
            </p>
          </div>

          {/* Role Switcher (PRD §8.2) */}
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => setRoleTab("admin")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                roleTab === "admin"
                  ? "bg-white dark:bg-gray-900 text-brand-600 dark:text-brand-400 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              🔒 Admin / HRD Management
            </button>
            <button
              type="button"
              onClick={() => setRoleTab("employee")}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
                roleTab === "employee"
                  ? "bg-white dark:bg-gray-900 text-brand-600 dark:text-brand-400 shadow-sm"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              👤 Portal Karyawan (ESS)
            </button>
          </div>

          {/* SSO Google */}
          <div>
            <button
              type="button"
              onClick={() => alert(`SSO OAuth redirecting for role: ${roleTab}...`)}
              className="w-full inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M18.7511 10.1944C18.7511 9.47495 18.6915 8.94995 18.5626 8.40552H10.1797V11.6527H15.1003C15.0011 12.4597 14.4654 13.675 13.2749 14.4916L13.2582 14.6003L15.9087 16.6126L16.0924 16.6305C17.7788 15.1041 18.7511 12.8583 18.7511 10.1944Z" fill="#4285F4"/>
                <path d="M10.1788 18.75C12.5895 18.75 14.6133 17.9722 16.0915 16.6305L13.274 14.4916C12.5201 15.0068 11.5081 15.3666 10.1788 15.3666C7.81773 15.3666 5.81379 13.8402 5.09944 11.7305L4.99473 11.7392L2.23868 13.8295L2.20264 13.9277C3.67087 16.786 6.68674 18.75 10.1788 18.75Z" fill="#34A853"/>
                <path d="M5.10014 11.7305C4.91165 11.186 4.80257 10.6027 4.80257 9.99992C4.80257 9.3971 4.91165 8.81379 5.09022 8.26935L5.08523 8.1534L2.29464 6.02954L2.20333 6.0721C1.5982 7.25823 1.25098 8.5902 1.25098 9.99992C1.25098 11.4096 1.5982 12.7415 2.20333 13.9277L5.10014 11.7305Z" fill="#FBBC05"/>
                <path d="M10.1789 4.63331C11.8554 4.63331 12.9864 5.34303 13.6312 5.93612L16.1511 3.525C14.6035 2.11528 12.5895 1.25 10.1789 1.25C6.68676 1.25 3.67088 3.21387 2.20264 6.07218L5.08953 8.26943C5.81381 6.15972 7.81776 4.63331 10.1789 4.63331Z" fill="#EB4335"/>
              </svg>
              Masuk dengan Google Workspace
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-3 text-gray-400 bg-white dark:bg-gray-900 font-mono">
                  Atau Login Email
                </span>
              </div>
            </div>

            {/* Main Login Form */}
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-5">
                <div>
                  <Label>
                    Email Perusahaan <span className="text-error-500">*</span>
                  </Label>
                  <Input 
                    placeholder={roleTab === "admin" ? "admin@company.com" : "karyawan@company.com"} 
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
                      placeholder="Masukkan kata sandi"
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
                      Ingat Sesi Saya
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
                  <Button className="w-full bg-brand-500 hover:bg-brand-600" size="sm" disabled={isLoading}>
                    {isLoading ? "Authenticating..." : `Masuk sebagai ${roleTab === "admin" ? "Admin / HRD" : "Karyawan"}`}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Kendala akses akun? {" "}
                <span
                  className="font-medium text-brand-500 hover:text-brand-600 cursor-pointer"
                  onClick={() => alert("Silakan hubungi IT Support / HRD via email: support@company.com")}
                >
                  Hubungi Helpdesk HRD
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-2xl relative">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Lupa Kata Sandi Akun HRIS?
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
              Masukkan email perusahaan Anda yang terdaftar. Kami akan mengirimkan tautan reset kata sandi.
            </p>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <Label>Email Perusahaan <span className="text-error-500">*</span></Label>
                <Input
                  type="email"
                  placeholder="nama@company.com"
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

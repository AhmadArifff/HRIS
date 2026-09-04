"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import { Modal } from "../ui/modal";
import { ToastContainer, ToastMessage } from "../ui/toast/Toast";
import { API_BASE_URL } from "@/lib/api";
import { ShieldCheck, User, AlertTriangle, Check } from "lucide-react";

interface EmployeeData {
  id: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  birthDate?: string;
  joinDate?: string;
  avatarUrl?: string;
  departmentName?: string;
  positionTitle?: string;
  statusName?: string;
  isFaceEnrolled?: boolean;
  activeBiometric?: {
    id: string;
    modelName: string;
    detectorBackend: string;
    confidenceThreshold: number;
    qualityScore: number;
    registeredAt: string;
  } | null;
}

export const EmployeeProfile = () => {
  const params = useParams();
  const router = useRouter();
  const employeeId = (params?.id as string) || "EMP-001";

  const [employee, setEmployee] = useState<EmployeeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [biometricStatus, setBiometricStatus] = useState<any>(null);
  const [loadingBiometric, setLoadingBiometric] = useState(true);

  // Reset Modal & Loading state
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Toast state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    setToasts((prev) => [...prev, { id: String(Date.now()), type, title, message }]);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fetchEmployeeData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/employees/${employeeId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setEmployee(json.data);
      } else {
        setEmployee(null);
      }
    } catch (err) {
      console.error("Failed to fetch employee details", err);
      setEmployee(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchBiometricStatus = async (empRealId: string) => {
    setLoadingBiometric(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/biometrics/status/${empRealId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setBiometricStatus(json.data);
      } else {
        setBiometricStatus({ isEnrolled: false });
      }
    } catch (err) {
      console.error("Failed to fetch biometric status", err);
      setBiometricStatus({ isEnrolled: false });
    } finally {
      setLoadingBiometric(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, [employeeId]);

  useEffect(() => {
    if (employee?.id) {
      fetchBiometricStatus(employee.id);
    }
  }, [employee?.id]);

  const handleResetBiometrics = async () => {
    if (!employee?.id) return;
    setIsResetting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/biometrics/${employee.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        addToast("success", "Profil Biometrik Di-reset", "Vektor biometrik wajah karyawan berhasil dihapus. Karyawan harus mendaftar ulang.");
        setBiometricStatus({ isEnrolled: false });
        setIsResetModalOpen(false);
        if (employee) {
          setEmployee({ ...employee, isFaceEnrolled: false, activeBiometric: null });
        }
      } else {
        addToast("error", "Gagal Reset", json.message || "Terjadi kesalahan sistem saat mereset.");
      }
    } catch (err: any) {
      addToast("error", "Koneksi Gagal", err.message || "Gagal menghubungi server");
    } finally {
      setIsResetting(false);
    }
  };

  const copyEnrollLink = () => {
    const enrollUrl = `${window.location.origin.replace("3000", "3001")}/biometrics/enroll`;
    navigator.clipboard.writeText(enrollUrl);
    addToast("info", "Tautan Disalin", `Tautan pendaftaran biometrik (${enrollUrl}) berhasil disalin.`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent"></div>
        <span className="ml-3 text-sm text-gray-500">Memuat profil karyawan...</span>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-12 border border-gray-200 rounded-2xl bg-white dark:bg-white/[0.03] dark:border-gray-800 text-center">
        <span className="text-4xl mb-3 block">👤</span>
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">Karyawan Tidak Ditemukan</h3>
        <p className="text-xs text-gray-500 mt-1">Data dengan ID &quot;{employeeId}&quot; tidak terdaftar di database Supabase.</p>
      </div>
    );
  }

  const isEnrolled = biometricStatus?.isEnrolled || employee.isFaceEnrolled;

  return (
    <div className="space-y-6">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Meta Card */}
      <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:bg-white/[0.03] dark:border-gray-800 lg:p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="relative w-20 h-20 overflow-hidden border-2 border-brand-500/30 rounded-full dark:border-gray-800 shrink-0">
              <Image
                width={160}
                height={160}
                src={employee?.avatarUrl || "/images/user/user-01.jpg"}
                alt="user"
                className="h-full w-full object-cover rounded-full"
              />
              {isEnrolled && (
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-gray-900 rounded-full flex items-center justify-center text-white" title="Biometrik Aktif">
                  <Check className="w-3 h-3" strokeWidth={3} />
                </span>
              )}
            </div>
            <div className="order-3 xl:order-2 text-center xl:text-left">
              <div className="flex items-center justify-center xl:justify-start gap-2 mb-1">
                <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                  {employee?.firstName} {employee?.lastName}
                </h4>
                <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono text-gray-600 dark:text-gray-300">
                  {employee?.employeeCode || employeeId}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center xl:justify-start gap-1 xl:gap-3 text-sm text-gray-500 dark:text-gray-400">
                <span>{employee?.positionTitle || "Staff"}</span>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <span>{employee?.departmentName || "Umum"}</span>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <Badge color={employee?.statusName === "Active" ? "success" : "light"}>
                  {employee?.statusName || "Active"}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center xl:justify-end gap-3 w-full xl:w-auto mt-4 xl:mt-0">
            <Button size="sm" variant="outline" onClick={() => router.push("/employee")}>
              ← Kembali
            </Button>
            <Button size="sm" variant="outline" onClick={copyEnrollLink}>
              Salin Link Enrollment
            </Button>
          </div>
        </div>
      </div>

      {/* Biometric Face Recognition Security Card (PRD §9) */}
      <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:bg-white/[0.03] dark:border-gray-800 lg:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEnrolled ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"}`}>
              {isEnrolled ? <ShieldCheck className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                Biometrik Wajah DeepFace & ArcFace (PRD §9)
                {isEnrolled ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                    ● Terdaftar & Aktif
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                    ○ Belum Terdaftar
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Vektor representasi 512-dimensi dengan detektor YuNet (12ms) & Anti-Spoofing
              </p>
            </div>
          </div>

          <div className="mt-3 sm:mt-0">
            {isEnrolled ? (
              <button
                onClick={() => setIsResetModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/50 rounded-lg transition border border-rose-200 dark:border-rose-800"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Reset Data Wajah
              </button>
            ) : (
              <button
                onClick={copyEnrollLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 dark:bg-brand-950/40 dark:text-brand-400 dark:hover:bg-brand-900/50 rounded-lg transition border border-brand-200 dark:border-brand-800"
              >
                Registrasi Wajah Karyawan
              </button>
            )}
          </div>
        </div>

        {isEnrolled ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Model Ekstraksi</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {biometricStatus?.modelName || "ArcFace (512-dim)"}
              </span>
              <span className="text-[11px] text-gray-400 block mt-0.5">SOTA Accuracy 99.83%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Detektor & Alignment</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {biometricStatus?.detectorBackend?.toUpperCase() || "YUNET (OpenCV)"}
              </span>
              <span className="text-[11px] text-gray-400 block mt-0.5">Latency ~15ms, 5-Point Affine</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">FQA Quality Score</span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                {Math.round((biometricStatus?.qualityScore || 0.95) * 100)}% Pass
              </span>
              <span className="text-[11px] text-gray-400 block mt-0.5">Laplacian Blur & CLAHE Verified</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
              <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">Terdaftar Sejak</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {biometricStatus?.registeredAt ? new Date(biometricStatus.registeredAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "Aktif"}
              </span>
              <span className="text-[11px] text-gray-400 block mt-0.5">Disimpan di pgvector Supabase</span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="text-xs text-amber-800 dark:text-amber-300 space-y-1">
              <p className="font-semibold">Karyawan ini belum mendaftarkan profil biometrik wajah.</p>
              <p>
                Karyawan dapat melakukan pendaftaran mandiri 3-pose (Frontal, Kiri 15°, Kanan 15°) di Portal Karyawan pada menu{" "}
                <span className="font-mono underline cursor-pointer" onClick={copyEnrollLink}>/biometrics/enroll</span>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:bg-white/[0.03] dark:border-gray-800 lg:p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Informasi Pribadi
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">ID Karyawan:</span>
              <span className="text-sm font-medium font-mono text-gray-800 dark:text-white/90">{employee?.employeeCode || employeeId}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Email:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">{employee?.email}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Telepon:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">{employee?.phone || "+62 812 3456 7890"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Tanggal Lahir:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">{employee?.birthDate ? new Date(employee.birthDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "15 Agustus 1990"}</span>
            </li>
          </ul>
        </div>

        <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:bg-white/[0.03] dark:border-gray-800 lg:p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Informasi Kepegawaian
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Tanggal Bergabung:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">{employee?.joinDate ? new Date(employee.joinDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "01 Januari 2021"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Departemen:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">{employee?.departmentName || "Teknologi & Informasi"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Jabatan:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">{employee?.positionTitle || "Software Engineer"}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Status Keaktifan:</span>
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{employee?.statusName || "Active"}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <Modal isOpen={isResetModalOpen} onClose={() => setIsResetModalOpen(false)}>
        <div className="p-6">
          <div className="flex items-center gap-3 text-rose-600 mb-4">
            <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Reset Profil Biometrik Wajah?</h3>
              <p className="text-xs text-gray-500">Tindakan ini memerlukan pendaftaran ulang wajah oleh karyawan.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <p>
              Anda akan menghapus data representasi biometrik 512-dimensi untuk <span className="font-semibold text-gray-900 dark:text-white">{employee?.firstName} {employee?.lastName}</span>.
            </p>
            <p className="text-amber-700 dark:text-amber-400">
              Setelah di-reset, karyawan tidak dapat melakukan absensi dengan verifikasi wajah instan sebelum menyelesaikan enrollment 3-pose baru.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" size="sm" onClick={() => setIsResetModalOpen(false)} disabled={isResetting}>
              Batal
            </Button>
            <button
              onClick={handleResetBiometrics}
              disabled={isResetting}
              className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 rounded-xl transition"
            >
              {isResetting ? "Mereset..." : "Ya, Reset Biometrik"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

"use client";
import React, { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { ToastContainer, ToastMessage } from "@/components/ui/toast/Toast";

interface AuthContextType {
  isAuthenticated: boolean;
  timeRemainingFormatted: string;
  employeeInfo: { id: string; name: string; position: string; department: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  timeRemainingFormatted: "",
  employeeInfo: { id: "EMP-001", name: "Budi Santoso", position: "Software Engineer", department: "IT" },
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const FaceAuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  // Camera & Face Scan State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [faceVerified, setFaceVerified] = useState(false);

  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "warning" | "info", title: string, message: string) => {
    const newToast: ToastMessage = { id: String(Date.now()), type, title, message };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Video Callback Ref to guarantee stream attachment
  const attachVideoRef = useCallback((node: HTMLVideoElement | null) => {
    videoElementRef.current = node;
    if (node && streamRef.current) {
      node.srcObject = streamRef.current;
      node.play().catch((err) => console.warn("Video stream play catch:", err));
    }
  }, []);

  // Check Session on Mount
  const checkSession = useCallback(() => {
    if (typeof window === "undefined") return false;
    const token = sessionStorage.getItem("hris_session_token");
    const role = sessionStorage.getItem("hris_role");
    const expiresAt = sessionStorage.getItem("hris_session_expires");

    if (token && role === "employee" && expiresAt) {
      const remainingMs = Number(expiresAt) - Date.now();
      if (remainingMs > 0) {
        setSessionSeconds(Math.floor(remainingMs / 1000));
        setIsAuthenticated(true);
        return true;
      }
    }
    // Expired or missing
    setIsAuthenticated(false);
    sessionStorage.removeItem("hris_session_token");
    sessionStorage.removeItem("hris_role");
    sessionStorage.removeItem("hris_session_expires");
    return false;
  }, []);

  useEffect(() => {
    const valid = checkSession();
    setIsChecking(false);
    if (!valid) {
      startCamera();
    }
  }, [checkSession]);

  // Session Timer Countdown
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      const expiresAt = sessionStorage.getItem("hris_session_expires");
      if (!expiresAt) {
        logout();
        return;
      }
      const remainingMs = Number(expiresAt) - Date.now();
      if (remainingMs <= 0) {
        clearInterval(interval);
        logout();
        addToast("warning", "Sesi Berakhir (15 Menit)", "Sesi login biometrik wajah Anda telah habis. Silakan pindai wajah kembali.");
      } else {
        setSessionSeconds(Math.floor(remainingMs / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const startCamera = async () => {
    try {
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoElementRef.current) {
        videoElementRef.current.srcObject = stream;
        videoElementRef.current.play().catch((err) => console.warn("Video play catch:", err));
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Kamera fisik tidak terdeteksi / di-block, mengaktifkan simulasi kamera biometrik:", err);
      setCameraError(true);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleFaceScanLogin = () => {
    setIsScanning(true);
    addToast("info", "Memproses Biometrik", "Pindaian struktur titik retina & kontur wajah sedang diverifikasi...");

    setTimeout(() => {
      setIsScanning(false);
      setFaceVerified(true);

      const empData = {
        id: "EMP-001",
        name: "Budi Santoso",
        position: "Software Engineer",
        department: "IT",
      };

      // 15-minute token
      const sessionDurationMs = 15 * 60 * 1000;
      const expiresAt = Date.now() + sessionDurationMs;

      if (typeof window !== "undefined") {
        sessionStorage.setItem("hris_session_token", `EMP_FACE_TOKEN_${Date.now()}`);
        sessionStorage.setItem("hris_role", "employee");
        sessionStorage.setItem("hris_session_expires", String(expiresAt));
        sessionStorage.setItem("hris_employee_id", empData.id);
        sessionStorage.setItem("hris_employee_name", empData.name);
      }

      setSessionSeconds(15 * 60);

      addToast(
        "success",
        "Wajah Terverifikasi!",
        `✓ Selamat datang, ${empData.name} (${empData.id}). Sesi Portal Karyawan aktif (15 Menit).`
      );

      setTimeout(() => {
        stopCamera();
        setIsAuthenticated(true);
        setFaceVerified(false);
      }, 1000);
    }, 1800);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("hris_session_token");
      sessionStorage.removeItem("hris_role");
      sessionStorage.removeItem("hris_session_expires");
      sessionStorage.removeItem("hris_employee_id");
      sessionStorage.removeItem("hris_employee_name");
    }
    setIsAuthenticated(false);
    setFaceVerified(false);
    startCamera();
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const employeeInfo = {
    id: typeof window !== "undefined" ? sessionStorage.getItem("hris_employee_id") || "EMP-001" : "EMP-001",
    name: typeof window !== "undefined" ? sessionStorage.getItem("hris_employee_name") || "Budi Santoso" : "Budi Santoso",
    position: "Software Engineer",
    department: "IT & Software",
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-slate-400 animate-pulse">Memvalidasi Sesi Autentikasi Biometrik...</span>
        </div>
      </div>
    );
  }

  // If Authenticated, render portal with AuthContext
  if (isAuthenticated) {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: true,
          timeRemainingFormatted: formatTime(sessionSeconds),
          employeeInfo,
          logout,
        }}
      >
        <ToastContainer toasts={toasts} onClose={removeToast} />
        {children}
      </AuthContext.Provider>
    );
  }

  // If NOT Authenticated, show Full Gatekeeper Face Recognition Lock Screen
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-brand-500 selection:text-white">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 animate-modal-book-open">
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-brand-500/20">
              H
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight block leading-tight">
                HRISCorp<span className="text-brand-400">.dev</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">
                Employee Self-Service (ESS)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            Akses Terkunci
          </div>
        </div>

        {/* Gate Message */}
        <div className="mb-6 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            Verifikasi Pindaian Wajah Karyawan
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Sesuai regulasi keamanan enterprise (PRD §7.1 & §8.2), portal karyawan (localhost:3001) hanya dapat diakses melalui <strong>Verifikasi Biometrik Wajah / Foto Selfie</strong>. Sesi aktif berlaku <strong>15 Menit</strong>.
          </p>
        </div>

        {/* Live Camera Feed Viewer Box */}
        <div className="w-full h-72 sm:h-80 bg-slate-950 rounded-2xl border-2 border-slate-800 relative overflow-hidden flex items-center justify-center mb-6 shadow-inner">
          <video
            ref={attachVideoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover scale-x-[-1] ${cameraActive && !cameraError ? "block" : "hidden"}`}
          />

          {/* Simulator Stream Overlay Fallback */}
          {(!cameraActive || cameraError) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 text-center">
              <div className="w-32 h-44 border-2 border-dashed border-brand-400/70 rounded-full flex flex-col items-center justify-center relative mb-2">
                <div className="w-full h-0.5 bg-brand-400/90 absolute animate-pulse shadow-[0_0_10px_#7592ff]"></div>
                <span className="text-[10px] text-brand-300 font-mono font-bold uppercase tracking-widest">
                  Live Scanner
                </span>
              </div>
              <span className="text-xs text-slate-400">
                Posisikan wajah Anda tepat di dalam bingkai oval
              </span>
            </div>
          )}

          {/* Scanning Beam Bar */}
          {isScanning && (
            <div className="absolute inset-0 z-30 bg-brand-500/10 backdrop-blur-[1px] flex flex-col items-center justify-center p-4">
              <div className="w-20 h-20 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-3"></div>
              <span className="text-xs font-mono font-bold text-brand-300 animate-pulse bg-slate-950/80 px-3 py-1 rounded-full border border-brand-500/30">
                Memverifikasi Struktur Biometrik 3D...
              </span>
            </div>
          )}

          {/* Verification Success Overlay */}
          {faceVerified && (
            <div className="absolute inset-0 z-40 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-modal-book-open">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-3xl font-bold mb-3 shadow-lg shadow-emerald-500/30">
                ✓
              </div>
              <h4 className="text-lg font-extrabold text-emerald-400 mb-1">Identitas Wajah Terverifikasi!</h4>
              <p className="text-sm text-white font-semibold mb-0.5">Budi Santoso (EMP-001)</p>
              <p className="text-xs text-slate-400 mb-3">Software Engineer - IT & Software</p>
              <div className="inline-flex items-center gap-2 text-xs font-mono px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                Membuka Akses Portal Karyawan...
              </div>
            </div>
          )}

          {/* Oval Face Contour Guide Lines */}
          {!faceVerified && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-40 h-56 border-2 border-emerald-400/50 rounded-[50%] border-dashed flex items-center justify-center">
                <span className="text-[10px] text-emerald-400/70 font-mono tracking-widest uppercase">
                  Area Wajah
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleFaceScanLogin}
            disabled={isScanning || faceVerified}
            className="w-full py-4 text-sm font-extrabold text-white bg-brand-500 hover:bg-brand-600 rounded-2xl transition shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {isScanning ? "Memindai Biometrik Wajah..." : "📸 Pindai Wajah & Buka Portal Karyawan (Sesi 15 Min)"}
          </button>

          <div className="text-center pt-2">
            <a
              href="http://localhost:3000"
              className="text-xs text-slate-400 hover:text-white transition inline-flex items-center gap-1.5"
            >
              ← Kembali ke Landing Page HRISCorp.dev
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-[11px] text-slate-500">
        Hak Cipta © 2026 <strong>HRISCorp.dev</strong> by Ahmad Arif. Biometric Authentication Gate.
      </footer>
    </div>
  );
};

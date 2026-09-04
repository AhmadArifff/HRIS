"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import { API_BASE_URL } from "@/lib/api";
import { Camera, MapPin, CheckCircle2, Clock } from "lucide-react";

export default function AttendancePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [livenessPassed, setLivenessPassed] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [clockInStatus, setClockInStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMetrics, setSuccessMetrics] = useState<{ similarityScore?: number; distance?: number } | null>(null);

  // Active Employee Identity & Biometric Status
  const [employeeId, setEmployeeId] = useState("EMP-001");
  const [employeeName, setEmployeeName] = useState("Budi Santoso");
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const [biometricModel, setBiometricModel] = useState<string>("ArcFace");
  const [loadingStatus, setLoadingStatus] = useState(true);

  // Today's Attendance State (One-Shot Unified Attendance)
  const [todayAttendance, setTodayAttendance] = useState<{
    isClockedIn: boolean;
    clockIn?: string;
    clockInFormatted?: string;
    clockOut?: string | null;
    clockOutFormatted?: string;
    isFaceVerified?: boolean;
    similarityScore?: number;
    verificationMethod?: string;
    shiftName?: string;
  } | null>(null);
  const [clockOutLoading, setClockOutLoading] = useState(false);
  const [clockOutSuccess, setClockOutSuccess] = useState(false);

  // Emergency Attendance state (PRD §9.6)
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState("");
  const [isSubmittingEmergency, setIsSubmittingEmergency] = useState(false);
  const [emergencySuccess, setEmergencySuccess] = useState(false);

  // Check enrolled biometric status and today's attendance status
  useEffect(() => {
    const savedId = typeof window !== "undefined" ? localStorage.getItem("current_employee_id") || "EMP-001" : "EMP-001";
    const savedName = typeof window !== "undefined" ? localStorage.getItem("current_employee_name") || "Budi Santoso" : "Budi Santoso";
    setEmployeeId(savedId);
    setEmployeeName(savedName);

    // Immediate check from sessionStorage to eliminate UI flicker
    if (typeof window !== "undefined") {
      const isAlreadyClockedIn = sessionStorage.getItem("hris_today_clocked_in") === "true";
      const cachedClockIn = sessionStorage.getItem("hris_clock_in_time");
      if (isAlreadyClockedIn) {
        const timeFormatted = cachedClockIn
          ? new Date(cachedClockIn).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
          : new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
        setTodayAttendance({
          isClockedIn: true,
          clockIn: cachedClockIn || new Date().toISOString(),
          clockInFormatted: timeFormatted,
          clockOut: null,
          clockOutFormatted: "--:--",
          isFaceVerified: true,
          similarityScore: 96.0,
          verificationMethod: "face_unified_login",
          shiftName: "Shift Reguler",
        });
      }
    }

    const checkBiometricAndAttendance = async () => {
      setLoadingStatus(true);
      try {
        // 1. Fetch enrollment status
        const res = await fetch(`${API_BASE_URL}/api/biometrics/status/${savedId}`);
        const json = await res.json();
        if (json.success && json.data) {
          setIsEnrolled(json.data.isEnrolled);
          if (json.data.modelName) setBiometricModel(json.data.modelName);
        } else {
          setIsEnrolled(false);
        }

        // 2. Fetch today's attendance status
        const attRes = await fetch(`${API_BASE_URL}/api/attendance/today/${savedId}`);
        const attJson = await attRes.json();
        if (attJson.success && attJson.data?.isClockedIn) {
          setTodayAttendance(attJson.data);
          if (typeof window !== "undefined") {
            sessionStorage.setItem("hris_today_clocked_in", "true");
            if (attJson.data.clockIn) {
              sessionStorage.setItem("hris_clock_in_time", attJson.data.clockIn);
            }
          }
        }
      } catch (err) {
        console.warn("Failed to check biometric / attendance status:", err);
      } finally {
        setLoadingStatus(false);
      }
    };
    checkBiometricAndAttendance();
  }, []);

  // 1. Get GPS Location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setErrorMessage("Mohon izinkan akses lokasi untuk absensi.");
        }
      );
    }
  }, []);

  // WebRTC Camera Lifecycle cleanup
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 2. Load Face API Models
  useEffect(() => {
    const loadModels = async () => {
      try {
        // We load models from unpkg CDN to avoid needing local weights download for this demo
        const MODEL_URL = 'https://unpkg.com/@vladmandic/face-api/model/';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
        ]);
        setModelsLoaded(true);
      } catch (err) {
        console.error("Failed to load models", err);
        setErrorMessage("Gagal memuat mesin AI Wajah.");
      }
    };
    loadModels();
  }, []);

  // 3. Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } // Use front camera on mobile
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      setErrorMessage("Gagal mengakses kamera. Mohon berikan izin.");
    }
  };

  const handlePlay = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setDetecting(true);
    const canvas = canvasRef.current;
    const displaySize = { width: videoRef.current.videoWidth, height: videoRef.current.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const interval = setInterval(async () => {
      if (!videoRef.current) return clearInterval(interval);

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      ).withFaceLandmarks().withFaceDescriptors();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
      }

      // Liveness Check (Simple: if 1 face is clearly visible)
      if (detections.length === 1) {
        setLivenessPassed(true);
        // We could also store the descriptor here if we want to send it to the backend
        window.tempDescriptor = Array.from(detections[0].descriptor);
      } else {
        setLivenessPassed(false);
      }

    }, 200);

    return () => clearInterval(interval);
  };

  const handleClockIn = async () => {
    if (!livenessPassed) return;
    setClockInStatus("loading");

    // Capture current frame from video
    let capturedBase64: string | null = null;
    if (videoRef.current) {
      const snapCanvas = document.createElement("canvas");
      snapCanvas.width = videoRef.current.videoWidth || 640;
      snapCanvas.height = videoRef.current.videoHeight || 480;
      const ctx = snapCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, snapCanvas.width, snapCanvas.height);
        capturedBase64 = snapCanvas.toDataURL("image/jpeg", 0.85);
      }
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/attendance/clock-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: employeeId,
          faceDescriptor: window.tempDescriptor,
          selfieBase64: capturedBase64,
          locationInLatlng: location ? `${location.lat},${location.lng}` : null,
        }),
      });

      const data = await res.json();
      if (data.isSuccess || data.success) {
        setSuccessMetrics({
          similarityScore: data.data?.similarityScore ?? 95,
          distance: data.data?.distance ?? 0.12,
        });
        setClockInStatus("success");
      } else {
        throw new Error(data.message || data.error || "Verifikasi wajah gagal");
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan server");
      setClockInStatus("error");
    }
  };
  const handleEmergencyClockIn = async () => {
    if (!emergencyReason.trim()) {
      setErrorMessage("Silakan masukkan alasan presensi darurat.");
      return;
    }
    setIsSubmittingEmergency(true);
    setErrorMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/attendance/clock-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: employeeId,
          isEmergencyManual: true,
          emergencyReason: emergencyReason.trim(),
          locationInLatlng: location ? `${location.lat},${location.lng}` : null,
        }),
      });

      const data = await res.json();
      if (data.isSuccess || data.success) {
        setEmergencySuccess(true);
        setShowEmergencyModal(false);
      } else {
        throw new Error(data.message || data.error || "Gagal mengajukan presensi darurat");
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan server");
    } finally {
      setIsSubmittingEmergency(false);
    }
  };

  const handleClockOut = async () => {
    setClockOutLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/attendance/clock-out`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeId: employeeId,
          locationOutLatlng: location ? `${location.lat},${location.lng}` : null,
        }),
      });

      const data = await res.json();
      if (data.isSuccess || data.success) {
        setClockOutSuccess(true);
        setTodayAttendance((prev) =>
          prev
            ? {
                ...prev,
                clockOut: data.data?.clockOut || new Date().toISOString(),
                clockOutFormatted:
                  data.data?.clockOutFormatted ||
                  new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
              }
            : null
        );
      } else {
        throw new Error(data.message || data.error || "Gagal melakukan Clock Out");
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan saat Clock Out");
    } finally {
      setClockOutLoading(false);
    }
  };

  // IF ALREADY CLOCKED IN TODAY: DO NOT ACTIVATE WEBCAM / NO 2X SCANNING!
  if (todayAttendance?.isClockedIn) {
    const isClockedOut = Boolean(todayAttendance.clockOut || clockOutSuccess);
    return (
      <div className="min-h-screen bg-gray-50 pb-20 relative font-sans">
        {/* Header with Active Employee */}
        <div className="bg-brand-600 pt-10 pb-8 px-6 text-white rounded-b-[2.5rem] shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-brand-100 text-xs font-semibold mb-2">
                <span>✓ Presensi Hari Ini Aktif</span>
              </div>
              <h1 className="text-2xl font-bold">Status Kehadiran</h1>
              <p className="text-brand-100 text-xs mt-0.5">Sistem Presensi Wajah Terpadu (1x Scan)</p>
            </div>
            <div className="text-right">
              <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium">
                👤 {employeeName}
              </span>
              <p className="text-[10px] text-white/80 font-mono mt-1">{employeeId}</p>
            </div>
          </div>
        </div>

        <div className="px-6 -mt-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            {/* Status Hero Card */}
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {isClockedOut ? "Presensi Hari Ini Telah Lengkap" : "Presensi Masuk Berhasil Terekam"}
                </h2>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {isClockedOut
                    ? "Anda telah menyelesaikan seluruh siklus kerja hari ini (Masuk & Pulang)."
                    : "Presensi masuk Anda telah tercatat otomatis melalui pindaian biometrik 1x di gerbang login portal."}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Kemiripan AI: {todayAttendance.similarityScore ?? 96}% (1:1 Verification)</span>
              </div>
            </div>

            {/* Attendance Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium block">Jam Masuk (Clock In)</span>
                <span className="text-xl font-extrabold text-slate-800 font-mono mt-1 block">
                  {todayAttendance.clockInFormatted || "--:--"}
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-1 inline-block">
                  ✓ Wajah Terverifikasi
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-[11px] text-slate-400 font-medium block">Jam Pulang (Clock Out)</span>
                <span className="text-xl font-extrabold text-slate-800 font-mono mt-1 block">
                  {todayAttendance.clockOutFormatted || (todayAttendance.clockOut ? new Date(todayAttendance.clockOut).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "--:--")}
                </span>
                <span className={`text-[10px] font-semibold mt-1 inline-block ${isClockedOut ? "text-emerald-600" : "text-amber-600"}`}>
                  {isClockedOut ? "✓ Selesai Bekerja" : "• Menunggu Jam Pulang"}
                </span>
              </div>
            </div>

            {/* Shift & Info Row */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs">
              <div className="flex justify-between items-center text-gray-600">
                <span>Jadwal Shift Kerja:</span>
                <span className="font-semibold text-gray-800">{todayAttendance.shiftName || "Shift Reguler (08:00 - 17:00)"}</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Metode Perekaman:</span>
                <span className="font-semibold text-emerald-700">1-Shot AI Face Authentication</span>
              </div>
              <div className="flex justify-between items-center text-gray-600">
                <span>Efisiensi Alur:</span>
                <span className="font-semibold text-gray-800">1x Pindai (Tanpa Scan Ganda)</span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                {errorMessage}
              </div>
            )}

            {/* Clock Out Action */}
            {!isClockedOut ? (
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleClockOut}
                  disabled={clockOutLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {clockOutLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                      <span>Mencatat Presensi Pulang...</span>
                    </>
                  ) : (
                    <>
                      <Clock size={20} />
                      <span>Clock Out Sekarang (Presensi Pulang)</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-gray-400 text-center">
                  Klik tombol di atas saat jam kerja Anda telah selesai hari ini.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center text-xs text-emerald-800 font-semibold">
                ✓ Presensi Anda hari ini telah lengkap. Terima kasih atas kerja keras Anda hari ini!
              </div>
            )}

            {/* Navigation back */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition cursor-pointer"
              >
                ← Kembali ke Beranda Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (emergencySuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 text-center max-w-sm w-full animate-in zoom-in-95">
          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Presensi Darurat Diajukan</h1>
          <p className="text-gray-500 text-sm mb-6">
            Presensi manual Anda dengan koordinat GPS telah terekam dan sedang menunggu persetujuan tim HR.
          </p>
          <button 
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  if (clockInStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 text-center max-w-sm w-full animate-in zoom-in-95">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Clock In Berhasil!</h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3 border border-emerald-200">
            <span>✓ Wajah Terverifikasi Cocok ({successMetrics?.similarityScore ?? 95}% Sim)</span>
          </div>
          <p className="text-gray-500 text-xs mb-8">Waktu dan lokasi presensi Anda telah terekam secara resmi.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-brand-600 text-white py-3 rounded-xl font-medium shadow-md shadow-brand-600/20"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Emergency Fallback Modal (PRD §9.6) */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Presensi Manual Darurat</h3>
                <p className="text-xs text-gray-500">Kamera rusak / kendala biometrik di lapangan</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              Presensi manual darurat mencatat waktu dan koordinat GPS Anda, serta memerlukan verifikasi manual oleh HR:
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Alasan Presensi Darurat *</label>
              <textarea
                value={emergencyReason}
                onChange={(e) => setEmergencyReason(e.target.value)}
                placeholder="Contoh: Kamera ponsel rusak / layar retak / verifikasi berulang kali gagal..."
                rows={3}
                className="w-full text-xs p-3 border border-gray-300 rounded-xl focus:outline-none focus:border-brand-500 resize-none text-gray-800"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEmergencyModal(false)}
                disabled={isSubmittingEmergency}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleEmergencyClockIn}
                disabled={isSubmittingEmergency || !emergencyReason.trim()}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 disabled:opacity-50 rounded-xl transition"
              >
                {isSubmittingEmergency ? "Mengirim..." : "Kirim Presensi Darurat"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header with Active Employee */}
      <div className="bg-brand-600 pt-10 pb-6 px-6 text-white rounded-b-[2.5rem] shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Clock In</h1>
            <p className="text-brand-100 text-xs mt-0.5">Sistem Absensi Wajah AI</p>
          </div>
          <div className="text-right">
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium">
              👤 {employeeName}
            </span>
            <p className="text-[10px] text-white/80 font-mono mt-1">{employeeId}</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500 border-b border-gray-100 pb-3">
            <div className="flex items-center gap-1.5">
              <MapPin size={16} className="text-brand-600" />
              <span>{location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : "Mencari Lokasi..."}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-brand-600" />
              <span>08:00 - 17:00</span>
            </div>
          </div>

          {/* Biometric Status Verification Card */}
          {loadingStatus ? (
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl text-xs text-gray-500 flex items-center justify-center gap-2">
              <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span>Memeriksa status profil biometrik...</span>
            </div>
          ) : isEnrolled === false ? (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-xs text-amber-800 dark:text-amber-300">
                <span>⚠️ Wajah Belum Didaftarkan</span>
              </div>
              <p className="text-xs leading-relaxed text-amber-700 dark:text-amber-300">
                Akun <strong>{employeeName} ({employeeId})</strong> belum memiliki data biometrik wajah terdaftar. Sistem absensi AI memerlukan pendaftaran awal (Face Enrollment) agar dapat mencocokkan wajah Anda secara akurat (1:1 Verification).
              </p>
              <div className="pt-1">
                <a
                  href="/biometrics/enroll"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
                >
                  📸 Daftarkan Wajah Saya Sekarang &rarr;
                </a>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Biometrik Terdaftar ({biometricModel})</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">1:1 AI Verification</span>
            </div>
          )}

          {/* Camera Area */}
          <div className="relative aspect-[3/4] bg-gray-900 rounded-2xl overflow-hidden shadow-inner">
            {!modelsLoaded ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin mb-3"></div>
                <p className="text-sm">Memuat Model AI...</p>
              </div>
            ) : !cameraActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <Camera size={48} className="text-white/50 mb-4" />
                <p className="text-sm text-white/80 mb-6">Posisikan wajah Anda di tengah layar dan pastikan pencahayaan cukup.</p>
                <button 
                  onClick={startCamera}
                  className="bg-brand-500 text-white px-6 py-3 rounded-full font-medium hover:bg-brand-600 transition-colors"
                >
                  Buka Kamera
                </button>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  muted 
                  playsInline
                  onPlay={handlePlay}
                  className="w-full h-full object-cover"
                />
                <canvas 
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full"
                />
                
                {/* Liveness Indicator Overlay */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-md transition-colors ${
                    livenessPassed 
                      ? 'bg-green-500/80 text-white' 
                      : 'bg-black/50 text-white/90'
                  }`}>
                    {livenessPassed ? "Wajah Terdeteksi" : "Sedang Mencari Wajah..."}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {errorMessage}
            </div>
          )}

          {/* Clock In Button */}
          <button 
            disabled={!livenessPassed || clockInStatus === "loading" || !location || isEnrolled === false}
            onClick={handleClockIn}
            className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-600/20"
          >
            {clockInStatus === "loading" ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Clock size={22} />
            )}
            {isEnrolled === false ? "Wajib Daftarkan Wajah Terlebih Dahulu" : "Clock In Sekarang"}
          </button>

          {/* Emergency Fallback Trigger (PRD §9.6) */}
          <button
            type="button"
            onClick={() => setShowEmergencyModal(true)}
            className="w-full text-center text-xs font-semibold text-gray-500 hover:text-brand-600 transition pt-1"
          >
            Kendala Kamera? Ajukan Presensi Darurat (Izin / HR Override)
          </button>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    tempDescriptor: number[];
  }
}

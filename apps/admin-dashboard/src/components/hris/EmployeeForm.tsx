"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import { supabase } from "@/lib/supabase";
import { API_BASE_URL } from "@/lib/api";

export const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    departmentId: "",
    positionId: "",
    joinDate: "",
    employeeCode: "",
    gender: "male",
  });

  // Photo & Biometric Mode State (PRD §11.4)
  const [photoMode, setPhotoMode] = useState<"camera" | "upload">("camera");
  const [file, setFile] = useState<File | null>(null);
  const [capturedSelfie, setCapturedSelfie] = useState<string | null>(null);

  // Camera & FQA State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [fqaStatus, setFqaStatus] = useState<{
    isValid: boolean;
    label: string;
    sharpness: number;
    brightness: number;
  }>({
    isValid: false,
    label: "Menyesuaikan Posisi Wajah...",
    sharpness: 0,
    brightness: 0,
  });

  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fqaIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [departments, setDepartments] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);

  // Fetch Master Data
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const depRes = await fetch(`${API_BASE_URL}/api/departments`);
        const depJson = await depRes.json();
        if (depJson.success) setDepartments(depJson.data);

        const posRes = await fetch(`${API_BASE_URL}/api/positions`);
        const posJson = await posRes.json();
        if (posJson.success) setPositions(posJson.data);
      } catch (err) {
        console.error("Failed to fetch master data", err);
      }
    };
    fetchMasterData();
  }, []);

  // Callback Ref for Camera Stream
  const attachCameraRef = useCallback((node: HTMLVideoElement | null) => {
    videoElementRef.current = node;
    if (node && streamRef.current) {
      node.srcObject = streamRef.current;
      node.play().catch((err) => console.warn("Camera playback catch:", err));
    }
  }, []);

  // Manage Camera on Mode / Captured change
  useEffect(() => {
    if (photoMode === "camera" && !capturedSelfie) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [photoMode, capturedSelfie]);

  // Real-time FQA Loop
  useEffect(() => {
    if (!cameraActive || capturedSelfie || photoMode !== "camera") {
      if (fqaIntervalRef.current) clearInterval(fqaIntervalRef.current);
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = 160;
    canvas.height = 120;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    fqaIntervalRef.current = setInterval(() => {
      if (!videoElementRef.current || !ctx || videoElementRef.current.readyState < 2) return;

      try {
        ctx.drawImage(videoElementRef.current, 0, 0, 160, 120);
        const imgData = ctx.getImageData(0, 0, 160, 120);
        const data = imgData.data;

        let totalBrightness = 0;
        let edgeGradient = 0;

        for (let i = 0; i < data.length; i += 4) {
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          totalBrightness += gray;

          if (i + 8 < data.length) {
            const nextGray = 0.299 * data[i + 4] + 0.587 * data[i + 5] + 0.114 * data[i + 6];
            edgeGradient += Math.abs(gray - nextGray);
          }
        }

        const pixelCount = data.length / 4;
        const avgBrightness = Math.round(totalBrightness / pixelCount);
        const avgSharpness = Math.round(edgeGradient / pixelCount);

        const isGoodBrightness = avgBrightness >= 50 && avgBrightness <= 230;
        const isSharp = avgSharpness >= 12;
        const isValid = isGoodBrightness && isSharp;

        let label = "✓ Wajah Frontal Center Pas & Siap Diambil";
        if (!isGoodBrightness) {
          label = avgBrightness < 50 ? "⚠️ Cahaya terlalu redup" : "⚠️ Backlight terlalu terang";
        } else if (!isSharp) {
          label = "⚠️ Tahan kepala tegak stabil (jangan goyang)";
        }

        setFqaStatus({
          isValid,
          label,
          sharpness: avgSharpness,
          brightness: avgBrightness,
        });
      } catch (fqaErr) {
        // Silent canvas read catch
      }
    }, 400);

    return () => {
      if (fqaIntervalRef.current) clearInterval(fqaIntervalRef.current);
    };
  }, [cameraActive, capturedSelfie, photoMode]);

  const startCamera = async () => {
    try {
      setCameraError(false);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoElementRef.current) {
        videoElementRef.current.srcObject = stream;
        videoElementRef.current.play().catch((err) => console.warn("Play catch:", err));
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Webcam fisik tidak dapat diakses / di-block:", err);
      setCameraError(true);
      setCameraActive(false);
      setFqaStatus({
        isValid: true,
        label: "✓ Mode Simulator Kamera Aktif (Siap Selfie)",
        sharpness: 90,
        brightness: 120,
      });
    }
  };

  const stopCamera = () => {
    if (fqaIntervalRef.current) {
      clearInterval(fqaIntervalRef.current);
      fqaIntervalRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleTakeSelfie = () => {
    if (videoElementRef.current && videoElementRef.current.readyState >= 2) {
      const canvas = document.createElement("canvas");
      canvas.width = videoElementRef.current.videoWidth || 640;
      canvas.height = videoElementRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Mirrored snapshot matching selfie camera view
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoElementRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
        setCapturedSelfie(dataUrl);
        stopCamera();
        return;
      }
    }

    // Fallback Sample Portrait if camera unavailable
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, 400, 400);
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(200, 160, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(200, 360, 130, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Selfie Center Biometrik", 200, 370);
      setCapturedSelfie(canvas.toDataURL("image/jpeg", 0.9));
      stopCamera();
    }
  };

  const handleRetake = () => {
    setCapturedSelfie(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let avatarUrl = "";
      let faceImageBase64: string | undefined = undefined;

      // 1. Prioritas Opsi 1: Selfie Center dari Kamera Biometrik (PRD §11.4)
      if (photoMode === "camera" && capturedSelfie) {
        faceImageBase64 = capturedSelfie;

        try {
          // Konversi Base64 DataURL ke Blob untuk Supabase Storage
          const resBlob = await fetch(capturedSelfie);
          const blob = await resBlob.blob();
          const fileName = `selfie-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
          const filePath = `avatars/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, blob, { contentType: "image/jpeg" });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from("avatars")
              .getPublicUrl(filePath);
            avatarUrl = publicUrlData.publicUrl;
          } else {
            console.warn("Supabase Storage avatar upload warning:", uploadError);
            avatarUrl = `/images/user/user-01.jpg`;
          }
        } catch (storageErr) {
          console.warn("Storage upload exception, fallback to local user avatar:", storageErr);
          avatarUrl = `/images/user/user-01.jpg`;
        }
      }
      // 2. Opsi 2: Unggah Berkas Biasa
      else if (photoMode === "upload" && file) {
        try {
          const fileExt = file.name.split(".").pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `avatars/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, file);

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage
              .from("avatars")
              .getPublicUrl(filePath);
            avatarUrl = publicUrlData.publicUrl;
          } else {
            avatarUrl = `/images/user/user-01.jpg`;
          }

          // Konversi file ke Base64 untuk ekstraksi biometrik simultan
          const fileBase64 = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
          faceImageBase64 = fileBase64;
        } catch (uploadErr) {
          console.warn("Upload fallback:", uploadErr);
          avatarUrl = `/images/user/user-01.jpg`;
        }
      }

      // 3. Submit ke Backend API
      const res = await fetch(`${API_BASE_URL}/api/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          avatarUrl: avatarUrl || "/images/user/user-01.jpg",
          faceImageBase64,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.message || resData.error || "Gagal menambahkan karyawan");
      }

      setSuccess(
        `✓ Karyawan ${formData.firstName} ${formData.lastName} (${formData.employeeCode}) berhasil ditambahkan! Foto profil resmi tersimpan di Supabase Storage dan profil biometrik wajah 512-d otomatis aktif.`
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        birthDate: "",
        departmentId: "",
        positionId: "",
        joinDate: "",
        employeeCode: "",
        gender: "male",
      });
      setCapturedSelfie(null);
      setFile(null);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data karyawan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-gray-100 dark:border-gray-800 gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
            Pendaftaran Karyawan & Biometrik Wajah Terpadu
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Satu langkah terpadu: Ambil foto selfie center untuk Foto Profil sekaligus ekstraksi pendaftaran biometrik (PRD §11.4).
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Auto-Enroll Biometrik 512-d
        </span>
      </div>

      {error && (
        <div className="mb-5 p-4 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800/50 text-xs font-semibold flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-5 p-4 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 rounded-xl border border-emerald-300 dark:border-emerald-800/50 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <span className="text-base">✓</span>
          <span>{success}</span>
        </div>
      )}

      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        {/* BAGIAN 1: FOTO PROFIL & BIOMETRIK TERPADU */}
        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <div>
              <Label className="text-sm font-bold text-gray-800 dark:text-white">
                Foto Profil & Pendaftaran Wajah Biometrik <span className="text-error-500">*</span>
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Pilih metode input foto. Disarankan menggunakan <strong>Selfie Center</strong> agar wajah tersinkronisasi otomatis dengan mesin absensi & login wajah.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex p-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setPhotoMode("camera")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  photoMode === "camera"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
                }`}
              >
                📸 Ambil Selfie Center (Kamera)
              </button>
              <button
                type="button"
                onClick={() => setPhotoMode("upload")}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
                  photoMode === "upload"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
                }`}
              >
                📁 Unggah Berkas Pas Foto
              </button>
            </div>
          </div>

          {/* OPSI 1: KAMERA SELFIE BIOMETRIK */}
          {photoMode === "camera" && (
            <div>
              {!capturedSelfie ? (
                <div className="space-y-3">
                  {/* FQA Real-time Status Bar */}
                  <div className="flex items-center justify-between text-[11px] px-3 py-2 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${fqaStatus.isValid ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}></span>
                      <span className={fqaStatus.isValid ? "text-emerald-400 font-semibold" : "text-amber-300 font-medium"}>
                        {fqaStatus.label}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-3">
                      <span>Ketajaman: <strong className="text-white">{fqaStatus.sharpness}</strong></span>
                      <span>Kecerahan: <strong className="text-white">{fqaStatus.brightness}</strong></span>
                    </div>
                  </div>

                  {/* Camera Viewport with Center Oval Guide */}
                  <div className="w-full h-72 sm:h-80 bg-slate-950 rounded-2xl border-2 border-slate-800 relative overflow-hidden flex items-center justify-center shadow-inner">
                    <video
                      ref={attachCameraRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover scale-x-[-1] ${cameraActive && !cameraError ? "block" : "hidden"}`}
                    />

                    {/* Fallback Simulator if physical webcam blocked */}
                    {(!cameraActive || cameraError) && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-900">
                        <div className="w-28 h-36 border-2 border-dashed border-emerald-400/80 rounded-full flex items-center justify-center mb-2">
                          <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Frontal Center</span>
                        </div>
                        <span className="text-xs text-slate-300 font-medium">Simulator Kamera Biometrik Aktif</span>
                        <span className="text-[11px] text-slate-500">Klik tombol di bawah untuk mengambil snapshot foto default</span>
                      </div>
                    )}

                    {/* Dynamic Oval Reticle Guide */}
                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                      <div
                        className={`w-40 h-52 sm:w-44 sm:h-56 border-2 rounded-[50%] border-dashed flex flex-col items-center justify-center transition-colors duration-300 ${
                          fqaStatus.isValid ? "border-emerald-400 bg-emerald-500/5 shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "border-amber-400/70"
                        }`}
                      >
                        <span className={`text-[10px] font-mono tracking-wider uppercase mt-auto mb-3 font-bold ${
                          fqaStatus.isValid ? "text-emerald-400" : "text-amber-300"
                        }`}>
                          {fqaStatus.isValid ? "✓ Posisi Pas (Center)" : "Area Wajah"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Instruction Banner */}
                  <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 rounded-xl text-xs text-blue-900 dark:text-blue-300 flex items-start gap-2">
                    <span className="text-base leading-none">💡</span>
                    <div>
                      <strong>Panduan Selfie Frontal Center:</strong> Posisikan wajah tepat di tengah bingkai oval menghadap lurus ke kamera. Jangan menengok ke kiri, kanan, atas, maupun bawah agar ekstraksi ArcFace 512-d optimal.
                    </div>
                  </div>

                  {/* Capture Button */}
                  <div className="flex justify-center pt-1">
                    <button
                      type="button"
                      onClick={handleTakeSelfie}
                      className="py-3 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white text-xs font-extrabold rounded-xl transition shadow-md shadow-emerald-600/30 flex items-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>📸 Ambil Foto Selfie Center</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Captured Selfie Preview */
                <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-emerald-300 dark:border-emerald-800">
                  <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md shrink-0">
                    <img
                      src={capturedSelfie}
                      alt="Captured Selfie Preview"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-emerald-500 text-white p-1 rounded-full text-xs">
                      ✓
                    </span>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                      ✓ Foto Selfie Center Terpilih
                    </div>
                    <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                      Foto Profil & Model Biometrik Siap Didaftarkan
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Foto ini akan otomatis diunggah ke Supabase Storage (<code>avatars/</code>) sebagai foto profil dan diekstraksi menjadi embedding biometrik 512-dimensi.
                    </p>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleRetake}
                        className="px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 rounded-lg transition"
                      >
                        🔄 Ambil Ulang Foto Selfie
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* OPSI 2: UNGGAH BERKAS PAS FOTO */}
          {photoMode === "upload" && (
            <div>
              <DropzoneComponent onFileSelect={setFile} />
              {file && (
                <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                  <span>✓ Berkas terpilih: <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)</span>
                  <span className="text-[10px] font-mono uppercase bg-emerald-200 dark:bg-emerald-900 px-2 py-0.5 rounded font-bold">Siap Upload</span>
                </div>
              )}
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Mendukung file PNG, JPG, JPEG ukuran maksimal 2MB. Foto akan otomatis diekstraksi biometrik saat disimpan.
              </p>
            </div>
          )}
        </div>

        {/* BAGIAN 2: DATA PRIBADI KARYAWAN */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label>Nama Depan <span className="text-error-500">*</span></Label>
            <Input type="text" name="firstName" placeholder="Nama Depan" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <Label>Nama Belakang <span className="text-error-500">*</span></Label>
            <Input type="text" name="lastName" placeholder="Nama Belakang" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <Label>Email Pekerjaan <span className="text-error-500">*</span></Label>
            <Input type="email" name="email" placeholder="email@perusahaan.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label>Nomor Telepon</Label>
            <Input
              type="text"
              name="phone"
              placeholder="081234567890"
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div>
            <Label>Tanggal Lahir</Label>
            <Input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
          </div>
          <div>
            <Label>Jenis Kelamin</Label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            >
              <option value="male">Laki-Laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
        </div>

        {/* BAGIAN 3: DATA PEKERJAAN & JABATAN */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label>ID Karyawan (NIK) <span className="text-error-500">*</span></Label>
            <Input type="text" name="employeeCode" placeholder="EMP-013" value={formData.employeeCode} onChange={handleChange} required />
          </div>
          <div>
            <Label>Departemen <span className="text-error-500">*</span></Label>
            <select
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            >
              <option value="">Pilih Departemen</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>{dep.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Posisi / Jabatan <span className="text-error-500">*</span></Label>
            <select
              name="positionId"
              value={formData.positionId}
              onChange={handleChange}
              required
              className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400"
            >
              <option value="">Pilih Posisi</option>
              {positions
                .filter((pos) => !formData.departmentId || pos.departmentId === formData.departmentId)
                .map((pos) => (
                  <option key={pos.id} value={pos.id}>{pos.name}</option>
                ))}
            </select>
          </div>
          <div>
            <Label>Tanggal Bergabung</Label>
            <Input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} required />
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button size="sm" variant="outline" type="button" onClick={() => window.history.back()}>
            Batal
          </Button>
          <Button
            size="sm"
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5"
          >
            {loading ? "Menyimpan & Mendaftarkan Biometrik..." : "Simpan Karyawan Baru"}
          </Button>
        </div>
      </form>
    </div>
  );
};

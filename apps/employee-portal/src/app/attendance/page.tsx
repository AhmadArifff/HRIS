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
        (error) => {
          setErrorMessage("Mohon izinkan akses lokasi untuk absensi.");
        }
      );
    }
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
          employeeId: "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Demo testing employee id
          faceDescriptor: window.tempDescriptor,
          selfieBase64: capturedBase64,
          locationInLatlng: location ? `${location.lat},${location.lng}` : null,
        }),
      });

      const data = await res.json();
      if (data.isSuccess || data.success) {
        setClockInStatus("success");
      } else {
        throw new Error(data.message || data.error || "Verifikasi wajah gagal");
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Terjadi kesalahan server");
      setClockInStatus("error");
    }
  };

  if (clockInStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-200 text-center max-w-sm w-full animate-in zoom-in-95">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Clock In Berhasil!</h1>
          <p className="text-gray-500 mb-8">Waktu dan lokasi Anda telah terekam di sistem.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-brand-600 pt-12 pb-6 px-6 text-white rounded-b-[2.5rem] shadow-md">
        <h1 className="text-2xl font-bold">Clock In</h1>
        <p className="text-brand-100 mt-1">Sistem Absensi Wajah AI</p>
      </div>

      <div className="px-6 -mt-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
          
          {/* Face Enrollment Quick Link */}
          <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-100 rounded-xl">
            <div className="text-xs">
              <p className="font-bold text-cyan-950">Belum daftarkan wajah resmi?</p>
              <p className="text-cyan-700 text-[11px]">Daftarkan 3 pose wajah untuk presensi berakurasi tinggi.</p>
            </div>
            <a
              href="/biometrics/enroll"
              className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs font-semibold shrink-0 transition shadow-sm"
            >
              Daftar Wajah
            </a>
          </div>

          {/* Location Status */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className={`p-2 rounded-full ${location ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
              <MapPin size={20} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Lokasi Saat Ini</p>
              <p className="text-xs text-gray-500">
                {location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : "Mencari koordinat..."}
              </p>
            </div>
          </div>

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
            disabled={!livenessPassed || clockInStatus === "loading" || !location}
            onClick={handleClockIn}
            className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-brand-600/20"
          >
            {clockInStatus === "loading" ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Clock size={22} />
            )}
            Clock In Sekarang
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

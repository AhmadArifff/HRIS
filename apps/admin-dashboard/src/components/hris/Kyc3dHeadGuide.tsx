"use client";
import React, { useState } from "react";

export interface Kyc3dHeadGuideProps {
  pose: "center" | "right" | "left" | "up" | "down";
  status: "waiting" | "aligned" | "occluded" | "captured" | "not_centered";
  occlusionZone?: "chin" | "forehead" | "object" | "none";
  className?: string;
}

export const Kyc3dHeadGuide: React.FC<Kyc3dHeadGuideProps> = ({
  pose,
  status,
  occlusionZone = "none",
  className = "",
}) => {
  const [selectedGender, setSelectedGender] = useState<"female" | "male">("female");

  // Dynamic theme based on real-time detection status
  const getTheme = () => {
    switch (status) {
      case "aligned":
        return {
          color: "#10b981",
          border: "border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.35)]",
          label: "✓ SUDUT ROTASI TEPAT",
          badgeBg: "bg-emerald-950/80 border-emerald-500/60 text-emerald-300",
        };
      case "not_centered":
        return {
          color: "#f59e0b",
          border: "border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.25)]",
          label: "POSISIKAN WAJAH DI OVAL",
          badgeBg: "bg-amber-950/80 border-amber-500/60 text-amber-300",
        };
      case "occluded":
        return {
          color: "#ef4444",
          border: "border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.4)]",
          label:
            occlusionZone === "forehead"
              ? "✋ TANGAN MENUTUPI DAHI"
              : occlusionZone === "chin"
              ? "✋ TANGAN MENUTUPI DAGU"
              : occlusionZone === "object"
              ? "✋ TERHALANG BENDA"
              : "✋ TERHALANG OBJEK / TANGAN",
          badgeBg: "bg-red-950/90 border-red-500/80 text-red-300",
        };
      case "captured":
        return {
          color: "#06b6d4",
          border: "border-cyan-500/80 shadow-[0_0_20px_rgba(6,182,212,0.35)]",
          label: "✓ POSE SELESAI TERSIMPAN",
          badgeBg: "bg-cyan-950/80 border-cyan-500/60 text-cyan-300",
        };
      default:
        return {
          color: "#22c55e",
          border: "border-slate-800",
          label: "IKUTI ARAH MODEL ORANG ASLI",
          badgeBg: "bg-slate-900/80 border-sky-500/50 text-sky-300",
        };
    }
  };

  const theme = getTheme();
  const imageSrc = `/images/kyc/${selectedGender}_${pose}.jpg`;

  const getPoseLabel = () => {
    switch (pose) {
      case "center":
        return "Center (Lurus)";
      case "right":
        return "Menoleh Kanan (+25°)";
      case "left":
        return "Menoleh Kiri (-25°)";
      case "up":
        return "Mendongak Atas (+15°)";
      case "down":
        return "Menunduk Bawah (-15°)";
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-between p-2.5 rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 border border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Top Header: Model Gender Selector (Model Orang Asli) */}
      <div className="w-full flex items-center justify-between px-1 mb-2 z-30">
        <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => setSelectedGender("female")}
            className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
              selectedGender === "female"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>👩</span>
            <span>Perempuan</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedGender("male")}
            className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all flex items-center gap-1 ${
              selectedGender === "male"
                ? "bg-cyan-600 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <span>👨</span>
            <span>Laki-Laki</span>
          </button>
        </div>

        {/* Dynamic Pose Angle Badge */}
        <span className="text-[9px] font-mono font-bold px-2 py-1 rounded-md bg-slate-800/90 text-sky-300 border border-sky-500/30">
          {getPoseLabel()}
        </span>
      </div>

      {/* Main Container: Real Human Model Photograph (Bust View: Kepala, Leher, Pundak) */}
      <div
        className={`relative w-full aspect-square max-w-[280px] rounded-xl overflow-hidden bg-slate-950 border transition-all duration-500 flex items-center justify-center ${theme.border}`}
      >
        {/* Real Human Model Image */}
        <img
          key={`${selectedGender}_${pose}`}
          src={imageSrc}
          alt={`Model Orang Asli ${selectedGender} - ${pose}`}
          className="w-full h-full object-cover object-center filter contrast-[1.02] brightness-[1.01] transition-opacity duration-300"
          loading="eager"
        />

        {/* Directional Guide Ring & Arrows matching Storyboard (Image 3) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div
            className="relative w-48 h-48 rounded-full border-2 border-dashed transition-all duration-300 flex items-center justify-center"
            style={{ borderColor: theme.color, boxShadow: `0 0 20px ${theme.color}33` }}
          >
            {/* Subtle Crosshairs */}
            <div className="absolute inset-x-0 h-px bg-white/20" />
            <div className="absolute inset-y-0 w-px bg-white/20" />

            {/* Directional Guide Arrows (Left / Right / Up / Down) */}
            {pose === "left" && (
              <div className="absolute left-1 flex items-center gap-0.5 animate-pulse">
                <svg viewBox="0 0 24 24" className="w-8 h-8 filter drop-shadow">
                  <path
                    d="M19 12H5M12 19l-7-7 7-7"
                    stroke={theme.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {pose === "right" && (
              <div className="absolute right-1 flex items-center gap-0.5 animate-pulse">
                <svg viewBox="0 0 24 24" className="w-8 h-8 filter drop-shadow">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke={theme.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {pose === "up" && (
              <div className="absolute top-1 flex items-center gap-0.5 animate-bounce">
                <svg viewBox="0 0 24 24" className="w-8 h-8 filter drop-shadow">
                  <path
                    d="M12 19V5M5 12l7-7 7 7"
                    stroke={theme.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {pose === "down" && (
              <div className="absolute bottom-1 flex items-center gap-0.5 animate-bounce">
                <svg viewBox="0 0 24 24" className="w-8 h-8 filter drop-shadow">
                  <path
                    d="M12 5v14M19 12l-7 7-7-7"
                    stroke={theme.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </div>
            )}

            {/* Center Target Indicator */}
            {pose === "center" && (
              <div className="absolute -top-3 px-2 py-0.5 rounded-full bg-slate-900/90 border border-emerald-500/60 text-[9px] font-mono font-bold text-emerald-300">
                HADAP DEPAN
              </div>
            )}
          </div>
        </div>

        {/* Anatomical Collarbone / Shoulder Contour Arc Overlay */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen"
        >
          {/* Subtle Shoulder Arc */}
          <path
            d="M 12 92 Q 50 82 88 92"
            fill="none"
            stroke={theme.color}
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
        </svg>

        {/* Tech Corner Brackets */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400/50 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-sky-400/50 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-sky-400/50 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-sky-400/50 pointer-events-none" />
      </div>

      {/* Model State Pill */}
      <div className="mt-2 text-center w-full z-10">
        <div
          className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border transition-all duration-300 w-full truncate ${theme.badgeBg}`}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: theme.color }}
          />
          <span className="truncate">{theme.label}</span>
        </div>
      </div>
    </div>
  );
};

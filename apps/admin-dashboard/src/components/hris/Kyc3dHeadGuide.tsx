"use client";
import React from "react";

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
  // Dynamic color theme based on real-time detection status
  const getTheme = () => {
    switch (status) {
      case "aligned":
        return {
          mesh: "#10b981", // Emerald green
          glow: "rgba(16, 185, 129, 0.45)",
          border: "#10b981",
          ring: "ring-emerald-500/50",
          label: "✓ SUDUT ROTASI TEPAT",
          badgeBg: "bg-emerald-950/80 border-emerald-500/60 text-emerald-300",
        };
      case "not_centered":
        return {
          mesh: "#f59e0b", // Amber
          glow: "rgba(245, 158, 11, 0.35)",
          border: "#f59e0b",
          ring: "ring-amber-500/50",
          label: "POSISIKAN WAJAH DI OVAL",
          badgeBg: "bg-amber-950/80 border-amber-500/60 text-amber-300",
        };
      case "occluded":
        return {
          mesh: "#ef4444", // Red
          glow: "rgba(239, 68, 68, 0.55)",
          border: "#ef4444",
          ring: "ring-red-500/60",
          label:
            occlusionZone === "forehead"
              ? "✋ TANGAN / BENDA MENUTUPI DAHI"
              : occlusionZone === "chin"
              ? "✋ BENDA / TANGAN MENUTUPI MULUT / DAGU"
              : occlusionZone === "object"
              ? "✋ TERHALANG BENDA / CANGKIR"
              : "✋ TERHALANG OBJEK / TANGAN",
          badgeBg: "bg-red-950/90 border-red-500/80 text-red-300",
        };
      case "captured":
        return {
          mesh: "#06b6d4", // Cyan
          glow: "rgba(6, 182, 212, 0.4)",
          border: "#06b6d4",
          ring: "ring-cyan-500/50",
          label: "✓ POSE SELESAI",
          badgeBg: "bg-cyan-950/80 border-cyan-500/60 text-cyan-300",
        };
      default:
        return {
          mesh: "#38bdf8", // Sky blue
          glow: "rgba(56, 189, 248, 0.3)",
          border: "#38bdf8",
          ring: "ring-sky-500/40",
          label: "IKUTI ARAH MODEL 3D",
          badgeBg: "bg-slate-900/80 border-sky-500/50 text-sky-300",
        };
    }
  };

  const theme = getTheme();

  // 3D Perspective Rotation Matrices based on requested Pose
  const getPoseTransform = () => {
    switch (pose) {
      case "right":
        // Turning to the Right (~25°): Subtle 3D perspective depth
        return {
          transform: "perspective(600px) rotateY(6deg) translateZ(6px)",
          lightGradient: "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.06) 70%, rgba(56,189,248,0.15) 100%)",
        };
      case "left":
        // Turning to the Left (~25°): Subtle 3D perspective depth
        return {
          transform: "perspective(600px) rotateY(-6deg) translateZ(6px)",
          lightGradient: "linear-gradient(270deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.06) 70%, rgba(56,189,248,0.15) 100%)",
        };
      case "up":
        // Tilting Head Upward (~15°): Subtle 3D tilt
        return {
          transform: "perspective(600px) rotateX(-5deg) translateZ(4px)",
          lightGradient: "linear-gradient(0deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.08) 80%, rgba(56,189,248,0.15) 100%)",
        };
      case "down":
        // Tilting Head Downward (~15°): Subtle 3D tilt
        return {
          transform: "perspective(600px) rotateX(5deg) translateZ(4px)",
          lightGradient: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.06) 70%, rgba(56,189,248,0.15) 100%)",
        };
      case "center":
      default:
        return {
          transform: "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)",
          lightGradient: "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.15) 80%)",
        };
    }
  };

  const poseTransform = getPoseTransform();

  // Directional 3D Arrow overlay indicating target head rotation
  const renderDirectionalArrow = () => {
    switch (pose) {
      case "right":
        return (
          <div className="absolute -bottom-1 inset-x-0 flex justify-center items-center pointer-events-none z-20 animate-pulse">
            <svg viewBox="0 0 100 24" className="w-24 h-6 filter drop-shadow">
              <path d="M 20 18 Q 50 4 80 14" fill="none" stroke={theme.mesh} strokeWidth="2.5" strokeDasharray="3 2" />
              <polygon points="78,9 86,15 77,18" fill={theme.mesh} />
            </svg>
          </div>
        );
      case "left":
        return (
          <div className="absolute -bottom-1 inset-x-0 flex justify-center items-center pointer-events-none z-20 animate-pulse">
            <svg viewBox="0 0 100 24" className="w-24 h-6 filter drop-shadow">
              <path d="M 80 18 Q 50 4 20 14" fill="none" stroke={theme.mesh} strokeWidth="2.5" strokeDasharray="3 2" />
              <polygon points="22,9 14,15 23,18" fill={theme.mesh} />
            </svg>
          </div>
        );
      case "up":
        return (
          <div className="absolute top-1 inset-x-0 flex justify-center items-center pointer-events-none z-20 animate-bounce">
            <svg viewBox="0 0 24 30" className="w-6 h-8 filter drop-shadow">
              <path d="M 12 26 L 12 8" fill="none" stroke={theme.mesh} strokeWidth="2.5" strokeDasharray="3 2" />
              <polygon points="7,10 12,2 17,10" fill={theme.mesh} />
            </svg>
          </div>
        );
      case "down":
        return (
          <div className="absolute bottom-1 inset-x-0 flex justify-center items-center pointer-events-none z-20 animate-bounce">
            <svg viewBox="0 0 24 30" className="w-6 h-8 filter drop-shadow">
              <path d="M 12 4 L 12 22" fill="none" stroke={theme.mesh} strokeWidth="2.5" strokeDasharray="3 2" />
              <polygon points="7,20 12,28 17,20" fill={theme.mesh} />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-between p-2.5 rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 border border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden ${className}`}
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/4 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-500"
        style={{ backgroundColor: theme.glow }}
      />

      {/* DUAL 3D HUMAN MODELS: PEREMPUAN (TOP) & LAKI-LAKI (BOTTOM) */}
      <div className="w-full flex flex-col gap-2.5 z-10">
        {/* 1. TOP MODEL: PEREMPUAN (FEMALE) */}
        <div className="relative group">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-pink-400 dark:text-pink-300">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
              1. Perempuan
            </span>
            <span className="text-[8px] font-mono text-gray-400">
              {pose === "center"
                ? "Lurus"
                : pose === "right"
                ? "Kanan (+25°)"
                : pose === "left"
                ? "Kiri (-25°)"
                : pose === "up"
                ? "Atas (+15°)"
                : "Bawah (-15°)"}
            </span>
          </div>

          <div
            className={`relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-slate-950 border transition-all duration-300 ${
              status === "aligned"
                ? "border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : status === "occluded"
                ? "border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                : "border-slate-800 shadow-inner"
            }`}
          >
            {/* 3D Rotating Avatar Container */}
            <div
              className="relative w-full h-full transition-transform duration-500 ease-out origin-center"
              style={{ transform: poseTransform.transform, transformStyle: "preserve-3d" }}
            >
              <img
                src={`/images/kyc/female_${pose}.jpg`}
                alt={`Model 3D Perempuan - Pose ${pose}`}
                className="w-full h-full object-cover object-center filter contrast-[1.03] select-none"
                loading="eager"
              />

              {/* Dynamic 3D Directional Lighting Overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-500 mix-blend-overlay"
                style={{ background: poseTransform.lightGradient }}
              />

              {/* Biometric KYC Head & Shoulder Contour Overlay */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-35 mix-blend-screen"
              >
                <ellipse
                  cx="50"
                  cy="42"
                  rx="24"
                  ry="30"
                  fill="none"
                  stroke={theme.mesh}
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                {/* Horizontal Feature Crosshairs */}
                <line x1="32" y1="40" x2="68" y2="40" stroke={theme.mesh} strokeWidth="0.6" strokeOpacity="0.7" />
                {/* Vertical Meridian */}
                <line x1="50" y1="14" x2="50" y2="82" stroke={theme.mesh} strokeWidth="0.6" strokeDasharray="3 3" />
                {/* Collar/Shoulder Arc */}
                <path d="M 20 88 Q 50 78 80 88" fill="none" stroke={theme.mesh} strokeWidth="0.6" strokeDasharray="2 2" strokeOpacity="0.5" />
              </svg>
            </div>

            {/* Directional 3D Arrow */}
            {renderDirectionalArrow()}

            {/* Corner Tech Brackets */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-sky-400/50 pointer-events-none" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-sky-400/50 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-sky-400/50 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-sky-400/50 pointer-events-none" />
          </div>
        </div>

        {/* 2. BOTTOM MODEL: LAKI-LAKI (MALE) */}
        <div className="relative group">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400 dark:text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
              2. Laki-Laki
            </span>
            <span className="text-[8px] font-mono text-gray-400">
              {pose === "center"
                ? "Lurus"
                : pose === "right"
                ? "Kanan (+25°)"
                : pose === "left"
                ? "Kiri (-25°)"
                : pose === "up"
                ? "Atas (+15°)"
                : "Bawah (-15°)"}
            </span>
          </div>

          <div
            className={`relative w-full h-36 sm:h-40 rounded-xl overflow-hidden bg-slate-950 border transition-all duration-300 ${
              status === "aligned"
                ? "border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : status === "occluded"
                ? "border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                : "border-slate-800 shadow-inner"
            }`}
          >
            {/* 3D Rotating Avatar Container */}
            <div
              className="relative w-full h-full transition-transform duration-500 ease-out origin-center"
              style={{ transform: poseTransform.transform, transformStyle: "preserve-3d" }}
            >
              <img
                src={`/images/kyc/male_${pose}.jpg`}
                alt={`Model 3D Laki-Laki - Pose ${pose}`}
                className="w-full h-full object-cover object-center filter contrast-[1.03] select-none"
                loading="eager"
              />

              {/* Dynamic 3D Directional Lighting Overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-500 mix-blend-overlay"
                style={{ background: poseTransform.lightGradient }}
              />

              {/* Biometric KYC Head & Shoulder Contour Overlay */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-35 mix-blend-screen"
              >
                <ellipse
                  cx="50"
                  cy="42"
                  rx="24"
                  ry="30"
                  fill="none"
                  stroke={theme.mesh}
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                />
                {/* Horizontal Feature Crosshairs */}
                <line x1="32" y1="40" x2="68" y2="40" stroke={theme.mesh} strokeWidth="0.6" strokeOpacity="0.7" />
                {/* Vertical Meridian */}
                <line x1="50" y1="14" x2="50" y2="82" stroke={theme.mesh} strokeWidth="0.6" strokeDasharray="3 3" />
                {/* Collar/Shoulder Arc */}
                <path d="M 20 88 Q 50 78 80 88" fill="none" stroke={theme.mesh} strokeWidth="0.6" strokeDasharray="2 2" strokeOpacity="0.5" />
              </svg>
            </div>

            {/* Directional 3D Arrow */}
            {renderDirectionalArrow()}

            {/* Corner Tech Brackets */}
            <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-cyan-400/50 pointer-events-none" />
            <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-cyan-400/50 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-cyan-400/50 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-cyan-400/50 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Model State Pill */}
      <div className="mt-2 text-center w-full z-10">
        <div
          className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border transition-all duration-300 w-full truncate ${theme.badgeBg}`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: theme.mesh }}
          />
          <span className="truncate">{theme.label}</span>
        </div>
      </div>
    </div>
  );
};

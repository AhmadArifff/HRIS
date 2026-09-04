"use client";
import React from "react";

interface Kyc3dHeadGuideProps {
  pose: "center" | "right" | "left" | "up" | "down";
  status: "waiting" | "aligned" | "occluded" | "captured" | "not_centered";
  occlusionZone?: "chin" | "forehead" | "none";
  className?: string;
}

export const Kyc3dHeadGuide: React.FC<Kyc3dHeadGuideProps> = ({ pose, status, occlusionZone = "none", className = "" }) => {
  // Color themes based on real-time detection status
  const getTheme = () => {
    switch (status) {
      case "aligned":
        return {
          mesh: "#10b981", // Emerald green
          glow: "rgba(16, 185, 129, 0.35)",
          border: "#34d399",
          label: "✓ Sudut Rotasi Tepat",
        };
      case "not_centered":
        return {
          mesh: "#f59e0b", // Amber
          glow: "rgba(245, 158, 11, 0.3)",
          border: "#fbbf24",
          label: "Posisikan Wajah di Oval",
        };
      case "occluded":
        return {
          mesh: "#ef4444", // Red
          glow: "rgba(239, 68, 68, 0.4)",
          border: "#f87171",
          label:
            occlusionZone === "forehead"
              ? "✋ Tangan Menutupi Dahi / Mata"
              : occlusionZone === "chin"
              ? "✋ Tangan Menutupi Mulut / Dagu"
              : "✋ Terhalang Tangan / Objek",
        };
      case "captured":
        return {
          mesh: "#06b6d4", // Cyan
          glow: "rgba(6, 182, 212, 0.3)",
          border: "#38bdf8",
          label: "✓ Pose Selesai",
        };
      default:
        return {
          mesh: "#38bdf8", // Sky blue
          glow: "rgba(56, 189, 248, 0.2)",
          border: "#60a5fa",
          label: "Ikuti Arah Model 3D",
        };
    }
  };

  const theme = getTheme();

  return (
    <div className={`relative flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-md overflow-hidden ${className}`}>
      {/* Background Ambient Glow */}
      <div
        className="absolute -top-10 w-36 h-36 rounded-full blur-2xl pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: theme.glow }}
      ></div>

      {/* 3D Head Model SVG with Real Orthographic Geometric Projection */}
      <div className="relative w-28 h-36 flex items-center justify-center">
        <svg viewBox="0 0 140 180" className="w-full h-full filter drop-shadow-md">
          <defs>
            <linearGradient id="headSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="meshAccent" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.mesh} stopOpacity="0.9" />
              <stop offset="100%" stopColor={theme.mesh} stopOpacity="0.2" />
            </linearGradient>

            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. POSE: CENTER FRONTAL */}
          {pose === "center" && (
            <g className="transition-all duration-500">
              {/* Head Base Oval Silhouette */}
              <ellipse cx="70" cy="85" rx="42" ry="56" fill="url(#headSkinGrad)" stroke={theme.border} strokeWidth="2.2" />
              
              {/* 3D Contour Topo Lines (Vertical & Horizontal Meridian) */}
              <path d="M 70 29 C 70 55, 70 115, 70 141" fill="none" stroke="url(#meshAccent)" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 33 82 C 55 92, 85 92, 107 82" fill="none" stroke="url(#meshAccent)" strokeWidth="1.5" />
              
              {/* Eyebrows & Eyes Line */}
              <path d="M 45 74 Q 54 71 63 75" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <path d="M 77 75 Q 86 71 95 74" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <circle cx="54" cy="80" r="3.5" fill={theme.mesh} />
              <circle cx="86" cy="80" r="3.5" fill={theme.mesh} />
              
              {/* Nose Bridge & Tip */}
              <path d="M 70 78 L 70 98 L 65 102 L 75 102 Z" fill="none" stroke={theme.mesh} strokeWidth="1.8" strokeLinejoin="round" />
              
              {/* Mouth & Chin Line */}
              <path d="M 57 118 Q 70 123 83 118" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <path d="M 64 132 Q 70 135 76 132" fill="none" stroke={theme.mesh} strokeWidth="1.5" strokeLinecap="round" />

              {/* Ears */}
              <path d="M 28 75 C 24 82, 24 95, 29 100" fill="none" stroke={theme.border} strokeWidth="2" strokeLinecap="round" />
              <path d="M 112 75 C 116 82, 116 95, 111 100" fill="none" stroke={theme.border} strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* 2. POSE: TURN RIGHT (Perspektif Menoleh ke Kanan) */}
          {pose === "right" && (
            <g className="transition-all duration-500 transform translate-x-1">
              {/* Turned Head Silhouette */}
              <path d="M 42 35 C 65 25, 98 38, 105 60 C 112 85, 102 120, 80 138 C 65 144, 48 135, 38 120 C 26 100, 26 55, 42 35 Z" fill="url(#headSkinGrad)" stroke={theme.border} strokeWidth="2.2" />
              
              {/* Nose Profile Protrusion to Right */}
              <path d="M 98 75 L 112 92 L 102 96" fill="none" stroke={theme.mesh} strokeWidth="2.2" strokeLinejoin="round" />
              
              {/* Shifted Eyes & Brows */}
              <path d="M 52 70 Q 60 67 70 71" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <path d="M 82 72 Q 88 69 96 74" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <circle cx="62" cy="77" r="3.5" fill={theme.mesh} />
              <circle cx="91" cy="79" r="3.2" fill={theme.mesh} />
              
              {/* Mouth shifted right */}
              <path d="M 72 114 Q 85 118 97 114" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />

              {/* Prominent Left Ear visible */}
              <path d="M 33 72 C 26 80, 26 95, 33 102" fill="none" stroke={theme.border} strokeWidth="2.2" strokeLinecap="round" />

              {/* 3D Rotation Arrow (Curved Right) */}
              <path d="M 35 155 Q 70 170 105 158" fill="none" stroke={theme.mesh} strokeWidth="2.5" strokeDasharray="4 2" />
              <polygon points="108,154 107,164 116,158" fill={theme.mesh} />
            </g>
          )}

          {/* 3. POSE: TURN LEFT (Perspektif Menoleh ke Kiri) */}
          {pose === "left" && (
            <g className="transition-all duration-500 transform -translate-x-1">
              {/* Turned Head Silhouette */}
              <path d="M 98 35 C 75 25, 42 38, 35 60 C 28 85, 38 120, 60 138 C 75 144, 92 135, 102 120 C 114 100, 114 55, 98 35 Z" fill="url(#headSkinGrad)" stroke={theme.border} strokeWidth="2.2" />
              
              {/* Nose Profile Protrusion to Left */}
              <path d="M 42 75 L 28 92 L 38 96" fill="none" stroke={theme.mesh} strokeWidth="2.2" strokeLinejoin="round" />
              
              {/* Shifted Eyes & Brows */}
              <path d="M 88 70 Q 80 67 70 71" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <path d="M 58 72 Q 52 69 44 74" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <circle cx="78" cy="77" r="3.5" fill={theme.mesh} />
              <circle cx="49" cy="79" r="3.2" fill={theme.mesh} />
              
              {/* Mouth shifted left */}
              <path d="M 68 114 Q 55 118 43 114" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />

              {/* Prominent Right Ear visible */}
              <path d="M 107 72 C 114 80, 114 95, 107 102" fill="none" stroke={theme.border} strokeWidth="2.2" strokeLinecap="round" />

              {/* 3D Rotation Arrow (Curved Left) */}
              <path d="M 105 155 Q 70 170 35 158" fill="none" stroke={theme.mesh} strokeWidth="2.5" strokeDasharray="4 2" />
              <polygon points="32,154 33,164 24,158" fill={theme.mesh} />
            </g>
          )}

          {/* 4. POSE: TILT UP (Mendongak ke Atas) */}
          {pose === "up" && (
            <g className="transition-all duration-500 transform -translate-y-1">
              {/* Tilted Up Head Silhouette (Expanded Jaw/Chin & Neck) */}
              <path d="M 42 45 C 55 35, 85 35, 98 45 C 112 60, 112 100, 100 135 C 88 152, 52 152, 40 135 C 28 100, 28 60, 42 45 Z" fill="url(#headSkinGrad)" stroke={theme.border} strokeWidth="2.2" />
              
              {/* Nostrils visible from below */}
              <ellipse cx="65" cy="85" rx="3.5" ry="2" fill={theme.mesh} />
              <ellipse cx="75" cy="85" rx="3.5" ry="2" fill={theme.mesh} />
              <path d="M 62 82 Q 70 79 78 82" fill="none" stroke={theme.mesh} strokeWidth="1.5" />

              {/* Raised Eyebrows & Eyes */}
              <path d="M 45 65 Q 54 60 63 64" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <path d="M 77 64 Q 86 60 95 65" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <circle cx="54" cy="70" r="3" fill={theme.mesh} />
              <circle cx="86" cy="70" r="3" fill={theme.mesh} />

              {/* Prominent Chin & Neck Base */}
              <path d="M 55 104 Q 70 108 85 104" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <path d="M 50 128 Q 70 136 90 128" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />

              {/* Vertical Up Arrow */}
              <path d="M 70 172 L 70 148" fill="none" stroke={theme.mesh} strokeWidth="2.5" strokeDasharray="4 2" />
              <polygon points="66,150 74,150 70,142" fill={theme.mesh} />
            </g>
          )}

          {/* 5. POSE: TILT DOWN (Menunduk ke Bawah) */}
          {pose === "down" && (
            <g className="transition-all duration-500 transform translate-y-1">
              {/* Tilted Down Head Silhouette (Expanded Forehead) */}
              <path d="M 38 28 C 55 18, 85 18, 102 28 C 116 48, 114 95, 96 122 C 84 135, 56 135, 44 122 C 26 95, 24 48, 38 28 Z" fill="url(#headSkinGrad)" stroke={theme.border} strokeWidth="2.2" />
              
              {/* Forehead Brow Ridge Topo Lines */}
              <path d="M 48 50 Q 70 45 92 50" fill="none" stroke="url(#meshAccent)" strokeWidth="1.5" />
              
              {/* Lowered Eyes & Brows */}
              <path d="M 45 78 Q 54 82 63 79" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <path d="M 77 79 Q 86 82 95 78" fill="none" stroke={theme.mesh} strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="54" cy="85" rx="3.5" ry="2" fill={theme.mesh} />
              <ellipse cx="86" cy="85" rx="3.5" ry="2" fill={theme.mesh} />

              {/* Nose Tip pointing downward */}
              <path d="M 70 76 L 70 102 L 67 106 L 73 106 Z" fill="none" stroke={theme.mesh} strokeWidth="1.8" strokeLinejoin="round" />

              {/* Compressed Chin */}
              <path d="M 60 116 Q 70 118 80 116" fill="none" stroke={theme.mesh} strokeWidth="1.8" strokeLinecap="round" />

              {/* Vertical Down Arrow */}
              <path d="M 70 148 L 70 172" fill="none" stroke={theme.mesh} strokeWidth="2.5" strokeDasharray="4 2" />
              <polygon points="66,170 74,170 70,178" fill={theme.mesh} />
            </g>
          )}
        </svg>
      </div>

      {/* Model State Pill */}
      <div className="mt-2 text-center">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border transition-colors duration-300"
          style={{
            color: theme.mesh,
            borderColor: theme.border,
            backgroundColor: "rgba(15, 23, 42, 0.8)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: theme.mesh }}
          ></span>
          {theme.label}
        </span>
      </div>
    </div>
  );
};

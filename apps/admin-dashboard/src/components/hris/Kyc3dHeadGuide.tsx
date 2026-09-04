"use client";
import React, { useState } from "react";
import { KycThreeAvatar } from "./KycThreeAvatar";

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
  const [showPhotoRef, setShowPhotoRef] = useState(false);

  // Dynamic status theme
  const getStatusInfo = () => {
    switch (status) {
      case "aligned":
        return {
          color: "#10b981",
          label: "✓ SUDUT ROTASI TEPAT",
          badgeBg: "bg-emerald-950/80 border-emerald-500/60 text-emerald-300",
        };
      case "not_centered":
        return {
          color: "#f59e0b",
          label: "POSISIKAN WAJAH DI OVAL",
          badgeBg: "bg-amber-950/80 border-amber-500/60 text-amber-300",
        };
      case "occluded":
        return {
          color: "#ef4444",
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
          color: "#06b6d4",
          label: "✓ POSE SELESAI TERSIMPAN",
          badgeBg: "bg-cyan-950/80 border-cyan-500/60 text-cyan-300",
        };
      default:
        return {
          color: "#38bdf8",
          label: "IKUTI TOLEHAN MODEL 3D",
          badgeBg: "bg-slate-900/80 border-sky-500/50 text-sky-300",
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* 1. Core Interactive Three.js Moving 3D Avatar Guide (Matching Storyboard) */}
      <div className="relative w-full">
        <KycThreeAvatar
          pose={pose}
          status={status}
          gender={selectedGender}
          onGenderChange={setSelectedGender}
          className="w-full"
        />
      </div>

      {/* 2. Optional Photo Reference Accordion / Toggle */}
      <div className="w-full">
        <button
          type="button"
          onClick={() => setShowPhotoRef((prev) => !prev)}
          className="w-full flex items-center justify-between px-2.5 py-1 rounded-lg bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 text-[9px] font-mono text-gray-400 hover:text-white transition-colors"
        >
          <span>{showPhotoRef ? "▼ Sembunyikan Foto Referensi" : "▶ Tampilkan Foto Referensi (Bust 2D)"}</span>
          <span className="text-[8px] text-sky-400 font-bold uppercase">{selectedGender}</span>
        </button>

        {showPhotoRef && (
          <div className="mt-1.5 p-2 rounded-xl bg-slate-950/90 border border-slate-800 animate-fadeIn">
            <div className="flex items-center gap-2">
              <div className="w-16 h-20 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                <img
                  src={`/images/kyc/${selectedGender}_${pose}.jpg`}
                  alt={`Referensi Foto ${selectedGender} - ${pose}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex-1 text-[9px] font-mono text-gray-300 leading-tight">
                <p className="font-bold text-white mb-0.5">Foto Model Asli ({selectedGender === "female" ? "Perempuan" : "Laki-Laki"}):</p>
                <p className="text-gray-400">
                  Kepala, leher, dan pundak sesuai target sudut {pose === "center" ? "Center" : pose}.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

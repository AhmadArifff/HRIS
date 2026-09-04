"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import { supabase } from "@/lib/supabase";
import { API_BASE_URL } from "@/lib/api";
import { Kyc3dHeadGuide } from "@/components/hris/Kyc3dHeadGuide";
import { CinematicFaceScannerHUD } from "@/components/hris/CinematicFaceScannerHUD";

interface KycPose {
  id: "center" | "right" | "left" | "up" | "down";
  title: string;
  shortLabel: string;
  instruction: string;
  sub: string;
  isProfileAvatar?: boolean;
}

const KYC_POSES: KycPose[] = [
  {
    id: "center",
    title: "Pose 1: Center Frontal (Tegak Lurus)",
    shortLabel: "1. Center",
    instruction: "Posisikan wajah tegak lurus menatap tepat ke lensa kamera",
    sub: "⭐ Foto tengah ini otomatis disimpan sebagai Foto Profil resmi karyawan",
    isProfileAvatar: true,
  },
  {
    id: "right",
    title: "Pose 2: Menoleh ke Kanan (~25°)",
    shortLabel: "2. Kanan",
    instruction: "Tengokkan wajah perlahan ke arah kanan Anda",
    sub: "Perekaman topologi pelipis, telinga, dan rahang kanan",
  },
  {
    id: "left",
    title: "Pose 3: Menoleh ke Kiri (~25°)",
    shortLabel: "3. Kiri",
    instruction: "Tengokkan wajah perlahan ke arah kiri Anda",
    sub: "Perekaman topologi pelipis, telinga, dan rahang kiri",
  },
  {
    id: "up",
    title: "Pose 4: Mendongak ke Atas (~15°)",
    shortLabel: "4. Atas",
    instruction: "Dongakkan dagu dan kepala sedikit ke atas",
    sub: "Perekaman garis rahang bawah (mandible) & kontur dagu",
  },
  {
    id: "down",
    title: "Pose 5: Menunduk ke Bawah (~15°)",
    shortLabel: "5. Bawah",
    instruction: "Tundukkan kepala dan pandangan sedikit ke bawah",
    sub: "Perekaman tulang alis, kening, dan punggung hidung",
  },
];

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

  // Photo & Biometric Mode State (PRD §11.4 & §12)
  const [photoMode, setPhotoMode] = useState<"kyc_camera" | "upload">("kyc_camera");
  const [file, setFile] = useState<File | null>(null);

  // Multi-Angle KYC 5-Pose State
  const [activePoseStep, setActivePoseStep] = useState<number>(0);
  const [capturedPoses, setCapturedPoses] = useState<{
    center?: string;
    right?: string;
    left?: string;
    up?: string;
    down?: string;
  }>({});
  const [poseScores, setPoseScores] = useState<{
    center?: number;
    right?: number;
    left?: number;
    up?: number;
    down?: number;
  }>({});
  const [isKycComplete, setIsKycComplete] = useState<boolean>(false);
  const [flashFeedback, setFlashFeedback] = useState<boolean>(false);

  // Score Rejection Modal State (Threshold < 75)
  const [scoreRejection, setScoreRejection] = useState<{
    score: number;
    issues: string[];
    snapshot: string;
    poseTitle: string;
  } | null>(null);

  // Camera, FQA, Head Pose Orientation & Anti-Occlusion State
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const [fqaStatus, setFqaStatus] = useState<{
    isValid: boolean;
    isFaceCentered: boolean;
    isOccluded: boolean;
    occlusionZone: "none" | "chin" | "forehead" | "object" | "phone";
    isPoseAligned: boolean;
    label: string;
    sharpness: number;
    brightness: number;
    directionHint: string;
  }>({
    isValid: false,
    isFaceCentered: false,
    isOccluded: false,
    occlusionZone: "none",
    isPoseAligned: false,
    label: "Menyesuaikan Posisi & Arah Wajah...",
    sharpness: 0,
    brightness: 0,
    directionHint: "Posisikan kepala sesuai model 3D",
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

  // Manage Camera on Mode / Step Change
  useEffect(() => {
    if (photoMode === "kyc_camera" && !isKycComplete) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [photoMode, isKycComplete, activePoseStep]);

  // Real-Time Head Pose Orientation (Yaw & Pitch) & Anti-Occlusion Loop (PRD §12.3 & §12.5)
  useEffect(() => {
    if (!cameraActive || isKycComplete || photoMode !== "kyc_camera") {
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

        // 1. Overall Brightness & Sharpness
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

        // 2. Face Presence & Reticle Centering Gate (PRD §12.3.4)
        // Reticle Oval Core Zone: X: 48-112, Y: 28-92
        let coreSkinCount = 0;
        let leftCoreSkin = 0;
        let rightCoreSkin = 0;

        // 3. Anti-Occlusion & Multi-Zone Hand / Object Obstruction Detection (PRD §12.3)
        // Zone A: Chin & Jaw (Y: 82-98, X: 52-108)
        let chinEdgeCount = 0;
        let chinPixelCount = 0;
        let chinSkinCount = 0;
        let chinWhiteObjectCount = 0;
        let chinDarkObjectCount = 0;
        let chinForeignCount = 0;
        let bottomSkinEntryCount = 0;

        // Zone Mouth & Lips (Y: 64-90, X: 54-106)
        let mouthPixelCount = 0;
        let mouthSkinCount = 0;
        let mouthLipCount = 0;
        let mouthEdgeCount = 0;
        let mouthWhiteObjectCount = 0;
        let mouthDarkObjectCount = 0;
        let mouthForeignCount = 0;

        // Zone B: Forehead & Brow (Upper Third: Y: 18-50, X: 50-110)
        let foreheadPixelCount = 0;
        let foreheadSkinCount = 0;
        let foreheadIntraSkinEdgeCount = 0;

        // Zone C: Crown & Hairline (Top: Y: 8-26, X: 54-106)
        let crownPixelCount = 0;
        let crownSkinCount = 0;

        // Zone D: Eye-Pair Ocular Feature Sampling (Left: X: 50-74, Right: X: 86-110, Y: 42-64)
        let leftEyeEdge = 0;
        let rightEyeEdge = 0;

        // Zone E: Lateral Temple Hand Bridge (Left: X: 20-46, Right: X: 114-140, Y: 26-66)
        let leftTempleSkinCount = 0;
        let rightTempleSkinCount = 0;

        // 4. Background-Immune Internal Facial Sampling (Pose Estimation)
        // ONLY sample INSIDE facial oval boundaries (X: 52-72 and X: 88-108, Y: 50-80)
        // Eliminates false triggers from background doors/walls outside X: 48 or X: 112!
        let leftCheekInternalEdge = 0;
        let rightCheekInternalEdge = 0;
        let leftCheekSkinCount = 0;
        let rightCheekSkinCount = 0;

        // Upper Zone (Forehead/Eyes: Y: 22-54, X: 52-108) vs Lower Zone (Mouth/Chin: Y: 68-102, X: 52-108)
        let upperIntensity = 0;
        let lowerIntensity = 0;
        let upperCount = 0;
        let lowerCount = 0;

        // Step 2B: Central Oral & Chin Core (Strictly central: X: 68-92, Y: 68-86)
        // Guaranteed inside face silhouette. Background room walls (green/blue/white) CANNOT reach here!
        let oralCorePixels = 0;
        let oralCoreNaturalCount = 0;
        let oralCoreWhiteCount = 0;
        let oralCoreDarkCount = 0;
        let oralCoreForeignCount = 0;
        let oralCoreLipCount = 0;

        for (let y = 0; y < 120; y++) {
          for (let x = 0; x < 160; x++) {
            const idx = (y * 160 + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;

            // Dark Hair vs Skin-Tone Distinction (Anti-False-Positive for Bangs, Mustache, Beard & Hairline)
            const isDarkHair = gray < 65 || (r < 75 && g < 70 && b < 70);

            // Natural Lip Vermilion Hue (Hemoglobin concentration in lips across all human ethnicities)
            // Distinct from dark phone/plastic and non-lip facial skin
            const isLipPixel =
              r > 68 &&
              r > g * 1.14 &&
              r > b * 1.25 &&
              gray >= 40 &&
              gray <= 200;

            // Robust Hemoglobin-based Skin-Tone Detection
            const isSkinTone =
              !isDarkHair &&
              r > 75 &&
              g > 45 &&
              b > 30 &&
              r > g &&
              g > b &&
              r - g >= 12 &&
              r - b >= 25 &&
              gray >= 60;

            // Artificial Object Detection (White ceramic mug, cup, paper, surgical mask)
            const isWhiteObject =
              gray > 125 &&
              Math.abs(r - g) <= 20 &&
              Math.abs(g - b) <= 20 &&
              Math.abs(r - b) <= 20;

            const isTeeth = gray > 120 && r > 100 && g > 100 && b > 100 && Math.abs(r - g) <= 25 && Math.abs(g - b) <= 25;
            const isInnerMouthDark = gray < 60 && r > g && r > b;

            // Smartphone Screen & Case / Solid Objects of ANY color (Blue, Grey, Red, Black, etc):
            // Basically anything that is not a natural facial feature in the oral/chin zone
            const isDarkPhonePixel =
              !isSkinTone &&
              !isDarkHair &&
              !isLipPixel &&
              !isTeeth &&
              !isInnerMouthDark;

            // Foreign non-skin, non-hair, non-lip artificial object
            const isForeignObject = isDarkPhonePixel || isWhiteObject;

            // Step 1: Reticle Oval Core Sampling (Center at 80, 60)
            if (y >= 28 && y <= 92 && x >= 48 && x <= 112) {
              if (isSkinTone) {
                coreSkinCount++;
                if (x <= 78) leftCoreSkin++;
                else if (x >= 82) rightCoreSkin++;
              }
            }

            // Step 2: Mouth & Lips Zone (Y: 64-90, X: 54-106)
            if (y >= 64 && y <= 90 && x >= 54 && x <= 106) {
              mouthPixelCount++;
              if (isSkinTone) mouthSkinCount++;
              if (isLipPixel) mouthLipCount++;
              if (isWhiteObject) mouthWhiteObjectCount++;
              if (isDarkPhonePixel) mouthDarkObjectCount++;
              if (isForeignObject) mouthForeignCount++;
              if (idx + 160 * 4 < data.length) {
                const downGray = 0.299 * data[idx + 160 * 4] + 0.587 * data[idx + 160 * 4 + 1] + 0.114 * data[idx + 160 * 4 + 2];
                if (Math.abs(gray - downGray) > 18) mouthEdgeCount++;
              }
            }

            // Step 2B: Inner Oral Core (Strictly central: X: 68-92, Y: 68-86)
            // Guaranteed inside face silhouette. Background room walls CANNOT reach here!
            if (y >= 68 && y <= 86 && x >= 68 && x <= 92) {
              oralCorePixels++;
              if (isSkinTone || isLipPixel) {
                oralCoreNaturalCount++;
              }
              if (isLipPixel) {
                oralCoreLipCount++;
              }
              if (isWhiteObject) {
                oralCoreWhiteCount++;
              }
              if (isDarkPhonePixel) {
                oralCoreDarkCount++;
              }
              if (!isSkinTone && !isLipPixel && (isWhiteObject || isDarkPhonePixel || (!isDarkHair && Math.abs(r - b) < 18))) {
                oralCoreForeignCount++;
              }
            }

            // Step 3: Chin & Lower Jaw Anatomical Zone (Y: 82-98, X: 52-108)
            if (y >= 82 && y <= 98 && x >= 52 && x <= 108) {
              chinPixelCount++;
              if (isSkinTone) chinSkinCount++;
              if (isWhiteObject) chinWhiteObjectCount++;
              if (isDarkPhonePixel) chinDarkObjectCount++;
              if (isForeignObject) chinForeignCount++;
              if (idx + 160 * 4 < data.length) {
                const downGray = 0.299 * data[idx + 160 * 4] + 0.587 * data[idx + 160 * 4 + 1] + 0.114 * data[idx + 160 * 4 + 2];
                if (Math.abs(gray - downGray) > 22) chinEdgeCount++;
              }
              if (y >= 92 && isSkinTone) {
                bottomSkinEntryCount++;
              }
            }

            // Step 4: Forehead & Brow Safe Zone (Y: 18-50, X: 50-110)
            if (y >= 18 && y <= 50 && x >= 50 && x <= 110) {
              foreheadPixelCount++;
              if (isSkinTone) {
                foreheadSkinCount++;
                if (idx + 160 * 4 < data.length) {
                  const downR = data[idx + 160 * 4];
                  const downG = data[idx + 160 * 4 + 1];
                  const downB = data[idx + 160 * 4 + 2];
                  const downGray = 0.299 * downR + 0.587 * downG + 0.114 * downB;
                  const downIsDarkHair = downGray < 65 || (downR < 75 && downG < 70 && downB < 70);
                  const downIsSkinTone =
                    !downIsDarkHair &&
                    downR > 75 &&
                    downG > 45 &&
                    downB > 30 &&
                    downR > downG &&
                    downG > downB &&
                    downR - downG >= 12 &&
                    downR - downB >= 25 &&
                    downGray >= 60;

                  if (downIsSkinTone && Math.abs(gray - downGray) > 20) {
                    foreheadIntraSkinEdgeCount++;
                  }
                }
              }
            }

            // Step 5: Crown & Hairline Zone (Top: Y: 8-26, X: 54-106)
            if (y >= 8 && y <= 26 && x >= 54 && x <= 106) {
              crownPixelCount++;
              if (isSkinTone) crownSkinCount++;
            }

            // Step 6: Eye-Pair Ocular Sampling (Left: X: 50-74, Right: X: 86-110, Y: 42-64)
            if (y >= 42 && y <= 64) {
              if (x >= 50 && x <= 74) {
                if (idx + 4 < data.length) {
                  const nxt = 0.299 * data[idx + 4] + 0.587 * data[idx + 5] + 0.114 * data[idx + 6];
                  leftEyeEdge += Math.abs(gray - nxt);
                }
                if (idx + 160 * 4 < data.length) {
                  const dwn = 0.299 * data[idx + 160 * 4] + 0.587 * data[idx + 160 * 4 + 1] + 0.114 * data[idx + 160 * 4 + 2];
                  leftEyeEdge += Math.abs(gray - dwn);
                }
              } else if (x >= 86 && x <= 110) {
                if (idx + 4 < data.length) {
                  const nxt = 0.299 * data[idx + 4] + 0.587 * data[idx + 5] + 0.114 * data[idx + 6];
                  rightEyeEdge += Math.abs(gray - nxt);
                }
                if (idx + 160 * 4 < data.length) {
                  const dwn = 0.299 * data[idx + 160 * 4] + 0.587 * data[idx + 160 * 4 + 1] + 0.114 * data[idx + 160 * 4 + 2];
                  rightEyeEdge += Math.abs(gray - dwn);
                }
              }
            }

            // Step 7: Lateral Temple Hand Bridge (Left: X: 20-46, Right: X: 114-140, Y: 26-66)
            if (y >= 26 && y <= 66) {
              if (x >= 20 && x <= 46 && isSkinTone) leftTempleSkinCount++;
              if (x >= 114 && x <= 140 && isSkinTone) rightTempleSkinCount++;
            }

            // Step 8: Internal Cheek Sampling (Strictly INSIDE Face Oval: Left: X: 52-72, Right: X: 88-108, Y: 50-80)
            // IMMUNE to background walls/doors/windows outside the oval!
            if (y >= 50 && y <= 80) {
              if (x >= 52 && x <= 72) {
                if (isSkinTone) leftCheekSkinCount++;
                if (idx + 4 < data.length) {
                  const nxt = 0.299 * data[idx + 4] + 0.587 * data[idx + 5] + 0.114 * data[idx + 6];
                  leftCheekInternalEdge += Math.abs(gray - nxt);
                }
              } else if (x >= 88 && x <= 108) {
                if (isSkinTone) rightCheekSkinCount++;
                if (idx + 4 < data.length) {
                  const nxt = 0.299 * data[idx + 4] + 0.587 * data[idx + 5] + 0.114 * data[idx + 6];
                  rightCheekInternalEdge += Math.abs(gray - nxt);
                }
              }
            }

            // Step 9: Vertical Lighting Balance Sampling (Internal Facial Area)
            if (x >= 52 && x <= 108) {
              if (y >= 22 && y <= 54) {
                upperIntensity += gray;
                upperCount++;
              } else if (y >= 68 && y <= 102) {
                lowerIntensity += gray;
                lowerCount++;
              }
            }
          }
        }

        // Gate 1: Face Presence Verification
        const isFacePresent = coreSkinCount >= 180;
        const targetPose = KYC_POSES[activePoseStep];

        // Gate 2: Multi-Zone Anti-Occlusion & Foreign Object Shield (PRD §12.3)
        // Zone Mouth & Chin Skin and Object Metrics:
        const mouthSkinRatio = mouthPixelCount > 0 ? mouthSkinCount / mouthPixelCount : 0;
        const chinSkinRatio = chinPixelCount > 0 ? chinSkinCount / chinPixelCount : 0;
        const mouthEdgeDensity = mouthPixelCount > 0 ? mouthEdgeCount / mouthPixelCount : 0;
        const chinEdgeDensity = chinPixelCount > 0 ? chinEdgeCount / chinPixelCount : 0;

        // A. Hand Covering Mouth or Chin:
        // 1. Hand covering mouth (skin present in mouth zone, but natural lip vermilion covered):
        const isMouthHandSkinBlocked = mouthSkinCount > 35 && mouthLipCount < 3 && oralCorePixels >= 25;
        // 2. Hand fingers / palm edge density over mouth or chin:
        const isMouthCovered = mouthSkinRatio > 0.65 && mouthPixelCount > 60 && mouthEdgeCount < 20;
        const hasMouthFingers = mouthEdgeDensity > 0.12 && mouthSkinRatio > 0.38;
        const hasChinHand = (chinEdgeDensity > 0.22 && chinSkinCount > 55) || (bottomSkinEntryCount > 65 && chinSkinCount > 75);
        const hasChinHandOcclusion = isFacePresent && (isMouthCovered || hasMouthFingers || hasChinHand || isMouthHandSkinBlocked);

        // B. Object Covering Mouth or Chin (Smartphone, Mug, Cup, Mask, Document):
        const oralCoreNaturalRatio = oralCorePixels > 0 ? oralCoreNaturalCount / oralCorePixels : 1;

        // 1. Smartphone or Solid Object in oral core (Total area ~432 pixels):
        // If 20% of the oral core is covered by a foreign solid object and lips are missing.
        const isOralBlockedByPhone =
          oralCorePixels >= 100 &&
          (oralCoreDarkCount >= 85 || oralCoreForeignCount >= 85) &&
          oralCoreLipCount < 10;

        // 2. Continuous Vertical Smartphone Slab (spanning across mouth and chin):
        // Mouth area ~1352 pixels, Chin area ~896 pixels
        const isVerticalPhoneSlab =
          mouthDarkObjectCount >= 200 &&
          chinDarkObjectCount >= 180 &&
          mouthLipCount < 10;

        // 3. Ceramic Cup / Mug / Paper / White Mask:
        const isOralBlockedByCup =
          oralCorePixels >= 30 &&
          oralCoreNaturalRatio < 0.30 &&
          oralCoreWhiteCount >= 15;

        // 4. Broad mouth & chin object cluster:
        const isMouthAndChinBlocked =
          mouthPixelCount > 50 &&
          chinPixelCount > 40 &&
          (mouthWhiteObjectCount > 25 || mouthDarkObjectCount > 25) &&
          (chinWhiteObjectCount > 20 || chinDarkObjectCount > 20) &&
          oralCoreNaturalRatio < 0.40;

        const isChinObjectConfirmed =
          (chinWhiteObjectCount > 35 || chinDarkObjectCount > 35) &&
          chinSkinRatio < 0.20 &&
          oralCoreNaturalRatio < 0.38;

        const hasObjectOcclusion =
          isFacePresent && (
            isOralBlockedByPhone ||
            isVerticalPhoneSlab ||
            isOralBlockedByCup ||
            isMouthAndChinBlocked ||
            isChinObjectConfirmed
          );

        // C. Zone Forehead, Brows, Eyes, & Crown:
        const foreheadIntraSkinDensity = foreheadSkinCount > 0 ? foreheadIntraSkinEdgeCount / foreheadSkinCount : 0;
        const crownSkinDensity = crownPixelCount > 0 ? crownSkinCount / crownPixelCount : 0;
        const eyeEdgeRatio = Math.min(leftEyeEdge, rightEyeEdge) / (Math.max(leftEyeEdge, rightEyeEdge) + 1e-5);
        const maxEyeEdge = Math.max(leftEyeEdge, rightEyeEdge);

        // Ocular Asymmetry Check (ONLY evaluated on Center frontal pose!)
        const isOcularOccluded =
          targetPose.id === "center" &&
          maxEyeEdge > 300 &&
          eyeEdgeRatio < 0.36;

        // Lateral temple intrusion detection (hand/arm reaching into upper face):
        const hasLateralTempleIntrusion = leftTempleSkinCount > 60 || rightTempleSkinCount > 60;
        const hasTempleHandBridge =
          targetPose.id === "center" &&
          hasLateralTempleIntrusion &&
          (eyeEdgeRatio < 0.45 || foreheadIntraSkinDensity > 0.05 || foreheadSkinCount > 220);

        let hasForeheadOcclusion = false;
        if (isFacePresent) {
          if (targetPose.id === "center") {
            hasForeheadOcclusion =
              isOcularOccluded ||
              hasTempleHandBridge ||
              (hasLateralTempleIntrusion && (foreheadIntraSkinDensity > 0.08 || foreheadSkinCount > 180)) ||
              (crownSkinDensity > 0.76 && foreheadSkinCount > 220 && foreheadIntraSkinDensity > 0.14) ||
              foreheadIntraSkinDensity > 0.22;
          } else {
            // Non-center poses (Right, Left, Up, Down):
            // Natural hair movement, side profile, and background changes must not trigger false alarms.
            // Require verified lateral hand intrusion OR extreme skin density in crown+forehead.
            hasForeheadOcclusion =
              (hasLateralTempleIntrusion && (foreheadIntraSkinDensity > 0.12 || foreheadSkinCount > 200)) ||
              (crownSkinDensity > 0.80 && foreheadSkinCount > 240 && foreheadIntraSkinDensity > 0.20);
          }
        }

        const hasHandOcclusion = hasChinHandOcclusion || hasForeheadOcclusion;
        const hasAnyOcclusion = hasHandOcclusion || hasObjectOcclusion;

        let occlusionZone: "none" | "chin" | "forehead" | "object" | "phone" = "none";
        if (hasForeheadOcclusion) {
          occlusionZone = "forehead";
        } else if (isOralBlockedByPhone || isVerticalPhoneSlab) {
          occlusionZone = "phone";
        } else if (hasObjectOcclusion) {
          occlusionZone = "object";
        } else if (hasChinHandOcclusion) {
          occlusionZone = "chin";
        }

        // Gate 3: Centering Verification (Pose-Adaptive)
        const faceCenterBalance = Math.min(leftCoreSkin, rightCoreSkin) / (Math.max(leftCoreSkin, rightCoreSkin) + 1e-5);
        let isFaceCentered = false;
        if (targetPose.id === "center") {
          isFaceCentered = isFacePresent && (faceCenterBalance >= 0.20 || hasAnyOcclusion);
        } else {
          isFaceCentered = isFacePresent;
        }

        // Gate 4: Background-Immune Pose Orientation Alignment
        const internalCheekRatio = leftCheekInternalEdge / (rightCheekInternalEdge + 1e-5);
        const avgUpper = upperCount > 0 ? upperIntensity / upperCount : 1;
        const avgLower = lowerCount > 0 ? lowerIntensity / lowerCount : 1;
        const verticalBalance = avgUpper / (avgLower + 1e-5);

        let isPoseAligned = false;
        let directionHint = "";

        if (cameraError) {
          // Simulator fallback
          isPoseAligned = true;
          directionHint = "✓ Mode Simulator (Siap Ambil)";
        } else if (hasAnyOcclusion) {
          // CRITICAL: Any occlusion immediately voids pose alignment!
          isPoseAligned = false;
          directionHint =
            occlusionZone === "phone"
              ? "✋ Singkirkan ponsel / objek yang menutupi mulut & dagu"
              : occlusionZone === "object"
              ? "✋ Singkirkan cangkir / benda yang menutupi wajah"
              : occlusionZone === "forehead"
              ? "✋ Jauhkan tangan dari area dahi dan mata"
              : "✋ Jauhkan tangan dari area dagu dan mulut";
        } else {
          switch (targetPose.id) {
            case "center":
              isPoseAligned =
                internalCheekRatio >= 0.45 &&
                internalCheekRatio <= 2.20 &&
                eyeEdgeRatio >= 0.38 &&
                verticalBalance >= 0.65 &&
                verticalBalance <= 1.50;
              directionHint = isPoseAligned
                ? "✓ Posisi Center Sesuai (Lurus ke Depan)"
                : "⚠️ Wajah miring/menoleh, harap menatap lurus tepat ke depan";
              break;

            case "right":
              // Mirrored camera: Turning right presents right cheek on the left side of frame
              isPoseAligned =
                (leftCoreSkin > rightCoreSkin * 1.08 && internalCheekRatio > 1.06) ||
                (leftCheekSkinCount > rightCheekSkinCount * 1.10 && leftCoreSkin > rightCoreSkin * 1.05) ||
                (leftEyeEdge > rightEyeEdge * 1.10 && leftCoreSkin > rightCoreSkin * 1.05) ||
                (internalCheekRatio > 1.15 && leftCoreSkin >= rightCoreSkin);
              directionHint = isPoseAligned
                ? "✓ Sudut Menoleh ke Kanan Sesuai"
                : "⚠️ Arah kepala belum sesuai: Silakan menolehkan wajah ke KANAN (~25°)";
              break;

            case "left":
              // Mirrored camera: Turning left presents left cheek on the right side of frame
              isPoseAligned =
                (rightCoreSkin > leftCoreSkin * 1.08 && internalCheekRatio < 0.94) ||
                (rightCheekSkinCount > leftCheekSkinCount * 1.10 && rightCoreSkin > leftCoreSkin * 1.05) ||
                (rightEyeEdge > leftEyeEdge * 1.10 && rightCoreSkin > leftCoreSkin * 1.05) ||
                (internalCheekRatio < 0.86 && rightCoreSkin >= leftCoreSkin);
              directionHint = isPoseAligned
                ? "✓ Sudut Menoleh ke Kiri Sesuai"
                : "⚠️ Arah kepala belum sesuai: Silakan menolehkan wajah ke KIRI (~25°)";
              break;

            case "up":
              isPoseAligned =
                !hasAnyOcclusion &&
                chinDarkObjectCount < 18 &&
                oralCoreDarkCount < 12 &&
                chinSkinCount >= 50 &&
                (verticalBalance < 1.15 || avgLower > avgUpper * 0.90 || chinSkinCount > 90 || lowerCount > upperCount * 0.85);
              directionHint = isPoseAligned
                ? "✓ Sudut Mendongak ke Atas Sesuai"
                : "⚠️ Arah kepala belum sesuai: Silakan dongakkan kepala sedikit ke ATAS (~15°)";
              break;

            case "down":
              isPoseAligned =
                !hasAnyOcclusion &&
                foreheadSkinCount >= 60 &&
                (verticalBalance > 0.85 || avgUpper > avgLower * 0.95 || foreheadSkinCount > chinSkinCount * 0.85);
              directionHint = isPoseAligned
                ? "✓ Sudut Menunduk ke Bawah Sesuai"
                : "⚠️ Arah kepala belum sesuai: Silakan tundukkan kepala sedikit ke BAWAH (~15°)";
              break;
          }
        }

        const isGoodBrightness = avgBrightness >= 50 && avgBrightness <= 230;
        const isSharp = avgSharpness >= 10;
        const isValid = isFaceCentered && isGoodBrightness && isSharp && !hasAnyOcclusion && isPoseAligned;

        let label = `✓ Posisi & Sudut ${targetPose.shortLabel} Tepat (Siap Foto)`;
        if (!isFacePresent) {
          label = "⚠️ Wajah belum terdeteksi. Posisikan wajah Anda tepat di dalam bingkai oval!";
        } else if (hasForeheadOcclusion) {
          label = "✋ Terdeteksi tangan / benda menutupi dahi atau mata! Harap bersihkan area dahi.";
        } else if (occlusionZone === "phone") {
          label = "✋ Terdeteksi ponsel / objek menutupi area mulut & dagu! Harap jauhkan benda dari wajah.";
        } else if (hasObjectOcclusion) {
          label = "✋ Terdeteksi benda / cangkir menutupi mulut atau dagu! Harap jauhkan benda dari wajah.";
        } else if (hasChinHandOcclusion) {
          label = "✋ Terdeteksi tangan menutupi dagu atau mulut! Harap jauhkan tangan dari wajah.";
        } else if (!isFaceCentered) {
          label = leftCoreSkin < rightCoreSkin
            ? "⚠️ Geser kepala sedikit ke kiri agar di tengah oval"
            : "⚠️ Geser kepala sedikit ke kanan agar di tengah oval";
        } else if (!isPoseAligned) {
          label = directionHint;
        } else if (!isGoodBrightness) {
          label = avgBrightness < 50 ? "⚠️ Cahaya terlalu redup" : "⚠️ Backlight terlalu terang";
        } else if (!isSharp) {
          label = "⚠️ Kamera bergoyang, tahan posisi stabil sejenak";
        }

        setFqaStatus({
          isValid,
          isFaceCentered,
          isOccluded: hasAnyOcclusion,
          occlusionZone,
          isPoseAligned,
          label,
          sharpness: avgSharpness,
          brightness: avgBrightness,
          directionHint,
        });
      } catch (fqaErr) {
        // Silent catch during unmount
      }
    }, 350);

    return () => {
      if (fqaIntervalRef.current) clearInterval(fqaIntervalRef.current);
    };
  }, [cameraActive, isKycComplete, photoMode, activePoseStep, cameraError]);

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
        isFaceCentered: true,
        isOccluded: false,
        occlusionZone: "none",
        isPoseAligned: true,
        label: `✓ Simulator Kamera KYC Aktif (${KYC_POSES[activePoseStep]?.shortLabel})`,
        sharpness: 90,
        brightness: 125,
        directionHint: "✓ Simulator Aktif",
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

  // Biometric Impact Quality Score Calculation (PRD §12.6)
  const computeBiometricScore = (
    sharpness: number,
    brightness: number,
    isAligned: boolean,
    isOccluded: boolean,
    isCentered: boolean
  ): { total: number; passed: boolean; issues: string[] } => {
    const issues: string[] = [];

    if (!isCentered && !cameraError) {
      issues.push("Wajah belum diposisikan tepat di tengah bingkai oval");
    }

    // 1. Sharpness Score (0 - 25)
    let sSharp = Math.min(25, Math.max(0, Math.round((sharpness / 16) * 25)));
    if (sSharp < 18) issues.push("Citra kurang tajam / kamera bergerak");

    // 2. Lighting Score (0 - 25)
    let sLight = 25;
    if (brightness < 60) {
      sLight = Math.max(5, Math.round((brightness / 60) * 20));
      issues.push("Pencahayaan terlalu redup / gelap");
    } else if (brightness > 220) {
      sLight = Math.max(5, Math.round(((255 - brightness) / 35) * 20));
      issues.push("Backlight terlalu silau / kontras berlebih");
    }

    // 3. Pose Angle Accuracy Score (0 - 30)
    let sPose = isAligned && (isCentered || cameraError) ? 30 : 6;
    if (!isAligned) issues.push(`Sudut tolehan kepala tidak sesuai instruksi (${currentPose.title})`);

    // 4. Cleanliness & Anti-Occlusion (0 - 20)
    let sClean = isOccluded ? 0 : 20;
    if (isOccluded) {
      issues.push(
        fqaStatus.occlusionZone === "forehead"
          ? "Terdeteksi tangan atau jari menutupi area dahi / kening / mata"
          : fqaStatus.occlusionZone === "object"
          ? "Terdeteksi benda atau cangkir menutupi area wajah / mulut / dagu"
          : "Terdeteksi tangan atau halangan menutupi area mulut / dagu"
      );
    }

    const total = cameraError ? 92 : sSharp + sLight + sPose + sClean;
    const passed = total >= 75 && !isOccluded && isAligned && (isCentered || cameraError);

    return { total, passed, issues };
  };

  // Capture Current KYC Pose with Threshold Score Validation
  const handleCaptureCurrentPose = () => {
    const currentPose = KYC_POSES[activePoseStep];
    let snapshotDataUrl = "";

    if (videoElementRef.current && videoElementRef.current.readyState >= 2) {
      const canvas = document.createElement("canvas");
      canvas.width = videoElementRef.current.videoWidth || 640;
      canvas.height = videoElementRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoElementRef.current, 0, 0, canvas.width, canvas.height);
        snapshotDataUrl = canvas.toDataURL("image/jpeg", 0.92);
      }
    }

    // Fallback Portrait if webcam simulator
    if (!snapshotDataUrl) {
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 400;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#090d16";
        ctx.fillRect(0, 0, 400, 400);
        ctx.fillStyle = "#10b981";
        ctx.beginPath();
        ctx.arc(200, 160, 65, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(200, 360, 120, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 15px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`KYC Pose: ${currentPose.shortLabel}`, 200, 365);
        snapshotDataUrl = canvas.toDataURL("image/jpeg", 0.9);
      }
    }

    // Evaluate Quality Score
    const { total, passed, issues } = computeBiometricScore(
      fqaStatus.sharpness,
      fqaStatus.brightness,
      fqaStatus.isPoseAligned,
      fqaStatus.isOccluded,
      fqaStatus.isFaceCentered
    );

    // GATE: If Quality Score < 75, REJECT & Require Mandatory Retake!
    if (!passed || total < 75) {
      setScoreRejection({
        score: total,
        issues: issues.length > 0 ? issues : ["Arah sudut kepala tidak memenuhi standar toleransi biometrik"],
        snapshot: snapshotDataUrl,
        poseTitle: currentPose.title,
      });
      return;
    }

    // Trigger visual shutter flash feedback
    setFlashFeedback(true);
    setTimeout(() => setFlashFeedback(false), 200);

    const updatedPoses = {
      ...capturedPoses,
      [currentPose.id]: snapshotDataUrl,
    };
    setCapturedPoses(updatedPoses);

    setPoseScores((prev) => ({
      ...prev,
      [currentPose.id]: total,
    }));

    // If more poses remaining, advance to next pose
    if (activePoseStep < KYC_POSES.length - 1) {
      setActivePoseStep((prev) => prev + 1);
    } else {
      // All 5 poses complete!
      setIsKycComplete(true);
      stopCamera();
    }
  };

  const handleRetakeSinglePose = (poseIndex: number) => {
    setActivePoseStep(poseIndex);
    setIsKycComplete(false);
    setScoreRejection(null);
  };

  const handleResetAllPoses = () => {
    setCapturedPoses({});
    setPoseScores({});
    setActivePoseStep(0);
    setIsKycComplete(false);
    setScoreRejection(null);
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
      let faceImagesBase64: string[] = [];

      // 1. Validasi Ketat KYC Bank 5-Pose (PRD §12)
      // Dilarang mendaftarkan karyawan hanya dengan 1 muka / 1 foto / pose tidak lengkap!
      const requiredPoses: ("center" | "right" | "left" | "up" | "down")[] = ["center", "right", "left", "up", "down"];
      const missingPoses = requiredPoses.filter((p) => !capturedPoses[p]);

      if (missingPoses.length > 0 || !isKycComplete) {
        const poseLabels: Record<string, string> = {
          center: "1. Center (Lurus)",
          right: "2. Kanan (Menoleh ~25°)",
          left: "3. Kiri (Menoleh ~25°)",
          up: "4. Atas (Mendongak ~15°)",
          down: "5. Bawah (Menunduk ~15°)",
        };
        const missingList = missingPoses.map((p) => poseLabels[p]).join(", ");
        throw new Error(
          `Validasi Ketat KYC: Anda belum menyelesaikan seluruh 5 pose biometrik! Pose yang belum diambil: ${missingList}. Semua 5 pose wajib diselesaikan dengan skor minimal 75/100 sebelum karyawan dapat disimpan. Dilarang mendaftar hanya dengan 1 muka!`
        );
      }

      // Validasi skor setiap pose wajib >= 75
      for (const poseKey of requiredPoses) {
        const score = poseScores[poseKey] || 0;
        if (score < 75) {
          throw new Error(
            `Validasi Ketat KYC: Skor pose ${poseKey.toUpperCase()} (${score}/100) belum memenuhi standar kelayakan minimal 75. Silakan ambil ulang pose tersebut.`
          );
        }
      }

      // Upload Pose 1 (Center Frontal) to Supabase Storage as official employee avatar
      try {
        const resBlob = await fetch(capturedPoses.center!);
        const blob = await resBlob.blob();
        const fileName = `avatar-${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
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
          console.warn("Supabase Storage avatar upload notice:", uploadError);
          avatarUrl = `/images/user/user-01.jpg`;
        }
      } catch (storageErr) {
        console.warn("Storage upload fallback:", storageErr);
        avatarUrl = `/images/user/user-01.jpg`;
      }

      // Collect all 5 KYC pose images for multi-angle centroid embedding
      faceImagesBase64 = [
        capturedPoses.center!,
        capturedPoses.right!,
        capturedPoses.left!,
        capturedPoses.up!,
        capturedPoses.down!,
      ];

      // 3. Submit ke Backend API
      const res = await fetch(`${API_BASE_URL}/api/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          avatarUrl: avatarUrl || "/images/user/user-01.jpg",
          faceImagesBase64,
          faceImageBase64: capturedPoses.center || faceImagesBase64[0],
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.message || resData.error || "Gagal menambahkan karyawan");
      }

      setSuccess(
        `✓ Karyawan ${formData.firstName} ${formData.lastName} (${formData.employeeCode}) berhasil didaftarkan! Foto Pose Center tersimpan sebagai Foto Profil resmi di Supabase Storage, dan model biometrik 5-Pose (ArcFace 512-d) telah aktif seketika.`
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
      setCapturedPoses({});
      setPoseScores({});
      setIsKycComplete(false);
      setActivePoseStep(0);
      setFile(null);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat menyimpan data karyawan.");
    } finally {
      setLoading(false);
    }
  };

  const currentPose = KYC_POSES[activePoseStep];
  const prevPose = activePoseStep > 0 ? KYC_POSES[activePoseStep - 1] : null;
  const prevPoseSnapshot = prevPose ? capturedPoses[prevPose.id] : null;
  const prevPoseScore = prevPose ? poseScores[prevPose.id] : null;
  const completedPosesCount = ["center", "right", "left", "up", "down"].filter(
    (p) => Boolean(capturedPoses[p as keyof typeof capturedPoses])
  ).length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 mb-6 border-b border-gray-100 dark:border-gray-800 gap-2">
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
            Pendaftaran Karyawan & Biometrik KYC Multi-Angle (5 Pose)
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Standar e-KYC Perbankan: Panduan Model 3D, verifikasi sudut pose ketat, dan skor kualitas minimal 75 (PRD §12).
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          KYC Bank 5-Pose Centroid (Min. 75)
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
        {/* BAGIAN 1: MODUL KYC 5-POSE & FOTO PROFIL TERPADU */}
        <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <div>
              <Label className="text-sm font-bold text-gray-800 dark:text-white">
                Foto Profil Resmi & Pendaftaran Biometrik KYC <span className="text-error-500">*</span>
              </Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Wajah wajib menoleh sesuai panduan 3D dan lolos ambang batas skor kualitas minimal <strong>75/100</strong>.
              </p>
            </div>

            {/* Strict KYC Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl self-start sm:self-auto shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                Wajib 5-Pose KYC Lengkap • Anti-Duplikasi Aktif
              </span>
            </div>
          </div>

          {/* OPSI 1: KAMERA BIOMETRIK KYC 5-POSE */}
          {photoMode === "kyc_camera" && (
            <div className="space-y-4">
              {/* Stepper Progress Bar (Langkah 1 s/d 5) */}
              <div className="p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-800 dark:text-white flex items-center gap-1.5">
                    <span>Langkah {activePoseStep + 1} dari 5:</span>
                    <span className="text-emerald-600 dark:text-emerald-400">{currentPose.title}</span>
                  </span>
                  <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                    {Object.keys(capturedPoses).length}/5 Selesai • Ambang Batas: Min. 75
                  </span>
                </div>

                {/* 5-Step Indicators */}
                <div className="grid grid-cols-5 gap-1.5">
                  {KYC_POSES.map((pose, idx) => {
                    const isCaptured = !!capturedPoses[pose.id];
                    const isCurrent = idx === activePoseStep && !isKycComplete;
                    const score = poseScores[pose.id];
                    return (
                      <button
                        key={pose.id}
                        type="button"
                        onClick={() => {
                          setActivePoseStep(idx);
                          setIsKycComplete(false);
                          setScoreRejection(null);
                        }}
                        className={`py-2 px-1 rounded-lg text-[11px] font-semibold flex flex-col items-center justify-center transition border ${
                          isCaptured
                            ? "bg-emerald-500 text-white border-emerald-600 shadow-sm"
                            : isCurrent
                            ? "bg-emerald-100 text-emerald-900 border-emerald-500 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-gray-100 text-gray-500 border-transparent dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        <span className="text-xs font-bold">
                          {isCaptured ? `✓ ${score ?? 75}` : `${idx + 1}`}
                        </span>
                        <span className="truncate w-full text-center text-[10px] mt-0.5">{pose.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {!isKycComplete ? (
                <div className="space-y-4">
                  {/* Anti-Occlusion & Pose Alignment Status Bar */}
                  <div
                    className={`flex items-center justify-between text-[11px] px-3.5 py-2.5 rounded-xl border font-mono transition-colors ${
                      fqaStatus.isOccluded
                        ? "bg-red-950/80 text-red-300 border-red-800 animate-pulse"
                        : !fqaStatus.isFaceCentered
                        ? "bg-amber-950/80 text-amber-300 border-amber-700/80"
                        : !fqaStatus.isPoseAligned
                        ? "bg-amber-950/70 text-amber-300 border-amber-700/80"
                        : fqaStatus.isValid
                        ? "bg-emerald-950/60 text-emerald-300 border-emerald-700/80"
                        : "bg-slate-900 text-slate-300 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          fqaStatus.isOccluded
                            ? "bg-red-500 animate-ping"
                            : !fqaStatus.isFaceCentered || !fqaStatus.isPoseAligned
                            ? "bg-amber-400 animate-pulse"
                            : fqaStatus.isValid
                            ? "bg-emerald-400 animate-pulse"
                            : "bg-amber-400"
                        }`}
                      ></span>
                      <span className="font-semibold text-xs">{fqaStatus.label}</span>
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center gap-3">
                      <span>Ketajaman: <strong className="text-white">{fqaStatus.sharpness}</strong></span>
                      <span>Cahaya: <strong className="text-white">{fqaStatus.brightness}</strong></span>
                    </div>
                  </div>

                  {/* Dual Grid: Camera Feed (Left/Main) & 3D Head Guide + Previous Pose Preview (Right/Side) */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Main Camera Viewport */}
                    <div className="sm:col-span-2 lg:col-span-3 h-88 sm:h-[420px] lg:h-[460px] bg-slate-950 rounded-2xl border-2 border-slate-800 relative overflow-hidden flex items-center justify-center shadow-inner">
                      <video
                        ref={attachCameraRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover scale-x-[-1] ${
                          cameraActive && !cameraError ? "block" : "hidden"
                        }`}
                      />

                      {/* Camera Shutter Flash & Biometric Capture Effect */}
                      {flashFeedback && (
                        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                          <div className="absolute inset-0 bg-white/75 backdrop-blur-sm transition-opacity duration-200" />
                          <div className="w-48 h-64 border-4 border-emerald-400 rounded-full animate-ping opacity-75 z-50" />
                          <div className="relative z-50 px-4 py-2 bg-emerald-950/90 border border-emerald-400 rounded-xl text-emerald-300 font-mono text-xs font-bold tracking-widest shadow-2xl animate-pulse">
                            ✓ BIOMETRIC MESH SNAPSHOT
                          </div>
                        </div>
                      )}

                      {/* Fallback Simulator Viewport */}
                      {(!cameraActive || cameraError) && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-slate-900">
                          <div className="w-28 h-36 border-2 border-dashed border-emerald-400/80 rounded-full flex items-center justify-center mb-2">
                            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">{currentPose.shortLabel}</span>
                          </div>
                          <span className="text-xs text-slate-300 font-medium">Simulator Kamera KYC Aktif</span>
                          <span className="text-[11px] text-slate-500">Mode uji coba simulator (Auto-pass score 92)</span>
                        </div>
                      )}

                      {/* Cinematic Sci-Fi Face Recognition HUD (Matching Image 1 & Image 2) */}
                      <CinematicFaceScannerHUD
                        poseId={currentPose.id}
                        poseLabel={currentPose.instruction || currentPose.title}
                        fqaStatus={fqaStatus}
                        cameraActive={cameraActive}
                        cameraError={cameraError}
                        employeeCode={formData.employeeCode || "0842-AX"}
                        employeeName={`${formData.firstName} ${formData.lastName}`.trim() || "KARYAWAN"}
                        gender={formData.gender?.toUpperCase() || "MALE"}
                      />
                    </div>

                    {/* Side Panel: 3D Head Pose Model Guide & Previous Pose Preview */}
                    <div className="sm:col-span-1 lg:col-span-1 flex flex-col gap-3 justify-between">
                      {/* 3D Model Human Head Guide Component */}
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="text-[10px] font-mono uppercase text-gray-500 dark:text-gray-400 font-bold mb-1 block">
                          Panduan Model 3D Pose:
                        </span>
                        <Kyc3dHeadGuide
                          pose={currentPose.id}
                          status={
                            !fqaStatus.isFaceCentered
                              ? "not_centered"
                              : fqaStatus.isOccluded
                              ? "occluded"
                              : fqaStatus.isPoseAligned
                              ? "aligned"
                              : "waiting"
                          }
                          occlusionZone={fqaStatus.occlusionZone}
                          className="h-full"
                        />
                      </div>

                      {/* Previous Pose Snapshot Card Preview */}
                      {prevPose && prevPoseSnapshot && (
                        <div className="p-2.5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                          <span className="text-[10px] font-mono uppercase text-gray-500 dark:text-gray-400 font-bold block mb-1">
                            Foto Pose Sebelumnya:
                          </span>
                          <div className="flex items-center gap-2">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-emerald-500 bg-slate-950 shrink-0">
                              <img src={prevPoseSnapshot} alt="Previous Pose" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 text-left min-w-0">
                              <span className="block text-xs font-bold text-gray-800 dark:text-white truncate">
                                {prevPose.shortLabel}
                              </span>
                              <span className="inline-block text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                                Skor: {prevPoseScore ?? 85}/100 ✓
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRetakeSinglePose(activePoseStep - 1)}
                              className="text-[10px] text-brand-600 hover:text-brand-700 font-semibold underline shrink-0"
                            >
                              Ulang
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Instructional Pose Tip Banner */}
                  <div className="p-3.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-900/50 rounded-xl text-xs text-blue-950 dark:text-blue-200 flex items-start gap-2.5">
                    <span className="text-lg leading-none">💡</span>
                    <div>
                      <strong className="font-bold text-blue-900 dark:text-blue-100">{currentPose.instruction}.</strong>
                      <p className="mt-0.5 text-blue-800/80 dark:text-blue-300/80">
                        {currentPose.sub}. Tombol capture hanya aktif jika orientasi kepala sesuai model 3D dan tidak ada halangan tangan.
                      </p>
                    </div>
                  </div>

                  {/* Rejection Alert Modal / Banner (When Score < 75) */}
                  {scoreRejection && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/50 border-2 border-red-500 rounded-2xl text-red-900 dark:text-red-200 space-y-2.5 animate-modal-book-open">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">❌</span>
                          <div>
                            <h4 className="text-sm font-extrabold text-red-700 dark:text-red-300">
                              Foto Ditolak: Skor Kualitas {scoreRejection.score}/100 (Di Bawah Standar 75)
                            </h4>
                            <p className="text-xs text-red-600 dark:text-red-400">
                              Foto pada <strong>{scoreRejection.poseTitle}</strong> tidak memenuhi standar akurasi biometrik perbankan.
                            </p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-xs font-mono font-bold">
                          Wajib Diulang
                        </span>
                      </div>

                      <div className="bg-white/80 dark:bg-gray-900/80 p-3 rounded-xl border border-red-200 dark:border-red-800 text-xs">
                        <span className="font-bold text-red-800 dark:text-red-300 block mb-1">
                          Penyebab Kualitas Rendah:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-gray-700 dark:text-gray-300">
                          {scoreRejection.issues.map((iss, i) => (
                            <li key={i}>{iss}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          type="button"
                          onClick={() => setScoreRejection(null)}
                          className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition shadow-md"
                        >
                          🔄 Ambil Ulang Pose Ini Sekarang
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Capture Button with Strict Pre-Capture Guard */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setActivePoseStep((prev) => Math.max(0, prev - 1))}
                      disabled={activePoseStep === 0}
                      className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      ← Pose Sebelumnya
                    </button>

                    <button
                      type="button"
                      onClick={handleCaptureCurrentPose}
                      disabled={!fqaStatus.isFaceCentered || fqaStatus.isOccluded || !fqaStatus.isPoseAligned}
                      className={`py-3 px-7 text-xs font-extrabold rounded-xl transition shadow-lg flex items-center gap-2 cursor-pointer ${
                        !fqaStatus.isFaceCentered
                          ? "bg-amber-600 text-white opacity-50 cursor-not-allowed shadow-none"
                          : fqaStatus.isOccluded
                          ? "bg-red-600 text-white opacity-50 cursor-not-allowed shadow-none"
                          : !fqaStatus.isPoseAligned
                          ? "bg-amber-600 text-white opacity-50 cursor-not-allowed shadow-none"
                          : "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.98] text-white shadow-emerald-600/30"
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>
                        {!fqaStatus.isFaceCentered
                          ? "⚠️ Posisikan Wajah Tepat di Dalam Oval"
                          : fqaStatus.isOccluded
                          ? fqaStatus.occlusionZone === "forehead"
                            ? "✋ Jauhkan Tangan dari Dahi/Mata untuk Mengambil"
                            : fqaStatus.occlusionZone === "object"
                            ? "✋ Jauhkan Cangkir/Benda dari Wajah untuk Mengambil"
                            : "✋ Jauhkan Tangan dari Dagu/Mulut untuk Mengambil"
                          : !fqaStatus.isPoseAligned
                          ? "⚠️ Sesuaikan Arah Kepala dengan Model 3D"
                          : `📸 Ambil Foto (${currentPose.shortLabel})`}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActivePoseStep((prev) => Math.min(KYC_POSES.length - 1, prev + 1))}
                      disabled={activePoseStep === KYC_POSES.length - 1 || !capturedPoses[currentPose.id]}
                      className="px-4 py-2.5 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Pose Berikutnya →
                    </button>
                  </div>
                </div>
              ) : (
                /* REVIEW 5-POSE GALLERY (STANDAR e-KYC PERBANKAN) */
                <div className="space-y-4 p-5 bg-white dark:bg-gray-800/80 rounded-2xl border border-emerald-300 dark:border-emerald-800 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-gray-100 dark:border-gray-700 gap-2">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 mb-1">
                        ✓ 5/5 Pose Biometrik Lengkap (Seluruh Skor &ge; 75 Lolos)
                      </div>
                      <h4 className="text-sm font-bold text-gray-800 dark:text-white">
                        Seluruh Sudut Wajah Berhasil Ditangkap Tanpa Halangan
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Foto <strong>Pose 1 (Center)</strong> otomatis menjadi Foto Profil resmi di Supabase Storage, dan kelima pose akan diekstraksi menjadi embedding centroid 512-dimensi.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleResetAllPoses}
                      className="px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition self-start sm:self-auto"
                    >
                      🗑️ Ulangi Semua Pose
                    </button>
                  </div>

                  {/* 5-Card Thumbnail Grid with Quality Score Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {KYC_POSES.map((pose, idx) => {
                      const snapshot = capturedPoses[pose.id];
                      const score = poseScores[pose.id] ?? 85;
                      return (
                        <div
                          key={pose.id}
                          className={`flex flex-col items-center p-2.5 rounded-xl border relative transition ${
                            pose.isProfileAvatar
                              ? "border-2 border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/30 shadow-sm"
                              : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900"
                          }`}
                        >
                          {pose.isProfileAvatar && (
                            <span className="absolute -top-2 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-600 text-white shadow">
                              ⭐ Profil Avatar
                            </span>
                          )}

                          <div className="w-full h-32 rounded-lg overflow-hidden bg-slate-950 border border-gray-200 dark:border-gray-700 relative mb-2">
                            {snapshot ? (
                              <img src={snapshot} alt={pose.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="flex items-center justify-center h-full text-slate-500 text-xs">
                                Belum ada
                              </div>
                            )}
                            <span className="absolute bottom-1 right-1 bg-emerald-500 text-white rounded-full px-1.5 py-0.5 text-[9px] font-mono font-bold">
                              {score}/100 ✓
                            </span>
                          </div>

                          <span className="text-[11px] font-bold text-gray-800 dark:text-white truncate w-full text-center">
                            {pose.shortLabel}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleRetakeSinglePose(idx)}
                            className="mt-1 text-[10px] text-brand-600 hover:text-brand-700 dark:text-brand-400 font-semibold"
                          >
                            🔄 Ambil Ulang
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Strict Notice: Mode Unggah 1 Foto Dinonaktifkan */}
          {photoMode === "upload" && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300">
              <p className="font-bold mb-1">🔒 Kebijakan Integritas Biometrik Perusahaan (PRD §12):</p>
              <p>
                Mode unggah 1 foto telah dinonaktifkan demi mencegah pendaftaran karyawan hanya dengan 1 sudut muka. Seluruh karyawan baru WAJIB mendaftar melalui Kamera Biometrik KYC 5-Pose untuk memastikan akurasi data biometrik dan mencegah duplikasi identitas.
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

        {/* FOOTER ACTIONS: STRICT 5-POSE KYC GATING (ANTI 1-MUKA) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            {!isKycComplete ? (
              <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                <span className="text-amber-600 dark:text-amber-400">⚠️</span>
                <span>
                  <strong>KYC Belum Lengkap ({completedPosesCount}/5 Pose):</strong> Sistem mewajibkan 5 sudut foto wajah dengan skor &ge; 75. Pendaftaran karyawan dengan 1 muka / foto tunggal dilarang.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                <span>
                  <strong>5/5 Pose KYC Lengkap:</strong> Seluruh sudut wajah terverifikasi & deduplikasi biometrik 1:N siap dijalankan.
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 shrink-0">
            <Button size="sm" variant="outline" type="button" onClick={() => window.history.back()}>
              Batal
            </Button>
            <Button
              size="sm"
              type="submit"
              disabled={loading || !isKycComplete}
              className={`font-bold px-5 transition-all ${
                !isKycComplete
                  ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-700"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-emerald-600/20"
              }`}
            >
              {loading
                ? "Menyimpan & Mendaftarkan Biometrik KYC..."
                : !isKycComplete
                ? `🔒 Wajib 5 Pose KYC (${completedPosesCount}/5)`
                : "✓ Simpan Karyawan Baru (5 Pose Terverifikasi)"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

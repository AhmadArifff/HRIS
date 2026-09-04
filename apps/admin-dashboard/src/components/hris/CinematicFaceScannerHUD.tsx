"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";

export interface CinematicFaceScannerHUDProps {
  poseId: string; // "center" | "right" | "left" | "up" | "down"
  poseLabel: string;
  fqaStatus: {
    isValid: boolean;
    isFaceCentered: boolean;
    isPoseAligned: boolean;
    isOccluded: boolean;
    occlusionZone: "none" | "chin" | "forehead" | "object" | "phone";
    directionHint: string;
    label: string;
    brightness: number;
    sharpness: number;
  };
  cameraActive: boolean;
  cameraError: boolean;
  employeeCode?: string;
  employeeName?: string;
  gender?: string;
  faceTrack?: {
    x: number;
    y: number;
    width: number;
    height: number;
    isDetected: boolean;
  };
  biometricAnalysis?: {
    gender: "FEMALE" | "MALE";
    genderConfidence?: number;
    hasHijab?: boolean;
    ageGroup?: string;
    detectionScore?: number;
  };
}

interface BiometricDot {
  id: string;
  x: number;
  y: number;
  isAnchor?: boolean;
  isConstellation?: boolean;
}

interface BiometricMeshConfig {
  dots: BiometricDot[];
  facets: number[][];
  meshConnections: [number, number][];
  constellationPath: number[];
  cervicalGridLines: { x1: number; y1: number; x2: number; y2: number }[];
  yawDegrees: string;
  pitchDegrees: string;
}

// 3D Polygon Surface Facets conforming to facial & neck geometry (Matching Image 1 & Image 2)
const BIOMETRIC_FACETS: number[][] = [
  // 1. Forehead Arch & Temples
  [0, 1, 6, 7],
  [1, 2, 5, 6],
  [0, 3, 9, 8],
  [3, 4, 10, 9],
  [0, 7, 17, 8],
  // 2. Eye Sockets & Orbital Contours
  [5, 6, 12, 11],
  [6, 7, 13, 12],
  [11, 12, 24, 23],
  [12, 13, 21, 24],
  [8, 9, 15, 14],
  [9, 10, 16, 15],
  [14, 15, 22, 26],
  [15, 16, 25, 26],
  // 3. Nasal Pyramid & Bridge
  [7, 8, 18, 17],
  [17, 18, 19],
  [18, 19, 20],
  [19, 20, 21],
  [19, 20, 22],
  // 4. Cheeks & Maxillary Surfaces
  [2, 5, 23, 31],
  [4, 10, 25, 37],
  [23, 24, 32, 31],
  [25, 26, 36, 37],
  [24, 21, 27, 33],
  [26, 22, 29, 35],
  // 5. Philtrum & Mouth & Lips
  [20, 21, 27, 28],
  [20, 22, 29, 28],
  [27, 28, 29, 30],
  [27, 30, 34, 33],
  [29, 30, 34, 35],
  // 6. Chin Apex & Mandible
  [31, 32, 33],
  [37, 36, 35],
  [32, 33, 34],
  [36, 35, 34],
  // 7. Neck & Cervical Cage Contours
  [32, 33, 38],
  [36, 35, 40],
  [33, 34, 39, 38],
  [34, 35, 40, 39],
  [38, 39, 41],
  [39, 40, 41],
];

// Interconnection lines between biometric facial landmark nodes (Image 1 Wireframe)
const BIOMETRIC_MESH_CONNECTIONS: [number, number][] = [
  // Forehead & Temples
  [0, 1], [1, 2], [0, 3], [3, 4],
  // Eyebrows
  [5, 6], [6, 7], [8, 9], [9, 10],
  // Eyes
  [11, 12], [12, 13], [14, 15], [15, 16],
  // Eye-to-Nose bridges
  [7, 17], [8, 17], [13, 17], [14, 17],
  // Nose Bridge & Tip
  [17, 18], [18, 19], [19, 20], [20, 21], [20, 22],
  // Cheeks
  [5, 23], [23, 24], [10, 25], [25, 26],
  // Nose to Mouth
  [20, 28],
  // Lips / Mouth Perimeter
  [27, 28], [28, 29], [29, 30], [30, 27],
  // Jawline & Chin contour
  [23, 31], [31, 32], [32, 33], [33, 34], [34, 35], [35, 36], [36, 37], [37, 25],
  // Mouth to Chin
  [30, 34],
  // Neck & Throat Contours (Cervical Cage)
  [31, 38], [32, 38], [33, 38],
  [34, 39],
  [35, 40], [36, 40], [37, 40],
  [38, 39], [39, 40],
  [38, 41], [39, 41], [40, 41],
];

// Generates cervical neck coordinate cage lines (Image 1)
const getCervicalGridLines = (centerX: number, startY: number, width: number, rows: number) => {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  const spacing = 7;
  for (let r = 0; r < rows; r++) {
    const y = startY + r * spacing;
    const w = width * (1 + r * 0.12);
    lines.push({ x1: centerX - w / 2, y1: y, x2: centerX + w / 2, y2: y });
  }
  // Vertical struts
  const cols = 5;
  for (let c = 0; c < cols; c++) {
    const offsetFactor = (c - (cols - 1) / 2) / ((cols - 1) / 2);
    const xTop = centerX + offsetFactor * (width * 0.4);
    const xBottom = centerX + offsetFactor * (width * 0.7);
    lines.push({ x1: xTop, y1: startY, x2: xBottom, y2: startY + (rows - 1) * spacing });
  }
  return lines;
};

// Returns 42-point 3D facial topology & constellation trace for active pose
const getBiometricConfig = (poseId: string): BiometricMeshConfig => {
  switch (poseId) {
    case "right":
      return {
        yawDegrees: "+25.0° YAW",
        pitchDegrees: "+0.5° PITCH",
        constellationPath: [4, 10, 16, 26, 22, 20, 29, 35, 34], // Image 2 style constellation circuit
        cervicalGridLines: getCervicalGridLines(86, 224, 60, 5),
        facets: BIOMETRIC_FACETS,
        dots: [
          // Forehead
          { id: "fh_c", x: 80, y: 50 },
          { id: "fh_ml", x: 64, y: 54 },
          { id: "fh_fl", x: 50, y: 66, isAnchor: true },
          { id: "fh_mr", x: 104, y: 54 },
          { id: "fh_fr", x: 134, y: 66, isAnchor: true, isConstellation: true },
          // Brows
          { id: "br_lo", x: 48, y: 78 },
          { id: "br_lm", x: 60, y: 74 },
          { id: "br_li", x: 72, y: 78 },
          { id: "br_ri", x: 92, y: 78 },
          { id: "br_rm", x: 112, y: 74 },
          { id: "br_ro", x: 132, y: 78, isAnchor: true, isConstellation: true },
          // Eyes
          { id: "ey_lo", x: 52, y: 90 },
          { id: "ey_lp", x: 62, y: 90, isAnchor: true },
          { id: "ey_li", x: 72, y: 90 },
          { id: "ey_ri", x: 94, y: 90 },
          { id: "ey_rp", x: 110, y: 90, isAnchor: true },
          { id: "ey_ro", x: 126, y: 90, isConstellation: true },
          // Nose
          { id: "ns_1", x: 82, y: 84 },
          { id: "ns_2", x: 80, y: 106 },
          { id: "ns_3", x: 78, y: 126 },
          { id: "ns_tip", x: 76, y: 138, isAnchor: true, isConstellation: true },
          { id: "ns_nl", x: 68, y: 140 },
          { id: "ns_nr", x: 90, y: 140, isConstellation: true },
          // Cheeks
          { id: "ck_lt", x: 44, y: 120 },
          { id: "ck_lm", x: 52, y: 146 },
          { id: "ck_rt", x: 138, y: 120 },
          { id: "ck_rm", x: 124, y: 146, isAnchor: true, isConstellation: true },
          // Lips
          { id: "lp_l", x: 66, y: 174 },
          { id: "lp_t", x: 82, y: 168 },
          { id: "lp_r", x: 104, y: 174, isConstellation: true },
          { id: "lp_b", x: 82, y: 182 },
          // Jaw & Chin
          { id: "jw_1", x: 42, y: 148 },
          { id: "jw_2", x: 50, y: 186 },
          { id: "jw_3", x: 66, y: 210 },
          { id: "ch_tip", x: 84, y: 216, isAnchor: true, isConstellation: true },
          { id: "jw_5", x: 106, y: 210, isConstellation: true },
          { id: "jw_6", x: 128, y: 186 },
          { id: "jw_7", x: 142, y: 148 },
          // Neck
          { id: "nk_l", x: 62, y: 236 },
          { id: "nk_c", x: 84, y: 240, isAnchor: true },
          { id: "nk_r", x: 120, y: 236 },
          { id: "nk_b", x: 90, y: 252 },
        ],
        meshConnections: BIOMETRIC_MESH_CONNECTIONS,
      };

    case "left":
      return {
        yawDegrees: "-25.0° YAW",
        pitchDegrees: "+0.5° PITCH",
        constellationPath: [2, 6, 12, 24, 21, 20, 27, 33, 34],
        cervicalGridLines: getCervicalGridLines(108, 224, 60, 5),
        facets: BIOMETRIC_FACETS,
        dots: [
          // Forehead
          { id: "fh_c", x: 112, y: 50 },
          { id: "fh_ml", x: 88, y: 54 },
          { id: "fh_fl", x: 58, y: 66, isAnchor: true, isConstellation: true },
          { id: "fh_mr", x: 128, y: 54 },
          { id: "fh_fr", x: 142, y: 66, isAnchor: true },
          // Brows
          { id: "br_lo", x: 60, y: 78, isAnchor: true, isConstellation: true },
          { id: "br_lm", x: 80, y: 74 },
          { id: "br_li", x: 100, y: 78 },
          { id: "br_ri", x: 120, y: 78 },
          { id: "br_rm", x: 132, y: 74 },
          { id: "br_ro", x: 144, y: 78 },
          // Eyes
          { id: "ey_lo", x: 66, y: 90, isConstellation: true },
          { id: "ey_lp", x: 82, y: 90, isAnchor: true },
          { id: "ey_li", x: 98, y: 90 },
          { id: "ey_ri", x: 120, y: 90 },
          { id: "ey_rp", x: 130, y: 90, isAnchor: true },
          { id: "ey_ro", x: 140, y: 90 },
          // Nose
          { id: "ns_1", x: 110, y: 84 },
          { id: "ns_2", x: 112, y: 106 },
          { id: "ns_3", x: 114, y: 126 },
          { id: "ns_tip", x: 116, y: 138, isAnchor: true, isConstellation: true },
          { id: "ns_nl", x: 102, y: 140, isConstellation: true },
          { id: "ns_nr", x: 124, y: 140 },
          // Cheeks
          { id: "ck_lt", x: 54, y: 120 },
          { id: "ck_lm", x: 68, y: 146, isAnchor: true, isConstellation: true },
          { id: "ck_rt", x: 148, y: 120 },
          { id: "ck_rm", x: 140, y: 146 },
          // Lips
          { id: "lp_l", x: 88, y: 174, isConstellation: true },
          { id: "lp_t", x: 110, y: 168 },
          { id: "lp_r", x: 126, y: 174 },
          { id: "lp_b", x: 110, y: 182 },
          // Jaw & Chin
          { id: "jw_1", x: 50, y: 148 },
          { id: "jw_2", x: 64, y: 186 },
          { id: "jw_3", x: 86, y: 210, isConstellation: true },
          { id: "ch_tip", x: 108, y: 216, isAnchor: true, isConstellation: true },
          { id: "jw_5", x: 126, y: 210 },
          { id: "jw_6", x: 142, y: 186 },
          { id: "jw_7", x: 150, y: 148 },
          // Neck
          { id: "nk_l", x: 72, y: 236 },
          { id: "nk_c", x: 108, y: 240, isAnchor: true },
          { id: "nk_r", x: 130, y: 236 },
          { id: "nk_b", x: 102, y: 252 },
        ],
        meshConnections: BIOMETRIC_MESH_CONNECTIONS,
      };

    case "up":
      return {
        yawDegrees: "0.0° YAW",
        pitchDegrees: "-15.0° PITCH (UP)",
        constellationPath: [0, 8, 14, 26, 20, 30, 34],
        cervicalGridLines: getCervicalGridLines(96, 216, 76, 6),
        facets: BIOMETRIC_FACETS,
        dots: [
          // Forehead
          { id: "fh_c", x: 96, y: 64, isAnchor: true, isConstellation: true },
          { id: "fh_ml", x: 74, y: 66 },
          { id: "fh_fl", x: 56, y: 72 },
          { id: "fh_mr", x: 118, y: 66 },
          { id: "fh_fr", x: 136, y: 72 },
          // Brows
          { id: "br_lo", x: 58, y: 84 },
          { id: "br_lm", x: 76, y: 82 },
          { id: "br_li", x: 88, y: 84 },
          { id: "br_ri", x: 104, y: 84, isConstellation: true },
          { id: "br_rm", x: 116, y: 82 },
          { id: "br_ro", x: 134, y: 84 },
          // Eyes
          { id: "ey_lo", x: 64, y: 94 },
          { id: "ey_lp", x: 78, y: 94, isAnchor: true },
          { id: "ey_li", x: 88, y: 94 },
          { id: "ey_ri", x: 104, y: 94 },
          { id: "ey_rp", x: 114, y: 94, isAnchor: true, isConstellation: true },
          { id: "ey_ro", x: 128, y: 94 },
          // Nose
          { id: "ns_1", x: 96, y: 90 },
          { id: "ns_2", x: 96, y: 106 },
          { id: "ns_3", x: 96, y: 118 },
          { id: "ns_tip", x: 96, y: 124, isAnchor: true, isConstellation: true },
          { id: "ns_nl", x: 86, y: 126 },
          { id: "ns_nr", x: 106, y: 126 },
          // Cheeks
          { id: "ck_lt", x: 50, y: 114 },
          { id: "ck_lm", x: 58, y: 136 },
          { id: "ck_rt", x: 142, y: 114 },
          { id: "ck_rm", x: 134, y: 136, isAnchor: true, isConstellation: true },
          // Lips
          { id: "lp_l", x: 80, y: 154 },
          { id: "lp_t", x: 96, y: 150 },
          { id: "lp_r", x: 112, y: 154 },
          { id: "lp_b", x: 96, y: 162, isConstellation: true },
          // Jaw & Chin
          { id: "jw_1", x: 48, y: 138 },
          { id: "jw_2", x: 58, y: 172 },
          { id: "jw_3", x: 76, y: 194 },
          { id: "ch_tip", x: 96, y: 200, isAnchor: true, isConstellation: true },
          { id: "jw_5", x: 116, y: 194 },
          { id: "jw_6", x: 134, y: 172 },
          { id: "jw_7", x: 144, y: 138 },
          // Cervical Neck
          { id: "nk_l", x: 60, y: 224 },
          { id: "nk_c", x: 96, y: 228, isAnchor: true },
          { id: "nk_r", x: 132, y: 224 },
          { id: "nk_b", x: 96, y: 254 },
        ],
        meshConnections: BIOMETRIC_MESH_CONNECTIONS,
      };

    case "down":
      return {
        yawDegrees: "0.0° YAW",
        pitchDegrees: "+15.0° PITCH (DOWN)",
        constellationPath: [0, 8, 14, 26, 20, 28, 34],
        cervicalGridLines: getCervicalGridLines(96, 234, 52, 4),
        facets: BIOMETRIC_FACETS,
        dots: [
          // Forehead
          { id: "fh_c", x: 96, y: 38, isAnchor: true, isConstellation: true },
          { id: "fh_ml", x: 74, y: 42 },
          { id: "fh_fl", x: 54, y: 52 },
          { id: "fh_mr", x: 118, y: 42 },
          { id: "fh_fr", x: 138, y: 52 },
          // Brows
          { id: "br_lo", x: 56, y: 68 },
          { id: "br_lm", x: 74, y: 64 },
          { id: "br_li", x: 88, y: 68 },
          { id: "br_ri", x: 104, y: 68, isConstellation: true },
          { id: "br_rm", x: 118, y: 64 },
          { id: "br_ro", x: 136, y: 68 },
          // Eyes
          { id: "ey_lo", x: 62, y: 82 },
          { id: "ey_lp", x: 76, y: 82, isAnchor: true },
          { id: "ey_li", x: 88, y: 82 },
          { id: "ey_ri", x: 104, y: 82 },
          { id: "ey_rp", x: 116, y: 82, isAnchor: true, isConstellation: true },
          { id: "ey_ro", x: 130, y: 82 },
          // Nose
          { id: "ns_1", x: 96, y: 80 },
          { id: "ns_2", x: 96, y: 108 },
          { id: "ns_3", x: 96, y: 134 },
          { id: "ns_tip", x: 96, y: 148, isAnchor: true, isConstellation: true },
          { id: "ns_nl", x: 84, y: 148 },
          { id: "ns_nr", x: 108, y: 148 },
          // Cheeks
          { id: "ck_lt", x: 48, y: 116 },
          { id: "ck_lm", x: 58, y: 150 },
          { id: "ck_rt", x: 144, y: 116 },
          { id: "ck_rm", x: 134, y: 150, isAnchor: true, isConstellation: true },
          // Lips
          { id: "lp_l", x: 80, y: 184 },
          { id: "lp_t", x: 96, y: 178, isConstellation: true },
          { id: "lp_r", x: 112, y: 184 },
          { id: "lp_b", x: 96, y: 192 },
          // Jaw & Chin
          { id: "jw_1", x: 48, y: 152 },
          { id: "jw_2", x: 60, y: 192 },
          { id: "jw_3", x: 78, y: 218 },
          { id: "ch_tip", x: 96, y: 226, isAnchor: true, isConstellation: true },
          { id: "jw_5", x: 114, y: 218 },
          { id: "jw_6", x: 132, y: 192 },
          { id: "jw_7", x: 144, y: 152 },
          // Cervical Neck
          { id: "nk_l", x: 66, y: 242 },
          { id: "nk_c", x: 96, y: 246, isAnchor: true },
          { id: "nk_r", x: 126, y: 242 },
          { id: "nk_b", x: 96, y: 256 },
        ],
        meshConnections: BIOMETRIC_MESH_CONNECTIONS,
      };

    case "center":
    default:
      return {
        yawDegrees: "0.0° YAW",
        pitchDegrees: "0.0° PITCH",
        constellationPath: [4, 10, 16, 26, 22, 20, 29, 35, 34], // Image 2 signature constellation track
        cervicalGridLines: getCervicalGridLines(96, 226, 68, 5),
        facets: BIOMETRIC_FACETS,
        dots: [
          // Forehead
          { id: "fh_c", x: 96, y: 48 },
          { id: "fh_ml", x: 74, y: 52 },
          { id: "fh_fl", x: 54, y: 64, isAnchor: true },
          { id: "fh_mr", x: 118, y: 52 },
          { id: "fh_fr", x: 138, y: 64, isAnchor: true, isConstellation: true },
          // Brows
          { id: "br_lo", x: 54, y: 76 },
          { id: "br_lm", x: 72, y: 72 },
          { id: "br_li", x: 86, y: 76 },
          { id: "br_ri", x: 106, y: 76 },
          { id: "br_rm", x: 120, y: 72 },
          { id: "br_ro", x: 138, y: 76, isAnchor: true, isConstellation: true },
          // Eyes
          { id: "ey_lo", x: 60, y: 88 },
          { id: "ey_lp", x: 74, y: 88, isAnchor: true },
          { id: "ey_li", x: 86, y: 88 },
          { id: "ey_ri", x: 106, y: 88 },
          { id: "ey_rp", x: 118, y: 88, isAnchor: true },
          { id: "ey_ro", x: 132, y: 88, isConstellation: true },
          // Nose
          { id: "ns_1", x: 96, y: 82 },
          { id: "ns_2", x: 96, y: 104 },
          { id: "ns_3", x: 96, y: 124 },
          { id: "ns_tip", x: 96, y: 136, isAnchor: true, isConstellation: true },
          { id: "ns_nl", x: 84, y: 138 },
          { id: "ns_nr", x: 108, y: 138, isConstellation: true },
          // Cheeks
          { id: "ck_lt", x: 46, y: 118 },
          { id: "ck_lm", x: 56, y: 144 },
          { id: "ck_rt", x: 146, y: 118 },
          { id: "ck_rm", x: 136, y: 144, isAnchor: true, isConstellation: true },
          // Lips
          { id: "lp_l", x: 78, y: 172 },
          { id: "lp_t", x: 96, y: 166 },
          { id: "lp_r", x: 114, y: 172, isConstellation: true },
          { id: "lp_b", x: 96, y: 180 },
          // Jaw & Chin
          { id: "jw_1", x: 44, y: 146 },
          { id: "jw_2", x: 54, y: 184 },
          { id: "jw_3", x: 72, y: 208 },
          { id: "ch_tip", x: 96, y: 216, isAnchor: true, isConstellation: true },
          { id: "jw_5", x: 120, y: 208, isConstellation: true },
          { id: "jw_6", x: 138, y: 184 },
          { id: "jw_7", x: 148, y: 146 },
          // Cervical Neck
          { id: "nk_l", x: 64, y: 236 },
          { id: "nk_c", x: 96, y: 240, isAnchor: true },
          { id: "nk_r", x: 128, y: 236 },
          { id: "nk_b", x: 96, y: 252 },
        ],
        meshConnections: BIOMETRIC_MESH_CONNECTIONS,
      };
  }
};

export const CinematicFaceScannerHUD: React.FC<CinematicFaceScannerHUDProps> = ({
  poseId,
  poseLabel,
  fqaStatus,
  cameraActive,
  cameraError,
  employeeCode = "0842-AX",
  employeeName = "KARYAWAN",
  gender = "MALE",
  faceTrack = { x: 50, y: 50, width: 36, height: 58, isDetected: false },
  biometricAnalysis,
}) => {
  const meshConfig = useMemo(() => getBiometricConfig(poseId), [poseId]);

  // Demographic analysis: prioritize real-time biometric analysis over static fallbacks
  const analyzedGender =
    biometricAnalysis?.gender ||
    (gender && gender.toUpperCase().includes("FEM") ? "FEMALE" : "MALE");
  const isHijabDetected = Boolean(biometricAnalysis?.hasHijab);
  const ageGroup = biometricAnalysis?.ageGroup || "ADULT (20-35)";
  const detectionScore =
    biometricAnalysis?.detectionScore !== undefined
      ? biometricAnalysis.detectionScore
      : fqaStatus.isValid
      ? 99.4
      : 94.2;

  const [sfxMuted, setSfxMuted] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio Synthesizer for high-tech sci-fi feedback
  const playSciFiSound = (type: "ping" | "lock" | "warning") => {
    if (sfxMuted || typeof window === "undefined") return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "ping") {
        // High crystalline ping on landmark node tracking
        osc.type = "sine";
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === "lock") {
        // Double electronic confirmation chime (movie-grade)
        osc.type = "triangle";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1320, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === "warning") {
        // Sci-fi glitch pulse alert
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(240, now);
        osc.frequency.setValueAtTime(180, now + 0.08);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch {
      // Ignore audio autoplay policy restrictions
    }
  };

  // Sound triggers on state changes
  const prevValidRef = useRef<boolean>(false);
  const prevOccludedRef = useRef<boolean>(false);

  useEffect(() => {
    if (fqaStatus.isValid && !prevValidRef.current) {
      playSciFiSound("lock");
    }
    prevValidRef.current = fqaStatus.isValid;

    if (fqaStatus.isOccluded && !prevOccludedRef.current) {
      playSciFiSound("warning");
    }
    prevOccludedRef.current = fqaStatus.isOccluded;
  }, [fqaStatus.isValid, fqaStatus.isOccluded]);

  // Theme color palette based on live FQA status
  const theme = useMemo(() => {
    if (fqaStatus.isOccluded) {
      return {
        primary: "#ef4444", // Danger Crimson
        primaryRgb: "239, 68, 68",
        glowFilter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))",
        facetFill: "rgba(239, 68, 68, 0.12)",
        facetStroke: "#f87171",
        bracketStroke: "#ef4444",
        constellationColor: "#fca5a5",
        statusBadge: "bg-red-950/80 border-red-500/80 text-red-300",
        label: "⚠️ TERHALANG BENDA / OKLUSI",
        telemetryDetection: "INTERRUPTED // OCCLUDED",
      };
    }
    if (fqaStatus.isValid) {
      return {
        primary: "#10b981", // Emerald Neon Lock
        primaryRgb: "16, 185, 129",
        glowFilter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.85))",
        facetFill: "rgba(16, 185, 129, 0.15)",
        facetStroke: "#34d399",
        bracketStroke: "#10b981",
        constellationColor: "#6ee7b7",
        statusBadge: "bg-emerald-950/80 border-emerald-500/80 text-emerald-300",
        label: "✓ 100% TERVERIFIKASI & TERKUNCI",
        telemetryDetection: "99.8% CONFIRMED",
      };
    }
    if (!fqaStatus.isFaceCentered || !fqaStatus.isPoseAligned) {
      return {
        primary: "#fbbf24", // Cyber Amber
        primaryRgb: "251, 191, 36",
        glowFilter: "drop-shadow(0 0 6px rgba(251, 191, 36, 0.6))",
        facetFill: "rgba(251, 191, 36, 0.08)",
        facetStroke: "#fcd34d",
        bracketStroke: "#f59e0b",
        constellationColor: "#fef08a",
        statusBadge: "bg-amber-950/80 border-amber-500/80 text-amber-300",
        label: "MEMPOSISIKAN WAJAH...",
        telemetryDetection: "ALIGNING TOPOLOGY",
      };
    }
    return {
      primary: "#38bdf8", // Electric Blue / Cyan (Default Sci-Fi)
      primaryRgb: "56, 189, 248",
      glowFilter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.75))",
      facetFill: "rgba(56, 189, 248, 0.10)",
      facetStroke: "#7dd3fc",
      bracketStroke: "#38bdf8",
      constellationColor: "#fef08a", // Golden accent nodes matching Image 2
      statusBadge: "bg-sky-950/80 border-sky-500/80 text-sky-300",
      label: "SCANNING FACE TOPOLOGY",
      telemetryDetection: "94.2% COMPUTING",
    };
  }, [fqaStatus.isOccluded, fqaStatus.isValid, fqaStatus.isFaceCentered, fqaStatus.isPoseAligned]);

  // Build SVG Points for the Constellation Pathway (Image 2)
  const constellationPoints = useMemo(() => {
    return meshConfig.constellationPath
      .map((idx) => {
        const dot = meshConfig.dots[idx];
        return dot ? `${dot.x},${dot.y}` : null;
      })
      .filter(Boolean)
      .join(" ");
  }, [meshConfig]);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden font-mono z-20">
      {/* Inline Scoped Animations */}
      <style>{`
        @keyframes kyc-wavefront-laser {
          0% { top: 0%; opacity: 0.1; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { top: 98%; opacity: 0.1; }
        }
        @keyframes constellation-dash {
          to { stroke-dashoffset: -120; }
        }
        @keyframes cyber-radar-pulse {
          0% { transform: scale(0.96); opacity: 0.8; }
          50% { transform: scale(1.02); opacity: 0.4; }
          100% { transform: scale(0.96); opacity: 0.8; }
        }
      `}</style>

      {/* 1. BACKGROUND CYBER MATRIX GRID (Image 1) */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyber-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke={theme.primary}
                strokeWidth="0.6"
                strokeOpacity="0.25"
              />
            </pattern>
            {/* Radial Vignette Mask */}
            <radialGradient id="grid-fade" cx="50%" cy="50%" r="50%">
              <stop offset="20%" stopColor="#fff" stopOpacity="0.85" />
              <stop offset="60%" stopColor="#fff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="fade-mask">
              <rect width="100%" height="100%" fill="url(#grid-fade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-grid)" mask="url(#fade-mask)" />
        </svg>
      </div>

      {/* 2. SCI-FI TARGET RETICLE FRAMING BRACKETS `[   ]` (Image 1 & Image 2) */}
      <div className="absolute inset-x-8 sm:inset-x-12 inset-y-4 sm:inset-y-6 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-sm sm:max-w-md h-full relative flex items-center justify-center">
          {/* Top-Left Bracket */}
          <div
            className="absolute top-2 left-2 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-l-2 transition-all duration-300"
            style={{ borderColor: theme.bracketStroke, filter: theme.glowFilter }}
          >
            <div className="w-1.5 h-1.5 bg-current absolute -top-1 -left-1" />
            <span className="absolute top-1 left-2 text-[8px] tracking-widest text-slate-400 font-bold">
              SYS//01
            </span>
          </div>

          {/* Top-Right Bracket */}
          <div
            className="absolute top-2 right-2 w-8 sm:w-12 h-8 sm:h-12 border-t-2 border-r-2 transition-all duration-300"
            style={{ borderColor: theme.bracketStroke, filter: theme.glowFilter }}
          >
            <div className="w-1.5 h-1.5 bg-current absolute -top-1 -right-1" />
            <span className="absolute top-1 right-2 text-[8px] tracking-widest text-slate-400 font-bold">
              REC.3D
            </span>
          </div>

          {/* Bottom-Left Bracket */}
          <div
            className="absolute bottom-2 left-2 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-l-2 transition-all duration-300"
            style={{ borderColor: theme.bracketStroke, filter: theme.glowFilter }}
          >
            <div className="w-1.5 h-1.5 bg-current absolute -bottom-1 -left-1" />
            <span className="absolute bottom-1 left-2 text-[8px] tracking-widest text-slate-400 font-bold">
              W:640 H:480
            </span>
          </div>

          {/* Bottom-Right Bracket */}
          <div
            className="absolute bottom-2 right-2 w-8 sm:w-12 h-8 sm:h-12 border-b-2 border-r-2 transition-all duration-300"
            style={{ borderColor: theme.bracketStroke, filter: theme.glowFilter }}
          >
            <div className="w-1.5 h-1.5 bg-current absolute -bottom-1 -right-1" />
            <span className="absolute bottom-1 right-2 text-[8px] tracking-widest text-slate-400 font-bold">
              {meshConfig.yawDegrees}
            </span>
          </div>

          {/* Center Crosshairs & Azimuth Tick Calibration Marks (Ambient Guideline) */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"
            style={{ animation: "cyber-radar-pulse 4s ease-in-out infinite" }}
          >
            <div
              className="w-56 h-72 sm:w-64 sm:h-80 rounded-full border border-dashed"
              style={{ borderColor: theme.primary }}
            />
          </div>
        </div>
      </div>

      {/* 3. DYNAMIC REAL-TIME FACE-TRACKING 3D MESH & SCANNING LASER STRIP (Follows User Face) */}
      <div
        className="absolute pointer-events-none z-10 transition-all duration-150 ease-out flex items-center justify-center"
        style={{
          left: `${faceTrack?.x ?? 50}%`,
          top: `${faceTrack?.y ?? 50}%`,
          width: `${faceTrack?.width ?? 36}%`,
          height: `${faceTrack?.height ?? 58}%`,
          transform: "translate(-50%, -50%)",
          minWidth: "160px",
          maxWidth: "360px",
          minHeight: "220px",
          maxHeight: "460px",
        }}
      >
        <div className="w-full h-full relative">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 192 260" preserveAspectRatio="none" fill="none">
            <defs>
              {/* Sci-Fi Glow Filter */}
              <filter id="sci-fi-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Constellation Radiant Bloom */}
              <filter id="gold-bloom" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* A. Cervical Neck Anatomical Wireframe Grid (Image 1) */}
            <g className="opacity-60" stroke={theme.primary} strokeWidth="0.75" strokeDasharray="2 3">
              {meshConfig.cervicalGridLines.map((line, i) => (
                <line key={`cervical-${i}`} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
              ))}
            </g>

            {/* B. 3D Triangular Polygon Facets (Image 1 & Image 2) */}
            {meshConfig.facets.map((facet, i) => {
              const points = facet
                .map((idx) => {
                  const p = meshConfig.dots[idx];
                  return p ? `${p.x},${p.y}` : null;
                })
                .filter(Boolean)
                .join(" ");

              return (
                <polygon
                  key={`facet-${i}`}
                  points={points}
                  fill={theme.facetFill}
                  stroke={theme.facetStroke}
                  strokeWidth="0.85"
                  strokeOpacity={fqaStatus.isValid ? "0.9" : "0.7"}
                  strokeLinejoin="round"
                  filter="url(#sci-fi-glow)"
                />
              );
            })}

            {/* C. Dense Wireframe Contour Lines (Image 1) */}
            {meshConfig.meshConnections.map(([startIdx, endIdx], i) => {
              const p1 = meshConfig.dots[startIdx];
              const p2 = meshConfig.dots[endIdx];
              if (!p1 || !p2) return null;
              return (
                <line
                  key={`mesh-wire-${i}`}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={theme.primary}
                  strokeWidth="0.7"
                  strokeOpacity="0.45"
                  strokeDasharray="1.5 2"
                />
              );
            })}

            {/* D. GLOWING CONSTELLATION ENERGY PATHWAY (Signature Image 2 Feature) */}
            {constellationPoints && (
              <polyline
                points={constellationPoints}
                fill="none"
                stroke={fqaStatus.isOccluded ? "#ef4444" : "#fef08a"} // Bright Golden Constellation Path
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 4"
                style={{
                  animation: "constellation-dash 1.6s linear infinite",
                  filter: "url(#gold-bloom)",
                }}
              />
            )}

            {/* E. Biometric Landmark Nodes (42 Points with Radiant Anchors) */}
            {meshConfig.dots.map((dot) => (
              <g key={dot.id}>
                {/* Anchor Node Radar Ping Waves */}
                {dot.isAnchor && (
                  <circle
                    cx={dot.x}
                    cy={dot.y}
                    r="6.5"
                    stroke={theme.primary}
                    strokeWidth="0.9"
                    strokeOpacity="0.75"
                    className="animate-ping origin-center"
                  />
                )}

                {/* Outer Halo */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.isConstellation ? 4.2 : dot.isAnchor ? 3.4 : 2.0}
                  fill={dot.isConstellation ? "#fef08a" : theme.primary}
                  fillOpacity={dot.isConstellation ? "0.45" : "0.25"}
                />

                {/* Core Luminous Dot */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={dot.isConstellation ? 2.4 : dot.isAnchor ? 1.9 : 1.2}
                  fill={dot.isConstellation ? "#ffffff" : theme.primary}
                  filter={dot.isConstellation ? "url(#gold-bloom)" : undefined}
                />
              </g>
            ))}
          </svg>

          {/* HOLOGRAPHIC WAVEFRONT SCANNING LASER BEAM (Follows Tracked Face) */}
          <div
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent pointer-events-none z-30 transition-colors duration-300"
            style={{
              animation: "kyc-wavefront-laser 2.4s ease-in-out infinite",
              boxShadow: `0 0 16px 2px ${theme.primary}`,
              background: `linear-gradient(90deg, transparent, ${theme.primary}, #ffffff, ${theme.primary}, transparent)`,
            }}
          />
        </div>
      </div>

      {/* 4. SCI-FI BIOMETRIC TELEMETRY HUD PANEL (Streamlined: GEN, AGE GROUP, HUMAN PART, DETECTION) */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex flex-col items-end pointer-events-auto">
        <div
          className="w-48 sm:w-56 bg-slate-950/85 backdrop-blur-md rounded-xl p-2.5 border text-left shadow-2xl transition-all duration-300"
          style={{ borderColor: `${theme.primary}50` }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: theme.primary }}
              />
              <span className="text-[10px] sm:text-xs font-bold tracking-wider text-white">
                FACE RECOGNITION
              </span>
            </div>
            {/* SFX Audio Toggle Button */}
            <button
              onClick={() => setSfxMuted(!sfxMuted)}
              className="text-[9px] px-1.5 py-0.5 rounded border border-slate-700 bg-slate-900 text-slate-400 hover:text-white transition cursor-pointer"
              title="Aktifkan / Matikan Efek Suara Sci-Fi"
            >
              {sfxMuted ? "🔇 SFX OFF" : "🔊 SFX ON"}
            </button>
          </div>

          {/* Telemetry Key-Value Matrix (Streamlined: GEN, AGE GROUP, HUMAN PART, DETECTION) */}
          <div className="space-y-1.5 text-[9px] sm:text-[10px] leading-tight text-slate-300">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-500 font-semibold">
                <span className="text-white text-[7px]">●</span> GEN
              </span>
              <span className="text-slate-200 font-bold flex items-center gap-1.5">
                {analyzedGender}
                {isHijabDetected && (
                  <span className="text-[7.5px] tracking-wider uppercase bg-pink-950/90 border border-pink-500/60 text-pink-300 px-1.5 py-0.5 rounded font-mono">
                    HIJAB
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-500 font-semibold">
                <span className="text-white text-[7px]">●</span> AGE GROUP
              </span>
              <span className="text-slate-200">{ageGroup}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-500 font-semibold">
                <span className="text-white text-[7px]">●</span> HUMAN PART
              </span>
              <span className="text-slate-200">CRANIOFACIAL 3D</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-500 font-semibold">
                <span className="text-white text-[7px]">●</span> DETECTION
              </span>
              <span className="font-bold" style={{ color: theme.primary }}>
                {fqaStatus.isValid
                  ? `${detectionScore.toFixed(1)}% CONFIRMED`
                  : fqaStatus.isOccluded
                  ? "INTERRUPTED // OCCLUDED"
                  : !fqaStatus.isFaceCentered || !fqaStatus.isPoseAligned
                  ? "ALIGNING TOPOLOGY"
                  : `${detectionScore.toFixed(1)}% COMPUTING`}
              </span>
            </div>
          </div>

          {/* Cryptographic SHA-256 Vector Stream Ticker */}
          <div className="mt-2 pt-1.5 border-t border-slate-800/80 text-[8px] text-slate-500 truncate flex items-center justify-between">
            <span>HASH: 0x9f4a...e12b</span>
            <span className="text-emerald-400/90 font-bold">512-D VECTOR</span>
          </div>
        </div>
      </div>

      {/* 5. TOP-LEFT LIVE STATUS BADGE */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 flex flex-col gap-1.5">
        <div
          className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border backdrop-blur-md text-[10px] font-bold tracking-wide shadow-lg ${theme.statusBadge}`}
        >
          <span
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: theme.primary }}
          />
          <span>{theme.label}</span>
        </div>

        <div className="text-[9px] text-slate-400 px-2 py-0.5 rounded bg-slate-950/70 backdrop-blur-sm border border-slate-800/70 inline-flex items-center gap-2">
          <span>KETAP: <strong className="text-white">{fqaStatus.sharpness}</strong></span>
          <span>CAHAYA: <strong className="text-white">{fqaStatus.brightness}</strong></span>
        </div>
      </div>

      {/* 6. BOTTOM HUD TARGET BADGE & HINT */}
      <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex items-center justify-center z-30">
        <div className="px-4 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-800 shadow-2xl flex items-center gap-2.5">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: theme.primary }}
          />
          <span className="text-xs font-bold text-white tracking-wide uppercase">
            {fqaStatus.isOccluded
              ? "✋ HALANGAN PADA WAJAH TERDETEKSI"
              : !fqaStatus.isFaceCentered
              ? "POSISIKAN WAJAH DI DALAM OVAL"
              : poseLabel}
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">
            ({meshConfig.yawDegrees})
          </span>
        </div>
      </div>
    </div>
  );
};

export default CinematicFaceScannerHUD;

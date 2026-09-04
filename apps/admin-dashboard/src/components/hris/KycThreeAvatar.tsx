"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export interface KycThreeAvatarProps {
  pose: "center" | "right" | "left" | "up" | "down";
  status?: "waiting" | "aligned" | "occluded" | "captured" | "not_centered";
  occlusionZone?: "chin" | "forehead" | "object" | "phone" | "none";
  className?: string;
  showReticle?: boolean;
}

export const KycThreeAvatar: React.FC<KycThreeAvatarProps> = ({
  pose,
  status = "waiting",
  occlusionZone = "none",
  className = "",
  showReticle = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoadingModel, setIsLoadingModel] = useState<boolean>(true);

  // Dynamic status theme
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
            occlusionZone === "phone"
              ? "✋ TERHALANG PONSEL / OBJEK"
              : occlusionZone === "forehead"
              ? "✋ TANGAN MENUTUPI DAHI"
              : occlusionZone === "chin"
              ? "✋ TANGAN MENUTUPI DAGU"
              : occlusionZone === "object"
              ? "✋ TERHALANG BENDA / CANGKIR"
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
          color: "#38bdf8",
          border: "border-slate-800",
          label: "IKUTI ARAH TOLEHAN MODEL 3D",
          badgeBg: "bg-slate-900/80 border-sky-500/50 text-sky-300",
        };
    }
  };

  const theme = getTheme();

  // Target rotation for the 3D head pivot based on active pose step
  const targetRotationRef = useRef<{ pitch: number; yaw: number; roll: number }>({
    pitch: 0,
    yaw: 0,
    roll: 0,
  });

  useEffect(() => {
    switch (pose) {
      case "right":
        // Menoleh ke Kanan (+25° s/d +30°)
        targetRotationRef.current = { pitch: 0.02, yaw: 0.52, roll: -0.03 };
        break;
      case "left":
        // Menoleh ke Kiri (-25° s/d -30°)
        targetRotationRef.current = { pitch: 0.02, yaw: -0.52, roll: 0.03 };
        break;
      case "up":
        // Mendongak ke Atas (+15° s/d +18°)
        targetRotationRef.current = { pitch: -0.30, yaw: 0, roll: 0 };
        break;
      case "down":
        // Menunduk ke Bawah (-15° s/d -18°)
        targetRotationRef.current = { pitch: 0.28, yaw: 0, roll: 0 };
        break;
      case "center":
      default:
        // Menghadap Lurus ke Depan
        targetRotationRef.current = { pitch: 0, yaw: 0, roll: 0 };
        break;
    }
  }, [pose]);

  // Three.js Scene Setup & Photorealistic 3D Human Head Loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let isDestroyed = false;

    const width = container.clientWidth || 260;
    const height = container.clientHeight || 260;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.set(0, 0, 3.2);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 3. Cinematic Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.8);
    keyLight.position.set(2.5, 3.0, 3.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbeafe, 0.95);
    fillLight.position.set(-2.5, 1.5, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimLight.position.set(0, 2.5, -2.5);
    scene.add(rimLight);

    const bottomBounce = new THREE.DirectionalLight(0xffedd5, 0.4);
    bottomBounce.position.set(0, -2.5, 1.0);
    scene.add(bottomBounce);

    // 4. Head Model Pivot Group
    const headPivot = new THREE.Group();
    scene.add(headPivot);

    const loader = new GLTFLoader();
    const texLoader = new THREE.TextureLoader();

    setIsLoadingModel(true);

    // Load Primary Photorealistic 3D Human Head Scan
    loader.load(
      "/models/LeePerrySmith.glb",
      (gltf) => {
        if (isDestroyed) return;
        setIsLoadingModel(false);

        const model = gltf.scene;

        // Realistic PBR Texture Mapping with Tangent Normal Bump
        const diffuseMap = texLoader.load("/models/Map-COL.jpg");
        const normalMap = texLoader.load("/models/Infinite-Level_02_Tangent_SmoothUV.jpg");
        diffuseMap.colorSpace = THREE.SRGBColorSpace;

        const skinMat = new THREE.MeshStandardMaterial({
          map: diffuseMap,
          normalMap: normalMap,
          normalScale: new THREE.Vector2(0.85, 0.85),
          roughness: 0.60,
          metalness: 0.05,
        });

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = skinMat;
          }
        });

        model.scale.set(0.24, 0.24, 0.24);
        model.position.set(0, -0.15, 0);

        headPivot.add(model);
      },
      undefined,
      (err) => {
        console.warn("GLB load notice, using fallback:", err);
        setIsLoadingModel(false);
      }
    );

    // 5. Smooth Lerp Animation Loop with Natural Idle Micro-Breathing
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle natural idle micro-motion
      const idleYaw = Math.sin(elapsedTime * 1.2) * 0.015;
      const idlePitch = Math.cos(elapsedTime * 1.5) * 0.01;

      // Smooth interpolation (lerp) toward target rotation
      const target = targetRotationRef.current;
      headPivot.rotation.y = THREE.MathUtils.lerp(headPivot.rotation.y, target.yaw + idleYaw, 0.1);
      headPivot.rotation.x = THREE.MathUtils.lerp(headPivot.rotation.x, target.pitch + idlePitch, 0.1);
      headPivot.rotation.z = THREE.MathUtils.lerp(headPivot.rotation.z, target.roll, 0.1);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || 260;
      const newHeight = container.clientHeight || 260;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDestroyed = true;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, []);

  const getPoseLabel = () => {
    switch (pose) {
      case "center":
        return "Center (0°)";
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
      {/* Top Bar: Unified 3D Model Guide Status & Pose Angle Telemetry */}
      <div className="w-full flex items-center justify-between px-1 mb-2 z-30">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-sky-400 shadow-sm">
          <span className="text-xs">👤</span>
          <span className="text-[10px] font-bold tracking-wider uppercase font-mono">Model 3D Interaktif</span>
        </div>

        {/* Dynamic Pose Angle Badge */}
        <span className="text-[9px] font-mono font-bold px-2 py-1 rounded-md bg-slate-800/90 text-sky-300 border border-sky-500/30">
          {getPoseLabel()}
        </span>
      </div>

      {/* Main 3D Canvas Container */}
      <div
        className={`relative w-full aspect-square max-w-[280px] rounded-xl overflow-hidden bg-slate-950 border transition-all duration-500 flex items-center justify-center ${theme.border}`}
      >
        {/* Three.js WebGL Container */}
        <div ref={containerRef} className="w-full h-full" />

        {/* Loading Spinner Indicator */}
        {isLoadingModel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-30">
            <div className="w-8 h-8 rounded-full border-2 border-sky-500 border-t-transparent animate-spin mb-2" />
            <span className="text-[9px] font-mono text-sky-300 uppercase tracking-wider">
              Memuat Model 3D...
            </span>
          </div>
        )}

        {/* Dynamic Biometric Storyboard Reticle Overlay */}
        {showReticle && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
            <div
              className="relative w-48 h-48 rounded-full border-2 border-dashed transition-all duration-300 flex items-center justify-center"
              style={{ borderColor: theme.color, boxShadow: `0 0 20px ${theme.color}33` }}
            >
              {/* Feature Crosshairs */}
              <div className="absolute inset-x-0 h-px bg-white/20" />
              <div className="absolute inset-y-0 w-px bg-white/20" />

              {/* Dynamic Directional Guidance Arrows */}
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
        )}

        {/* Tech Corner Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-sky-400/50 pointer-events-none" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-sky-400/50 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-sky-400/50 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-sky-400/50 pointer-events-none" />
      </div>

      {/* Bottom Status Feedback Badge */}
      <div className="w-full mt-2 z-10">
        <div
          className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-mono font-bold uppercase tracking-wider transition-all duration-300 text-center ${theme.badgeBg}`}
        >
          <span
            className="w-2 h-2 rounded-full animate-ping shrink-0"
            style={{ backgroundColor: theme.color }}
          />
          <span className="truncate">{theme.label}</span>
        </div>
      </div>
    </div>
  );
};

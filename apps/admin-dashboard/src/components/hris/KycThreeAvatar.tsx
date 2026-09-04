"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface KycThreeAvatarProps {
  pose: "center" | "right" | "left" | "up" | "down";
  status?: "waiting" | "aligned" | "occluded" | "captured" | "not_centered";
  gender?: "female" | "male";
  onGenderChange?: (gender: "female" | "male") => void;
  className?: string;
  showReticle?: boolean;
}

export const KycThreeAvatar: React.FC<KycThreeAvatarProps> = ({
  pose,
  status = "waiting",
  gender: initialGender = "female",
  onGenderChange,
  className = "",
  showReticle = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeGender, setActiveGender] = useState<"female" | "male">(initialGender);

  // Sync gender with props if provided
  useEffect(() => {
    setActiveGender(initialGender);
  }, [initialGender]);

  const handleGenderToggle = (newGender: "female" | "male") => {
    setActiveGender(newGender);
    if (onGenderChange) {
      onGenderChange(newGender);
    }
  };

  // Target rotations based on pose
  const targetRotationRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    switch (pose) {
      case "right":
        // Turn Head to the Right (~+32°)
        // In mirrored/selfie view, to turn right means rotating yaw to positive
        targetRotationRef.current = { x: 0.02, y: 0.56, z: -0.04 };
        break;
      case "left":
        // Turn Head to the Left (~-32°)
        targetRotationRef.current = { x: 0.02, y: -0.56, z: 0.04 };
        break;
      case "up":
        // Tilt Head Upward (~+22°)
        targetRotationRef.current = { x: -0.38, y: 0, z: 0 };
        break;
      case "down":
        // Tilt Head Downward (~-20°)
        targetRotationRef.current = { x: 0.35, y: 0, z: 0 };
        break;
      case "center":
      default:
        // Center Frontal
        targetRotationRef.current = { x: 0, y: 0, z: 0 };
        break;
    }
  }, [pose]);

  // Three.js Scene Setup and Animation Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const width = container.clientWidth || 240;
    const height = container.clientHeight || 240;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.25, 4.2);

    // 2. WebGL Renderer with Anti-Aliasing & Alpha
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

    // 3. Lighting Setup (Soft Studio Lighting with Rim Light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xbae6fd, 0.7);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    const bottomBounceLight = new THREE.DirectionalLight(0xffedd5, 0.3);
    bottomBounceLight.position.set(0, -3, 1);
    scene.add(bottomBounceLight);

    // 4. Materials
    const skinTone = activeGender === "female" ? 0xfcdac2 : 0xf0cbb1;
    const skinMaterial = new THREE.MeshStandardMaterial({
      color: skinTone,
      roughness: 0.55,
      metalness: 0.05,
    });

    const blushMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4a49c,
      roughness: 0.7,
      transparent: true,
      opacity: 0.45,
    });

    const eyeWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
    });

    const irisColor = activeGender === "female" ? 0x2e1e12 : 0x1e293b;
    const irisMaterial = new THREE.MeshStandardMaterial({
      color: irisColor,
      roughness: 0.2,
    });

    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x050505 });
    const glintMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const hairColor = activeGender === "female" ? 0x1f1b1c : 0x1e1e24;
    const hairMaterial = new THREE.MeshStandardMaterial({
      color: hairColor,
      roughness: 0.4,
      metalness: 0.15,
    });

    const lipsMaterial = new THREE.MeshStandardMaterial({
      color: activeGender === "female" ? 0xde7079 : 0xcc7b79,
      roughness: 0.45,
    });

    // Torso / Clothing Materials (Storyboard Blue Sweater / Blazer)
    const shirtColor = activeGender === "female" ? 0x2563eb : 0x1e3a8a;
    const shirtMaterial = new THREE.MeshStandardMaterial({
      color: shirtColor,
      roughness: 0.7,
    });

    const collarMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.5,
    });

    // 5. Build 3D Avatar Structure
    const avatarRoot = new THREE.Group();
    scene.add(avatarRoot);

    // ---- Torso & Shoulders (Fixed Base with Subtitle Breathing) ----
    const torsoGroup = new THREE.Group();
    avatarRoot.add(torsoGroup);

    // Torso Body Mesh
    const torsoGeometry = new THREE.CylinderGeometry(0.85, 1.25, 1.2, 32);
    const torsoMesh = new THREE.Mesh(torsoGeometry, shirtMaterial);
    torsoMesh.position.set(0, -1.05, 0);
    torsoMesh.scale.set(1.4, 1.0, 0.75); // Flatter torso front-to-back
    torsoGroup.add(torsoMesh);

    // Shoulders Smooth Caps
    const leftShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 24), shirtMaterial);
    leftShoulder.position.set(-1.05, -0.75, 0);
    leftShoulder.scale.set(1.1, 0.8, 0.8);
    torsoGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 24), shirtMaterial);
    rightShoulder.position.set(1.05, -0.75, 0);
    rightShoulder.scale.set(1.1, 0.8, 0.8);
    torsoGroup.add(rightShoulder);

    // Collar Detail
    const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.06, 16, 32), collarMaterial);
    collarMesh.position.set(0, -0.42, 0.05);
    collarMesh.rotation.x = Math.PI / 2 - 0.2;
    torsoGroup.add(collarMesh);

    // Neck Base
    const neckGeometry = new THREE.CylinderGeometry(0.3, 0.36, 0.55, 32);
    const neckMesh = new THREE.Mesh(neckGeometry, skinMaterial);
    neckMesh.position.set(0, -0.18, 0.02);
    torsoGroup.add(neckMesh);

    // ---- Head Group (Articulated Pivot for Dynamic Neck Turning) ----
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 0.08, 0); // Pivot at the top of the neck joint
    avatarRoot.add(headPivot);

    // Head Cranium
    const headGeometry = new THREE.SphereGeometry(0.72, 32, 32);
    const headMesh = new THREE.Mesh(headGeometry, skinMaterial);
    headMesh.position.set(0, 0.42, 0);
    headMesh.scale.set(0.95, 1.12, 1.02);
    headPivot.add(headMesh);

    // Jaw & Chin Taper
    const jawGeometry = new THREE.ConeGeometry(0.48, 0.45, 24);
    const jawMesh = new THREE.Mesh(jawGeometry, skinMaterial);
    jawMesh.position.set(0, 0.06, 0.22);
    jawMesh.rotation.x = Math.PI;
    jawMesh.scale.set(1.0, 1.0, 0.7);
    headPivot.add(jawMesh);

    // Cheeks Blush
    const leftBlush = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), blushMaterial);
    leftBlush.position.set(-0.42, 0.32, 0.62);
    leftBlush.scale.set(1, 0.6, 0.3);
    headPivot.add(leftBlush);

    const rightBlush = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), blushMaterial);
    rightBlush.position.set(0.42, 0.32, 0.62);
    rightBlush.scale.set(1, 0.6, 0.3);
    headPivot.add(rightBlush);

    // Ears
    const earGeometry = new THREE.SphereGeometry(0.16, 16, 16);
    const leftEar = new THREE.Mesh(earGeometry, skinMaterial);
    leftEar.position.set(-0.7, 0.42, -0.05);
    leftEar.scale.set(0.45, 1.0, 0.8);
    leftEar.rotation.y = -0.2;
    headPivot.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, skinMaterial);
    rightEar.position.set(0.7, 0.42, -0.05);
    rightEar.scale.set(0.45, 1.0, 0.8);
    rightEar.rotation.y = 0.2;
    headPivot.add(rightEar);

    // Nose
    const noseGeometry = new THREE.ConeGeometry(0.08, 0.22, 16);
    const noseMesh = new THREE.Mesh(noseGeometry, skinMaterial);
    noseMesh.position.set(0, 0.35, 0.72);
    noseMesh.rotation.x = -0.2;
    headPivot.add(noseMesh);

    const noseTip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), skinMaterial);
    noseTip.position.set(0, 0.28, 0.74);
    headPivot.add(noseTip);

    // Lips
    const upperLip = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.045, 0.18, 16), lipsMaterial);
    upperLip.position.set(0, 0.16, 0.66);
    upperLip.rotation.z = Math.PI / 2;
    headPivot.add(upperLip);

    const lowerLip = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), lipsMaterial);
    lowerLip.position.set(0, 0.11, 0.65);
    lowerLip.scale.set(1.4, 0.7, 0.8);
    headPivot.add(lowerLip);

    // Eyes Group
    const createEye = (isLeft: boolean) => {
      const eyeGroup = new THREE.Group();
      const xPos = isLeft ? -0.26 : 0.26;

      // Eyeball
      const eyeball = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 24), eyeWhiteMaterial);
      eyeGroup.add(eyeball);

      // Iris
      const iris = new THREE.Mesh(new THREE.SphereGeometry(0.065, 20, 20), irisMaterial);
      iris.position.set(0, 0, 0.07);
      eyeGroup.add(iris);

      // Pupil
      const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 16), pupilMaterial);
      pupil.position.set(0, 0, 0.095);
      eyeGroup.add(pupil);

      // Eye Glint (Shiny Highlight)
      const glint = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 12), glintMaterial);
      glint.position.set(0.02, 0.025, 0.11);
      eyeGroup.add(glint);

      // Eyebrow
      const eyebrow = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.025, 0.22, 12),
        hairMaterial
      );
      eyebrow.position.set(0, 0.16, 0.04);
      eyebrow.rotation.z = isLeft ? 0.15 : -0.15;
      eyebrow.rotation.x = 0.2;
      eyeGroup.add(eyebrow);

      eyeGroup.position.set(xPos, 0.44, 0.6);
      return eyeGroup;
    };

    const leftEye = createEye(true);
    const rightEye = createEye(false);
    headPivot.add(leftEye);
    headPivot.add(rightEye);

    // Hair Group (Tailored for Gender Consistency)
    const hairGroup = new THREE.Group();
    headPivot.add(hairGroup);

    if (activeGender === "female") {
      // Modern Bob Haircut with Bangs & Side Length (Storyboard Character)
      // Top Dome
      const hairTop = new THREE.Mesh(new THREE.SphereGeometry(0.76, 32, 32), hairMaterial);
      hairTop.position.set(0, 0.48, -0.04);
      hairTop.scale.set(1.04, 1.12, 1.08);
      hairGroup.add(hairTop);

      // Bangs Fringe
      const bangs = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 0.25, 16), hairMaterial);
      bangs.position.set(0, 0.88, 0.58);
      bangs.rotation.x = -0.4;
      bangs.scale.set(1.3, 0.8, 0.8);
      hairGroup.add(bangs);

      // Left Side Bob Curvature
      const leftBob = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.45, 0.75, 20), hairMaterial);
      leftBob.position.set(-0.62, 0.32, 0.12);
      leftBob.rotation.z = 0.2;
      leftBob.scale.set(0.65, 1.0, 1.0);
      hairGroup.add(leftBob);

      // Right Side Bob Curvature
      const rightBob = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.45, 0.75, 20), hairMaterial);
      rightBob.position.set(0.62, 0.32, 0.12);
      rightBob.rotation.z = -0.2;
      rightBob.scale.set(0.65, 1.0, 1.0);
      hairGroup.add(rightBob);
    } else {
      // Modern Clean Male Crop Haircut with Textured Volume
      const hairMale = new THREE.Mesh(new THREE.SphereGeometry(0.76, 32, 32), hairMaterial);
      hairMale.position.set(0, 0.54, -0.05);
      hairMale.scale.set(1.0, 1.15, 1.05);
      hairGroup.add(hairMale);

      // Male Quiff Front
      const maleQuiff = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.4, 0.28, 16), hairMaterial);
      maleQuiff.position.set(0, 0.95, 0.48);
      maleQuiff.rotation.x = -0.3;
      maleQuiff.scale.set(1.4, 0.7, 0.7);
      hairGroup.add(maleQuiff);

      // Subtle Sideburns
      const leftBurn = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 0.12), hairMaterial);
      leftBurn.position.set(-0.7, 0.35, 0.15);
      hairGroup.add(leftBurn);

      const rightBurn = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.25, 0.12), hairMaterial);
      rightBurn.position.set(0.7, 0.35, 0.15);
      hairGroup.add(rightBurn);
    }

    // 6. Smooth Animation Loop with Damped LERP Interpolation
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped lerp towards target pose rotation
      const lerpSpeed = 7.5 * delta;
      headPivot.rotation.y += (targetRotationRef.current.y - headPivot.rotation.y) * lerpSpeed;
      headPivot.rotation.x += (targetRotationRef.current.x - headPivot.rotation.x) * lerpSpeed;
      headPivot.rotation.z += (targetRotationRef.current.z - headPivot.rotation.z) * lerpSpeed;

      // Subtle organic breathing micro-animation (alive idle state)
      const breathing = Math.sin(elapsedTime * 1.8) * 0.015;
      torsoGroup.position.y = breathing;
      headPivot.position.y = 0.08 + breathing * 0.6;

      // Subtle dynamic reaction according to status
      if (status === "aligned") {
        // Subtle affirmative nod when aligned
        const nod = Math.sin(elapsedTime * 6) * 0.04;
        headPivot.rotation.x = targetRotationRef.current.x + nod;
      } else if (status === "occluded") {
        // Subtle warning alert wiggle
        const wiggle = Math.sin(elapsedTime * 8) * 0.035;
        headPivot.rotation.z = wiggle;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 240;
      const h = container.clientHeight || 240;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeGender, status]);

  // Directional Guide Arrow matching Storyboard (Image 3)
  const renderGuideReticle = () => {
    if (!showReticle) return null;

    const ringColor =
      status === "aligned"
        ? "#10b981"
        : status === "occluded"
        ? "#ef4444"
        : status === "captured"
        ? "#06b6d4"
        : "#22c55e"; // Default storyboard green

    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
        {/* Circular Target Ring matching Storyboard */}
        <div
          className="relative w-48 h-48 rounded-full border-2 border-dashed transition-all duration-300 flex items-center justify-center"
          style={{ borderColor: ringColor, boxShadow: `0 0 20px ${ringColor}33` }}
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
                  stroke={ringColor}
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
                  stroke={ringColor}
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
                  stroke={ringColor}
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
                  stroke={ringColor}
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
    );
  };

  return (
    <div className={`relative flex flex-col items-center justify-between rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 border border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden p-2.5 ${className}`}>
      {/* Top Header: Model Gender Selector Tabs for 100% Consistency */}
      <div className="w-full flex items-center justify-between px-1 mb-1.5 z-30">
        <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            onClick={() => handleGenderToggle("female")}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
              activeGender === "female"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            👩 Perempuan
          </button>
          <button
            type="button"
            onClick={() => handleGenderToggle("male")}
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all ${
              activeGender === "male"
                ? "bg-cyan-600 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            👨 Laki-Laki
          </button>
        </div>

        {/* Dynamic Pose Angle Badge */}
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-sky-300 border border-sky-500/30">
          {pose === "center"
            ? "Center (0°)"
            : pose === "right"
            ? "Kanan (+25°)"
            : pose === "left"
            ? "Kiri (-25°)"
            : pose === "up"
            ? "Atas (+15°)"
            : "Bawah (-15°)"}
        </span>
      </div>

      {/* Main 3D WebGL Canvas Area */}
      <div className="relative w-full aspect-square max-w-[260px] min-h-[220px] rounded-xl overflow-hidden bg-radial from-slate-900 to-slate-950 flex items-center justify-center">
        {/* Three.js Canvas Container */}
        <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Storyboard Reticle and Directional Guide Arrows */}
        {renderGuideReticle()}

        {/* Tech Corner Brackets */}
        <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400/40 pointer-events-none" />
        <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-sky-400/40 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-sky-400/40 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-sky-400/40 pointer-events-none" />
      </div>

      {/* Model State Pill Footer */}
      <div className="mt-2 text-center w-full z-10">
        <div
          className={`inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase border transition-all duration-300 w-full truncate ${
            status === "aligned"
              ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-300"
              : status === "occluded"
              ? "bg-red-950/90 border-red-500/80 text-red-300"
              : status === "captured"
              ? "bg-cyan-950/80 border-cyan-500/60 text-cyan-300"
              : "bg-slate-900/80 border-sky-500/50 text-sky-300"
          }`}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{
              backgroundColor:
                status === "aligned"
                  ? "#10b981"
                  : status === "occluded"
                  ? "#ef4444"
                  : status === "captured"
                  ? "#06b6d4"
                  : "#38bdf8",
            }}
          />
          <span className="truncate">
            {status === "aligned"
              ? "✓ SUDUT ROTASI TEPAT"
              : status === "occluded"
              ? "✋ TERHALANG OBJEK / TANGAN"
              : status === "captured"
              ? "✓ POSE SELESAI TERSIMPAN"
              : "IKUTI ARAH TOLEHAN MODEL 3D"}
          </span>
        </div>
      </div>
    </div>
  );
};

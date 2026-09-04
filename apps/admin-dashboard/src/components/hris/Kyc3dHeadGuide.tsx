"use client";
import React, { useState } from "react";
import { KycThreeAvatar } from "./KycThreeAvatar";

export interface Kyc3dHeadGuideProps {
  pose: "center" | "right" | "left" | "up" | "down";
  status: "waiting" | "aligned" | "occluded" | "captured" | "not_centered";
  occlusionZone?: "chin" | "forehead" | "object" | "phone" | "none";
  className?: string;
}

export const Kyc3dHeadGuide: React.FC<Kyc3dHeadGuideProps> = ({
  pose,
  status,
  occlusionZone = "none",
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <KycThreeAvatar
        pose={pose}
        status={status}
        occlusionZone={occlusionZone}
        className="w-full"
      />
    </div>
  );
};

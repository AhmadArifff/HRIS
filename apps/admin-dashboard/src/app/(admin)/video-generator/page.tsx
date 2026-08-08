import { Metadata } from "next";
import React from "react";
import { VideoGeneratorLayout } from "@/components/video-generator/VideoGeneratorLayout";

export const metadata: Metadata = {
  title: "AI Video Generator | AdminArif.Dev",
  description: "AI Video Generator page for AdminArif.Dev",
};

export default function VideoGeneratorPage() {
  return <VideoGeneratorLayout />;
}

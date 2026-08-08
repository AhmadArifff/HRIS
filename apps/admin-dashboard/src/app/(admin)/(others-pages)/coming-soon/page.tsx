import { Metadata } from "next";
import React from "react";
import { ComingSoonLayout } from "@/components/coming-soon/ComingSoonLayout";

export const metadata: Metadata = {
  title: "Coming Soon | AdminArif.Dev",
  description: "Coming Soon page for AdminArif.Dev",
};

export default function ComingSoonPage() {
  return <ComingSoonLayout />;
}

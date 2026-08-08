import { Metadata } from "next";
import React from "react";
import { VectorMapLayout } from "@/components/maps/VectorMapLayout";

export const metadata: Metadata = {
  title: "Vector Map | AdminArif.Dev",
  description: "Vector Map page for AdminArif.Dev",
};

export default function VectorMapPage() {
  return <VectorMapLayout />;
}

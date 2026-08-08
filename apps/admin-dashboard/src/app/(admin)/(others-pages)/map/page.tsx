import { Metadata } from "next";
import React from "react";
import { MapsLayout } from "@/components/maps/MapsLayout";

export const metadata: Metadata = {
  title: "Maps | AdminArif.Dev",
  description: "Maps page for AdminArif.Dev",
};

export default function MapsPage() {
  return <MapsLayout />;
}

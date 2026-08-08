import React from "react";
import { ShiftTable } from "@/components/hris/ShiftTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal & Master Shift | HRIS Enterprise",
  description: "Kelola Master Shift Kerja dan Plotting Jadwal Karyawan",
};

export default function ShiftPage() {
  return (
    <div className="space-y-6">
      <ShiftTable />
    </div>
  );
}

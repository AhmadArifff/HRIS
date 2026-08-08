import React from "react";
import { ClockIn } from "@/components/hris/ClockIn";

export default function AttendancePage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <ClockIn />
    </div>
  );
}

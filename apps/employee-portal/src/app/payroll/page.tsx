import React from "react";
import { PayslipList } from "@/components/hris/PayslipList";

export default function PayrollPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen dark:bg-gray-900">
      <PayslipList />
    </div>
  );
}

"use client";
import React from "react";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";

const payslipData = [
  { id: "PAY-2607", month: "Juli 2026", date: "25 Jul 2026", amount: "Rp 12.500.000", status: "Dibayar" },
  { id: "PAY-2606", month: "Juni 2026", date: "25 Jun 2026", amount: "Rp 12.500.000", status: "Dibayar" },
  { id: "PAY-2605", month: "Mei 2026", date: "25 Mei 2026", amount: "Rp 14.000.000", status: "Dibayar" }, // Bonus THR
];

export const PayslipList = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6 max-w-4xl mx-auto">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Riwayat Slip Gaji Anda
      </h3>
      
      <div className="flex flex-col gap-4">
        {payslipData.map((slip) => (
          <div key={slip.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
            <div className="flex items-center gap-4 mb-3 sm:mb-0">
              <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center text-brand-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white/90">{slip.month}</h4>
                <p className="text-sm text-gray-500">Dibayarkan pada {slip.date}</p>
              </div>
            </div>
            
            <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-6">
              <div className="text-left sm:text-right">
                <p className="font-bold text-gray-800 dark:text-white/90">{slip.amount}</p>
                <Badge color="success">{slip.status}</Badge>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

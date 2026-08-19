"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/FaceAuthGuard";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { timeRemainingFormatted, employeeInfo, logout } = useAuth();

  const navLinks = [
    { name: "Dashboard", href: "/" },
    { name: "Absensi", href: "/attendance" },
    { name: "Cuti", href: "/leave" },
    { name: "Slip Gaji", href: "/payroll" },
    { name: "Evaluasi KPI", href: "/performance" },
    { name: "Reimbursement", href: "/reimbursement" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/90 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-500/20">
              H
            </div>
            <div>
              <span className="font-extrabold text-gray-900 dark:text-white text-base block leading-tight">
                HRISCorp<span className="text-brand-500">.dev</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium block">
                Employee Self-Service (ESS)
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-brand-500/10 text-brand-500 dark:bg-brand-500/20 dark:text-brand-400 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Session Countdown & User Info */}
          <div className="flex items-center gap-3">
            {/* Live Session Timer Badge */}
            {timeRemainingFormatted && (
              <div
                title="Sisa masa berlaku token sesi pindaian wajah (PRD §7.1 & §8.2)"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>⏱️ {timeRemainingFormatted}</span>
              </div>
            )}

            {/* Employee Name */}
            <div className="hidden lg:block text-right">
              <span className="block text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                {employeeInfo.name}
              </span>
              <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                {employeeInfo.position} ({employeeInfo.id})
              </span>
            </div>

            {/* Avatar & Lock Button */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                BS
              </div>
              <button
                type="button"
                onClick={logout}
                title="Kunci Sesi / Pindai Ulang Wajah"
                className="p-2 rounded-xl text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:text-gray-400 dark:hover:text-rose-400 dark:hover:bg-rose-950/40 transition text-xs font-semibold flex items-center gap-1 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="hidden sm:inline">Kunci Akses</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Links Bar */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium ${
                    isActive
                      ? "bg-brand-500 text-white font-semibold"
                      : "text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {timeRemainingFormatted && (
            <span className="shrink-0 text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 ml-2">
              ⏱️ {timeRemainingFormatted}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header: React.FC = () => {
  const pathname = usePathname();

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

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                Budi Santoso
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400">
                Software Engineer
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              BS
            </div>
          </div>
        </div>

        {/* Mobile Nav Links Bar */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-gray-100 dark:border-gray-800 no-scrollbar">
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
      </div>
    </header>
  );
};

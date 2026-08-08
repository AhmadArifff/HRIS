"use client";
import React from "react";
import Image from "next/image";
import { ComingSoonCountdown } from "./ComingSoonCountdown";
import { ComingSoonSubscribeForm } from "./ComingSoonSubscribeForm";
import { ComingSoonSocialLinks } from "./ComingSoonSocialLinks";

export const ComingSoonLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-gray-50/50 via-white to-gray-50/80 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 overflow-hidden">
      {/* Background Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto text-center py-12">
        {/* Brand Logo */}
        <div className="inline-flex items-center justify-center gap-2 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-theme-xs">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M4 4h4v16H4V4zm6 6h4v10h-4V10zm6-4h4v14h-4V6z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            AdminArif
          </span>
        </div>

        {/* Heading & Description */}
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl md:text-5xl tracking-tight">
          Coming Soon
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
          Our website is currently under construction, enter your email id to get latest updates and notifications about the website.
        </p>

        {/* Live Countdown Timer */}
        <ComingSoonCountdown />

        {/* Subscription Form */}
        <ComingSoonSubscribeForm />

        {/* Social Links Footer */}
        <ComingSoonSocialLinks />
      </div>
    </div>
  );
};

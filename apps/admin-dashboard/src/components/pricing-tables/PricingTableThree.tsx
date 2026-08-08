"use client";
import React from "react";

export const PricingTableThree: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Pricing Table 3
        </h3>
      </div>

      <div className="p-6 lg:p-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
          {/* Card 1: Personal */}
          <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900/40">
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Personal</h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Perfect plan for Starters
              </p>

              <div className="mt-4">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Free</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For a Lifetime</p>
              </div>

              <button
                type="button"
                className="mt-6 w-full rounded-xl border border-gray-300 bg-white py-2.5 text-xs font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                Current Plan
              </button>

              <div className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Unlimited Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Share with 5 team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Sync across devices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Professional */}
          <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900/40">
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Professional</h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                For users who want to do more
              </p>

              <div className="mt-4">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">$99.00</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">/year</p>
              </div>

              <button
                type="button"
                onClick={() => alert("Try Professional for free")}
                className="mt-6 w-full rounded-xl bg-brand-500 py-2.5 text-xs font-medium text-white hover:bg-brand-600 transition"
              >
                Try for Free
              </button>

              <div className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Unlimited Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Share with 5 team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Sync across devices</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>30 days version history</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Team (Solid Blue Highlighted Card) */}
          <div className="relative flex flex-col justify-between rounded-2xl bg-brand-500 p-6 text-white shadow-xl dark:bg-brand-600">
            {/* Recommended Badge */}
            <span className="absolute top-4 right-4 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              Recommended
            </span>

            <div>
              <h4 className="text-lg font-bold text-white">Team</h4>
              <p className="mt-1 text-xs text-white/80">
                Your entire team in one place
              </p>

              <div className="mt-4">
                <span className="text-3xl font-extrabold text-white">$299</span>
                <p className="text-xs text-white/80 mt-1">/year</p>
              </div>

              <button
                type="button"
                onClick={() => alert("Try Team for free")}
                className="mt-6 w-full rounded-xl bg-white py-2.5 text-xs font-bold text-brand-600 hover:bg-gray-50 transition"
              >
                Try for Free
              </button>

              <div className="mt-6 space-y-3 text-xs text-white/90 border-t border-white/20 pt-6">
                <div className="flex items-center gap-2">
                  <span className="font-bold">&#10003;</span>
                  <span>Unlimited Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">&#10003;</span>
                  <span>Share with 5 team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">&#10003;</span>
                  <span>Sync across devices</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">&#10003;</span>
                  <span>Sharing permissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">&#10003;</span>
                  <span>Admin tools</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Enterprise */}
          <div className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900/40">
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Enterprise</h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Run your company on your terms
              </p>

              <div className="mt-4">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">Custom</span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reach out for a quote</p>
              </div>

              <button
                type="button"
                onClick={() => alert("Contact Sales for Enterprise")}
                className="mt-6 w-full rounded-xl bg-brand-500 py-2.5 text-xs font-medium text-white hover:bg-brand-600 transition"
              >
                Try for Free
              </button>

              <div className="mt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800 pt-6">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Unlimited Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Share with 5 team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Sync across devices</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Sharing permissions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>User provisioning (SCIM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-500 font-bold">&#10003;</span>
                  <span>Advanced security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

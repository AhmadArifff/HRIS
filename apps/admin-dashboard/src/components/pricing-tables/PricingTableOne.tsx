"use client";
import React, { useState } from "react";

export const PricingTableOne: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Pricing Table 1
        </h3>
      </div>

      <div className="p-6 lg:p-10">
        {/* Title & Toggle */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Flexible Plans Tailored to Fit Your Unique Needs!
          </h2>

          <div className="mt-6 inline-flex items-center rounded-xl bg-gray-100 p-1.5 dark:bg-gray-800/80">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-theme-xs dark:bg-gray-900 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annually")}
              className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
                billingCycle === "annually"
                  ? "bg-white text-gray-900 shadow-theme-xs dark:bg-gray-900 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center">
          {/* Card 1: Starter */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900/40">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Starter</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    {billingCycle === "monthly" ? "$5.00" : "$48.00"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  For solo designers & freelancers
                </p>
              </div>
              <span className="text-sm text-gray-400 line-through font-semibold">$12.00</span>
            </div>

            <div className="my-6 border-t border-gray-100 dark:border-gray-800 pt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>5 website</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>500 MB Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Unlimited Sub-Domain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>3 Custom Domain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Free SSL Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Unlimited Traffic</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Selected Starter Plan")}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 transition dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Choose Starter
            </button>
          </div>

          {/* Card 2: Medium (Featured Dark Card) */}
          <div className="rounded-2xl bg-slate-900 p-6 lg:p-8 text-white shadow-xl dark:bg-gray-800 dark:border dark:border-gray-700">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-white">Medium</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-white">
                    {billingCycle === "monthly" ? "$10.99" : "$99.00"}
                  </span>
                  <span className="text-xs text-gray-400">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  For working on commercial projects
                </p>
              </div>
              <span className="text-sm text-gray-400 line-through font-semibold">$30.00</span>
            </div>

            <div className="my-6 border-t border-gray-800 pt-6 space-y-3 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                <span>10 website</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                <span>1 GB Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                <span>Unlimited Sub-Domain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                <span>5 Custom Domain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                <span>Free SSL Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">&#10003;</span>
                <span>Unlimited Traffic</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Selected Medium Plan")}
              className="w-full rounded-xl bg-brand-500 py-3 text-sm font-medium text-white hover:bg-brand-600 transition"
            >
              Choose Starter
            </button>
          </div>

          {/* Card 3: Large */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900/40">
            <div className="flex items-baseline justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Large</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                    {billingCycle === "monthly" ? "$15.00" : "$140.00"}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  For teams larger than 5 members
                </p>
              </div>
              <span className="text-sm text-gray-400 line-through font-semibold">$59.00</span>
            </div>

            <div className="my-6 border-t border-gray-100 dark:border-gray-800 pt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>15 website</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>10 GB Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Unlimited Sub-Domain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>10 Custom Domain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Free SSL Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Unlimited Traffic</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Selected Large Plan")}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 transition dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Choose Starter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

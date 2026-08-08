"use client";
import React from "react";

export const PricingTableTwo: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Pricing Table 2
        </h3>
      </div>

      <div className="p-6 lg:p-10">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 1: Personal */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900/40">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Personal</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">$59.00</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">/Lifetime</span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  For solo designers & freelancers
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
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
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <span className="text-gray-400 font-bold">&times;</span>
                <span>Free SSL Certificate</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <span className="text-gray-400 font-bold">&times;</span>
                <span>Unlimited Traffic</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Selected Personal Plan")}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 transition dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Choose Starter
            </button>
          </div>

          {/* Card 2: Professional (Blue Border Card) */}
          <div className="rounded-2xl border-2 border-brand-500 bg-white p-6 lg:p-8 shadow-lg dark:bg-gray-900/60">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Professional</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">$199.00</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">/Lifetime</span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  For working on commercial projects
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>

            <div className="my-6 border-t border-gray-100 dark:border-gray-800 pt-6 space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>10 website</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>1 GB Storage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Unlimited Sub-Domain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>5 Custom Domain</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-bold">&#10003;</span>
                <span>Free SSL Certificate</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <span className="text-gray-400 font-bold">&times;</span>
                <span>Unlimited Traffic</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => alert("Selected Professional Plan")}
              className="w-full rounded-xl bg-brand-500 py-3 text-sm font-medium text-white hover:bg-brand-600 transition"
            >
              Choose This Plan
            </button>
          </div>

          {/* Card 3: Enterprise */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 lg:p-8 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900/40">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white">Enterprise</h4>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white">$599.00</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">/Lifetime</span>
                </div>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  For teams larger than 5 members
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                </svg>
              </div>
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
              onClick={() => alert("Selected Enterprise Plan")}
              className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white hover:bg-slate-800 transition dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              Choose This Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

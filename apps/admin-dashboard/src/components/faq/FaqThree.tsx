"use client";
import React from "react";

export const FaqThree: React.FC = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Faq's 3
        </h3>
      </div>

      <div className="p-6 lg:p-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left Column Item 1 */}
        <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800 lg:border-b-0 lg:pb-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              &#10539;
            </span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Do I get free updates?
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et nunc ut risus imperdiet lacinia.
          </p>
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Right Column Item 1 */}
        <div className="space-y-3 pb-6 border-b border-gray-100 dark:border-gray-800 lg:border-b-0 lg:pb-0">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              &#10539;
            </span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Can I Customize AdminArif to suit my needs?
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et nunc ut risus imperdiet lacinia.
          </p>
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Left Column Item 2 */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              &#10539;
            </span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              Which license type is suitable for me?
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {/* Right Column Item 2 */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              &#10539;
            </span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              What does "Unlimited Projects" mean?
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fermentum, leo et lacinia accumsan, ligula ante hendrerit nisi, eget vulputate ante justo et justo.
          </p>
        </div>

        {/* Left Column Item 3 */}
        <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-800 lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              &#10539;
            </span>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white">
              What are the "Seats" mentioned on pricing plans?
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et nunc ut risus imperdiet lacinia.
          </p>
        </div>
      </div>
    </div>
  );
};

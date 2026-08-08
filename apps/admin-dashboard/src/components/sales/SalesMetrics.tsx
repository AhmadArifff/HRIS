"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SalesMetrics() {
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!datePickerRef.current) return;
    const fp = flatpickr(datePickerRef.current, {
      mode: "range",
      static: true,
      monthSelectorType: "static",
      dateFormat: "M d",
      defaultDate: [new Date(new Date().setDate(new Date().getDate() - 6)), new Date()],
      clickOpens: true,
      prevArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      nextArrow:
        '<svg class="stroke-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    });
    return () => {
      if (!Array.isArray(fp)) {
        fp.destroy();
      }
    };
  }, []);

  const commonOptions = {
    chart: {
      type: 'area',
      sparkline: { enabled: true },
    },
    stroke: { curve: 'smooth', width: 1.5 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.2,
        opacityTo: 0,
        stops: [0, 100]
      }
    },
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: { title: { formatter: function () { return '' } } },
      marker: { show: false }
    }
  };

  const chart1 = {
    series: [{ name: "Revenue", data: [10, 15, 20, 15, 30, 25, 35, 30] }],
    options: { ...commonOptions, colors: ['#12B76A'] }
  };
  const chart2 = {
    series: [{ name: "Sales", data: [15, 25, 20, 30, 25, 40, 35, 45] }],
    options: { ...commonOptions, colors: ['#7c3aed'] }
  };
  const chart3 = {
    series: [{ name: "Conversion", data: [2, 4, 3, 5, 4, 6, 5, 7] }],
    options: { ...commonOptions, colors: ['#38bdf8'] }
  };
  const chart4 = {
    series: [{ name: "Refund", data: [5, 4, 6, 3, 5, 2, 4, 1] }],
    options: { ...commonOptions, colors: ['#039855'] }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
      <div className="mb-5 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="mb-1 text-xl font-semibold text-gray-800 dark:text-white/90">Sales Dashboard</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track revenue, performance, and sales growth in real-time</p>
        </div>
        <div className="flex items-center gap-3 sm:justify-end lg:flex-row">
          <div className="relative hidden xl:inline-flex items-center">
            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-3 lg:top-1/2 lg:translate-x-0 lg:-translate-y-1/2 size-5 text-gray-500 dark:text-gray-400 pointer-events-none z-10" width="1em" height="1em" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 2C8.41421 2 8.75 2.33579 8.75 2.75V3.75H15.25V2.75C15.25 2.33579 15.5858 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V9V19C20.75 20.2426 19.7426 21.25 18.5 21.25H5.5C4.25736 21.25 3.25 20.2426 3.25 19V9V6C3.25 4.75736 4.25736 3.75 5.5 3.75H7.25V2.75C7.25 2.33579 7.58579 2 8 2ZM8 5.25H5.5C5.08579 5.25 4.75 5.58579 4.75 6V8.25H19.25V6C19.25 5.58579 18.9142 5.25 18.5 5.25H16H8ZM19.25 9.75H4.75V19C4.75 19.4142 5.08579 19.75 5.5 19.75H18.5C18.9142 19.75 19.25 19.4142 19.25 19V9.75Z" fill="currentColor"/>
            </svg>
            <input
              ref={datePickerRef}
              className="h-11 w-11 lg:w-40 lg:pl-10 lg:pr-3 lg:py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-transparent lg:text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:lg:text-gray-300 cursor-pointer"
              placeholder="Select date range"
            />
          </div>
          <button className="shadow-theme-xs inline-flex h-11 items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray-700 ring-1 ring-gray-300 transition ring-inset hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.6547 5.90384C14.6547 4.48402 13.5037 3.33301 12.0839 3.33301C10.664 3.33301 9.51304 4.48403 9.51302 5.90384M14.6547 5.90384C14.6547 7.32367 13.5037 8.47467 12.0839 8.47467C10.664 8.47467 9.51302 7.32367 9.51302 5.90384M14.6547 5.90384L17.7096 5.90381M9.51302 5.90384L2.29297 5.90381M5.34792 14.0955C5.34792 12.6757 6.49892 11.5247 7.91875 11.5247C9.33858 11.5247 10.4896 12.6757 10.4896 14.0955M5.34792 14.0955C5.34792 15.5153 6.49892 16.6663 7.91875 16.6663C9.33858 16.6663 10.4896 15.5153 10.4896 14.0955M5.34792 14.0955L2.29297 14.0955M10.4896 14.0955L17.7096 14.0955" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Filter
          </button>
          <button className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 inline-flex h-11 items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.6661 13.333V15.4163C16.6661 16.1067 16.1064 16.6663 15.4161 16.6663H4.58203C3.89168 16.6663 3.33203 16.1067 3.33203 15.4163V13.333M10.0004 3.33301L10.0004 13.333M6.14456 7.18684L9.9986 3.33525L13.8529 7.18684" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-100 p-1 dark:bg-white/3">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 xl:grid-cols-4">
          {/* Card 1 */}
          <div className="rounded-xl bg-white p-5 dark:bg-gray-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-400">Total Revenue</h3>
                <div className="mt-1.5 flex gap-1.5">
                  <p className="text-success-600 flex items-center gap-1 text-sm font-medium">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.9974 2.66602L7.9974 13.3336M4 6.66334L7.99987 2.66602L12 6.66334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    32%
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">vs last month</p>
                </div>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15.484 7.72335C15.484 6.28004 14.314 5.11 12.8707 5.11H11.8138C9.99228 5.11 8.51562 6.58666 8.51562 8.4082C8.51562 9.783 9.36841 11.0136 10.6557 11.4964L13.344 12.5046C14.6312 12.9873 15.484 14.2179 15.484 15.5927C15.484 17.4143 14.0074 18.8909 12.1858 18.8909H11.129C9.68566 18.8909 8.51562 17.7209 8.51562 16.2776M11.9996 19.2831L11.9996 21.2085M11.9996 2.79199L11.9996 4.71734" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="w-1/2 text-3xl font-semibold text-gray-800 dark:text-white/90">$10,590</h2>
              <div className="h-11 w-1/2">
                <Chart options={chart1.options as any} series={chart1.series} type="area" height="100%" width="100%" />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl bg-white p-5 dark:bg-gray-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-400">Total Sales</h3>
                <div className="mt-1.5 flex gap-1.5">
                  <p className="text-success-600 flex items-center gap-1 text-sm font-medium">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.9974 2.66602L7.9974 13.3336M4 6.66334L7.99987 2.66602L12 6.66334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    32%
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">vs last month</p>
                </div>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M4.25 8L2 8M3.5 12H2M2.75 16H2M7.91619 19.1243H19.1489C19.9166 19.1243 20.5603 18.5448 20.6407 17.7814L21.8249 6.53203C21.9181 5.64637 21.2237 4.875 20.3331 4.875H9.10039C8.33275 4.875 7.68899 5.45455 7.60863 6.21796L6.42443 17.4673C6.3312 18.3529 7.02564 19.1243 7.91619 19.1243ZM13.5391 4.875H16.2108L15.4608 9.86401H12.7891L13.5391 4.875Z" stroke="#7A5AF8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="w-1/2 text-3xl font-semibold text-gray-800 dark:text-white/90">1,320</h2>
              <div className="h-11 w-1/2">
                <Chart options={chart2.options as any} series={chart2.series} type="area" height="100%" width="100%" />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl bg-white p-5 dark:bg-gray-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-400">Conversion Rate</h3>
                <div className="mt-1.5 flex gap-1.5">
                  <p className="text-error-600 flex items-center gap-1 text-sm font-medium">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.9974 13.334L7.9974 2.66634M12 9.33666L8.00013 13.334L4 9.33666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    2.1%
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">vs last month</p>
                </div>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.752 7.37695H5.25196M15.3773 4.00098L18.75 7.37587L15.3773 10.751M5.25 16.625H18.75M8.62471 20.001L5.25196 16.6261L8.62471 13.251" stroke="#0BA5EC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="w-1/2 text-3xl font-semibold text-gray-800 dark:text-white/90">4.38%</h2>
              <div className="h-11 w-1/2">
                <Chart options={chart3.options as any} series={chart3.series} type="area" height="100%" width="100%" />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-xl bg-white p-5 dark:bg-gray-900">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-700 dark:text-gray-400">Refund Rate</h3>
                <div className="mt-1.5 flex gap-1.5">
                  <p className="text-success-600 flex items-center gap-1 text-sm font-medium">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M7.9974 2.66602L7.9974 13.3336M4 6.66334L7.99987 2.66602L12 6.66334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    0.5%
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">vs last month</p>
                </div>
              </div>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M11.9688 17.5C11.9688 17.2239 12.1926 17 12.4688 17C14.0754 17 15.5492 16.2942 16.5495 15.1762C17.6545 13.9412 18.2589 12.3023 18.2181 10.6015C18.1256 6.74537 14.887 3.59375 10.9688 3.59375H4M4 3.59375L7.5 7.09375M4 3.59375L7.5 0.09375" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.0312 6.5C12.0312 6.77614 11.8074 7 11.5312 7C9.92461 7 8.45076 7.70582 7.45053 8.82379C6.34551 10.0588 5.74109 11.6977 5.78189 13.3985C5.87445 17.2546 9.113 20.4062 13.0312 20.4062H20M20 20.4062L16.5 16.9062M20 20.4062L16.5 23.9062" stroke="#12B76A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h2 className="w-1/2 text-3xl font-semibold text-gray-800 dark:text-white/90">1.2%</h2>
              <div className="h-11 w-1/2">
                <Chart options={chart4.options as any} series={chart4.series} type="area" height="100%" width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

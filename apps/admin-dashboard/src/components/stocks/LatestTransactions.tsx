import React from "react";
import Image from "next/image";

const transactions = [
  {
    name: "Bought PYPL",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Success",
    logo: "/images/brand/brand-08.svg",
  },
  {
    name: "Bought AAPL",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Pending",
    logo: "/images/brand/brand-07.svg",
  },
  {
    name: "Sell KKST",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Success",
    logo: "/images/brand/brand-15.svg",
  },
  {
    name: "Bought FB",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Success",
    logo: "/images/brand/brand-02.svg",
  },
  {
    name: "Sell AMZN",
    date: "Nov 23, 01:00 PM",
    price: "$2,567.88",
    category: "Finance",
    status: "Failed",
    logo: "/images/brand/brand-10.svg",
  },
];

export const LatestTransactions = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-2 px-5 mb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Latest Transactions
          </h3>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <form>
            <div className="relative">
              <span className="absolute pointer-events-none -translate-y-1/2 left-4 top-1/2">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04199 9.37381C3.04199 5.87712 5.87735 3.04218 9.37533 3.04218C12.8733 3.04218 15.7087 5.87712 15.7087 9.37381C15.7087 12.8705 12.8733 15.7055 9.37533 15.7055C5.87735 15.7055 3.04199 12.8705 3.04199 9.37381ZM9.37533 1.54218C5.04926 1.54218 1.54199 5.04835 1.54199 9.37381C1.54199 13.6993 5.04926 17.2055 9.37533 17.2055C11.2676 17.2055 13.0032 16.5346 14.3572 15.4178L17.1773 18.2381C17.4702 18.531 17.945 18.5311 18.2379 18.2382C18.5308 17.9453 18.5309 17.4704 18.238 17.1775L15.4182 14.3575C16.5367 13.0035 17.2087 11.2671 17.2087 9.37381C17.2087 5.04835 13.7014 1.54218 9.37533 1.54218Z"
                    fill=""
                  ></path>
                </svg>
              </span>
              <input
                placeholder="Search..."
                className="dark:bg-gray-900 h-[42px] w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-[42px] pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                type="text"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="overflow-hidden">
        <div className="max-w-full px-5 overflow-x-auto sm:px-6 custom-scrollbar">
          <table className="min-w-full">
            <thead className="border-gray-200 border-y dark:border-gray-800">
              <tr>
                <th className="py-3 font-normal text-gray-500 whitespace-nowrap text-start text-theme-sm dark:text-gray-400">
                  Name
                </th>
                <th className="px-4 py-3 font-normal whitespace-nowrap text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Date
                </th>
                <th className="px-4 py-3 font-normal whitespace-nowrap text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Price
                </th>
                <th className="px-4 py-3 font-normal whitespace-nowrap text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Category
                </th>
                <th className="px-4 py-3 font-normal whitespace-nowrap text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {transactions.map((t, idx) => (
                <tr key={idx}>
                  <td className="py-4 dark:border-gray-800 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8">
                        <Image
                          width={32}
                          height={32}
                          alt="brand"
                          src={t.logo}
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                          {t.name}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {t.date}
                  </td>
                  <td className="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {t.price}
                  </td>
                  <td className="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {t.category}
                  </td>
                  <td className="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs ${
                        t.status === "Success"
                          ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                          : t.status === "Pending"
                          ? "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400"
                          : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

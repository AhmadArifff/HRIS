import React from "react";

const invoices = [
  {
    serialNo: "#DF429",
    closeDate: "April 28, 2016",
    user: "Jenny Wilson",
    amount: "$473.85",
    status: "Complete",
  },
  {
    serialNo: "#HTY274",
    closeDate: "October 30, 2017",
    user: "Wade Warren",
    amount: "$293.01",
    status: "Complete",
  },
  {
    serialNo: "#LKE600",
    closeDate: "May 29, 2017",
    user: "Darlene Robertson",
    amount: "$782.01",
    status: "Pending",
  },
  {
    serialNo: "#HRP447",
    closeDate: "May 20, 2015",
    user: "Arlene McCoy",
    amount: "$202.87",
    status: "Canceled",
  },
  {
    serialNo: "#WRH647",
    closeDate: "March 13, 2014",
    user: "Bessie Cooper",
    amount: "$490.51",
    status: "Complete",
  },
];

export const RecentInvoices = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Recent Invoices
        </h3>
      </div>
      <div className="custom-scrollbar overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <th className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                Serial No:
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                Close Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                User
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {invoices.map((invoice, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 text-left text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
                  {invoice.serialNo}
                </td>
                <td className="px-6 py-4 text-left text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
                  {invoice.closeDate}
                </td>
                <td className="px-6 py-4 text-left text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
                  {invoice.user}
                </td>
                <td className="px-6 py-4 text-left text-sm whitespace-nowrap text-gray-700 dark:text-gray-400">
                  {invoice.amount}
                </td>
                <td className="px-6 py-4 text-left">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs ${
                      invoice.status === "Complete"
                        ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                        : invoice.status === "Pending"
                        ? "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400"
                        : "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

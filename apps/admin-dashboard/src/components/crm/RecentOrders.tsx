import React from "react";

const ordersData = [
  {
    id: "DE124321",
    customer: {
      name: "John Doe",
      email: "johndoe@gmail.com",
      initials: "JD",
      colorClass: "bg-error-100 text-error-600",
    },
    product: "Software License",
    value: "$18,50.34",
    date: "2024-06-15",
    status: "Complete",
    statusClass:
      "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
  },
  {
    id: "DE124322",
    customer: {
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      initials: "JS",
      colorClass: "bg-orange-100 text-orange-600",
    },
    product: "Cloud Hosting",
    value: "$12,99.00",
    date: "2024-06-18",
    status: "Pending",
    statusClass:
      "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
  },
  {
    id: "DE124323",
    customer: {
      name: "Michael Brown",
      email: "michaelbrown@gmail.com",
      initials: "MB",
      colorClass: "bg-orange-100 text-orange-600",
    },
    product: "Web Domain",
    value: "$9,50.00",
    date: "2024-06-20",
    status: "Cancel",
    statusClass:
      "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
  },
  {
    id: "DE124324",
    customer: {
      name: "Alice Johnson",
      email: "alicejohnson@gmail.com",
      initials: "AJ",
      colorClass: "bg-purple-100 text-purple-600",
    },
    product: "SSL Certificate",
    value: "$2,30.45",
    date: "2024-06-25",
    status: "Pending",
    statusClass:
      "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
  },
  {
    id: "DE124325",
    customer: {
      name: "Robert Lee",
      email: "robertlee@gmail.com",
      initials: "RL",
      colorClass: "bg-green-100 text-green-600",
    },
    product: "Premium Support",
    value: "$15,20.00",
    date: "2024-06-30",
    status: "Complete",
    statusClass:
      "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
  },
];

export const RecentOrders = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-4 px-6 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Orders
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <table className="min-w-full">
          <thead className="px-6 py-3 border-t border-gray-100 border-y bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start">
                <div className="flex items-center gap-3">
                  <div>
                    <label className="flex items-center space-x-3 group cursor-pointer ">
                      <div className="relative w-5 h-5">
                        <input
                          className="peer w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                          type="checkbox"
                        />
                        <svg
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100"
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                            stroke="white"
                            strokeWidth="1.94437"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                  <div>
                    <span className="font-medium text-gray-500 text-theme-xs dark:text-gray-400">
                      Deal ID
                    </span>
                  </div>
                </div>
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start whitespace-nowrap">
                Customer
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start whitespace-nowrap">
                Product/Service
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start whitespace-nowrap">
                Deal Value
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start whitespace-nowrap">
                Close Date
              </th>
              <th className="px-6 py-3 font-medium text-gray-500 sm:px-6 text-theme-xs dark:text-gray-400 text-start whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order, index) => (
              <tr key={index}>
                <td className="px-4 sm:px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div>
                      <label className="flex items-center space-x-3 group cursor-pointer ">
                        <div className="relative w-5 h-5">
                          <input
                            className="peer w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60"
                            type="checkbox"
                          />
                          <svg
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100"
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                              stroke="white"
                              strokeWidth="1.94437"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </label>
                    </div>
                    <div>
                      <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                        {order.id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${order.customer.colorClass}`}
                    >
                      <span className="text-sm font-medium">
                        {order.customer.initials}
                      </span>
                    </div>
                    <div>
                      <span className="mb-0.5 block text-theme-sm font-medium text-gray-700 dark:text-gray-400 whitespace-nowrap">
                        {order.customer.name}
                      </span>
                      <span className="text-gray-500 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                        {order.customer.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3.5">
                  <p className="text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {order.product}
                  </p>
                </td>
                <td className="px-4 sm:px-6 py-3.5">
                  <p className="text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {order.value}
                  </p>
                </td>
                <td className="px-4 sm:px-6 py-3.5">
                  <p className="text-gray-700 text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    {order.date}
                  </p>
                </td>
                <td className="px-4 sm:px-6 py-3.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-theme-xs whitespace-nowrap ${order.statusClass}`}
                  >
                    {order.status}
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

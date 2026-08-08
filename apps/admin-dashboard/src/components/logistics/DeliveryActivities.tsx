import React from "react";

const activities = [
  {
    orderId: "#324112",
    category: "Furniture",
    company: "HomeLine",
    arrival: "10 Apr 2028 2:15 pm",
    route: "Berlin-Milan",
    price: "$1,250.00",
    status: "Delivered",
  },
  {
    orderId: "#325678",
    category: "Clothing",
    company: "StylePro",
    arrival: "21 May 2028 9:00 am",
    route: "Paris-Rome",
    price: "$340.75",
    status: "Delivered",
  },
  {
    orderId: "#326789",
    category: "Books",
    company: "EduSource",
    arrival: "02 Jun 2028 11:45 am",
    route: "New York-Chicago",
    price: "$128.40",
    status: "In Transit",
  },
  {
    orderId: "#327003",
    category: "Automotive",
    company: "AutoParts Co.",
    arrival: "18 Mar 2028 4:00 pm",
    route: "Tokyo-Osaka",
    price: "$2,150.89",
    status: "Delivered",
  },
  {
    orderId: "#328556",
    category: "Electronics",
    company: "TechNova",
    arrival: "25 Jul 2028 10:30 am",
    route: "San Francisco-Seattle",
    price: "$849.99",
    status: "Delivered",
  },
];

export const DeliveryActivities = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center px-6 py-5 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Delivery Activities
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your recent shipping activities
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-gray-50 dark:bg-gray-900 rounded-lg p-1">
            {["All", "Delivered", "In-Transit", "Pending", "Processing"].map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                  tab === "All"
                    ? "bg-white text-gray-800 shadow-sm dark:bg-gray-800 dark:text-white"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-200 dark:hover:bg-white/5">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full whitespace-nowrap">
          <thead className="border-y border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left">
                <input type="checkbox" className="rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Category</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Company</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Arrival</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Route</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Price</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {activities.map((activity, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <td className="px-6 py-4">
                  <input type="checkbox" className="rounded border-gray-300 text-brand-500 focus:ring-brand-500" />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-400">{activity.orderId}</td>
                <td className="px-6 py-4 text-sm text-gray-800 dark:text-white/90">{activity.category}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">{activity.company}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">{activity.arrival}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">{activity.route}</td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-400">{activity.price}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 justify-center gap-1 rounded-full font-medium text-xs ${
                      activity.status === "Delivered"
                        ? "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500"
                        : "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-500"
                    }`}
                  >
                    {activity.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 px-6 py-4 dark:border-gray-800">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
          Showing <span className="text-gray-800 dark:text-white/90">1</span> to{" "}
          <span className="text-gray-800 dark:text-white/90">5</span> of{" "}
          <span className="text-gray-800 dark:text-white/90">10</span>
        </p>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-1">
            <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500 text-sm font-medium text-white">1</button>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800">2</button>
          </div>
          <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

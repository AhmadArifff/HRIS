"use client";
import React, { useState } from "react";

export interface Transaction {
  id: string;
  orderId: string;
  customerName: string;
  email: string;
  amount: string;
  dueDate: string;
  status: "Completed" | "Pending" | "Failed";
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    orderId: "#323537",
    customerName: "Abram Schleifer",
    email: "abram@example.com",
    amount: "$43,999",
    dueDate: "25 Apr, 2027",
    status: "Completed",
  },
  {
    id: "2",
    orderId: "#323544",
    customerName: "Ava Smith",
    email: "ava.smith@example.com",
    amount: "$1,200",
    dueDate: "01 Dec, 2027",
    status: "Pending",
  },
  {
    id: "3",
    orderId: "#323538",
    customerName: "Carla George",
    email: "carla65@example.com",
    amount: "$919",
    dueDate: "11 May, 2027",
    status: "Completed",
  },
  {
    id: "4",
    orderId: "#323543",
    customerName: "Ekstrom Bothman",
    email: "ekstrom@example.com",
    amount: "$679",
    dueDate: "15 Nov, 2027",
    status: "Completed",
  },
  {
    id: "5",
    orderId: "#323552",
    customerName: "Ella Davis",
    email: "ella.davis@example.com",
    amount: "$210",
    dueDate: "01 Mar, 2028",
    status: "Failed",
  },
  {
    id: "6",
    orderId: "#323539",
    customerName: "Emery Culhane",
    email: "emery09@example.com",
    amount: "$839",
    dueDate: "29 Jun, 2027",
    status: "Completed",
  },
  {
    id: "7",
    orderId: "#323547",
    customerName: "Ethan Patel",
    email: "ethan.patel@example.com",
    amount: "$2,100",
    dueDate: "05 Jan, 2028",
    status: "Pending",
  },
  {
    id: "8",
    orderId: "#323553",
    customerName: "James Martinez",
    email: "james.martinez@example.com",
    amount: "$3,300",
    dueDate: "15 Mar, 2028",
    status: "Completed",
  },
  {
    id: "9",
    orderId: "#323535",
    customerName: "Kaiya George",
    email: "kaiya@example.com",
    amount: "$1,579",
    dueDate: "13 Mar, 2027",
    status: "Failed",
  },
  {
    id: "10",
    orderId: "#323549",
    customerName: "Liam Brown",
    email: "liam.brown@example.com",
    amount: "$450",
    dueDate: "28 Jan, 2028",
    status: "Failed",
  },
  // Page 2 Mock Data
  {
    id: "11",
    orderId: "#323560",
    customerName: "Noah Wilson",
    email: "noah.w@example.com",
    amount: "$1,850",
    dueDate: "10 Feb, 2028",
    status: "Completed",
  },
  {
    id: "12",
    orderId: "#323561",
    customerName: "Olivia Taylor",
    email: "olivia.t@example.com",
    amount: "$3,400",
    dueDate: "14 Feb, 2028",
    status: "Completed",
  },
  {
    id: "13",
    orderId: "#323562",
    customerName: "Sophia Miller",
    email: "sophia.m@example.com",
    amount: "$980",
    dueDate: "20 Feb, 2028",
    status: "Pending",
  },
  {
    id: "14",
    orderId: "#323563",
    customerName: "Lucas Anderson",
    email: "lucas.a@example.com",
    amount: "$520",
    dueDate: "25 Feb, 2028",
    status: "Completed",
  },
  {
    id: "15",
    orderId: "#323564",
    customerName: "Mason Thomas",
    email: "mason.t@example.com",
    amount: "$2,750",
    dueDate: "02 Mar, 2028",
    status: "Failed",
  },
];

interface TransactionsTableProps {
  searchTerm?: string;
  onExportCSV?: () => void;
}

export const TransactionsTable: React.FC<TransactionsTableProps> = ({
  searchTerm = "",
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter items
  const filteredTransactions = mockTransactions.filter((tx) => {
    const term = searchTerm.toLowerCase();
    return (
      tx.orderId.toLowerCase().includes(term) ||
      tx.customerName.toLowerCase().includes(term) ||
      tx.email.toLowerCase().includes(term) ||
      tx.status.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(currentItems.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleDropdown = (id: string) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const renderStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "Completed":
        return (
          <span className="inline-flex items-center rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            Completed
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center rounded-full bg-warning-50 px-3 py-1 text-xs font-medium text-warning-600 dark:bg-warning-500/15 dark:text-warning-500">
            Pending
          </span>
        );
      case "Failed":
        return (
          <span className="inline-flex items-center rounded-full bg-error-50 px-3 py-1 text-xs font-medium text-error-600 dark:bg-error-500/15 dark:text-error-500">
            Failed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-5 lg:p-6">
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 text-left dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th scope="col" className="px-5 py-4 w-[50px]">
                <input
                  type="checkbox"
                  checked={
                    currentItems.length > 0 &&
                    currentItems.every((item) => selectedIds.includes(item.id))
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900"
                />
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Order ID
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5 cursor-pointer">
                  Customer
                  <svg className="w-3.5 h-3.5 fill-current text-gray-400" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 2L12 6H4L8 2ZM8 14L4 10H12L8 14Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5 cursor-pointer">
                  Email
                  <svg className="w-3.5 h-3.5 fill-current text-gray-400" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 2L12 6H4L8 2ZM8 14L4 10H12L8 14Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5 cursor-pointer">
                  Total Amount
                  <svg className="w-3.5 h-3.5 fill-current text-gray-400" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 2L12 6H4L8 2ZM8 14L4 10H12L8 14Z"/>
                  </svg>
                </div>
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Due Date
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-transparent">
            {currentItems.map((tx) => {
              const isSelected = selectedIds.includes(tx.id);
              return (
                <tr
                  key={tx.id}
                  className={`hover:bg-gray-50/50 dark:hover:bg-white/[0.02] ${
                    isSelected ? "bg-gray-50/80 dark:bg-white/[0.03]" : ""
                  }`}
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleSelectOne(tx.id)}
                      className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900"
                    />
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-gray-800 dark:text-white/90 whitespace-nowrap">
                    {tx.orderId}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {tx.customerName}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {tx.email}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {tx.amount}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {tx.dueDate}
                  </td>
                  <td className="px-5 py-4 text-sm whitespace-nowrap">
                    {renderStatusBadge(tx.status)}
                  </td>
                  <td className="px-5 py-4 text-right text-sm whitespace-nowrap relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown(tx.id)}
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 10C6 10.8284 5.32843 11.5 4.5 11.5C3.67157 11.5 3 10.8284 3 10C3 9.17157 3.67157 8.5 4.5 8.5C5.32843 8.5 6 9.17157 6 10ZM11.5 10C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 10C8.5 9.17157 9.17157 8.5 10 8.5C10.8284 8.5 11.5 9.17157 11.5 10ZM15.5 11.5C16.3284 11.5 17 10.8284 17 10C17 9.17157 16.3284 8.5 15.5 8.5C14.6716 8.5 14 9.17157 14 10C14 10.8284 14.6716 11.5 15.5 11.5Z" />
                      </svg>
                    </button>

                    {activeDropdown === tx.id && (
                      <div className="absolute right-5 mt-2 w-36 rounded-xl border border-gray-200 bg-white py-1.5 shadow-xl z-50 dark:border-gray-800 dark:bg-gray-900 text-left">
                        <button
                          type="button"
                          onClick={() => {
                            alert(`View transaction ${tx.orderId}`);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            alert(`Downloading receipt for ${tx.orderId}`);
                            setActiveDropdown(null);
                          }}
                          className="w-full px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/[0.03]"
                        >
                          Download Receipt
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="mt-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-800 dark:text-white">{startIndex + 1}</span> to{" "}
          <span className="font-semibold text-gray-800 dark:text-white">
            {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}
          </span>{" "}
          of <span className="font-semibold text-gray-800 dark:text-white">{filteredTransactions.length}</span>
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            &larr;
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition ${
                currentPage === page
                  ? "bg-brand-500 text-white shadow-theme-xs"
                  : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
          >
            &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

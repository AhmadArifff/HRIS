"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon, PlugInIcon, TrashBinIcon } from "@/icons";

interface Transaction {
  id: number;
  name: string;
  email: string;
  plan: string;
  price: string;
  date: string;
  status: "Active" | "Expired" | "Canceled";
}

const tableData: Transaction[] = [
  {
    id: 1,
    name: "Lindsey Curtis",
    email: "lindsey@gmail.com",
    plan: "Pro - Monthly",
    price: "$99.00",
    date: "14 Jan, 2029",
    status: "Active",
  },
  {
    id: 2,
    name: "Kaiya George",
    email: "kaiya@gmail.com",
    plan: "Enterprise - Yearly",
    price: "$999.00",
    date: "25 Dec, 2028",
    status: "Active",
  },
  {
    id: 3,
    name: "Zainab Bator",
    email: "zainab@gmail.com",
    plan: "Starter - Monthly",
    price: "$20.00",
    date: "22 Dec, 2028",
    status: "Canceled",
  },
  {
    id: 4,
    name: "Chance Philips",
    email: "chance@gmail.com",
    plan: "Growth - Yearly",
    price: "$249.00",
    date: "12 Dec, 2028",
    status: "Active",
  },
  {
    id: 5,
    name: "Terry Geidt",
    email: "terry@gmail.com",
    plan: "Starter - Monthly",
    price: "$20.00",
    date: "25 Nov, 2028",
    status: "Expired",
  },
];

export const RecentTransactions = () => {
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);

  const toggleDropdown = (id: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const closeDropdown = () => {
    setOpenDropdownId(null);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Transactions
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative inline-flex items-center">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.16666 3.33332C5.94502 3.33332 3.33332 5.94502 3.33332 9.16666C3.33332 12.3883 5.94502 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.94502 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 11.238 15.826 13.1133 14.4716 14.4716L18.4226 18.4226C18.748 18.748 18.748 19.2757 18.4226 19.6011C18.0971 19.9265 17.5695 19.9265 17.2441 19.6011L13.293 15.65C12.062 16.536 10.6698 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                fill="currentColor"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="h-10 w-full lg:w-[220px] rounded-lg border border-gray-200 bg-white pl-10 pr-3 py-2 text-sm text-gray-700 outline-none transition-colors focus:border-brand-500 focus:outline-none dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-brand-500"
            />
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                stroke=""
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                fill=""
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Plan
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Date
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="py-3">
                  <div>
                    <p className="font-medium text-gray-700 text-theme-sm dark:text-gray-400">
                      {transaction.name}
                    </p>
                    <span className="text-gray-500 text-sm dark:text-gray-400">
                      {transaction.email}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-700 text-theme-sm dark:text-gray-400">
                  {transaction.plan}
                </TableCell>
                <TableCell className="py-3 text-gray-700 text-theme-sm dark:text-gray-400">
                  {transaction.price}
                </TableCell>
                <TableCell className="py-3 text-gray-700 text-theme-sm dark:text-gray-400">
                  {transaction.date}
                </TableCell>
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={
                      transaction.status === "Active"
                        ? "success"
                        : transaction.status === "Expired"
                        ? "error"
                        : "warning"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <div className="relative inline-block">
                    <button
                      onClick={() => toggleDropdown(transaction.id)}
                      className="text-gray-500 dark:text-gray-400"
                    >
                      <MoreDotIcon className="size-6" />
                    </button>
                    <Dropdown
                      isOpen={openDropdownId === transaction.id}
                      onClose={closeDropdown}
                      className="w-40 p-2 right-0"
                    >
                      <DropdownItem
                        onItemClick={closeDropdown}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        View More
                      </DropdownItem>
                      <DropdownItem
                        onItemClick={closeDropdown}
                        className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                      >
                        Delete
                      </DropdownItem>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <button
            className="text-theme-sm shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 sm:px-3.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.751 15.228C11.9669 15.0116 12.0883 14.7183 12.0883 14.4124C12.0883 14.1065 11.9669 13.8131 11.751 13.5968L7.15392 8.99966L11.751 4.40258C11.8569 4.29337 11.9406 4.16439 11.9967 4.02324C12.0529 3.8821 12.0801 3.73172 12.0768 3.58122C12.0735 3.43072 12.0398 3.28325 11.9778 3.14782C11.9158 3.0124 11.8268 2.89191 11.7163 2.79391C11.6058 2.69592 11.4761 2.62252 11.3353 2.57833C11.1945 2.53414 11.0456 2.52015 10.8977 2.53729C10.7499 2.55444 10.6063 2.60235 10.4757 2.67812C10.345 2.7539 10.23 2.85601 10.1373 2.9785L4.7335 8.38225C4.51759 8.59858 4.39632 8.89196 4.39632 9.19782C4.39632 9.50369 4.51759 9.79707 4.7335 10.0134L10.1373 15.4172C10.3536 15.6331 10.647 15.7543 10.9528 15.7543C11.2587 15.7543 11.5521 15.6331 11.751 15.4172V15.228Z"
                fill=""
              />
            </svg>
            <span className="hidden sm:block">Previous</span>
          </button>

          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 font-medium text-brand-500 dark:bg-brand-500/15">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/[0.03]">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg font-medium text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/[0.03]">
              3
            </button>
          </div>

          <button
            className="text-theme-sm shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-2 py-2 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:opacity-50 sm:px-3.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
          >
            <span className="hidden sm:block">Next</span>
            <svg
              className="fill-current"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.24902 4.77202C8.03314 4.98842 7.91183 5.28178 7.91183 5.58769C7.91183 5.8936 8.03314 6.18696 8.24902 6.40335L12.8461 11.0004L8.24902 15.5975C8.14309 15.7067 8.05944 15.8357 8.0033 15.9768C7.94715 16.118 7.91995 16.2683 7.92329 16.4188C7.92663 16.5693 7.96035 16.7168 8.02231 16.8522C8.08428 16.9876 8.17332 17.1081 8.2838 17.2061C8.39428 17.3041 8.52399 17.3775 8.66479 17.4217C8.80559 17.4659 8.9545 17.4799 9.10237 17.4628C9.25024 17.4456 9.3938 17.3977 9.52445 17.3219C9.6551 17.2461 9.7701 17.144 9.86277 17.0215L15.2665 11.6178C15.4824 11.4014 15.6037 11.1081 15.6037 10.8022C15.6037 10.4963 15.4824 10.203 15.2665 9.98661L9.86277 4.58285C9.64644 4.36696 9.35308 4.24571 9.04721 4.24571C8.74135 4.24571 8.44799 4.36696 8.23166 4.58285V4.77202Z"
                fill=""
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

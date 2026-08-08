"use client";
import React, { useState } from "react";

interface CreateInvoiceFormProps {
  invoiceNumber?: string;
  customerName?: string;
  customerAddress?: string;
  onFormChange?: (data: {
    invoiceNumber: string;
    customerName: string;
    customerAddress: string;
  }) => void;
}

export const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({
  invoiceNumber: initialInvoiceNumber = "WP-3434434",
  customerName: initialCustomerName = "John Deniyal",
  customerAddress: initialCustomerAddress = "",
  onFormChange,
}) => {
  const [invoiceNumber, setInvoiceNumber] = useState(initialInvoiceNumber);
  const [customerName, setCustomerName] = useState(initialCustomerName);
  const [customerAddress, setCustomerAddress] = useState(initialCustomerAddress);

  const handleInvoiceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInvoiceNumber(val);
    onFormChange?.({ invoiceNumber: val, customerName, customerAddress });
  };

  const handleCustomerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomerName(val);
    onFormChange?.({ invoiceNumber, customerName: val, customerAddress });
  };

  const handleCustomerAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomerAddress(val);
    onFormChange?.({ invoiceNumber, customerName, customerAddress: val });
  };

  return (
    <div className="border-b border-gray-200 p-5 lg:p-6 dark:border-gray-800">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
        <div>
          <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Invoice Number
          </label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={handleInvoiceNumberChange}
            placeholder="WP-3434434"
            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          />
        </div>

        <div>
          <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Customer Name
          </label>
          <input
            type="text"
            value={customerName}
            onChange={handleCustomerNameChange}
            placeholder="John Deniyal"
            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Customer Address
          </label>
          <input
            type="text"
            value={customerAddress}
            onChange={handleCustomerAddressChange}
            placeholder="Enter customer address"
            className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500 dark:focus:border-brand-800"
          />
        </div>
      </div>
    </div>
  );
};

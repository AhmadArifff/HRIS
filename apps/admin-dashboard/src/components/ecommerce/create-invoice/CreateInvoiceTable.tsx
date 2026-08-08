"use client";
import React, { useState } from "react";

export interface InvoiceItem {
  id: string;
  productName: string;
  quantity: number;
  unitCost: number;
  discount: number;
}

const initialItems: InvoiceItem[] = [
  {
    id: "1",
    productName: 'Macbook pro 13"',
    quantity: 1,
    unitCost: 1200,
    discount: 0,
  },
  {
    id: "2",
    productName: "Apple Watch Ultra",
    quantity: 1,
    unitCost: 300,
    discount: 50,
  },
  {
    id: "3",
    productName: "iPhone 15 Pro Max",
    quantity: 2,
    unitCost: 800,
    discount: 0,
  },
  {
    id: "4",
    productName: "iPad Pro 3rd Gen",
    quantity: 1,
    unitCost: 900,
    discount: 0,
  },
];

export const CreateInvoiceTable: React.FC = () => {
  const [items, setItems] = useState<InvoiceItem[]>(initialItems);

  // Add Product Form State
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState<string | number>("");
  const [newProductQty, setNewProductQty] = useState(1);
  const [newProductDiscount, setNewProductDiscount] = useState(0);

  // Preview Modal State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleItemChange = (
    id: string,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSaveProduct = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newProductName.trim()) return;

    const priceNum = Number(newProductPrice) || 0;
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      productName: newProductName.trim(),
      quantity: newProductQty > 0 ? newProductQty : 1,
      unitCost: priceNum,
      discount: newProductDiscount,
    };

    setItems((prev) => [...prev, newItem]);

    // Reset Form
    setNewProductName("");
    setNewProductPrice("");
    setNewProductQty(1);
    setNewProductDiscount(0);
  };

  const calculateRowTotal = (item: InvoiceItem) => {
    const baseTotal = item.quantity * item.unitCost;
    const discountAmount = baseTotal * (item.discount / 100);
    return baseTotal - discountAmount;
  };

  const subtotal = items.reduce((acc, item) => acc + calculateRowTotal(item), 0);
  const vatRate = 0.1; // 10%
  const vatAmount = subtotal * vatRate;
  const grandTotal = subtotal + vatAmount;

  return (
    <div className="p-5 lg:p-6">
      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 text-left dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                S. No.
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Products
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Quantity
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Unit Cost
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Discount
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Total
              </th>
              <th scope="col" className="px-5 py-4 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-transparent">
            {items.map((item, index) => {
              const rowTotal = calculateRowTotal(item);
              return (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02]">
                  <td className="px-5 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white min-w-[200px]">
                    <input
                      type="text"
                      value={item.productName}
                      onChange={(e) => handleItemChange(item.id, "productName", e.target.value)}
                      className="w-full rounded-md border border-transparent bg-transparent px-2 py-1 text-sm font-semibold text-gray-900 focus:border-gray-300 focus:bg-white focus:outline-none dark:text-white dark:focus:border-gray-700 dark:focus:bg-gray-900"
                    />
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap w-[100px]">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                      className="w-20 rounded-md border border-gray-200 bg-transparent px-2 py-1 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                    />
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap w-[120px]">
                    <div className="relative flex items-center">
                      <span className="text-gray-500 dark:text-gray-400 mr-1">$</span>
                      <input
                        type="number"
                        min="0"
                        value={item.unitCost}
                        onChange={(e) => handleItemChange(item.id, "unitCost", Number(e.target.value))}
                        className="w-24 rounded-md border border-gray-200 bg-transparent px-2 py-1 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                      />
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap w-[100px]">
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={item.discount}
                        onChange={(e) => handleItemChange(item.id, "discount", Number(e.target.value))}
                        className="w-16 rounded-md border border-gray-200 bg-transparent px-2 py-1 text-sm text-gray-800 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                      />
                      <span className="text-gray-500 dark:text-gray-400 ml-1">%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    ${rowTotal.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-sm text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 transition hover:text-error-500 dark:text-gray-500 dark:hover:text-error-500"
                      title="Remove product"
                    >
                      <svg
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.25 5.25C4.25 4.83579 4.58579 4.5 5 4.5H15C15.4142 4.5 15.75 4.83579 15.75 5.25C15.75 5.66421 15.4142 6 15 6H14.3639L13.7257 15.5724C13.6247 17.0877 12.3618 18.25 10.8427 18.25H9.15732C7.63821 18.25 6.3753 17.0877 6.27429 15.5724L5.63613 6H5C4.58579 6 4.25 5.66421 4.25 5.25ZM7.13289 6L7.76861 15.5358C7.81912 16.2934 8.45057 16.75 9.15732 16.75H10.8427C11.5494 16.75 12.1809 16.2934 12.2314 15.5358L12.8671 6H7.13289ZM8.25 2.75C7.83579 2.75 7.5 3.08579 7.5 3.5C7.5 3.91421 7.83579 4.25 8.25 4.25H11.75C12.1642 4.25 12.5 3.91421 12.5 3.5C12.5 3.08579 12.1642 2.75 11.75 2.75H8.25Z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Product Form Section */}
      <form onSubmit={handleSaveProduct} className="mt-6 rounded-2xl border border-gray-200 bg-gray-50/50 p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.02]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 lg:items-end">
          {/* Product Name */}
          <div className="lg:col-span-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Price */}
          <div className="lg:col-span-3">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Price
            </label>
            <input
              type="text"
              placeholder="Enter product price"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-gray-500"
            />
          </div>

          {/* Quantity Stepper */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Quantity
            </label>
            <div className="flex items-center rounded-xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-700 dark:bg-gray-900">
              <button
                type="button"
                onClick={() => setNewProductQty((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              >
                &minus;
              </button>
              <input
                type="number"
                min="1"
                value={newProductQty}
                onChange={(e) => setNewProductQty(Math.max(1, Number(e.target.value)))}
                className="w-full text-center text-sm font-medium text-gray-800 focus:outline-none dark:bg-transparent dark:text-white"
              />
              <button
                type="button"
                onClick={() => setNewProductQty((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
              >
                &#43;
              </button>
            </div>
          </div>

          {/* Discount Dropdown */}
          <div className="lg:col-span-2">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              Discount
            </label>
            <select
              value={newProductDiscount}
              onChange={(e) => setNewProductDiscount(Number(e.target.value))}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 shadow-theme-xs focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value={0}>0%</option>
              <option value={5}>5%</option>
              <option value={10}>10%</option>
              <option value={15}>15%</option>
              <option value={20}>20%</option>
              <option value={25}>25%</option>
              <option value={50}>50%</option>
            </select>
          </div>

          {/* Save Product Button */}
          <div className="lg:col-span-1">
            <button
              type="submit"
              className="w-full rounded-xl bg-brand-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition dark:bg-brand-500 dark:hover:bg-brand-600"
            >
              Save Product
            </button>
          </div>
        </div>

        {/* Info Helper Text */}
        <p className="mt-4 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4 fill-current shrink-0 text-gray-400" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM9 9C9 8.44772 9.44772 8 10 8C10.5523 8 11 8.44772 11 9V13C11 13.5523 10.5523 14 10 14C9.44772 14 9 13.5523 9 13V9ZM10 7C10.5523 7 11 6.55228 11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6C9 6.55228 9.44772 7 10 7Z"/>
          </svg>
          After filling in the product details, press Enter/Return or click 'Save Product' to add it to the list.
        </p>
      </form>

      {/* Order Summary Section */}
      <div className="mt-8 flex justify-end">
        <div className="w-full max-w-[280px] space-y-3">
          <h4 className="text-base font-semibold text-gray-800 dark:text-white">
            Order summary
          </h4>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Sub Total</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Vat (10%):</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              ${vatAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between pt-2 text-base font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800">
            <span>Total</span>
            <span className="text-gray-900 dark:text-white">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions Bar */}
      <div className="mt-8 flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
        <button
          type="button"
          onClick={() => setIsPreviewOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.03]"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 3.75C5.41421 3.75 1.67882 6.78652 0.416992 10C1.67882 13.2135 5.41421 16.25 10 16.25C14.5858 16.25 18.3212 13.2135 19.583 10C18.3212 6.78652 14.5858 3.75 10 3.75ZM10 14.75C6.26522 14.75 3.0905 12.338 1.95671 10C3.0905 7.66202 6.26522 5.25 10 5.25C13.7348 5.25 16.9095 7.66202 18.0433 10C16.9095 12.338 13.7348 14.75 10 14.75ZM10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5Z" />
          </svg>
          Preview Invoice
        </button>

        <button
          type="button"
          onClick={() => alert("Invoice saved successfully!")}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600 transition dark:bg-brand-500 dark:hover:bg-brand-600"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M3.75 3C3.33579 3 3 3.33579 3 3.75V16.25C3 16.6642 3.33579 17 3.75 17H16.25C16.6642 17 17 16.6642 17 16.25V6.31066C17 6.11175 16.921 5.92098 16.7803 5.78033L14.2197 3.21967C14.079 3.07902 13.8883 3 13.6893 3H3.75ZM4.5 4.5H12.75V7.5H4.5V4.5ZM4.5 15.5V9H15.5V15.5H4.5Z" />
          </svg>
          Save Invoice
        </button>
      </div>

      {/* Invoice Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900 dark:border dark:border-gray-800">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Invoice Preview
              </h3>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                &times;
              </button>
            </div>

            <div className="py-6 space-y-6">
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-brand-500">INVOICE</h2>
                  <p className="text-sm text-gray-500">Invoice #: WP-3434434</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">Customer Details:</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">John Deniyal</p>
                </div>
              </div>

              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                    <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Product</th>
                    <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Qty</th>
                    <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Unit Cost</th>
                    <th className="p-3 font-semibold text-gray-700 dark:text-gray-300">Discount</th>
                    <th className="p-3 font-semibold text-gray-700 dark:text-gray-300 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="p-3 text-gray-800 dark:text-gray-200">{item.productName || "—"}</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200">{item.quantity}</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200">${item.unitCost.toFixed(2)}</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200">{item.discount}%</td>
                      <td className="p-3 text-gray-800 dark:text-gray-200 text-right">
                        ${calculateRowTotal(item).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Sub Total:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Vat (10%):</span>
                    <span className="font-semibold text-gray-800 dark:text-white">${vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white border-t pt-2">
                    <span>Total:</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-gray-200 pt-4 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-600"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

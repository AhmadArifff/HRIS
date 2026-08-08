"use client";
import React from "react";

export interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitCost: number;
  discount: number;
}

const defaultItems: OrderItem[] = [
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

export const OrderDetailsCard: React.FC = () => {
  const items = defaultItems;

  const calculateTotal = (item: OrderItem) => {
    const base = item.quantity * item.unitCost;
    return base - base * (item.discount / 100);
  };

  const subtotal = items.reduce((acc, item) => acc + calculateTotal(item), 0);
  const vatAmount = subtotal * 0.1;
  const grandTotal = subtotal + vatAmount;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
        Order Details
      </h3>

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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-transparent">
            {items.map((item, index) => {
              const itemTotal = calculateTotal(item);
              return (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.02]">
                  <td className="px-5 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    {item.productName}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {item.quantity}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    ${item.unitCost}
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {item.discount}%
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                    ${itemTotal}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Order Summary */}
      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-[260px] space-y-3 text-right">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Order summary
          </h4>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Sub Total</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              ${subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Vat (10%):</span>
            <span className="font-semibold text-gray-800 dark:text-white">
              ${vatAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-2 text-base font-bold text-gray-900 dark:border-gray-800 dark:text-white">
            <span>Total</span>
            <span className="text-lg text-gray-900 dark:text-white">
              ${grandTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

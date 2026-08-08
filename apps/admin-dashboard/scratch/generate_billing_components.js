const fs = require('fs');
const jsx = fs.readFileSync('scratch/billing_main.jsx', 'utf8');

function extractBetween(str, startMarker, endMarker) {
    const startIndex = str.indexOf(startMarker);
    if (startIndex === -1) return null;
    let openDivs = 0;
    let currentIndex = startIndex;
    
    // Simple state machine to count nested divs
    while (currentIndex < str.length) {
        if (str.substr(currentIndex, 4) === '<div') {
            openDivs++;
        } else if (str.substr(currentIndex, 6) === '</div') {
            openDivs--;
            if (openDivs === 0) {
                return str.substring(startIndex, currentIndex + 6);
            }
        }
        currentIndex++;
    }
    return null;
}

// 1. BillingHeader
const headerStart = '<div className="flex flex-wrap items-center justify-between gap-3 mb-6">';
const headerHtml = extractBetween(jsx, headerStart, '</div>');

// 2. PlanDetails
const planDetailsStart = '<div className="rounded-2xl border border-gray-200 bg-white xl:w-4/6 dark:border-gray-800 dark:bg-white/[0.03]">';
const planDetailsHtml = extractBetween(jsx, planDetailsStart, '</div>');

// 3. BillingInfo
const billingInfoStart = '<div className="rounded-2xl border border-gray-200 bg-white xl:w-2/6 dark:border-gray-800 dark:bg-white/[0.03]">';
const billingInfoHtml = extractBetween(jsx, billingInfoStart, '</div>');

// 4. PaymentMethods
const paymentMethodsStart = '<div className="mb-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">';
const paymentMethodsHtml = extractBetween(jsx, paymentMethodsStart, '</div>');

// 5. BillingInvoices
const invoicesStart = '<div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">';
const invoicesHtml = extractBetween(jsx, invoicesStart, '</div>');

const compDir = 'src/components/ecommerce/billing';
if (!fs.existsSync(compDir)) {
    fs.mkdirSync(compDir, { recursive: true });
}

function writeComponent(name, content) {
    const code = `"use client";
import React from "react";

export const ${name} = () => {
  return (
    ${content}
  );
};
`;
    fs.writeFileSync(`${compDir}/${name}.tsx`, code);
    console.log(`Created ${name}`);
}

writeComponent('BillingHeader', headerHtml);
writeComponent('PlanDetails', planDetailsHtml);
writeComponent('BillingInfo', billingInfoHtml);
writeComponent('PaymentMethods', paymentMethodsHtml);
writeComponent('BillingInvoices', invoicesHtml);

const layoutCode = `"use client";
import React from "react";
import { BillingHeader } from "./BillingHeader";
import { PlanDetails } from "./PlanDetails";
import { BillingInfo } from "./BillingInfo";
import { PaymentMethods } from "./PaymentMethods";
import { BillingInvoices } from "./BillingInvoices";

export const BillingLayout = () => {
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-24">
      <BillingHeader />
      <div className="mb-6 flex flex-col gap-6 xl:flex-row">
        <PlanDetails />
        <BillingInfo />
      </div>
      <PaymentMethods />
      <BillingInvoices />
    </div>
  );
};
`;
fs.writeFileSync(`${compDir}/BillingLayout.tsx`, layoutCode);
console.log('Created BillingLayout');

const fs = require('fs');

const raw = fs.readFileSync('scratch/billing_main.html', 'utf8');

// I will use some string splitting to extract the parts since it's one long line.
// But first, let's format it.
let formatted = raw.replace(/></g, '>\n<');
fs.writeFileSync('scratch/billing_formatted.html', formatted);

// Let's do a rough extraction by markers.
// 1. Header
let headerStart = formatted.indexOf('<div\nclass="flex flex-wrap items-center justify-between gap-3 mb-6"');
let row1Start = formatted.indexOf('<div\nclass="mb-6 flex flex-col gap-6 xl:flex-row"');
let row2Start = formatted.indexOf('<div\nclass="mb-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"');
let row3Start = formatted.indexOf('<div\nclass="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]"');

if (headerStart === -1) console.log("Missing header");
if (row1Start === -1) console.log("Missing row1");
if (row2Start === -1) console.log("Missing row2");
if (row3Start === -1) console.log("Missing row3");

// Extract strings
const headerHtml = formatted.substring(headerStart, row1Start);
const row1Html = formatted.substring(row1Start, row2Start);
const paymentHtml = formatted.substring(row2Start, row3Start);
const invoicesHtml = formatted.substring(row3Start, formatted.lastIndexOf('</div>\n</div>\n</main>'));

// Split row1 into Plan Details and Billing Info
const planDetailsStart = row1Html.indexOf('<div\nclass="rounded-2xl border border-gray-200 bg-white xl:w-4/6');
const billingInfoStart = row1Html.indexOf('<div\nclass="rounded-2xl border border-gray-200 bg-white xl:w-2/6');

const planDetailsHtml = row1Html.substring(planDetailsStart, billingInfoStart);
const billingInfoHtml = row1Html.substring(billingInfoStart, row1Html.lastIndexOf('</div>\n</div>') + 6);

fs.writeFileSync('scratch/billing_header.html', headerHtml);
fs.writeFileSync('scratch/billing_plan_details.html', planDetailsHtml);
fs.writeFileSync('scratch/billing_info.html', billingInfoHtml);
fs.writeFileSync('scratch/billing_payment_methods.html', paymentHtml);
fs.writeFileSync('scratch/billing_invoices.html', invoicesHtml);

console.log("Successfully extracted billing parts!");

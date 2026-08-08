"use client";
import React, { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const leftFaqs: FaqItem[] = [
  {
    id: "l1",
    question: "Do I get free updates?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.",
  },
  {
    id: "l2",
    question: "Which license type is suitable for me?",
    answer:
      "Single license is suitable for one project. For multiple projects or SaaS applications, choose our Team or Enterprise license.",
  },
  {
    id: "l3",
    question: "What are the Seats mentioned on pricing plans?",
    answer:
      "Seats represent the number of active developer accounts allowed to work concurrently on the codebase.",
  },
];

const rightFaqs: FaqItem[] = [
  {
    id: "r1",
    question: "Can I Customize AdminArif to suit my needs?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.",
  },
  {
    id: "r2",
    question: "What does Unlimited Projects mean?",
    answer:
      "Unlimited Projects allows you to build as many websites and applications as you like under a single team license.",
  },
  {
    id: "r3",
    question: "Can I upgrade to a higher plan?",
    answer:
      "Yes, you can upgrade your plan at any time from your account settings by paying the difference.",
  },
  {
    id: "r4",
    question: "Are there dark and light mode options?",
    answer:
      "Yes! All AdminArif components natively support seamless dark and light mode switching.",
  },
];

export const FaqTwo: React.FC = () => {
  const [openLeftId, setOpenLeftId] = useState<string | null>("l1");
  const [openRightId, setOpenRightId] = useState<string | null>("r1");

  const toggleLeft = (id: string) => {
    setOpenLeftId((prev) => (prev === id ? null : id));
  };

  const toggleRight = (id: string) => {
    setOpenRightId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Faq's 2
        </h3>
      </div>

      <div className="p-5 lg:p-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-4">
          {leftFaqs.map((item) => {
            const isOpen = openLeftId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 transition ${
                  isOpen
                    ? "bg-brand-50 border-brand-200 dark:bg-brand-500/10 dark:border-brand-500/30"
                    : "bg-gray-50/50 border-gray-200 dark:bg-gray-900/40 dark:border-gray-800"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleLeft(item.id)}
                  className="flex w-full items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.question}
                  </span>
                  <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3 border-t border-brand-100 dark:border-brand-500/20 pt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {rightFaqs.map((item) => {
            const isOpen = openRightId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border p-5 transition ${
                  isOpen
                    ? "bg-brand-50 border-brand-200 dark:bg-brand-500/10 dark:border-brand-500/30"
                    : "bg-gray-50/50 border-gray-200 dark:bg-gray-900/40 dark:border-gray-800"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleRight(item.id)}
                  className="flex w-full items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    {item.question}
                  </span>
                  <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3 border-t border-brand-100 dark:border-brand-500/20 pt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

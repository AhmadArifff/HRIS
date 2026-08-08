"use client";
import React, { useState } from "react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const mockFaqsOne: FaqItem[] = [
  {
    id: "1",
    question: "Do I get free updates?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.",
  },
  {
    id: "2",
    question: "Do I get free updates?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis magna ac nibh malesuada consectetur at vitae ipsum orem ipsum dolor sit amet, consectetur adipiscing elit nam fermentum, leo et lacinia accumsan.",
  },
  {
    id: "3",
    question: "Can I Customize AdminArif to suit my needs?",
    answer:
      "Yes, AdminArif is highly customizable and modular. You can adjust theme colors, components, icons, and layout structures to fit your product requirements perfectly.",
  },
  {
    id: "4",
    question: "What does Unlimited Projects mean?",
    answer:
      "Unlimited Projects allows you to build as many commercial or personal web applications as you need under your license without any extra fee.",
  },
];

export const FaqOne: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="border-b border-gray-100 p-5 lg:p-6 dark:border-gray-800">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white">
          Faq's 1
        </h3>
      </div>

      <div className="p-5 lg:p-6 space-y-4">
        {mockFaqsOne.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs transition dark:border-gray-800 dark:bg-gray-900/40"
            >
              <button
                type="button"
                onClick={() => toggleFaq(item.id)}
                className="flex w-full items-center justify-between text-left focus:outline-none"
              >
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {item.question}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className={`w-4 h-4 fill-current transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className="mt-4 border-t border-gray-100 dark:border-gray-800 pt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

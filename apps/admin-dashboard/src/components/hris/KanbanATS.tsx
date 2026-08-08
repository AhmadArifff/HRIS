"use client";
import React from "react";
import Badge from "../ui/badge/Badge";

const columns = [
  { id: "applied", title: "Applied", count: 3, color: "bg-gray-100 dark:bg-gray-800" },
  { id: "screening", title: "Screening", count: 2, color: "bg-blue-50 dark:bg-blue-900/20" },
  { id: "interview", title: "Interview", count: 1, color: "bg-orange-50 dark:bg-orange-900/20" },
  { id: "offered", title: "Offered", count: 1, color: "bg-brand-50 dark:bg-brand-900/20" },
  { id: "hired", title: "Hired", count: 0, color: "bg-success-50 dark:bg-success-900/20" },
];

const candidates = [
  { id: 1, name: "Diana Putri", role: "UI/UX Designer", status: "applied", score: "-", date: "08 Ags" },
  { id: 2, name: "Reza Rahadian", role: "Backend Engineer", status: "applied", score: "-", date: "07 Ags" },
  { id: 3, name: "Siska Saraswati", role: "Marketing", status: "applied", score: "-", date: "06 Ags" },
  { id: 4, name: "Fajar Nugraha", role: "Frontend Engineer", status: "screening", score: "75/100", date: "05 Ags" },
  { id: 5, name: "Bima Arya", role: "Data Analyst", status: "screening", score: "80/100", date: "04 Ags" },
  { id: 6, name: "Citra Kirana", role: "Product Manager", status: "interview", score: "90/100", date: "01 Ags" },
  { id: 7, name: "Deni Sumargo", role: "DevOps", status: "offered", score: "95/100", date: "28 Jul" },
];

export const KanbanATS = () => {
  return (
    <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-200px)] min-h-[600px] items-start">
      {columns.map((column) => (
        <div key={column.id} className={`flex-shrink-0 w-80 rounded-2xl p-4 flex flex-col h-full ${column.color}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800 dark:text-white/90">{column.title}</h4>
            <span className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              {column.count}
            </span>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar flex-1 pb-2">
            {candidates
              .filter((c) => c.status === column.id)
              .map((candidate) => (
                <div key={candidate.id} className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm cursor-grab hover:border-brand-500 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-gray-800 dark:text-white/90 text-sm">{candidate.name}</h5>
                    <span className="text-xs text-gray-500">{candidate.date}</span>
                  </div>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mb-3">{candidate.role}</p>
                  
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {candidate.score}
                    </div>
                    <a href={`/recruitment/candidate/${candidate.id}`} className="text-xs font-medium text-brand-500 hover:text-brand-600">Review &rarr;</a>
                  </div>
                </div>
              ))}
              
              {column.count === 0 && (
                <div className="flex items-center justify-center h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-400 text-sm">
                  Drag & Drop Here
                </div>
              )}
          </div>
          
          <button className="mt-3 w-full py-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white bg-white/50 dark:bg-gray-800/50 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            Add Candidate
          </button>
        </div>
      ))}
    </div>
  );
};

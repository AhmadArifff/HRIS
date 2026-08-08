"use client";
import React from "react";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";

const jobsData = [
  { id: 1, title: "Senior Software Engineer", department: "IT", location: "Jakarta (Hybrid)", type: "Full-Time", applied: 45, status: "Active" },
  { id: 2, title: "HR Business Partner", department: "HR", location: "Jakarta (WFO)", type: "Full-Time", applied: 12, status: "Active" },
  { id: 3, title: "Marketing Specialist", department: "Marketing", location: "Remote", type: "Contract", applied: 89, status: "Active" },
  { id: 4, title: "Data Analyst", department: "IT", location: "Jakarta (Hybrid)", type: "Full-Time", applied: 10, status: "Closed" },
];

export const JobBoard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white/90">Daftar Lowongan Pekerjaan</h3>
        <Button size="sm" className="bg-brand-500 text-white hover:bg-brand-600">+ Buka Lowongan Baru</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobsData.map((job) => (
          <div key={job.id} className="p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] hover:shadow-sm transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-brand-50 dark:bg-brand-500/10 rounded-xl text-brand-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <Badge color={job.status === "Active" ? "success" : "error"}>{job.status}</Badge>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-2">{job.title}</h4>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                {job.department}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {job.type}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="text-sm">
                <span className="font-semibold text-gray-800 dark:text-white/90">{job.applied}</span> <span className="text-gray-500">Pelamar</span>
              </div>
              <Button size="sm" variant="outline" className="text-sm">Detail & Pelamar</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

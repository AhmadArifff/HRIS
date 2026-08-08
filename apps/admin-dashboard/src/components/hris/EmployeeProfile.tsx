"use client";
import React from "react";
import Image from "next/image";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";

export const EmployeeProfile = () => {
  return (
    <div className="space-y-6">
      {/* Meta Card */}
      <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:bg-white/[0.03] dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
              <Image
                width={160}
                height={160}
                src="/images/user/user-01.jpg"
                alt="user"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
            <div className="order-3 xl:order-2 text-center xl:text-left">
              <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-white/90">
                Budi Santoso
              </h4>
              <div className="flex flex-col items-center gap-1 xl:flex-row xl:gap-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Software Engineer
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Departemen IT
                </p>
                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                <Badge color="success">Active</Badge>
              </div>
            </div>
          </div>
          <div className="flex justify-center xl:justify-end gap-3 w-full xl:w-auto mt-4 xl:mt-0">
            <Button size="sm" variant="outline">
              Edit Profil
            </Button>
            <Button size="sm">
              Unduh CV
            </Button>
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:bg-white/[0.03] dark:border-gray-800 lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Informasi Pribadi
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">ID Karyawan:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">EMP-001</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Email:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">budi.santoso@perusahaan.com</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Telepon:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">+62 812 3456 7890</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Tanggal Lahir:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">15 Agustus 1990</span>
            </li>
          </ul>
        </div>

        <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:bg-white/[0.03] dark:border-gray-800 lg:p-6">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
            Informasi Kepegawaian
          </h3>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Tanggal Bergabung:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">01 Januari 2021</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Tipe Kontrak:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">Tetap (PKWTT)</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Gaji Pokok:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">Rp 12.500.000</span>
            </li>
            <li className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Nomor Rekening:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white/90">BCA - 1234567890</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

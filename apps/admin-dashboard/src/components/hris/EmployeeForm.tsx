"use client";
import React, { useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import Select from "@/components/form/Select"; // Assuming there is a generic select, if not I will use normal select

export const EmployeeForm = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Informasi Karyawan Baru
      </h3>
      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Personal Info */}
          <div>
            <Label>Nama Lengkap <span className="text-error-500">*</span></Label>
            <Input type="text" placeholder="Masukkan nama lengkap" />
          </div>
          <div>
            <Label>Email Pekerjaan <span className="text-error-500">*</span></Label>
            <Input type="email" placeholder="email@perusahaan.com" />
          </div>
          <div>
            <Label>Nomor Telepon</Label>
            <Input type="text" placeholder="+62 812 3456 7890" />
          </div>
          <div>
            <Label>Tanggal Lahir</Label>
            <Input type="date" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Job Info */}
          <div>
            <Label>ID Karyawan <span className="text-error-500">*</span></Label>
            <Input type="text" placeholder="EMP-000" />
          </div>
          <div>
            <Label>Departemen <span className="text-error-500">*</span></Label>
            <select className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400">
              <option value="">Pilih Departemen</option>
              <option value="IT">IT</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div>
            <Label>Posisi / Jabatan <span className="text-error-500">*</span></Label>
            <Input type="text" placeholder="Contoh: Software Engineer" />
          </div>
          <div>
            <Label>Tanggal Bergabung</Label>
            <Input type="date" />
          </div>
        </div>

        <div>
          <Label>Foto Profil</Label>
          <div className="mt-2">
             <DropzoneComponent />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Mendukung file PNG, JPG, JPEG ukuran maksimal 2MB.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <Button size="sm" variant="outline">
            Batal
          </Button>
          <Button size="sm">
            Simpan Karyawan
          </Button>
        </div>
      </form>
    </div>
  );
};

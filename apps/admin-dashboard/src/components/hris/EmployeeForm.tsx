"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import DropzoneComponent from "@/components/form/form-elements/DropZone";
import Select from "@/components/form/Select"; // Assuming there is a generic select, if not I will use normal select

import { supabase } from "@/lib/supabase";

export const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    departmentId: "",
    positionId: "",
    joinDate: "",
    employeeCode: "",
    gender: "male", // default
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [departments, setDepartments] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const depRes = await fetch("http://localhost:3002/api/departments");
        const depJson = await depRes.json();
        if (depJson.success) setDepartments(depJson.data);

        const posRes = await fetch("http://localhost:3002/api/positions");
        const posJson = await posRes.json();
        if (posJson.success) setPositions(posJson.data);
      } catch (err) {
        console.error("Failed to fetch master data", err);
      }
    };
    fetchMasterData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let avatarUrl = "";

      // 1. Upload to Supabase Storage if file exists
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `avatars/${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("avatars")
          .upload(filePath, file);

        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(filePath);
          
        avatarUrl = publicUrlData.publicUrl;
      }

      // 2. Submit to API
      const res = await fetch("http://localhost:3002/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          avatarUrl,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.message || resData.error || "Gagal menambahkan karyawan");
      }

      setSuccess("Karyawan berhasil ditambahkan!");
      setFormData({
        firstName: "", lastName: "", email: "", phone: "", birthDate: "",
        departmentId: "", positionId: "", joinDate: "", employeeCode: "", gender: "male"
      });
      setFile(null);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
      <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
        Informasi Karyawan Baru
      </h3>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}
      
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Personal Info */}
          <div>
            <Label>Nama Depan <span className="text-error-500">*</span></Label>
            <Input type="text" name="firstName" placeholder="Nama Depan" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <Label>Nama Belakang <span className="text-error-500">*</span></Label>
            <Input type="text" name="lastName" placeholder="Nama Belakang" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <Label>Email Pekerjaan <span className="text-error-500">*</span></Label>
            <Input type="email" name="email" placeholder="email@perusahaan.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <Label>Nomor Telepon</Label>
            <Input 
              type="text" 
              name="phone"
              placeholder="081234567890" 
              value={formData.phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div>
            <Label>Tanggal Lahir</Label>
            <Input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
          </div>
          <div>
            <Label>Jenis Kelamin</Label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400">
              <option value="male">Laki-Laki</option>
              <option value="female">Perempuan</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Job Info */}
          <div>
            <Label>ID Karyawan <span className="text-error-500">*</span></Label>
            <Input type="text" name="employeeCode" placeholder="EMP-000" value={formData.employeeCode} onChange={handleChange} required />
          </div>
          <div>
            <Label>Departemen <span className="text-error-500">*</span></Label>
            <select name="departmentId" value={formData.departmentId} onChange={handleChange} required className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400">
              <option value="">Pilih Departemen</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>{dep.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Posisi / Jabatan <span className="text-error-500">*</span></Label>
            <select name="positionId" value={formData.positionId} onChange={handleChange} required className="w-full h-11 px-4 py-2 text-sm text-gray-800 border border-gray-300 rounded-lg bg-transparent focus:border-brand-500 focus:outline-none dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-400">
              <option value="">Pilih Posisi</option>
              {positions
                // Jika sudah pilih departemen, filter posisi yang sesuai (opsional tapi bagus UX-nya)
                .filter(pos => !formData.departmentId || pos.departmentId === formData.departmentId)
                .map((pos) => (
                <option key={pos.id} value={pos.id}>{pos.name}</option>
              ))}
            </select>
          </div>
          <div>
            <Label>Tanggal Bergabung</Label>
            <Input type="date" name="joinDate" value={formData.joinDate} onChange={handleChange} required />
          </div>
        </div>

        <div>
          <Label>Foto Profil</Label>
          <div className="mt-2">
             <DropzoneComponent onFileSelect={setFile} />
             {file && <p className="text-sm mt-2 text-green-600">File terpilih: {file.name}</p>}
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Mendukung file PNG, JPG, JPEG ukuran maksimal 2MB.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <Button size="sm" variant="outline" type="button" onClick={() => window.history.back()}>
            Batal
          </Button>
          <Button size="sm" type="submit" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Karyawan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

# 🚀 HRIS Enterprise Platform (HRISCorp.dev)

[![Platform](https://img.shields.io/badge/Platform-HRISCorp.dev-blue.svg)](https://hriscorp.dev)
[![Version](https://img.shields.io/badge/Version-v1.0.0-green.svg)](#-metrik-dan-versi)
[![License](https://img.shields.io/badge/License-HRISCorp.dev%20Enterprise-orange.svg)](#-lisensi-resmi)
[![Monorepo](https://img.shields.io/badge/Monorepo-Turborepo-violet.svg)](#-struktur-monorepo)
[![Framework](https://img.shields.io/badge/Next.js-15.x-black.svg)](https://nextjs.org/)

**Author & Platform Creator:** Ahmad Arif  
**Official License:** HRISCorp.dev Commercial & Enterprise License  
**Official Portal:** [HRISCorp.dev](https://hriscorp.dev)  

---

## 📌 Gambaran Umum Proyek (Project Overview)

**HRIS Enterprise** (HRISCorp.dev) adalah sistem Manajemen Sumber Daya Manusia (*Human Resource Information System*) berskala enterprise yang mengelola seluruh siklus hidup karyawan (*Employee Lifecycle*) secara terintegrasi dan terpusat. 

Sistem ini mencakup rekrutmen kandidat (*ATS Kanban Board*), manajemen data karyawan & kontrak kerja, presensi berbasis *Geofencing GPS* & *Selfie Proof*, penggajian otomatis (*Auto-Deduction* keterlambatan & pph21), evaluasi kinerja 360 (*KPI Appraisals*), hingga proses *Offboarding & Clearance Aset*.

Aplikasi ini dibangun di atas arsitektur **Monorepo (Turborepo)** berkinerja tinggi serta menerapkan prinsip **Zero Hardcoded Master Data Policy** untuk fleksibilitas konfigurasi tanpa batas.

---

## ✨ Fitur Utama (Key Features)

### 🏢 1. Core HR & Employee Lifecycle
- **Dynamic Master Data:** Pengaturan departemen, jabatan, dan tipe status karyawan secara dinamis (`MASTER_STATUS`).
- **Employee Onboarding & Contract Management:** Pelacakan masa berlaku kontrak (PKWT/PKWTT) dan pengingat otomatis sebelum masa kontrak berakhir.
- **Offboarding & Asset Clearance:** Workflow penyerahan kembali aset perusahaan dan verifikasi tanda tangan digital saat *resignation*.

### ⏱️ 2. Presensi Geofencing GPS & Shift Roster
- **GPS Geofencing & Selfie Verification:** Validasi lokasi absensi karyawan dalam radius kantor yang ditentukan disertai bukti foto selfie.
- **Multi-Shift Roster & Shift Exchange:** Pengaturan jadwal kerja fleksibel (Shift Pagi, Siang, Malam) serta fitur pengajuan tukar shift antar karyawan.
- **Overtime & Leave Management:** Pengajuan dan persetujuan lembur & cuti bertingkat (Manager -> HRD).

### 💰 3. Automated Payroll & Financial Reimbursement
- **Engine Kalkulasi Gaji Otomatis:** Perhitungan komponen gaji pokok, tunjangan, insentif, serta pemotongan otomatis (*Auto-Deduction*) akibat keterlambatan presensi.
- **Slip Gaji Digital (PDF Payslip):** Generasi slip gaji digital terenkripsi yang dapat diunduh langsung oleh karyawan melalui portal ESS.
- **Reimbursement & Claim Workflow:** Pengajuan klaim medis, transportasi, dan operasional dengan lampiran bukti struk digital.

### 🎯 4. Performance Management (KPI 360 & Appraisals)
- **KPI Template Builder:** Penentuan *Key Performance Indicators* per departemen/jabatan.
- **Evaluasi 360 Derajat:** Penilaian kinerja tahunan/semesteran oleh Atasan (*Direct Supervisor*), Rekan Kerja (*Peers*), dan Diri Sendiri (*Self Appraisal*).

### 💼 5. Recruitment & Applicant Tracking System (ATS)
- **Kanban Pipeline Pelamar:** Pengelolaan status lamaran kerja berbasis drag-and-drop (*Applied*, *Screening*, *Interview*, *Offered*, *Hired*).
- **Portal Lowongan Kerja Publik:** Tampilan *Job Board* perusahaan terintegrasi.

---

## 🛠️ Tech Stack & Arsitektur Sistem

### Frontend Architecture
- **Framework Core:** Next.js (App Router), React 19, TypeScript
- **Styling & UI:** Tailwind CSS v4, HRISCorp.dev Design Intelligence System, Framer Motion
- **State Management:** Zustand (Modular store management)
- **Monorepo Build Engine:** Turborepo & Concurrently
- **Data Visualization & Components:** ApexCharts, FullCalendar, Flatpickr, React jvectormap, Shadcn UI
- **i18n & PWA Support:** Multi-language internationalization, Web App Manifest (`manifest.json`), Service Worker (`sw.js`)

### Backend & Infrastructure (Planned Integration)
- **API Server:** Node.js Express (TypeScript) dengan Clean Architecture
- **Database & Cache:** Supabase PostgreSQL, Prisma ORM (Wajib *Soft Delete* `deleted_at`), Redis Cache
- **Auth & Security:** Better Auth + JWT Token (Role-Based Access Control / RBAC)
- **Storage Strategy:** Supabase Storage Buckets (`public-assets`, `secure-documents`, `attendance-proofs`, `finance-attachments`)
- **Knowledge Graph:** Graphify (Automatic AST & Semantic Knowledge Graph Analysis)

---

## 📁 Struktur Workspace (Monorepo)

```text
HRIS/
├── apps/
│   ├── admin-dashboard/       # Dashboard Admin, HRD & Executive (Default Port: 3000)
│   └── employee-portal/       # Portal Mandiri Karyawan / ESS (Default Port: 3001)
├── packages/
│   └── ui/                    # Shared UI Components & Design System Tokens
├── graphify-out/              # Visualisasi Interaktif & Laporan Graphify Knowledge Graph
│   ├── graph.html             # Visualisator Graf HTML Interaktif
│   └── GRAPH_REPORT.md        # Laporan Audit & Struktur Komunitas Kode
├── .agents/
│   └── AGENTS.md              # Aturan Workflow & Git Policy untuk AI/Tim
├── PRD.md                     # Product Requirements Document (Spesifikasi ERD & Fitur Lengkap)
├── README.md                  # Dokumentasi & Panduan Utama HRISCorp.dev
└── package.json               # Konfigurasi Root Monorepo & Script Execution
```

---

## 🚀 Panduan Memulai (Getting Started)

### 1. Prasyarat Sistem
Pastikan perangkat Anda telah terpasang software berikut:
- **Node.js:** `>= 20.x` (Direkomendasikan Node 20 LTS atau Node 22)
- **npm:** `>= 10.x`
- **Git:** Terbaru

### 2. Kloning Repositori & Instalasi
```bash
# Kloning repositori
git clone https://github.com/AhmadArifff/HRIS.git

# Masuk ke direktori proyek
cd HRIS

# Instalasi seluruh dependensi monorepo
npm install
```

### 3. Konfigurasi Environment Variables (`.env`)
Buat file `.env` pada direktori root atau direktori aplikasi masing-masing (`apps/admin-dashboard` & `apps/employee-portal`) mengacu pada konfigurasi berikut:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Auth & Backend Secrets
JWT_SECRET=your-super-secret-jwt-key
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1

# App Domains
NEXT_PUBLIC_ADMIN_URL=http://localhost:3000
NEXT_PUBLIC_EMPLOYEE_URL=http://localhost:3001
```

### 4. Menjalankan Server Pengembangan (Dev Server)
Jalankan perintah berikut pada direktori root untuk menyalakan **Admin Dashboard** dan **Employee Portal** secara bersamaan:

```bash
npm run dev
```

Server akan berjalan pada URL berikut:
- **Admin Dashboard (HR & Executive):** `http://localhost:3000`
- **Employee Portal (ESS):** `http://localhost:3001`
- **Landing Page Publik:** `http://localhost:3000/landing`
- **Login Portal Multi-Role:** `http://localhost:3000/signin`

### 5. Script Tambahan
```bash
# Formatting kode menggunakan Prettier
npm run format

# Menjalankan linter untuk seluruh paket monorepo
npm run lint

# Membangun produksi bundle (Production Build)
npm run build
```

---

## 🎨 Standar UI/UX & Animasi (HRISCorp.dev Standard)

Aplikasi HRISCorp.dev menerapkan standar antarmuka premium dengan aturan UI/UX ketat:

1. **Prohibition of Native Dialogs:** Dilarang menggunakan `alert()`, `confirm()`, atau `prompt()` bawaan browser.
2. **Top-Right Floating Toast Notifications:** Seluruh notifikasi menggunakan kartu toast mengambang di pojok kanan atas yang dilengkapi **Animated Progress Bar Countdown Strip** menyusut dari 100% ke 0% (`toastProgressStrip 4000ms`).
3. **3D Book-Open & Book-Close Transitions:** Seluruh elemen Toast & Modal Dialog menggunakan efek animasi transisi 3D membuka sampul buku saat muncul (`bookOpenIn 450ms`) dan menutup sampul buku saat ditutup (`bookCloseOut 350ms`).

---

## 🧠 Graphify Knowledge Graph & Analisis Arsitektur

Proyek ini terintegrasi dengan **Graphify Knowledge Graph System** yang memetakan seluruh komponen kode, ketergantungan modul, dan relasi AST menjadi graf pengetahuan interaktif.

- **Melihat Visualisasi Graf:** Buka file `graphify-out/graph.html` langsung di browser Anda.
- **Melihat Laporan Audit Arsitektur:** Buka `graphify-out/GRAPH_REPORT.md`.
- **Menjalankan Incremental Analysis:**
  ```bash
  python -c "import graphify"
  ```

---

## 🔄 Aturan Kolaborasi Tim & Git Workflow Policy

Mengingat proyek dikembangkan secara kolaboratif bersama tim:

> [!IMPORTANT]
> **Mandatory Git Pull Before Push Policy:**
> Sebelum menjalankan perintah `git push`, setiap pengembang/AI Assistant **WAJIB** menjalankan `git pull origin dev` terlebih dahulu untuk mengintegrasikan commit terbaru dari anggota tim.

### Konvensi Commit
Gunakan konvensi Conventional Commits:
- `feat:` Penambahan fitur baru
- `fix:` Perbaikan bug
- `docs:` Pembaruan dokumentasi
- `style:` Penyesuaian tampilan/formatting tanpa mengubah logika
- `refactor:` Restrukturisasi kode tanpa mengubah fungsionalitas
- `chore:` Pembaruan dependensi atau konfigurasi build

---

## 📜 Lisensi Resmi & Hak Cipta (License & Copyright)

Hak Cipta © 2026 **Ahmad Arif** (HRISCorp.dev) — Seluruh Hak Cipta Dilindungi Undang-Undang.

Proyek ini dilisensikan secara eksklusif di bawah **[HRISCorp.dev Commercial & Enterprise License](LICENSE)** oleh **Ahmad Arif**. Penggunaan, redistribusi, komersialisasi, atau penggandaan tanpa izin tertulis dari **Ahmad Arif** tidak diperkenankan.

- **Author & Lead Developer:** Ahmad Arif
- **Official Platform:** [HRISCorp.dev](https://hriscorp.dev)
- **License Agreement:** [LICENSE](LICENSE)
- **Support & Inquiries:** `support@hriscorp.dev` / `ahmadarif@hriscorp.dev`


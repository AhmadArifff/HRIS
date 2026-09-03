# 🏢 HRISCorp.dev — Panduan Deployment Produksi 100% Vercel Monorepo

**Produk:** HRISCorp.dev Enterprise Human Resource Information System  
**Platform Deployment:** 100% Vercel Cloud Platform (Serverless Monorepo Architecture)  
**Database:** Supabase Cloud PostgreSQL (Port 6543 Transaction Pooler & Port 5432 Direct URL)  
**Infrastruktur Cache:** Upstash Redis (Serverless KV & Rate Limiting)  
**Versi:** v1.0.0 (Production-Ready)  
**Disusun Oleh:** Lead PM, QA, Frontend, & Backend Engineering Squad (`/pm`, `/qa`, `/frontend`, `/backend`)  

---

## 1. Arsitektur Deployment Vercel Monorepo

Sistem HRIS dikembangkan dengan arsitektur **Turborepo Monorepo** yang terbagi menjadi 3 project deployment independen di Vercel:

```
                          [ Pengguna / Admin / Karyawan ]
                                         │
                                         ▼
                             [ Vercel Edge Network ]
                 ┌───────────────────────┼───────────────────────┐
                 │                       │                       │
                 ▼                       ▼                       ▼
      [ Project 1: Backend ]    [ Project 2: Admin ]    [ Project 3: Employee ]
       Express Serverless API    Next.js 16 App Router   Next.js 15 PWA Portal
        (apps/backend-api)     (apps/admin-dashboard)   (apps/employee-portal)
                 │                       │                       │
                 └───────────────────────┴───────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
   [ Supabase Cloud PostgreSQL ]                      [ Upstash Redis Cloud ]
   • Port 6543 (Prisma Pooler)                        • Rate Limiting & Quota
   • Port 5432 (Direct / Migration)                   • Caching & Attendance Lock
   • S3 Storage (Avatar & CV)
```

---

## 2. Rincian Konfigurasi 3 Project di Vercel Dashboard

### Project 1: Backend API Serverless (`apps/backend-api`)
- **Nama Project di Vercel:** `hris-backend-api`
- **Root Directory:** `apps/backend-api`
- **Framework Preset:** `Other`
- **Install Command:** `cd ../.. && npm install`
- **Build Command:** `npx prisma generate --schema=../../packages/database/prisma/schema.prisma && npm run build`
- **Output Directory:** `.`
- **Entrypoint:** `api/index.ts` (menjalankan Express melalui Serverless Function handler)

#### Environment Variables Backend:
| Variable Key | Deskripsi |
| :--- | :--- |
| `DATABASE_URL` | Koneksi database Supabase Pooler Port 6543 (`?pgbouncer=true`) |
| `DIRECT_URL` | Koneksi direct Supabase Port 5432 untuk Prisma client |
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase Cloud |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key untuk bypass RLS pada operasi backend terproteksi |
| `REDIS_URL` | URL koneksi Upstash Redis (`rediss://...`) |
| `JWT_ACCESS_SECRET` | Secret key penandatanganan access token |
| `JWT_REFRESH_SECRET` | Secret key rotasi refresh token |
| `CORS_ORIGIN` | `*` atau domain admin dashboard & employee portal |

---

### Project 2: Admin Dashboard (`apps/admin-dashboard`)
- **Nama Project di Vercel:** `hris-admin-dashboard`
- **Root Directory:** `apps/admin-dashboard`
- **Framework Preset:** `Next.js`
- **Install Command:** `cd ../.. && npm install`
- **Build Command:** `cd ../.. && npx prisma generate --schema=packages/database/prisma/schema.prisma && npx turbo run build --filter=admin-dashboard...`
- **Output Directory:** `.next`

#### Environment Variables Admin Dashboard:
| Variable Key | Deskripsi |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | URL publik backend Vercel (contoh: `https://hris-backend-api.vercel.app`) |
| `NEXT_PUBLIC_APP_URL` | URL publik dashboard admin (contoh: `https://hris-admin.vercel.app`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Endpoint Supabase Storage untuk upload avatar & dokumen |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon public key Supabase |

---

### Project 3: Employee Portal PWA (`apps/employee-portal`)
- **Nama Project di Vercel:** `hris-employee-portal`
- **Root Directory:** `apps/employee-portal`
- **Framework Preset:** `Next.js`
- **Install Command:** `cd ../.. && npm install`
- **Build Command:** `cd ../.. && npx prisma generate --schema=packages/database/prisma/schema.prisma && npx turbo run build --filter=employee-portal...`
- **Output Directory:** `.next`

#### Environment Variables Employee Portal:
| Variable Key | Deskripsi |
| :--- | :--- |
| `NEXT_PUBLIC_API_URL` | URL publik backend Vercel (contoh: `https://hris-backend-api.vercel.app`) |
| `NEXT_PUBLIC_APP_URL` | URL publik portal karyawan (contoh: `https://hris-employee.vercel.app`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Endpoint Supabase Storage untuk upload surat cuti dokter & bukti reimbursement |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon public key Supabase |

---

## 3. Langkah-Langkah Deployment Vercel (Step-by-Step)

### Langkah 1: Hubungkan Repositori ke Vercel
1. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan klik **"Add New..." -> "Project"**.
2. Pilih repository GitHub: **`AhmadArifff/HRIS`**.

### Langkah 2: Deploy Project 1 (Backend API)
1. Pilih **Root Directory:** `apps/backend-api`.
2. Buka bagian **Build and Output Settings**, aktifkan Override:
   - **Install Command:** `cd ../.. && npm install`
   - **Build Command:** `npx prisma generate --schema=../../packages/database/prisma/schema.prisma && npm run build`
3. Masukkan seluruh Environment Variables Backend dari `VERCEL_ENV_SETUP.md`.
4. Klik **Deploy** dan tunggu proses build selesai.
5. Catat URL deployment yang didapat (misal: `https://hris-backend-api.vercel.app`).

### Langkah 3: Deploy Project 2 (Admin Dashboard)
1. Kembali ke Vercel Dashboard -> **"Add New..." -> "Project"**.
2. Pilih repository yang sama: `AhmadArifff/HRIS`.
3. Pilih **Root Directory:** `apps/admin-dashboard`.
4. Aktifkan Override pada **Build Command**:
   - `cd ../.. && npx prisma generate --schema=packages/database/prisma/schema.prisma && npx turbo run build --filter=admin-dashboard...`
5. Masukkan Environment Variables Admin Dashboard:
   - Pastikan `NEXT_PUBLIC_API_URL` diisi dengan URL hasil Langkah 2!
6. Klik **Deploy**.

### Langkah 4: Deploy Project 3 (Employee Portal)
1. Ulangi import project untuk **Root Directory:** `apps/employee-portal`.
2. Aktifkan Override pada **Build Command**:
   - `cd ../.. && npx prisma generate --schema=packages/database/prisma/schema.prisma && npx turbo run build --filter=employee-portal...`
3. Masukkan Environment Variables Employee Portal:
   - Pastikan `NEXT_PUBLIC_API_URL` diisi dengan URL backend.
4. Klik **Deploy**.

---

## 4. Troubleshooting & Best Practices

1. **Supabase Connection Limit / PGBouncer:**
   - Gunakan selalu port `6543` dengan flag `?pgbouncer=true` pada `DATABASE_URL` di environment Vercel untuk mencegah habisnya pool koneksi PostgreSQL serverless.
2. **Prisma Client Not Generated on Vercel:**
   - Selalu sertakan `npx prisma generate` di dalam build command sebelum menjalankan `turbo run build`.
3. **CORS Issues:**
   - Di `apps/backend-api`, pastikan `CORS_ORIGIN` diatur mengizinkan domain Vercel admin dan employee portal, atau gunakan `*`.
4. **Upstash Redis Quota:**
   - Backend memantau kuota Upstash secara real-time melalui endpoint `/api/infrastructure/redis` yang divisualisasikan pada halaman Admin Dashboard Infrastructure Monitor.

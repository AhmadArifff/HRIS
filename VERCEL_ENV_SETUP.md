# 🚀 Panduan Environment Variables 3 Project Vercel (Monorepo HRISCorp.dev)

Dalam arsitektur Monorepo Turborepo HRIS, Vercel memisahkan aplikasi menjadi **3 Project Deployment Terpisah**:
1. ⚙️ **Project 1: Backend API (`apps/backend-api`)** — Serverless REST API Express, Prisma ORM, dan Upstash Redis.
2. 🖥️ **Project 2: Admin Dashboard (`apps/admin-dashboard`)** — Next.js 16 App Router Enterprise HR Admin Portal.
3. 📱 **Project 3: Employee Portal (`apps/employee-portal`)** — Next.js 15 PWA Employee Self-Service & Face-API AI Attendance.

Masing-masing project memiliki form **Environment Variables** tersendiri di Vercel Dashboard.

---

## ⚙️ PROJECT 1: BACKEND API (`apps/backend-api`)

Saat mengimpor project Backend di Vercel:
- **Root Directory:** `apps/backend-api`
- **Framework Preset:** `Other`
- **Build Command:** `npx prisma generate --schema=../../packages/database/prisma/schema.prisma && npm run build`
- **Install Command:** `cd ../.. && npm install`
- **Output Directory:** `.`

### 📋 Salin Cepat `.env` Backend (Tinggal Paste di Form Vercel Backend):

```env
DATABASE_URL=postgresql://postgres.guuehpjrhcgqjphebrtb:8%3Fs4FQrzmF%3FpP%2B4@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.guuehpjrhcgqjphebrtb:8%3Fs4FQrzmF%3FpP%2B4@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://guuehpjrhcgqjphebrtb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dWVocGpyaGNncWpwaGVicnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MTc0NzAsImV4cCI6MjEwMTQ5MzQ3MH0.cPBmmh2XF7PsCtJU82REYwLYntP0gMuaU6LVy2xVg1w
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dWVocGpyaGNncWpwaGVicnRiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTkxNzQ3MCwiZXhwIjoyMTAxNDkzNDcwfQ.D8PHDjF-aqh3MoDNKk_qKxe9hcgcL9Ykf9ZAUrpxJL4
REDIS_URL=rediss://default:gQAAAAAAAeHHAAIgcDEyNmJlOTBiMjA2NWE0MzYxODc2MTAwNTdhMWQ2OGUzOA@legible-trout-123335.upstash.io:6379
JWT_ACCESS_SECRET=GWsOpWelX88hvCiAB4IPwaD5Fk8mtQzGPmBCDWJ77FI
JWT_REFRESH_SECRET=Y3oUIoXX39LC7uTWXzvplhAUiPvD3JgAMO0xCHqi3An
PORT=3002
CORS_ORIGIN=*
```

### 📑 Tabel Rincian Variabel Backend (`apps/backend-api`):

| Key Variabel | Nilai Resmi | Kegunaan |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres.guuehpjrhcgqjphebrtb:...@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true` | Koneksi database Supabase Transaction Pooler Port 6543 |
| `DIRECT_URL` | `postgresql://postgres.guuehpjrhcgqjphebrtb:...@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres` | Koneksi direct Supabase untuk Prisma migration & introspeksi |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://guuehpjrhcgqjphebrtb.supabase.co` | Endpoint utama API & Storage Supabase Cloud |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Kunci akses bypass RLS untuk operasi backend terpercaya |
| `REDIS_URL` | `rediss://default:...@legible-trout-123335.upstash.io:6379` | Koneksi Upstash Redis untuk caching, metrics, & rate limiting |
| `JWT_ACCESS_SECRET` | `GWsOpWelX88...` | Kunci enkripsi JWT token akses pengguna |
| `JWT_REFRESH_SECRET` | `Y3oUIoXX39...` | Kunci enkripsi refresh token rotasi |
| `CORS_ORIGIN` | `*` *(atau daftar URL domain frontend Anda)* | Mengizinkan permintaan HTTP dari aplikasi frontend |

---

## 🖥️ PROJECT 2: ADMIN DASHBOARD (`apps/admin-dashboard`)

Saat mengimpor project Admin Dashboard di Vercel:
- **Root Directory:** `apps/admin-dashboard`
- **Framework Preset:** `Next.js`
- **Build Command:** `cd ../.. && npx prisma generate --schema=packages/database/prisma/schema.prisma && npx turbo run build --filter=admin-dashboard...`
- **Output Directory:** `.next`

### 📋 Salin Cepat `.env` Admin Dashboard:

> [!TIP]
> Ganti `https://hris-backend-api.vercel.app` dengan URL domain resmi backend yang Anda dapatkan setelah Project 1 Backend selesai dideploy!

```env
NEXT_PUBLIC_API_URL=https://hris-backend-api.vercel.app
NEXT_PUBLIC_APP_URL=https://hris-admin.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://guuehpjrhcgqjphebrtb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dWVocGpyaGNncWpwaGVicnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MTc0NzAsImV4cCI6MjEwMTQ5MzQ3MH0.cPBmmh2XF7PsCtJU82REYwLYntP0gMuaU6LVy2xVg1w
```

### 📑 Tabel Rincian Variabel Admin Dashboard (`apps/admin-dashboard`):

| Key Variabel | Nilai Resmi | Kegunaan |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `https://hris-backend-api.vercel.app` *(sesuaikan domain backend)* | Alamat API Backend untuk request data karyawan, absensi, master data, dsb |
| `NEXT_PUBLIC_APP_URL` | `https://hris-admin.vercel.app` | URL domain publik portal admin |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://guuehpjrhcgqjphebrtb.supabase.co` | Akses upload foto profil & file resume ke Supabase Storage |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Kunci otentikasi publik Supabase client |

---

## 📱 PROJECT 3: EMPLOYEE PORTAL (`apps/employee-portal`)

Saat mengimpor project Employee Portal di Vercel:
- **Root Directory:** `apps/employee-portal`
- **Framework Preset:** `Next.js`
- **Build Command:** `cd ../.. && npx prisma generate --schema=packages/database/prisma/schema.prisma && npx turbo run build --filter=employee-portal...`
- **Output Directory:** `.next`

### 📋 Salin Cepat `.env` Employee Portal:

```env
NEXT_PUBLIC_API_URL=https://hris-backend-api.vercel.app
NEXT_PUBLIC_APP_URL=https://hris-employee.vercel.app
NEXT_PUBLIC_SUPABASE_URL=https://guuehpjrhcgqjphebrtb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1dWVocGpyaGNncWpwaGVicnRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MTc0NzAsImV4cCI6MjEwMTQ5MzQ3MH0.cPBmmh2XF7PsCtJU82REYwLYntP0gMuaU6LVy2xVg1w
```

---

## 🧭 Urutan Deploy yang Disarankan di Vercel:

1. **Deploy Backend API Terlebih Dahulu (`apps/backend-api`):**
   - Import repository GitHub `AhmadArifff/HRIS`.
   - Pilih Root Directory: `apps/backend-api`.
   - Masukkan Environment Variables **Project 1** -> Klik **Deploy**.
   - Catat URL hasil deploy backend (contoh: `https://hris-backend-api.vercel.app`).
2. **Deploy Admin Dashboard (`apps/admin-dashboard`):**
   - Import repository yang sama, pilih Root Directory: `apps/admin-dashboard`.
   - Masukkan Environment Variables **Project 2** (pastikan `NEXT_PUBLIC_API_URL` mengarah ke URL backend hasil langkah 1) -> Klik **Deploy**.
3. **Deploy Employee Portal (`apps/employee-portal`):**
   - Import repository yang sama, pilih Root Directory: `apps/employee-portal`.
   - Masukkan Environment Variables **Project 3** (pastikan `NEXT_PUBLIC_API_URL` mengarah ke URL backend hasil langkah 1) -> Klik **Deploy**.
4. **Selesai!** Seluruh ekosistem HRIS Monorepo kini aktif dan terhubung 24/7 di Vercel! 🎉

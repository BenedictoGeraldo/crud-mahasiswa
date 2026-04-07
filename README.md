# SIMM - Sistem Informasi Manajemen Mahasiswa

Frontend SIMM untuk technical test Frontend Engineer, dibangun dengan Next.js App Router, TypeScript, Tailwind CSS, MUI, React Hook Form, Zod, Axios, dan Zustand.

## Fitur Utama

- Autentikasi: login dan register.
- Manajemen mahasiswa: list, detail, create, edit, delete.
- Pencarian mahasiswa berdasarkan NIM atau email.
- Pagination pada daftar mahasiswa.
- Manajemen profil user yang sedang login.
- Mock data lokal berbasis JSON dengan alur API.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript.
- Tailwind CSS (layout/page styling) + MUI (UI primitives seperti Table, Button, Dialog, TextField, Alert, Pagination).
- React Hook Form + Zod untuk form handling dan validasi.
- Axios untuk HTTP client wrapper.
- Zustand untuk state lintas halaman (autentikasi/profil).

## Cara Menjalankan Aplikasi

### Prasyarat

- Node.js 20+ direkomendasikan.
- npm (default package manager pada proyek ini).

### Langkah

1. Install dependency

```bash
npm install
```

2. Jalankan development server

```bash
npm run dev
```

3. Buka aplikasi

- http://localhost:3000

## Akun Uji

- Bisa langsung register dari halaman /register.
- Bisa juga menggunakan user yang sudah ada di data mock pada src/data/mock/users.json.

## Arsitektur Singkat

Proyek mengikuti pendekatan feature-based + App Router:

- Routing page ada di src/app.
- Domain logic dipisah per fitur di src/features (auth, mahasiswa, profile).
- UI reusable/primitive diletakkan di src/components dan src/components/ui.
- HTTP client terpusat di src/lib/axios/client.ts.
- Kontrak respons API distandarkan di src/types/api.ts dan formatter di src/lib/api-response/formatter.ts.
- State global minimal menggunakan Zustand di src/stores.

Alur data utama:

1. UI component memanggil hook fitur.
2. Hook memanggil service (bukan langsung Axios di komponen).
3. Service memanggil Next.js Route Handler internal (/api/...).
4. Route Handler membaca/menulis mock JSON pada src/data/mock.
5. Respons dibungkus format API konsisten (success, message, data, errors, meta).

## Keputusan Teknis yang Diambil

### 1) App Router + pemisahan Server/Client Component

- Halaman tetap tipis, fokus composition.
- Interaksi form/table/search/dialog ditempatkan di Client Component dan custom hook.
- Memudahkan maintainability dan pengembangan bertahap.

### 2) Service layer sebagai boundary data access

- UI tidak tahu detail HTTP transport.
- Jika nanti pindah dari mock internal API ke backend eksternal, perubahan utama cukup di layer service/HTTP client.

### 3) Mock data via Route Handler (bukan hardcoded di halaman)

- Menjaga pengalaman pengembangan mendekati real API.
- Struktur payload/error/pagination sudah menyerupai integrasi produksi.

### 4) Validasi berlapis

- Frontend: React Hook Form + Zod untuk UX cepat dan error message terarah.
- Backend mock (Route Handler): validasi ulang untuk menjaga konsistensi data.

### 5) Strategi autentikasi sederhana untuk demo

- Token disimpan di localStorage + cookie expiry untuk proteksi route berbasis middleware.
- Middleware mengamankan route /mahasiswa dan /profile serta redirect halaman auth jika user sudah login.

## Struktur Direktori Inti

```text
src/
	app/                # Route, layout, dan route handlers /api
	features/           # Domain module: auth, mahasiswa, profile
	components/         # Shared components/UI primitives
	lib/                # Axios client, formatter API, utils
	stores/             # Zustand stores lintas fitur
	data/mock/          # Dummy JSON data source
```

## Catatan

- Data pada src/data/mock/\*.json bersifat mutable saat create/edit/delete.
- Jika ingin reset data ke kondisi awal, kembalikan file JSON mock ke versi awal repository.

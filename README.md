# 🌙 Sistem Informasi Manajemen Panti Asuhan (SIM Panti)

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-Compatible-000000?style=for-the-badge&logo=shadcnui)

Platform manajemen panti asuhan modern berbasis web dengan desain **Islamic Minimalist**. Dibangun untuk memudahkan administrasi, pengelolaan donasi, data anak asuh, dan laporan keuangan secara transparan dan efisien.

---

## ✨ Fitur Utama

Aplikasi ini dirancang khusus sebagai **Admin-Only System** dengan fitur lengkap:

### 📊 Dashboard Eksekutif
- Ringkasan real-time total donasi, pengeluaran, dan jumlah anak asuh.
- Grafik visualisasi keuangan interaktif (Chart.js / Recharts).
- Notifikasi dan aktivitas terbaru.

### 👥 Manajemen Data
- **Data Anak Asuh**: Biodata lengkap, status aktif, dan manajemen dokumen/foto.
- **Manajemen Donatur**: Database donatur terintegrasi untuk pencatatan riwayat donasi.
- **Manajemen User**: Role-based access control (RBAC) untuk keamanan sistem.

### 💰 Keuangan & Laporan
- **Input Donasi**: Form pencatatan donasi masuk yang terhubung langsung ke donatur.
- **Pencatatan Pengeluaran**: Tracking biaya operasional dengan kategori dan tanggal.
- **Laporan Otomatis**: Rekapitulasi keuangan yang dapat difilter per periode dan siap cetak (Export PDF/Excel).

### 📰 Informasi & Publikasi
- Manajemen berita dan pengumuman kegiatan panti.
- Tampilan responsif yang nyaman diakses dari perangkat mobile maupun desktop.

---

## 🛠️ Teknologi yang Digunakan

Project ini dibangun menggunakan stack teknologi modern untuk performa dan skalabilitas terbaik:

- **Frontend Core**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn/ui](https://ui.shadcn.com/) & Radix UI
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/) / Chart.js
- **Form Handling**: React Hook Form

---

## 🚀 Cara Instalasi

Ikuti langkah-langkah berikut untuk menjalankan project di komputer lokal Anda:

### 1. Prasyarat
Pastikan Anda sudah menginstall [Node.js](https://nodejs.org/) (versi 18 atau terbaru).

### 2. Clone & Install
```bash
# Install dependencies
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

### 4. Build untuk Produksi
```bash
npm run build
npm start
```

---

## 📂 Struktur Project

```
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── dashboard/        # Halaman Admin Dashboard
│   ├── auth/             # Halaman Login/Auth
│   └── ...
├── components/           # Komponen UI Reusable
│   ├── ui/               # Komponen Shadcn (Button, Card, Input, dll)
│   ├── layout/           # Sidebar, Navbar, dll
│   └── ...
├── data/                 # Mock Data untuk Development
├── lib/                  # Utilitas dan Helper functions
└── public/               # Aset statis (Gambar, Icon)
```

---

## 📝 Lisensi

Project ini dibuat untuk tujuan manajemen panti asuhan. Hak cipta dilindungi.

---
*Dibuat dengan ❤️ untuk kemaslahatan umat.*

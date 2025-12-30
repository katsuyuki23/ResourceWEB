import type { User, Donatur, Donasi, Pengeluaran, Anak, Berita, Role, Notification } from '@/types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Ahmad Fauzi',
    email: 'admin@panti.com',
    password: 'admin123',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=059669&color=fff',
    createdAt: new Date('2023-01-15'),
    lastLogin: new Date()
  },
  {
    id: '2',
    name: 'Fatimah Zahra',
    email: 'operator@panti.com',
    password: 'operator123',
    role: 'operator',
    avatar: 'https://ui-avatars.com/api/?name=Fatimah+Zahra&background=D97706&color=fff',
    createdAt: new Date('2023-03-20')
  },
  {
    id: '3',
    name: 'Hasan Rahman',
    email: 'viewer@panti.com',
    password: 'viewer123',
    role: 'viewer',
    avatar: 'https://ui-avatars.com/api/?name=Hasan+Rahman&background=6366f1&color=fff',
    createdAt: new Date('2023-06-10')
  }
];

// Mock Roles
export const roles: Role[] = [
  {
    id: '1',
    name: 'admin',
    description: 'Administrator with full access',
    permissions: ['create', 'read', 'update', 'delete', 'manage_users', 'export', 'approve']
  },
  {
    id: '2',
    name: 'operator',
    description: 'Can manage data but not users',
    permissions: ['create', 'read', 'update', 'delete', 'export']
  },
  {
    id: '3',
    name: 'viewer',
    description: 'Read-only access',
    permissions: ['read']
  }
];

// Mock Donatur
export const donaturs: Donatur[] = [
  {
    id: '1',
    nama: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    phone: '081234567890',
    alamat: 'Jl. Sudirman No. 123, Jakarta Pusat',
    kategori: 'perorangan',
    status: 'aktif',
    totalDonasi: 15000000,
    createdAt: new Date('2023-01-10'),
    catatan: 'Donatur tetap sejak 2020'
  },
  {
    id: '2',
    nama: 'PT. Amanah Sejahtera',
    email: 'info@amanahsejahtera.co.id',
    phone: '0215551234',
    alamat: 'Jl. Thamrin No. 45, Jakarta',
    kategori: 'perusahaan',
    status: 'aktif',
    totalDonasi: 50000000,
    createdAt: new Date('2023-02-15'),
    catatan: 'Corporate CSR program'
  },
  {
    id: '3',
    nama: 'Yayasan Cahaya Ummat',
    email: 'admin@cahayaummat.org',
    phone: '0221234567',
    alamat: 'Jl. Braga No. 78, Bandung',
    kategori: 'lembaga',
    status: 'aktif',
    totalDonasi: 25000000,
    createdAt: new Date('2023-03-20')
  },
  {
    id: '4',
    nama: 'Siti Aminah',
    email: 'siti.aminah@email.com',
    phone: '089876543210',
    alamat: 'Jl. Diponegoro No. 56, Surabaya',
    kategori: 'perorangan',
    status: 'aktif',
    totalDonasi: 7500000,
    createdAt: new Date('2023-04-05')
  },
  {
    id: '5',
    nama: 'Haji Abdul Karim',
    email: 'h.abdulkarim@email.com',
    phone: '08111222333',
    alamat: 'Jl. Veteran No. 12, Yogyakarta',
    kategori: 'perorangan',
    status: 'non-aktif',
    totalDonasi: 30000000,
    createdAt: new Date('2022-11-20')
  }
];

// Mock Donasi
export const donasis: Donasi[] = [
  {
    id: '1',
    donaturId: '1',
    jumlah: 500000,
    tanggal: new Date('2024-11-01'),
    kategori: 'zakat',
    metode: 'transfer',
    status: 'terverifikasi',
    keterangan: 'Zakat mal November 2024'
  },
  {
    id: '2',
    donaturId: '2',
    jumlah: 10000000,
    tanggal: new Date('2024-11-05'),
    kategori: 'infaq',
    metode: 'transfer',
    status: 'terverifikasi',
    keterangan: 'CSR Q4 2024'
  },
  {
    id: '3',
    donaturId: '3',
    jumlah: 5000000,
    tanggal: new Date('2024-11-10'),
    kategori: 'wakaf',
    metode: 'transfer',
    status: 'terverifikasi',
    keterangan: 'Wakaf untuk pembangunan mushola'
  },
  {
    id: '4',
    donaturId: '4',
    jumlah: 250000,
    tanggal: new Date('2024-11-15'),
    kategori: 'sedekah',
    metode: 'tunai',
    status: 'pending',
    keterangan: 'Sedekah Jum\'at'
  },
  {
    id: '5',
    donaturId: '1',
    jumlah: 1000000,
    tanggal: new Date('2024-11-20'),
    kategori: 'infaq',
    metode: 'online',
    status: 'terverifikasi',
    keterangan: 'Infaq harian'
  }
];

// Mock Pengeluaran
export const pengeluarans: Pengeluaran[] = [
  {
    id: '1',
    jumlah: 2500000,
    tanggal: new Date('2024-11-01'),
    kategori: 'makanan',
    keterangan: 'Belanja bulanan bahan makanan',
    approvedBy: 'Ahmad Fauzi'
  },
  {
    id: '2',
    jumlah: 1500000,
    tanggal: new Date('2024-11-05'),
    kategori: 'pendidikan',
    keterangan: 'Seragam sekolah dan alat tulis',
    approvedBy: 'Ahmad Fauzi'
  },
  {
    id: '3',
    jumlah: 800000,
    tanggal: new Date('2024-11-10'),
    kategori: 'kesehatan',
    keterangan: 'Pemeriksaan rutin anak-anak',
    approvedBy: 'Fatimah Zahra'
  },
  {
    id: '4',
    jumlah: 1200000,
    tanggal: new Date('2024-11-15'),
    kategori: 'utilitas',
    keterangan: 'Tagihan listrik dan air bulan November',
    approvedBy: 'Ahmad Fauzi'
  },
  {
    id: '5',
    jumlah: 500000,
    tanggal: new Date('2024-11-20'),
    kategori: 'perlengkapan',
    keterangan: 'Kasur dan bantal baru',
    approvedBy: 'Fatimah Zahra'
  }
];

// Mock Anak
export const anaks: Anak[] = [
  {
    id: '1',
    nama: 'Muhammad Rizki',
    nickname: 'Rizki',
    tanggalLahir: new Date('2012-03-15'),
    jenisKelamin: 'laki',
    status: 'aktif',
    foto: 'https://ui-avatars.com/api/?name=Muhammad+Rizki&background=059669&color=fff&size=200',
    pendidikan: 'SD',
    kelas: '6',
    hobi: 'Bermain bola',
    kesehatan: 'Sehat',
    masukTanggal: new Date('2018-06-01'),
    wali: 'Sdr. Ahmad (Paman)'
  },
  {
    id: '2',
    nama: 'Aisyah Putri',
    nickname: 'Aisyah',
    tanggalLahir: new Date('2014-07-22'),
    jenisKelamin: 'perempuan',
    status: 'aktif',
    foto: 'https://ui-avatars.com/api/?name=Aisyah+Putri&background=D97706&color=fff&size=200',
    pendidikan: 'SD',
    kelas: '4',
    hobi: 'Membaca buku',
    kesehatan: 'Sehat',
    masukTanggal: new Date('2019-02-15'),
    wali: 'Ibu Fatimah (Bibi)'
  },
  {
    id: '3',
    nama: 'Abdul Hakim',
    nickname: 'Hakim',
    tanggalLahir: new Date('2010-11-08'),
    jenisKelamin: 'laki',
    status: 'aktif',
    foto: 'https://ui-avatars.com/api/?name=Abdul+Hakim&background=6366f1&color=fff&size=200',
    pendidikan: 'SMP',
    kelas: '9',
    hobi: 'Komputer',
    kesehatan: 'Sehat',
    masukTanggal: new Date('2016-09-10'),
    catatan: 'Anak berprestasi akademik'
  },
  {
    id: '4',
    nama: 'Nurul Huda',
    nickname: 'Nurul',
    tanggalLahir: new Date('2015-05-30'),
    jenisKelamin: 'perempuan',
    status: 'aktif',
    foto: 'https://ui-avatars.com/api/?name=Nurul+Huda&background=EC4899&color=fff&size=200',
    pendidikan: 'SD',
    kelas: '5',
    hobi: 'Menyanyi',
    kesehatan: 'Sehat',
    masukTanggal: new Date('2020-01-20')
  },
  {
    id: '5',
    nama: 'Ibrahim Maulana',
    nickname: 'Ibrahim',
    tanggalLahir: new Date('2018-09-12'),
    jenisKelamin: 'laki',
    status: 'aktif',
    foto: 'https://ui-avatars.com/api/?name=Ibrahim+Maulana&background=14B8A6&color=fff&size=200',
    pendidikan: 'TK',
    kelas: 'B',
    hobi: 'Menggambar',
    kesehatan: 'Sehat',
    masukTanggal: new Date('2022-03-15')
  },
  {
    id: '6',
    nama: 'Khadijah Amalia',
    nickname: 'Khadijah',
    tanggalLahir: new Date('2013-02-28'),
    jenisKelamin: 'perempuan',
    status: 'dias大家庭',
    foto: 'https://ui-avatars.com/api/?name=Khadijah+Amalia&background=F59E0B&color=fff&size=200',
    pendidikan: 'SMP',
    kelas: '7',
    hobi: 'Olahraga',
    kesehatan: 'Sehat',
    masukTanggal: new Date('2017-08-25'),
    catatan: 'Mengikuti program asuh keluarga'
  }
];

// Mock Berita
export const beritas: Berita[] = [
  {
    id: '1',
    judul: 'Panti Asuhan Santri Al-Falah Rayakan Hari Raya Idul Adha',
    konten: 'Panti Asuhan Santri Al-Falah mengadakan perayaan Hari Raya Idul Adha dengan menyembelih 3 ekor sapi dan membagikan daging kepada 150 mustahiq. Acara berlangsung khidmat dengan kehadiran donatur dan relawan.',
    kategori: 'kegiatan',
    status: 'published',
    penulis: 'Ahmad Fauzi',
    tanggal: new Date('2024-10-16'),
    gambar: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800'
  },
  {
    id: '2',
    judul: 'Penggalangan Dana Pembangunan Mushola Baru',
    konten: 'Panti Asuhan Santri Al-Falah mengajak para donatur untuk berpartisipasi dalam pembangunan mushola baru. Dana yang dikumpulkan akan digunakan untuk membangun fasilitas ibadah yang memadai bagi 50-an anak asuh.',
    kategori: 'pengumuman',
    status: 'published',
    penulis: 'Fatimah Zahra',
    tanggal: new Date('2024-11-01'),
    gambar: 'https://images.unsplash.com/photo-1569823773415-f3b656e6b91f?w=800'
  },
  {
    id: '3',
    judul: 'Prestasi Akademik: 5 Anak Asuh Raih Nilai Tertinggi di Sekolah',
    konten: 'Lima anak asuh Panti Asuhan Santri Al-Falah berhasil meraih peringkat tertinggi di sekolah masing-masing. Keberhasilan ini menjadi motivasi bagi anak-anak lainnya untuk terus semangat belajar.',
    kategori: 'berita',
    status: 'published',
    penulis: 'Hasan Rahman',
    tanggal: new Date('2024-11-10'),
    gambar: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800'
  }
];

// Notifications
export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Donasi Baru',
    message: 'PT. Amanah Sejahtera telah mendonasikan Rp 10.000.000',
    type: 'success',
    read: false,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Pengeluaran Menunggu Persetujuan',
    message: 'Ada 2 pengeluaran yang menunggu persetujuan Anda',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 3600000)
  },
  {
    id: '3',
    title: 'Anak Asuh Ulang Tahun',
    message: 'Muhammad Rizki berulang tahun hari ini',
    type: 'info',
    read: true,
    createdAt: new Date(Date.now() - 86400000)
  }
];

// Helper functions
export function getDonaturById(id: string): Donatur | undefined {
  return donaturs.find(d => d.id === id);
}

export function getAnakById(id: string): Anak | undefined {
  return anaks.find(a => a.id === id);
}

export function getDonasiByDonaturId(donaturId: string): Donasi[] {
  return donasis.filter(d => d.donaturId === donaturId);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

export function formatShortDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}


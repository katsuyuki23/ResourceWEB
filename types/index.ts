// Type definitions for the orphanage management system

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'operator' | 'viewer';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface Donatur {
  id: string;
  nama: string;
  email: string;
  phone: string;
  alamat: string;
  kategori: 'perorangan' | 'lembaga' | 'perusahaan';
  status: 'aktif' | 'non-aktif';
  totalDonasi: number;
  createdAt: Date;
  catatan?: string;
}

export interface Donasi {
  id: string;
  donaturId: string;
  donatur?: Donatur;
  jumlah: number;
  tanggal: Date;
  kategori: 'zakat' | 'infaq' | 'sedekah' | 'wakaf' | 'lainnya';
  metode: 'tunai' | 'transfer' | 'online';
  status: 'terverifikasi' | 'pending' | 'ditolak';
  keterangan?: string;
  createdAt: Date;
}

export interface Pengeluaran {
  id: string;
  jumlah: number;
  tanggal: Date;
  kategori: 'makanan' | 'pendidikan' | 'kesehatan' | 'pakaian' | 'utilitas' | 'perlengkapan' | 'lainnya';
  keterangan: string;
  nota?: string;
  approvedBy?: string;
  createdAt: Date;
}

export interface Anak {
  id: string;
  nama: string;
  nickname?: string;
  tanggalLahir: Date;
  jenisKelamin: 'laki' | 'perempuan';
  status: 'aktif' | 'non-aktif' | 'dias大家庭' | 'menikah';
  foto?: string;
  pendidikan: string;
  kelas?: string;
  hobi?: string;
  kesehatan?: string;
  masukTanggal: Date;
  keluarTanggal?: Date;
  wali?: string;
  catatan?: string;
}

export interface Berita {
  id: string;
  judul: string;
  konten: string;
  kategori: 'berita' | 'pengumuman' | 'kegiatan';
  status: 'published' | 'draft';
  penulis: string;
  tanggal: Date;
  gambar?: string;
}

export interface DashboardStats {
  totalDonasi: number;
  totalPengeluaran: number;
  totalAnak: number;
  totalDonatur: number;
  donasiBulanIni: number;
  pengeluaranBulanIni: number;
  donasiTrend: number;
  pengeluaranTrend: number;
}

export interface Transaksi {
  id: string;
  type: 'pemasukan' | 'pengeluaran';
  kategori: string;
  jumlah: number;
  tanggal: Date;
  keterangan: string;
  relatedId?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  read: boolean;
  createdAt: Date;
}

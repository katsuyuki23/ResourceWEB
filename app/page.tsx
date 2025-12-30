import { redirect } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, Heart, Users, ArrowRight, MoonStar, Calendar } from 'lucide-react';

export default function HomePage() {
  // Redirect to dashboard if user is logged in
  // For now, show landing page
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panti Asuhan</h1>
                <p className="text-xs text-emerald-600">Santri Al-Falah</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/auth"
                className="px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Masuk
              </Link>
              <Link 
                href="/auth"
                className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Login Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-amber-500/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-sm font-medium mb-6">
              <MoonStar className="w-4 h-4" />
              Sistem Manajemen Panti Asuhan
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Mengelola Dengan
              <span className="text-emerald-600"> Hati & Amanah</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Sistem terintegrasi untuk manajemen panti asuhan yang transparan, 
              akuntabel, dan profesional. Dilengkapi dengan berbagai fitur 
              untuk memudahkan pengelolaan donasi, data anak, dan pelaporan keuangan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/auth"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/25"
              >
                Masuk ke Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all border border-gray-200"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fitur Lengkap & Komprehensif
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Berbagai fitur yang dirancang khusus untuk memudahkan pengelolaan panti asuhan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Kelola User & Donatur',
                description: 'Kelola akun admin, operator, dan data donatur dengan mudah. Sistem role-based yang aman.',
                color: 'emerald'
              },
              {
                icon: Heart,
                title: 'Input Donasi',
                description: 'Catat setiap donasi masuk dengan kategori (zakat, infaq, sedekah, wakaf) secara terstruktur.',
                color: 'rose'
              },
              {
                icon: Calendar,
                title: 'Data Anak Asuh',
                description: 'Kelola data lengkap anak asuh termasuk biodata, pendidikan, kesehatan, dan foto.',
                color: 'blue'
              },
              {
                icon: BookOpen,
                title: 'Pengeluaran & Laporan',
                description: 'Catat pengeluaran dan buat laporan keuangan lengkap dengan grafik dan export.',
                color: 'amber'
              },
              {
                icon: MoonStar,
                title: 'Berita & Pengumuman',
                description: 'Publikasikan berita kegiatan, pengumuman, dan informasi penting panti asuhan.',
                color: 'violet'
              },
              {
                icon: Heart,
                title: 'Dashboard Analytics',
                description: 'Pantau ringkasan keuangan, donasi, dan aktivitas melalui dashboard yang intuitif.',
                color: 'teal'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group p-6 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Anak Asuh' },
              { value: '100+', label: 'Donatur Aktif' },
              { value: 'Rp 500M+', label: 'Donasi Terkumpul' },
              { value: '2010', label: 'Tahun Berdiri' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Panti Asuhan Santri Al-Falah</h1>
                <p className="text-sm">Sistem Manajemen Terintegrasi</p>
              </div>
            </div>
            <p className="text-sm">
              © 2024 Panti Asuhan Santri Al-Falah. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

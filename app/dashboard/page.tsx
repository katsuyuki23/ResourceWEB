'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Baby, 
  Heart, 
  Receipt,
  Calendar,
  Bell,
  ArrowRight,
  DollarSign
} from 'lucide-react';
import { 
  donasis, 
  pengeluarans, 
  anaks, 
  donaturs, 
  beritas,
  notifications,
  formatCurrency,
  formatDate 
} from '@/data/mockData';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate stats
  const totalDonasi = donasis.reduce((sum, d) => sum + d.jumlah, 0);
  const totalPengeluaran = pengeluarans.reduce((sum, p) => sum + p.jumlah, 0);
  const saldoBulanIni = donasis.filter(d => {
    const dMonth = new Date(d.tanggal).getMonth();
    return dMonth === new Date().getMonth();
  }).reduce((sum, d) => sum + d.jumlah, 0) - pengeluarans.filter(p => {
    const pMonth = new Date(p.tanggal).getMonth();
    return pMonth === new Date().getMonth();
  }).reduce((sum, p) => sum + p.jumlah, 0);

  const activeAnaks = anaks.filter(a => a.status === 'aktif').length;
  const activeDonaturs = donaturs.filter(d => d.status === 'aktif').length;

  // Monthly data for chart
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Pemasukan',
        data: [15000000, 18000000, 12000000, 20000000, 25000000, 22000000, 18000000, 21000000, 19000000, 24000000, 23000000, 0],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Pengeluaran',
        data: [10000000, 12000000, 15000000, 11000000, 18000000, 14000000, 16000000, 13000000, 17000000, 15000000, 19000000, 0],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Donation category data
  const categoryData = {
    labels: ['Zakat', 'Infaq', 'Sedekah', 'Wakaf', 'Lainnya'],
    datasets: [{
      data: [35, 30, 15, 12, 8],
      backgroundColor: [
        'rgb(16, 185, 129)',
        'rgb(59, 130, 246)',
        'rgb(245, 158, 11)',
        'rgb(139, 92, 246)',
        'rgb(107, 114, 128)'
      ],
      borderWidth: 0,
    }]
  };

  // Recent transactions
  const recentTransactions = [
    ...donasis.slice(0, 3).map(d => ({
      type: 'pemasukan',
      title: `Donasi ${d.kategori}`,
      amount: d.jumlah,
      date: d.tanggal,
      icon: Heart
    })),
    ...pengeluarans.slice(0, 2).map(p => ({
      type: 'pengeluaran',
      title: p.kategori,
      amount: p.jumlah,
      date: p.tanggal,
      icon: Receipt
    }))
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          callback: function(value: any) {
            return 'Rp ' + (value / 1000000).toFixed(0) + 'M';
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      }
    },
    cutout: '65%',
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Selamat datang di sistem manajemen Panti Asuhan</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Donasi */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm font-medium">Total Donasi</p>
                <p className="text-2xl lg:text-3xl font-bold mt-1">{formatCurrency(totalDonasi)}</p>
                <div className="flex items-center gap-1 mt-2 text-emerald-100">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+12.5% dari bulan lalu</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Pengeluaran */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm font-medium">Total Pengeluaran</p>
                <p className="text-2xl lg:text-3xl font-bold mt-1">{formatCurrency(totalPengeluaran)}</p>
                <div className="flex items-center gap-1 mt-2 text-amber-100">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm">-5.2% dari bulan lalu</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Receipt className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jumlah Anak */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Jumlah Anak Asuh</p>
                <p className="text-2xl lg:text-3xl font-bold mt-1">{anaks.length}</p>
                <div className="flex items-center gap-1 mt-2 text-blue-100">
                  <Baby className="w-4 h-4" />
                  <span className="text-sm">{activeAnaks} anak aktif</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saldo */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-500 to-violet-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-violet-100 text-sm font-medium">Saldo Bulan Ini</p>
                <p className="text-2xl lg:text-3xl font-bold mt-1">{formatCurrency(saldoBulanIni)}</p>
                <div className="flex items-center gap-1 mt-2 text-violet-100">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">{activeDonaturs} donatur aktif</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Grafik Keuangan</CardTitle>
            <CardDescription>Pemasukan dan pengeluaran tahunan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Line data={monthlyData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Category Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Kategori Donasi</CardTitle>
            <CardDescription>Distribusi jenis donasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Doughnut data={categoryData} options={doughnutOptions} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Transaksi Terbaru</CardTitle>
              <CardDescription>Donasi dan pengeluaran terkini</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === 'pemasukan' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div className={`text-right ${
                    item.type === 'pemasukan' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    <p className="font-semibold">
                      {item.type === 'pemasukan' ? '+' : '-'}{formatCurrency(item.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* News/Announcements */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Berita & Pengumuman</CardTitle>
              <CardDescription>Informasi terbaru panti asuhan</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-1">
              Lihat Semua
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {beritas.slice(0, 3).map((berita) => (
                <div key={berita.id} className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  {berita.gambar && (
                    <img
                      src={berita.gambar}
                      alt={berita.judul}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {berita.kategori}
                      </Badge>
                    </div>
                    <p className="font-medium text-gray-900 line-clamp-2">{berita.judul}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(berita.tanggal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Notifications */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-emerald-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Notifikasi Penting</h4>
              <p className="text-sm text-gray-600 mt-1">
                Ada {notifications.filter(n => !n.read).length} notifikasi yang belum dibaca.
                Pastikan untuk memverifikasi donasi yang masuk dan menyetujui pengeluaran yang pending.
              </p>
            </div>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Lihat Notifikasi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

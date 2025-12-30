'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, Download, Calendar, DollarSign, TrendingUp, TrendingDown,
  Filter, Printer, FileSpreadsheet
} from 'lucide-react';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { donasis, pengeluarans, formatCurrency } from '@/data/mockData';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

export default function LaporanPage() {
  const [bulan, setBulan] = useState(new Date().getMonth().toString());
  const [tahun, setTahun] = useState(new Date().getFullYear().toString());
  const [jenisLaporan, setJenisLaporan] = useState('semua');

  const filteredDonasi = donasis.filter(d => {
    const date = new Date(d.tanggal);
    return date.getMonth() === parseInt(bulan) && date.getFullYear() === parseInt(tahun);
  });

  const filteredPengeluaran = pengeluarans.filter(p => {
    const date = new Date(p.tanggal);
    return date.getMonth() === parseInt(bulan) && date.getFullYear() === parseInt(tahun);
  });

  const totalDonasi = filteredDonasi.reduce((sum, d) => sum + d.jumlah, 0);
  const totalPengeluaran = filteredPengeluaran.reduce((sum, p) => sum + p.jumlah, 0);
  const saldo = totalDonasi - totalPengeluaran;

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Pemasukan',
        data: [15000000, 18000000, 12000000, 20000000, 25000000, 22000000, 18000000, 21000000, 19000000, 24000000, 23000000, totalDonasi],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Pengeluaran',
        data: [10000000, 12000000, 15000000, 11000000, 18000000, 14000000, 16000000, 13000000, 17000000, 15000000, 19000000, totalPengeluaran],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

  const categoryData = {
    labels: ['Makanan', 'Pendidikan', 'Kesehatan', 'Utilitas', 'Lainnya'],
    datasets: [{
      label: 'Pengeluaran',
      data: [2500000, 1500000, 800000, 1200000, 500000],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(107, 114, 128, 0.8)'
      ],
    }]
  };

  const handleExportPDF = () => {
    const content = `
LAPORAN KEUANGAN
Panti Asuhan Santri Al-Falah
Bulan: ${new Date(parseInt(tahun), parseInt(bulan)).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}

RINGKASAN
==========
Total Pemasukan: ${formatCurrency(totalDonasi)}
Total Pengeluaran: ${formatCurrency(totalPengeluaran)}
Saldo: ${formatCurrency(saldo)}

DETAIL PEMASUKAN
================
${filteredDonasi.map(d => `${formatDate(new Date(d.tanggal))} - ${d.kategori}: ${formatCurrency(d.jumlah)}`).join('\n')}

DETAIL PENGELUARAN
==================
${filteredPengeluaran.map(p => `${formatDate(new Date(p.tanggal))} - ${p.kategori}: ${formatCurrency(p.jumlah)}`).join('\n')}
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-keuangan-${tahun}-${parseInt(bulan)+1}.txt`;
    a.click();
  };

  const handleExportExcel = () => {
    const data = [
      ['LAPORAN KEUANGAN'],
      ['Panti Asuhan Santri Al-Falah'],
      [''],
      ['RINGKASAN'],
      ['Total Pemasukan', totalDonasi],
      ['Total Pengeluaran', totalPengeluaran],
      ['Saldo', saldo],
      [''],
      ['DETAIL PEMASUKAN'],
      ['Tanggal', 'Kategori', 'Jumlah'],
      ...filteredDonasi.map(d => [formatDate(new Date(d.tanggal)), d.kategori, d.jumlah]),
      [''],
      ['DETAIL PENGELUARAN'],
      ['Tanggal', 'Kategori', 'Jumlah'],
      ...filteredPengeluaran.map(p => [formatDate(new Date(p.tanggal)), p.kategori, p.jumlah])
    ];
    
    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-keuangan-${tahun}-${parseInt(bulan)+1}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Laporan Keuangan</h1>
          <p className="text-gray-500">Rekapitulasi keuangan panti asuhan</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF} className="gap-2">
            <FileText className="w-4 h-4" /> Export PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel} className="gap-2">
            <FileSpreadsheet className="w-4 h-4" /> Export Excel
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Bulan</label>
              <Select value={bulan} onValueChange={setBulan}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'].map((bulan, i) => (
                    <SelectItem key={i} value={i.toString()}>{bulan}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-gray-500">Tahun</label>
              <Select value={tahun} onValueChange={setTahun}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2022, 2023, 2024, 2025].map((t) => (
                    <SelectItem key={t} value={t.toString()}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Filter className="w-4 h-4 mr-2" /> Terapkan
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Total Pemasukan</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(totalDonasi)}</p>
                <div className="flex items-center gap-1 mt-2 text-emerald-100">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">+15% dari bulan lalu</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100">Total Pengeluaran</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(totalPengeluaran)}</p>
                <div className="flex items-center gap-1 mt-2 text-amber-100">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-sm">-8% dari bulan lalu</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={`border-0 shadow-lg ${saldo >= 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-red-500 to-red-600'} text-white`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Saldo</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(saldo)}</p>
                <div className="flex items-center gap-1 mt-2 text-blue-100">
                  {saldo >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="text-sm">{saldo >= 0 ? 'Surplus' : 'Defisit'}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grafik" className="space-y-4">
        <TabsList>
          <TabsTrigger value="grafik">Grafik</TabsTrigger>
          <TabsTrigger value="pemasukan">Pemasukan</TabsTrigger>
          <TabsTrigger value="pengeluaran">Pengeluaran</TabsTrigger>
        </TabsList>

        <TabsContent value="grafik" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Grafik Keuangan Tahunan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' as const } } }} />
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Distribusi Pengeluaran</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Bar data={categoryData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pemasukan">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Detail Pemasukan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Tanggal</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Kategori</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Metode</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDonasi.map((d) => (
                      <tr key={d.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{formatDate(new Date(d.tanggal))}</td>
                        <td className="py-3 px-4 capitalize">{d.kategori}</td>
                        <td className="py-3 px-4 capitalize">{d.metode}</td>
                        <td className="py-3 px-4 font-medium text-emerald-600">{formatCurrency(d.jumlah)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pengeluaran">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Detail Pengeluaran</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Tanggal</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Kategori</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Keterangan</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPengeluaran.map((p) => (
                      <tr key={p.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{formatDate(new Date(p.tanggal))}</td>
                        <td className="py-3 px-4 capitalize">{p.kategori}</td>
                        <td className="py-3 px-4">{p.keterangan}</td>
                        <td className="py-3 px-4 font-medium text-amber-600">{formatCurrency(p.jumlah)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Receipt, DollarSign, Calendar, CheckCircle, ShoppingCart, BookOpen, HeartPulse, Zap, Package } from 'lucide-react';
import { pengeluarans, type Pengeluaran, formatCurrency, formatDate } from '@/data/mockData';

const kategoriIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  makanan: ShoppingCart,
  pendidikan: BookOpen,
  kesehatan: HeartPulse,
  utilitas: Zap,
  pakaian: Package,
  perlengkapan: Package,
  lainnya: Receipt
};

export default function PengeluaranPage() {
  const { toast } = useToast();
  const [pengeluaransList, setPengeluarans] = useState<Pengeluaran[]>(pengeluarans);
  const [formData, setFormData] = useState({
    jumlah: '',
    tanggal: new Date().toISOString().split('T')[0],
    kategori: 'makanan',
    keterangan: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.jumlah) {
      toast({ title: 'Error', description: 'Jumlah wajib diisi', variant: 'destructive' });
      return;
    }

    const newPengeluaran: Pengeluaran = {
      id: Date.now().toString(),
      jumlah: parseInt(formData.jumlah),
      tanggal: new Date(formData.tanggal),
      kategori: formData.kategori as Pengeluaran['kategori'],
      keterangan: formData.keterangan,
      approvedBy: 'Admin'
    };

    setPengeluarans([newPengeluaran, ...pengeluaransList]);
    toast({ title: 'Berhasil', description: 'Pengeluaran berhasil dicatat' });
    setFormData({ jumlah: '', tanggal: new Date().toISOString().split('T')[0], kategori: 'makanan', keterangan: '' });
  };

  const totalPengeluaran = pengeluaransList.reduce((sum, p) => sum + p.jumlah, 0);
  const pengeluaranBulanIni = pengeluaransList.filter(p => new Date(p.tanggal).getMonth() === new Date().getMonth()).reduce((sum, p) => sum + p.jumlah, 0);

  const groupedByKategori = pengeluaransList.reduce((acc, p) => {
    acc[p.kategori] = (acc[p.kategori] || 0) + p.jumlah;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Input Pengeluaran</h1>
          <p className="text-gray-500">Catat pengeluaran panti asuhan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-600" />
              Form Input Pengeluaran
            </CardTitle>
            <CardDescription>Isi data pengeluaran dengan lengkap dan akurat</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Jumlah (Rp)</Label>
                  <Input type="number" value={formData.jumlah} onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })} placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Tanggal</Label>
                  <Input type="date" value={formData.tanggal} onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select value={formData.kategori} onValueChange={(v) => setFormData({ ...formData, kategori: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="makanan">Makanan</SelectItem>
                    <SelectItem value="pendidikan">Pendidikan</SelectItem>
                    <SelectItem value="kesehatan">Kesehatan</SelectItem>
                    <SelectItem value="pakaian">Pakaian</SelectItem>
                    <SelectItem value="utilitas">Utilitas</SelectItem>
                    <SelectItem value="perlengkapan">Perlengkapan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Keterangan</Label>
                <Textarea value={formData.keterangan} onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} placeholder="Deskripsi pengeluaran..." />
              </div>

              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Simpan Pengeluaran
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Pengeluaran</p>
                  <p className="text-xl font-bold">{formatCurrency(totalPengeluaran)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bulan Ini</p>
                  <p className="text-xl font-bold">{formatCurrency(pengeluaranBulanIni)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Berdasarkan Kategori</h4>
              <div className="space-y-2">
                {Object.entries(groupedByKategori).map(([kategori, total]) => {
                  const Icon = kategoriIcons[kategori] || Receipt;
                  return (
                    <div key={kategori} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm capitalize">{kategori}</span>
                      </div>
                      <span className="font-medium text-sm">{formatCurrency(total)}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Riwayat Pengeluaran</CardTitle>
          <CardDescription>Daftar seluruh pengeluaran yang tercatat</CardDescription>
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
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Disetujui Oleh</th>
                </tr>
              </thead>
              <tbody>
                {pengeluaransList.map((p) => {
                  const Icon = kategoriIcons[p.kategori] || Receipt;
                  return (
                    <tr key={p.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">{formatDate(new Date(p.tanggal))}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-gray-400" />
                          <span className="capitalize">{p.kategori}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{p.keterangan}</td>
                      <td className="py-3 px-4 font-medium text-amber-600">{formatCurrency(p.jumlah)}</td>
                      <td className="py-3 px-4 text-gray-600">{p.approvedBy}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

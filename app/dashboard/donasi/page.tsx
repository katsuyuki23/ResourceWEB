'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Gift, Search, User, Calendar, DollarSign, CheckCircle, Clock, XCircle } from 'lucide-react';
import { donaturs, donasis, type Donasi, formatCurrency, formatDate } from '@/data/mockData';

export default function DonasiPage() {
  const { toast } = useToast();
  const [donasisList, setDonasis] = useState<Donasi[]>(donasis);
  const [formData, setFormData] = useState({
    donaturId: '',
    jumlah: '',
    tanggal: new Date().toISOString().split('T')[0],
    kategori: 'infaq',
    metode: 'transfer',
    keterangan: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.donaturId || !formData.jumlah) {
      toast({ title: 'Error', description: 'Donatur dan jumlah wajib diisi', variant: 'destructive' });
      return;
    }

    const newDonasi: Donasi = {
      id: Date.now().toString(),
      donaturId: formData.donaturId,
      jumlah: parseInt(formData.jumlah),
      tanggal: new Date(formData.tanggal),
      kategori: formData.kategori as Donasi['kategori'],
      metode: formData.metode as Donasi['metode'],
      status: 'terverifikasi',
      keterangan: formData.keterangan
    };

    setDonasis([newDonasi, ...donasisList]);
    toast({ title: 'Berhasil', description: 'Donasi berhasil dicatat' });
    setFormData({ donaturId: '', jumlah: '', tanggal: new Date().toISOString().split('T')[0], kategori: 'infaq', metode: 'transfer', keterangan: '' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'terverifikasi': return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-600" />;
      default: return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const totalDonasi = donasisList.reduce((sum, d) => sum + d.jumlah, 0);
  const donasiBulanIni = donasisList.filter(d => new Date(d.tanggal).getMonth() === new Date().getMonth()).reduce((sum, d) => sum + d.jumlah, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Input Donasi</h1>
          <p className="text-gray-500">Catat donasi masuk ke panti asuhan</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-emerald-600" />
              Form Input Donasi
            </CardTitle>
            <CardDescription>Isi data donasi dengan lengkap dan akurat</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Donatur</Label>
                  <Select value={formData.donaturId} onValueChange={(v) => setFormData({ ...formData, donaturId: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih donatur" />
                    </SelectTrigger>
                    <SelectContent>
                      {donaturs.map((d) => (
                        <SelectItem key={d.id} value={d.id}>{d.nama}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Jumlah (Rp)</Label>
                  <Input type="number" value={formData.jumlah} onChange={(e) => setFormData({ ...formData, jumlah: e.target.value })} placeholder="0" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tanggal</Label>
                  <Input type="date" value={formData.tanggal} onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Select value={formData.kategori} onValueChange={(v) => setFormData({ ...formData, kategori: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zakat">Zakat</SelectItem>
                      <SelectItem value="infaq">Infaq</SelectItem>
                      <SelectItem value="sedekah">Sedekah</SelectItem>
                      <SelectItem value="wakaf">Wakaf</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Metode</Label>
                  <Select value={formData.metode} onValueChange={(v) => setFormData({ ...formData, metode: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tunai">Tunai</SelectItem>
                      <SelectItem value="transfer">Transfer Bank</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Keterangan</Label>
                <Textarea value={formData.keterangan} onChange={(e) => setFormData({ ...formData, keterangan: e.target.value })} placeholder="Catatan tambahan (opsional)" />
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Simpan Donasi
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Donasi</p>
                  <p className="text-xl font-bold">{formatCurrency(totalDonasi)}</p>
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
                  <p className="text-xl font-bold">{formatCurrency(donasiBulanIni)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Donasi Terbaru</h4>
              <div className="space-y-3">
                {donasisList.slice(0, 3).map((d) => {
                  const donatur = donaturs.find(don => don.id === d.donaturId);
                  return (
                    <div key={d.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{donatur?.nama || 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{formatCurrency(d.jumlah)}</p>
                      </div>
                      {getStatusIcon(d.status)}
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
          <CardTitle>Riwayat Donasi</CardTitle>
          <CardDescription>Daftar seluruh donasi yang tercatat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Donatur</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Jumlah</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 hidden md:table-cell">Kategori</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 hidden lg:table-cell">Tanggal</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {donasisList.map((d) => {
                  const donatur = donaturs.find(don => don.id === d.donaturId);
                  return (
                    <tr key={d.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-emerald-600" />
                          </div>
                          <span className="font-medium">{donatur?.nama || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-emerald-600">{formatCurrency(d.jumlah)}</td>
                      <td className="py-3 px-4 hidden md:table-cell capitalize">{d.kategori}</td>
                      <td className="py-3 px-4 hidden lg:table-cell text-gray-600">{formatDate(new Date(d.tanggal))}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {getStatusIcon(d.status)}
                          <span className="text-sm capitalize">{d.status}</span>
                        </div>
                      </td>
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

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Filter,
  Heart,
  Phone,
  Mail,
  MapPin,
  Building,
  User,
  Briefcase
} from 'lucide-react';
import { donaturs as initialDonaturs, type Donatur, formatCurrency, formatDate } from '@/data/mockData';

export default function DonaturPage() {
  const { toast } = useToast();
  const [donaturs, setDonaturs] = useState<Donatur[]>(initialDonaturs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedKategori, setSelectedKategori] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDonatur, setEditingDonatur] = useState<Donatur | null>(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    phone: '',
    alamat: '',
    kategori: 'perorangan' as Donatur['kategori'],
    status: 'aktif' as Donatur['status'],
    catatan: ''
  });

  // Filter donaturs
  const filteredDonaturs = donaturs.filter(donatur => {
    const matchesSearch = donatur.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donatur.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || donatur.status === selectedStatus;
    const matchesKategori = selectedKategori === 'all' || donatur.kategori === selectedKategori;
    return matchesSearch && matchesStatus && matchesKategori;
  });

  const resetForm = () => {
    setFormData({
      nama: '',
      email: '',
      phone: '',
      alamat: '',
      kategori: 'perorangan',
      status: 'aktif',
      catatan: ''
    });
    setEditingDonatur(null);
  };

  const handleOpenDialog = (donatur?: Donatur) => {
    if (donatur) {
      setEditingDonatur(donatur);
      setFormData({
        nama: donatur.nama,
        email: donatur.email,
        phone: donatur.phone,
        alamat: donatur.alamat,
        kategori: donatur.kategori,
        status: donatur.status,
        catatan: donatur.catatan || ''
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.nama || !formData.email) {
      toast({
        title: 'Error',
        description: 'Nama dan email wajib diisi',
        variant: 'destructive',
      });
      return;
    }

    if (editingDonatur) {
      setDonaturs(donaturs.map(d => 
        d.id === editingDonatur.id 
          ? { ...d, ...formData }
          : d
      ));
      toast({
        title: 'Berhasil',
        description: 'Data donatur berhasil diperbarui',
      });
    } else {
      const newDonatur: Donatur = {
        id: Date.now().toString(),
        ...formData,
        totalDonasi: 0,
        createdAt: new Date()
      };
      setDonaturs([...donaturs, newDonatur]);
      toast({
        title: 'Berhasil',
        description: 'Donatur berhasil ditambahkan',
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setDonaturs(donaturs.filter(d => d.id !== id));
    toast({
      title: 'Berhasil',
      description: 'Donatur berhasil dihapus',
    });
  };

  const getKategoriIcon = (kategori: string) => {
    switch (kategori) {
      case 'perusahaan':
        return <Building className="w-4 h-4" />;
      case 'lembaga':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aktif':
        return 'bg-emerald-100 text-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const totalDonaturAktif = donaturs.filter(d => d.status === 'aktif').length;
  const totalDonasiSemua = donaturs.reduce((sum, d) => sum + d.totalDonasi, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Kelola Donatur</h1>
          <p className="text-gray-500">Kelola data donatur panti asuhan</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
              <Plus className="w-4 h-4" />
              Tambah Donatur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingDonatur ? 'Edit Donatur' : 'Tambah Donatur Baru'}</DialogTitle>
              <DialogDescription>
                {editingDonatur ? 'Perbarui data donatur' : 'Tambahkan data donatur baru'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Donatur</Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Nama lengkap atau nama lembaga"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telepon</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="081234567890"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Textarea
                  id="alamat"
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Alamat lengkap"
                  rows={2}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kategori</Label>
                  <Select
                    value={formData.kategori}
                    onValueChange={(value) => setFormData({ ...formData, kategori: value as Donatur['kategori'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="perorangan">Perorangan</SelectItem>
                      <SelectItem value="lembaga">Lembaga</SelectItem>
                      <SelectItem value="perusahaan">Perusahaan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as Donatur['status'] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aktif">Aktif</SelectItem>
                      <SelectItem value="non-aktif">Non-Aktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="catatan">Catatan</Label>
                <Textarea
                  id="catatan"
                  value={formData.catatan}
                  onChange={(e) => setFormData({ ...formData, catatan: e.target.value })}
                  placeholder="Catatan tambahan (opsional)"
                  rows={2}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                {editingDonatur ? 'Simpan' : 'Tambah'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Donatur</p>
                <p className="text-2xl font-bold text-gray-900">{donaturs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Donatur Aktif</p>
                <p className="text-2xl font-bold text-gray-900">{totalDonaturAktif}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Donasi</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalDonasiSemua)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Cari donatur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedKategori} onValueChange={setSelectedKategori}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="perorangan">Perorangan</SelectItem>
                <SelectItem value="lembaga">Lembaga</SelectItem>
                <SelectItem value="perusahaan">Perusahaan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="non-aktif">Non-Aktif</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Donatur Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDonaturs.map((donatur) => (
          <Card key={donatur.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    {donatur.nama.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{donatur.nama}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      {getKategoriIcon(donatur.kategori)}
                      <span className="capitalize">{donatur.kategori}</span>
                    </div>
                  </div>
                </div>
                <Badge className={getStatusBadge(donatur.status)}>
                  {donatur.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{donatur.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span>{donatur.phone}</span>
                </div>
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="line-clamp-2">{donatur.alamat}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Total Donasi</p>
                    <p className="font-semibold text-emerald-600">{formatCurrency(donatur.totalDonasi)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(donatur)}
                      className="h-8 w-8 text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(donatur.id)}
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDonaturs.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-12 text-center">
            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada donatur yang ditemukan</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

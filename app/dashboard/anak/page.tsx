'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { 
  Plus, Search, Edit, Trash2, Baby, Calendar, User, 
  Heart, BookOpen, Stethoscope, Upload, X, Eye
} from 'lucide-react';
import { anaks as initialAnaks, type Anak, formatDate } from '@/data/mockData';

export default function AnakPage() {
  const { toast } = useToast();
  const [anaks, setAnaks] = useState<Anak[]>(initialAnaks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnak, setSelectedAnak] = useState<Anak | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Anak>>({});

  const filteredAnaks = anaks.filter(anak => {
    const matchesSearch = anak.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || anak.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleOpenDetail = (anak: Anak) => {
    setSelectedAnak(anak);
    setIsDetailOpen(true);
  };

  const handleDelete = (id: string) => {
    setAnaks(anaks.filter(a => a.id !== id));
    toast({ title: 'Berhasil', description: 'Data anak berhasil dihapus' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'aktif': return 'bg-emerald-100 text-emerald-700';
      case 'non-aktif': return 'bg-gray-100 text-gray-700';
      case 'dias大家庭': return 'bg-amber-100 text-amber-700';
      case 'menikah': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getGenderIcon = (jk: string) => (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
      jk === 'laki' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'
    }`}>
      <User className="w-5 h-5" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Data Anak</h1>
          <p className="text-gray-500">Kelola data anak asuh panti asuhan</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
          <Plus className="w-4 h-4" /> Tambah Anak
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Baby className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Anak</p>
                <p className="text-2xl font-bold">{anaks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Aktif</p>
                <p className="text-2xl font-bold">{anaks.filter(a => a.status === 'aktif').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Di Sekolah</p>
                <p className="text-2xl font-bold">{anaks.filter(a => a.status === 'aktif').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sehat</p>
                <p className="text-2xl font-bold">{anaks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Cari anak..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua</SelectItem>
                <SelectItem value="aktif">Aktif</SelectItem>
                <SelectItem value="non-aktif">Non-Aktif</SelectItem>
                <SelectItem value="dias大家庭">Dias大家庭</SelectItem>
                <SelectItem value="menikah">Menikah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnaks.map((anak) => (
          <Card key={anak.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                {anak.foto ? (
                  <img src={anak.foto} alt={anak.nama} className="w-16 h-16 rounded-full object-cover" />
                ) : (
                  getGenderIcon(anak.jenisKelamin)
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{anak.nama}</h3>
                  <p className="text-sm text-gray-500">{calculateAge(new Date(anak.tanggalLahir))} tahun</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getStatusBadge(anak.status)}>{anak.status}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Pendidikan</span>
                  <span className="font-medium">{anak.pendidikan} {anak.kelas && `- ${anak.kelas}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Masuk</span>
                  <span className="font-medium">{formatDate(new Date(anak.masukTanggal))}</span>
                </div>
                {anak.hobi && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Hobi</span>
                    <span className="font-medium">{anak.hobi}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleOpenDetail(anak)} className="h-8 w-8 text-blue-600 flex-1">
                  <Eye className="w-4 h-4 mr-1" /> Detail
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(anak.id)} className="h-8 w-8 text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnaks.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-12 text-center">
            <Baby className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada data anak ditemukan</p>
          </CardContent>
        </Card>
      )}

      {/* Detail Modal */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detail Biodata Anak</DialogTitle>
          </DialogHeader>
          {selectedAnak && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {selectedAnak.foto ? (
                  <img src={selectedAnak.foto} alt={selectedAnak.nama} className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">{selectedAnak.nama}</h2>
                  <p className="text-gray-500">{selectedAnak.nickname && `Panggilan: ${selectedAnak.nickname}`}</p>
                  <Badge className={getStatusBadge(selectedAnak.status)}>{selectedAnak.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-500">Tanggal Lahir</Label>
                  <p className="font-medium">{formatDate(new Date(selectedAnak.tanggalLahir))} ({calculateAge(new Date(selectedAnak.tanggalLahir))} tahun)</p>
                </div>
                <div>
                  <Label className="text-gray-500">Jenis Kelamin</Label>
                  <p className="font-medium capitalize">{selectedAnak.jenisKelamin === 'laki' ? 'Laki-laki' : 'Perempuan'}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Pendidikan</Label>
                  <p className="font-medium">{selectedAnak.pendidikan} {selectedAnak.kelas && `- Kelas ${selectedAnak.kelas}`}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Tanggal Masuk</Label>
                  <p className="font-medium">{formatDate(new Date(selectedAnak.masukTanggal))}</p>
                </div>
                {selectedAnak.hobi && (
                  <div className="col-span-2">
                    <Label className="text-gray-500">Hobi</Label>
                    <p className="font-medium">{selectedAnak.hobi}</p>
                  </div>
                )}
                {selectedAnak.kesehatan && (
                  <div className="col-span-2">
                    <Label className="text-gray-500">Kondisi Kesehatan</Label>
                    <p className="font-medium">{selectedAnak.kesehatan}</p>
                  </div>
                )}
                {selectedAnak.wali && (
                  <div className="col-span-2">
                    <Label className="text-gray-500">Wali</Label>
                    <p className="font-medium">{selectedAnak.wali}</p>
                  </div>
                )}
                {selectedAnak.catatan && (
                  <div className="col-span-2">
                    <Label className="text-gray-500">Catatan</Label>
                    <p className="font-medium">{selectedAnak.catatan}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Search, Edit, Trash2, Newspaper, Calendar, User, Image, Send, Eye } from 'lucide-react';
import { beritas as initialBeritas, type Berita, formatDate } from '@/data/mockData';

export default function BeritaPage() {
  const { toast } = useToast();
  const [beritas, setBeritas] = useState<Berita[]>(initialBeritas);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedBerita, setSelectedBerita] = useState<Berita | null>(null);
  const [formData, setFormData] = useState({
    judul: '',
    konten: '',
    kategori: 'berita' as Berita['kategori'],
    status: 'draft' as Berita['status'],
    gambar: ''
  });

  const filteredBeritas = beritas.filter(b => 
    b.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.kategori.includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (!formData.judul || !formData.konten) {
      toast({ title: 'Error', description: 'Judul dan konten wajib diisi', variant: 'destructive' });
      return;
    }

    const newBerita: Berita = {
      id: Date.now().toString(),
      ...formData,
      penulis: 'Admin',
      tanggal: new Date()
    };

    setBeritas([newBerita, ...beritas]);
    toast({ title: 'Berhasil', description: 'Berita berhasil dipublikasikan' });
    setIsDialogOpen(false);
    setFormData({ judul: '', konten: '', kategori: 'berita', status: 'draft', gambar: '' });
  };

  const handleDelete = (id: string) => {
    setBeritas(beritas.filter(b => b.id !== id));
    toast({ title: 'Berhasil', description: 'Berita berhasil dihapus' });
  };

  const handlePublish = (id: string) => {
    setBeritas(beritas.map(b => b.id === id ? { ...b, status: 'published' } : b));
    toast({ title: 'Berhasil', description: 'Berita berhasil dipublikasikan' });
  };

  const handlePreview = (berita: Berita) => {
    setSelectedBerita(berita);
    setIsPreviewOpen(true);
  };

  const getKategoriColor = (kategori: string) => {
    switch (kategori) {
      case 'berita': return 'bg-blue-100 text-blue-700';
      case 'pengumuman': return 'bg-amber-100 text-amber-700';
      case 'kegiatan': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Berita & Pengumuman</h1>
          <p className="text-gray-500">Kelola berita dan informasi panti asuhan</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 gap-2">
          <Plus className="w-4 h-4" /> Tambah Berita
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Berita</p>
                <p className="text-2xl font-bold">{beritas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Send className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Dipublikasikan</p>
                <p className="text-2xl font-bold">{beritas.filter(b => b.status === 'published').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Edit className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Draft</p>
                <p className="text-2xl font-bold">{beritas.filter(b => b.status === 'draft').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Cari berita..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredBeritas.map((berita) => (
          <Card key={berita.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
            {berita.gambar && (
              <img src={berita.gambar} alt={berita.judul} className="w-full h-48 object-cover" />
            )}
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge className={getKategoriColor(berita.kategori)}>{berita.kategori}</Badge>
                <Badge variant={berita.status === 'published' ? 'default' : 'secondary'}>{berita.status}</Badge>
              </div>
              <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{berita.judul}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{berita.konten}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{berita.penulis}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(new Date(berita.tanggal))}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                <Button variant="ghost" size="sm" onClick={() => handlePreview(berita)} className="flex-1">
                  <Eye className="w-4 h-4 mr-1" /> Preview
                </Button>
                {berita.status === 'draft' && (
                  <Button variant="ghost" size="sm" onClick={() => handlePublish(berita.id)} className="flex-1 text-emerald-600">
                    <Send className="w-4 h-4 mr-1" /> Publish
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="text-blue-600">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(berita.id)} className="text-red-600">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBeritas.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="py-12 text-center">
            <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Tidak ada berita ditemukan</p>
          </CardContent>
        </Card>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tambah Berita Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Judul</Label>
              <Input value={formData.judul} onChange={(e) => setFormData({ ...formData, judul: e.target.value })} placeholder="Judul berita..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select value={formData.kategori} onValueChange={(v) => setFormData({ ...formData, kategori: v as Berita['kategori'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="berita">Berita</SelectItem>
                    <SelectItem value="pengumuman">Pengumuman</SelectItem>
                    <SelectItem value="kegiatan">Kegiatan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Berita['status'] })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Dipublikasikan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>URL Gambar (opsional)</Label>
              <Input value={formData.gambar} onChange={(e) => setFormData({ ...formData, gambar: e.target.value })} placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <Label>Konten</Label>
              <Textarea value={formData.konten} onChange={(e) => setFormData({ ...formData, konten: e.target.value })} placeholder="Isi berita..." rows={6} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSubmit} className="bg-emerald-600 hover:bg-emerald-700">Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedBerita?.judul}</DialogTitle>
          </DialogHeader>
          {selectedBerita?.gambar && (
            <img src={selectedBerita.gambar} alt={selectedBerita.judul} className="w-full h-64 object-cover rounded-lg" />
          )}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge className={getKategoriColor(selectedBerita?.kategori || '')}>{selectedBerita?.kategori}</Badge>
              <span className="text-sm text-gray-500">{formatDate(new Date(selectedBerita?.tanggal || new Date()))}</span>
              <span className="text-sm text-gray-500">• {selectedBerita?.penulis}</span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{selectedBerita?.konten}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

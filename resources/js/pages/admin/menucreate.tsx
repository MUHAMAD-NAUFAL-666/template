'use client';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

export default function MenuCreate() {
  const { data, setData, post, processing, errors } = useForm({
    nama_menu: '',
    harga: '',
    status: 'tersedia',
    deskripsi: '',
    stok: 0,
    kategori_id: null,
    gambar: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/menu');
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Tambah Menu', href: '/admin/menu/create' }]}>
      <Head title="Tambah Menu" />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="max-w-lg mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg space-y-6 border border-gray-100"
      >
        {/* Nama Menu */}
        <div className="space-y-1">
          <Label htmlFor="nama_menu" className="font-medium text-gray-700">Nama Menu</Label>
          <Input
            id="nama_menu"
            placeholder="Masukkan nama menu"
            value={data.nama_menu}
            onChange={(e) => setData('nama_menu', e.target.value)}
            className="focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
          />
          {errors.nama_menu && <p className="text-sm text-red-500">{errors.nama_menu}</p>}
        </div>

        {/* Deskripsi */}
        <div className="space-y-1">
          <Label htmlFor="deskripsi" className="font-medium text-gray-700">Deskripsi</Label>
          <textarea
            id="deskripsi"
            rows={3}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
            placeholder="Deskripsi menu..."
            value={data.deskripsi}
            onChange={(e) => setData('deskripsi', e.target.value)}
          />
          {errors.deskripsi && <p className="text-sm text-red-500">{errors.deskripsi}</p>}
        </div>

        {/* Harga */}
        <div className="space-y-1">
          <Label htmlFor="harga" className="font-medium text-gray-700">Harga</Label>
          <Input
            id="harga"
            type="number"
            placeholder="Harga menu"
            value={data.harga}
            onChange={(e) => setData('harga', e.target.value)}
            className="focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
          />
          {errors.harga && <p className="text-sm text-red-500">{errors.harga}</p>}
        </div>

        {/* Stok */}
        <div className="space-y-1">
          <Label htmlFor="stok" className="font-medium text-gray-700">Stok</Label>
          <Input
            id="stok"
            type="number"
            placeholder="Jumlah stok"
            value={data.stok}
            onChange={(e) => setData('stok', Number(e.target.value))}
            className="focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all"
          />
          {errors.stok && <p className="text-sm text-red-500">{errors.stok}</p>}
        </div>

        {/* Status */}
        <div className="space-y-1">
          <Label className="font-medium text-gray-700">Status</Label>
          <Select
            value={data.status}
            onValueChange={(val) => setData('status', val)}
          >
            <SelectTrigger className="focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all">
              <SelectValue placeholder="Pilih status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tersedia">Tersedia</SelectItem>
              <SelectItem value="habis">Habis</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gambar */}
        <div className="space-y-1">
          <Label htmlFor="gambar" className="font-medium text-gray-700">Gambar</Label>
          <Input
            id="gambar"
            type="file"
            onChange={(e) => setData('gambar', e.target.files ? e.target.files[0] : null)}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                       file:text-sm file:font-semibold file:bg-green-50 file:text-green-700
                       hover:file:bg-green-100 transition-all"
          />
          {errors.gambar && <p className="text-sm text-red-500">{errors.gambar}</p>}
        </div>

        {/* Tombol Submit */}
        <Button
          type="submit"
          disabled={processing}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 
                     text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Simpan
        </Button>
      </motion.form>
    </AppLayout>
  );
}

'use client';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

export default function MenuCreate() {
  const { data, setData, post, processing, errors } = useForm({
    nama_menu: '',
    harga: '',
    status: 'tersedia',
    deskripsi: '',
    stok: 0,
    kategori_id: null,
    gambar: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/menu');
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Tambah Menu', href: '/admin/menu/create' }]}>
      <Head title="Tambah Menu" />
      <form onSubmit={handleSubmit} className="space-y-4 p-6">
        <input
          type="text"
          placeholder="Nama Menu"
          value={data.nama_menu}
          onChange={(e) => setData('nama_menu', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.nama_menu && <div className="text-red-500">{errors.nama_menu}</div>}
        <input
          type="text"
          placeholder="Deskripsi"
          value={data.deskripsi}
          onChange={(e) => setData('deskripsi', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.nama_menu && <div className="text-red-500">{errors.nama_menu}</div>}

        <input
          type="number"
          placeholder="Harga"
          value={data.harga}
          onChange={(e) => setData('harga', e.target.value)}
          className="border p-2 w-full"
        />
        {errors.harga && <div className="text-red-500">{errors.harga}</div>}

        <input
          type="number"
          placeholder="Stok"
          value={data.stok}
          onChange={(e) => setData('stok', Number(e.target.value))}
          className="border p-2 w-full"
        />
        {errors.stok && <div className="text-red-500">{errors.stok}</div>}


        <select
          value={data.status}
          onChange={(e) => setData('status', e.target.value)}
          className="border p-2 w-full"
        >
          <option value="tersedia">Tersedia</option>
          <option value="habis">Habis</option>
        </select>

        <input
          type="file"
          onChange={(e) => setData('gambar', e.target.files ? e.target.files[0] : null)}
          className="border p-2 w-full"
        />

        <Button type="submit" disabled={processing} className="bg-green-600 hover:bg-green-700">
          Simpan
        </Button>
      </form>
    </AppLayout>
  );
}

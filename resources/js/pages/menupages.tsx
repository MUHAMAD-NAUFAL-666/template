'use client';

import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { CardContent } from '@/components/ui/card';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';

// 1. Definisikan tipe data menu
interface Menu {
  id: number;
  nama_menu: string;
  harga: number;
  status: 'tersedia' | 'habis';
  gambar: string;
}

// 2. Definisikan tipe props yang dikirim dari Laravel
interface PageProps {
  menus: Menu[];
  [key: string]: unknown;
}

export default function MenuPage() {
  const { menus } = usePage<PageProps>().props;

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus menu ini?')) {
      Inertia.delete(`/admin/menu/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Menu', href: '/admin/menu' }]}>
      <Head title="Menu" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 md:p-10 flex flex-col gap-8 text-zinc-900 dark:text-white"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">Menu Restoran 🍽️</h1>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">
              Lihat daftar makanan & minuman yang tersedia.
            </p>
          </div>
          <Link href="/admin/menu/create">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              + Tambah Menu
            </Button>
          </Link>
        </div>

        {/* List Menu */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
         {menus.length > 0 ? (
  menus.map((menu, idx) => (
    <motion.div
      key={menu.id}
      data-aos="fade-up"
      data-aos-delay={idx * 150}
      whileHover={{ scale: 1.03 }}
      className={`rounded-xl shadow-md overflow-hidden border dark:border-zinc-700 ${
        menu.status === 'tersedia'
          ? 'bg-white dark:bg-zinc-800'
          : 'bg-gray-200 dark:bg-zinc-700 opacity-60'
      }`}
    >
      <img
        src={`/storage/${menu.gambar}`}
        alt={menu.nama_menu}
        className="h-40 w-full object-cover"
      />
      <CardContent className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{menu.nama_menu}</h2>
        <p className="text-green-600 dark:text-green-400 font-bold">
          Rp {Number(menu.harga).toLocaleString('id-ID')}
        </p>
        <span
          className={`inline-block px-2 py-1 rounded text-xs font-medium ${
            menu.status === 'tersedia'
              ? 'bg-green-100 text-green-600 dark:bg-green-800/40'
              : 'bg-red-100 text-red-600 dark:bg-red-800/40'
          }`}
        >
          {menu.status === 'tersedia' ? 'Tersedia' : 'Habis'}
        </span>

        {/* Tombol Edit & Hapus */}
        <div className="flex gap-2 mt-2">
          <Link href={`/admin/menu/${menu.id}/edit`}>
            <Button size="sm" variant="secondary">Edit</Button>
          </Link>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(menu.id)}
          >
            Hapus
          </Button>
        </div>
      </CardContent>
    </motion.div>
  ))
) : (
  <div className="col-span-full text-center text-zinc-500 dark:text-zinc-400">
    Belum ada menu yang ditambahkan.
  </div>
)}

        </div>
      </motion.div>
    </AppLayout>
  );
}
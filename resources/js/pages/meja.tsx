'use client';

import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, Plus, Edit, Trash } from 'lucide-react';

export default function Meja() {
  const { mejas = [] }: any = usePage().props;
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nomor_meja: '',
    kapasitas: '',
    status: 'kosong',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/meja', formData, {
      onSuccess: () => {
        setShowModal(false);
        setFormData({ nomor_meja: '', kapasitas: '', status: 'kosong' });
      },
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin hapus meja ini?')) {
      router.delete(`/meja/${id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={[{ title: 'Meja', href: '/meja' }]}>
      <Head title="Daftar Meja" />

      <div className="p-6 md:p-10 text-zinc-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Table className="text-blue-500" />
            <h1 className="text-2xl font-bold">Daftar Meja</h1>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow"
          >
            <Plus size={16} /> Tambah Meja
          </button>
        </div>

        {/* Grid Meja */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {mejas.map((meja: any, i: number) => {
            let bgColor = '';
            if (meja.status === 'kosong') bgColor = 'bg-green-600';
            if (meja.status === 'dipesan') bgColor = 'bg-yellow-500';
            if (meja.status === 'digunakan') bgColor = 'bg-red-600';

            return (
              <motion.div
                key={meja.id_meja}
                whileHover={{ scale: 1.05 }}
                className={`rounded-xl p-4 text-center text-white shadow-md ${bgColor}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <h2 className="text-lg font-bold">Meja {meja.nomor_meja}</h2>
                <p className="text-sm opacity-80">
                  Kapasitas: {meja.kapasitas} orang
                </p>
                <p className="mt-1 text-xs italic capitalize">{meja.status}</p>
                <div className="flex justify-center gap-2 mt-3">
                  <button
                    className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                    onClick={() => alert('Fitur edit belum dibuat')}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(meja.id_meja)}
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal Tambah */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-zinc-800 rounded-xl p-6 w-full max-w-md shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-lg font-bold mb-4 text-zinc-800 dark:text-white">
                Tambah Meja
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nomor Meja</label>
                  <input
                    type="text"
                    placeholder="Contoh: 1"
                    value={formData.nomor_meja}
                    onChange={(e) =>
                      setFormData({ ...formData, nomor_meja: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-zinc-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Kapasitas</label>
                  <input
                    type="number"
                    placeholder="Contoh: 4"
                    value={formData.kapasitas}
                    onChange={(e) =>
                      setFormData({ ...formData, kapasitas: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-zinc-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-zinc-700 dark:text-white"
                  >
                    <option value="kosong">Kosong</option>
                    <option value="dipesan">Dipesan</option>
                    <option value="digunakan">Digunakan</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}

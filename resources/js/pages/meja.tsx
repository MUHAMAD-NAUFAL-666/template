'use client';

import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { motion } from 'framer-motion';
import { Table } from 'lucide-react';

export default function Meja() {
  const { mejas }: any = usePage().props;

  return (
    <AppLayout breadcrumbs={[{ title: 'Meja', href: '/meja' }]}>
      <Head title="Daftar Meja" />

      <div className="p-6 md:p-10 text-zinc-900 dark:text-white">
        <div className="flex items-center gap-2 mb-6">
          <Table className="text-blue-500" />
          <h1 className="text-2xl font-bold">Daftar Meja</h1>
        </div>

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
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

'use client';

import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart } from '@/components/charts/LineChart';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useModeAnimation, ThemeAnimationType } from 'react-theme-switch-animation';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard() {
  const {
    ref: toggleRef,
    toggleSwitchTheme,
    isDarkMode,
  } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
    duration: 800,
    blurAmount: 5,
    globalClassName: 'dark',
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      {/* Toggle Theme */}
      <div className="absolute top-4 right-4 z-50">
        <button
          ref={toggleRef}
          onClick={toggleSwitchTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full transition duration-300 hover:rotate-12 bg-white/20 dark:bg-black/30 backdrop-blur shadow"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-blue-400" />
          )}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col gap-6 p-4 text-zinc-900 dark:text-white transition-colors duration-500"
      >
        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div whileHover={{ scale: 1.03 }} className="transition">
            <Card className="shadow-md dark:bg-zinc-800">
              <CardContent>
                <h2 className="text-lg font-semibold">Transaksi Hari Ini</h2>
                <p className="text-2xl font-bold text-green-500">Rp 2.500.000</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="shadow-md dark:bg-zinc-800">
              <CardContent>
                <h2 className="text-lg font-semibold">Meja Terpakai</h2>
                <p className="text-2xl font-bold text-blue-500">12 / 20</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="shadow-md dark:bg-zinc-800">
              <CardContent>
                <h2 className="text-lg font-semibold">Menu Terlaris</h2>
                <p className="text-2xl font-bold text-orange-500">Ayam Geprek</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* GRAFIK PENJUALAN */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border p-4 dark:border-zinc-700 dark:bg-zinc-800 transition"
        >
          <h3 className="text-lg font-semibold mb-2">Grafik Penjualan Mingguan</h3>
          <LineChart />
        </motion.div>

        {/* TRANSAKSI & STATUS MEJA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Transaksi Terbaru */}
          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="shadow-md dark:bg-zinc-800">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Transaksi Terbaru</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Meja 5</span>
                    <span className="font-medium text-green-500">Rp 150.000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Meja 8</span>
                    <span className="font-medium text-green-500">Rp 230.000</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Status Meja */}
          <motion.div whileHover={{ scale: 1.01 }}>
            <Card className="shadow-md dark:bg-zinc-800">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Status Meja</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(12)].map((_, i) => {
                    const isRed = i % 2 !== 0;
                    const bgColor = isRed ? 'bg-red-600' : 'bg-green-600';
                    const note = isRed ? ' (Meja tidak tersedia)' : ' (Meja tersedia)';

                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className={`rounded p-2 text-center text-white text-sm transition ${bgColor}`}
                      >
                        <div>Meja {i + 1}</div>
                        <div className="text-xs italic opacity-80">{note}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </AppLayout>
  );
}

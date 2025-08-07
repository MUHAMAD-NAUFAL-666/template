'use client';

import { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart } from '@/components/charts/LineChart';
import { Moon, Sun, ShoppingCart, Table, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModeAnimation, ThemeAnimationType } from 'react-theme-switch-animation';
import Lottie from 'lottie-react';
import dashboardAnim from '@/assets/lottie/dashboard.json';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Dashboard = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

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

  const summaryData = [
    {
      title: 'Transaksi Hari Ini',
      value: 'Rp 2.500.000',
      icon: <ShoppingCart className="h-6 w-6 text-green-500" />,
    },
    {
      title: 'Meja Terpakai',
      value: '12 / 20',
      icon: <Table className="h-6 w-6 text-blue-500" />,
    },
    {
      title: 'Menu Terlaris',
      value: 'Ayam Geprek',
      icon: <Flame className="h-6 w-6 text-orange-500" />,
    },
  ];

  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
      <Head title="Dashboard" />

      {/* THEME TOGGLE */}
      <div className="fixed top-4 right-4 z-50">
        <button
          ref={toggleRef}
          onClick={toggleSwitchTheme}
          className={`p-2 rounded-full bg-white/30 dark:bg-black/40 backdrop-blur-md shadow-md transition-all duration-500 ${
            isDarkMode ? 'ring-2 ring-yellow-400/70' : 'ring-2 ring-blue-400/70'
          }`}
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-yellow-400" />
          ) : (
            <Moon className="h-5 w-5 text-blue-500" />
          )}
        </button>
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 md:p-10 flex flex-col gap-10 text-zinc-900 dark:text-white"
      >
        {/* HEADER ANIMATION + TEXT */}
        <div className="flex items-center justify-center flex-col gap-2 text-center">
          <Lottie animationData={dashboardAnim} loop className="h-32 w-32 md:h-36 md:w-36" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Selamat Datang 👋</h1>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            Kelola dan pantau aktivitas restoran Anda dari satu tempat.
          </p>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {summaryData.map((item, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
            >
              <Card className="shadow-md rounded-xl bg-white/70 dark:bg-zinc-800/60 backdrop-blur-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="bg-white dark:bg-zinc-800 p-3 rounded-lg shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                      {item.title}
                    </h2>
                    <p className="text-xl font-bold">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* SALES CHART */}
        <div
          data-aos="fade-up"
          className="rounded-xl border p-5 dark:border-zinc-700 dark:bg-zinc-800 bg-white shadow-md"
        >
          <h3 className="text-lg font-semibold mb-3">Grafik Penjualan Mingguan</h3>
          <LineChart />
        </div>

        {/* TRANSAKSI & STATUS MEJA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div data-aos="fade-right">
            <Card className="shadow-md rounded-xl dark:bg-zinc-800 bg-white">
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-3">Transaksi Terbaru</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { meja: 5, total: 150_000 },
                    { meja: 8, total: 230_000 },
                    { meja: 3, total: 180_000 },
                  ].map((trx, i) => (
                    <li
                      key={i}
                      className="flex justify-between border-b pb-1 last:border-none last:pb-0"
                    >
                      <span className="font-medium">Meja {trx.meja}</span>
                      <span className="text-green-500 font-semibold">
                        Rp {trx.total.toLocaleString('id-ID')}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div data-aos="fade-left">
            <Card className="shadow-md rounded-xl dark:bg-zinc-800 bg-white">
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold mb-3">Status Meja</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {[...Array(12)].map((_, i) => {
                    const isOccupied = i % 2 !== 0;
                    const bgColor = isOccupied ? 'bg-red-600' : 'bg-green-600';
                    const status = isOccupied ? 'Tidak Tersedia' : 'Tersedia';

                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className={`rounded-lg py-2 text-center text-white text-xs font-semibold shadow-sm ${bgColor}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <div>Meja {i + 1}</div>
                        <div className="text-[10px] opacity-80 italic">{status}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default Dashboard;

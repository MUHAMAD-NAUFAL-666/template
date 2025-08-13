'use client';

import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent } from '@/components/ui/card';
import AOS from 'aos';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const menus = [
  {
    name: 'Ayam Geprek',
    price: 25000,
    available: true,
    image: 'storage/images/ayamgeprek.jpg',
  },
  {
    name: 'Nasi Goreng',
    price: 20000,
    available: true,
    image: 'storage/images/nasigoreng.jpeg',
  },
  {
    name: 'Beef Steak',
    price: 68000,
    available: false,
    image: 'storage/images/beefsteak.jpg',
  },
  {
    name: 'double beef chicken',
    price: 60000,
    available: true,
    image: 'storage/images/chicken.jpeg',
  },
  {
    name: 'Es Teh Manis',
    price: 8000,
    available: true,
    image: 'storage/images/esteh.jpeg',
  },
  {
    name: 'Kopi Susu',
    price: 25000,
    available: true,
    image: 'storage/images/kopsus.jpg',
  },
  {
    name: 'Soda Gembira',
    price: 12000,
    available: false,
    image: 'storage/images/sodagembira.jpg',
  },
  {
    name: 'Air Mineral',
    price: 5000,
    available: true,
    image: 'storage/images/airmineral.jpeg',
  },
  {
    name: 'Ayam Penyet',
    price: 30000,
    available: true,
    image: 'storage/images/ayampenyet.jpeg',
  },

];

const MenuPage = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <AppLayout breadcrumbs={[{ title: 'Menu', href: '/menu' }]}>
      <Head title="Menu" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-6 md:p-10 flex flex-col gap-8 text-zinc-900 dark:text-white"
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Menu Restoran 🍽️</h1>
          <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400">
            Lihat daftar makanan & minuman yang tersedia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {menus.map((menu, idx) => (
            <motion.div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              whileHover={{ scale: 1.03 }}
              className={`rounded-xl shadow-md overflow-hidden border dark:border-zinc-700 ${
                menu.available ? 'bg-white dark:bg-zinc-800' : 'bg-gray-200 dark:bg-zinc-700 opacity-60'
              }`}
            >
              <img
                src={menu.image}
                alt={menu.name}
                className="h-40 w-full object-cover"
              />
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-1">{menu.name}</h2>
                <p className="text-green-600 dark:text-green-400 font-bold mb-2">
                  Rp {menu.price.toLocaleString('id-ID')}
                </p>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    menu.available
                      ? 'bg-green-100 text-green-600 dark:bg-green-800/40'
                      : 'bg-red-100 text-red-600 dark:bg-red-800/40'
                  }`}
                >
                  {menu.available ? 'Tersedia' : 'Habis'}
                </span>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AppLayout>
  );
};

export default MenuPage;

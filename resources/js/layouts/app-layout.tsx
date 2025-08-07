'use client';

import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePage } from '@inertiajs/react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

const AppLayout = ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
  const { url } = usePage(); // ambil URL saat ini dari Inertia

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    AOS.refresh(); // supaya animasi muncul ulang ketika berpindah halaman
  }, [url]);

  return (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
      <AnimatePresence mode="wait">
        <motion.div
          key={url} // key harus berubah saat navigasi agar animasi muncul
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </AppLayoutTemplate>
  );
};

export default AppLayout;

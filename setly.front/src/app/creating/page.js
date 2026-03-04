'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/app/components/globals/header/Header';

const Creating = dynamic(() => import('./creating').then((m) => m.default), {
  loading: () => <div style={{ minHeight: '60vh' }} aria-busy="true" aria-label="Загрузка" />,
  ssr: false,
});

export default function CreatingPage() {
  return (
    <>
      <Header hideNavigation />
      <Creating />
    </>
  );
}

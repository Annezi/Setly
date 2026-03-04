'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/app/components/globals/header/Header';
import { Footer } from '@/app/components/globals/footer/Footer';
import { PlanCardSkeleton } from '@/app/components/atomic/molecules/plan-card-skeleton/plan-card-skeleton';
import planStyles from '@/app/components/blocks/check-plans/plans/check-plans/check-plans.module.css';

const CheckPlansPage = dynamic(
  () => import('@/app/components/blocks/check-plans/CheckPlansPage').then((m) => ({ default: m.CheckPlansPage })),
  {
    loading: CheckPlansLoading,
    ssr: true,
  }
);

function CheckPlansLoading() {
  return (
    <>
      <Header />
      <main>
        <div style={{ minHeight: 48 }} aria-hidden />
        <div style={{ minHeight: 80 }} aria-hidden />
        <div className={planStyles.filteredContainer} aria-busy="true" aria-label="Загрузка чек-планов">
          <div className={planStyles.cards}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PlanCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckPlansRoute() {
  return <CheckPlansPage />;
}

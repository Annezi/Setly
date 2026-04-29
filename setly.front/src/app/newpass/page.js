"use client";

import { Suspense } from "react";
import { Header } from "@/app/components/globals/header/Header";
import NewPassword from "@/app/components/blocks/auth/newpass/newpass";

export default function NewPassPage() {
  return (
    <>
      <Header />
      <main>
        <div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
          <Suspense
            fallback={
              <div style={{ minHeight: 420 }} aria-busy="true" aria-label="Загрузка формы восстановления">
                <div style={{ height: 44 }} />
              </div>
            }
          >
            <NewPassword />
          </Suspense>
        </div>
      </main>
    </>
  );
}

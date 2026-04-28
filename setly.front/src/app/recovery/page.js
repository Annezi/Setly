"use client";

import { Header } from "@/app/components/globals/header/Header";
import Recovery from "@/app/components/blocks/auth/recovery/recovery";

export default function RecoveryPage() {
  return (
    <>
      <Header />
      <main>
        <div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
          <Recovery />
        </div>
      </main>
    </>
  );
}

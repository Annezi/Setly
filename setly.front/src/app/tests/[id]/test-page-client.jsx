"use client";

import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import TestRunner from "@/app/components/blocks/tests/test-runner";

export default function TestPageClient({ test }) {
  return (
    <>
      <Header />
      <div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
        <TestRunner test={test} />
      </div>
      <div className="main-page-reveal__item" style={{ "--reveal-delay": "120ms" }}>
        <Footer />
      </div>
    </>
  );
}

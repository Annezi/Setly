"use client";

import dynamic from "next/dynamic";
import { Header } from "@/app/components/globals/header/Header";

const Settings = dynamic(() => import("./settings").then((m) => m.default), {
  ssr: false,
  loading: () => <div style={{ minHeight: "60vh" }} aria-busy="true" aria-label="Загрузка настроек" />,
});

export default function SettingsPage() {
  return (
    <>
      <div className="main-page-reveal__item" style={{ "--reveal-delay": "0ms" }}>
        <Header />
      </div>
      <main>
        <div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
          <Settings />
        </div>
      </main>
    </>
  );
}

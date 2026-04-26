"use client";

import { Header } from "@/app/components/globals/header/Header";
import Login from "@/app/components/blocks/auth/login/login";

export default function LoginPage() {
  return (
    <>
      <div className="main-page-reveal__item" style={{ "--reveal-delay": "0ms" }}>
        <Header />
      </div>
      <main>
        <div className="main-page-reveal__item" style={{ "--reveal-delay": "60ms" }}>
          <Login />
        </div>
      </main>
    </>
  );
}

"use client";

import { Header } from "@/app/components/globals/header/Header";
import Login from "@/app/components/blocks/auth/login/login";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main>
        <Login />
      </main>
    </>
  );
}

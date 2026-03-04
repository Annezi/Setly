"use client";

import { Header } from "@/app/components/globals/header/Header";
import Registration from "@/app/components/blocks/auth/registration/registration";

export default function RegistrationPage() {
  return (
    <>
      <Header />
      <main>
        <Registration />
      </main>
    </>
  );
}

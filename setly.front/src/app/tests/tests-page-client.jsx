"use client";

import { useState, useCallback } from "react";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import Search from "@/app/components/blocks/check-plans/search/search";
import Tests from "@/app/components/blocks/tests/tests";

export default function TestsPageClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearchSubmit = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  return (
    <>
      <Header />
      <main>
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <Tests searchQuery={searchQuery} />
      </main>
      <Footer />
    </>
  );
}

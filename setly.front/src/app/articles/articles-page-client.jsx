"use client";

import { useState, useCallback } from "react";
import { Header } from "@/app/components/globals/header/Header";
import { Footer } from "@/app/components/globals/footer/Footer";
import Search from "@/app/components/blocks/check-plans/search/search";
import Articles from "@/app/components/blocks/articles/articles";

export default function ArticlesPageClient() {
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
        <div className="main-page-reveal__item" style={{ "--reveal-delay": "50ms", minHeight: 48 }} aria-hidden />
        <div className="main-page-reveal__item" style={{ "--reveal-delay": "80ms" }}>
          <Search
            value={searchQuery}
            onChange={handleSearchChange}
            onSearchSubmit={handleSearchSubmit}
          />
        </div>
        <div className="main-page-reveal__item" style={{ "--reveal-delay": "120ms" }}>
          <Articles searchQuery={searchQuery} />
        </div>
      </main>
      <div className="main-page-reveal__item" style={{ "--reveal-delay": "170ms" }}>
        <Footer />
      </div>
    </>
  );
}

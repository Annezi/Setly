'use client';

import { useState, useCallback } from 'react';
import { Header } from '@/app/components/globals/header/Header';
import { Footer } from '@/app/components/globals/footer/Footer';
import Search from '@/app/components/blocks/check-plans/search/search';
import Articles from '@/app/components/blocks/articles/articles';

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');

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
        <div style={{ minHeight: 48 }} aria-hidden />
        <Search
          value={searchQuery}
          onChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        />
        <Articles searchQuery={searchQuery} />
      </main>
      <Footer />
    </>
  );
}

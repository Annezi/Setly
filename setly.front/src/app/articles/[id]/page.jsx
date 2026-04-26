'use client';

import { useParams } from 'next/navigation';
import Article from '@/app/components/blocks/articles/article/article';

export default function ArticlePage() {
  const params = useParams();
  const id = params?.id ?? null;

  return (
    <div className="main-page-reveal">
      <Article articleId={id} />
    </div>
  );
}

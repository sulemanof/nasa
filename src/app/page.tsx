'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import ImageCollection from '@/components/ImageCollection';
import Search from '@/components/Search';
import { SEARCH_ENDPOINT } from '@/lib/constants';
import { SearchImageResult } from '@/lib/types';

export default function Home() {
  const [data, setData] = useState<null | SearchImageResult>(null);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) {
      return;
    }

    setLoading(true);

    fetch(`${SEARCH_ENDPOINT}?${searchParams}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .finally(() => setLoading(false));
  }, [searchParams]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex items-center justify-center gap-4">
        <Image src="/nasa.png" alt="Logo" width={48} height={48} />
        <h1 className="text-2xl font-bold">Welcome to NASA</h1>
      </header>
      <main className="flex flex-col gap-8 w-full h-full">
        <Search loading={loading} />
        {data?.collection && data.collection.items.length > 0 ? (
          <ImageCollection collection={data.collection} />
        ) : (
          <p className="text-lg text-center">No results found</p>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

import { Suspense } from 'react';
import Image from 'next/legacy/image';

import { QueryParams } from '@/lib/types';
import ImageCollection from './components/ImageCollection';
import Search from './components/Search';
import CollectionSkeleton from './components/CollectionSkeleton';
import Link from 'next/link';

interface Props {
  searchParams: Promise<Partial<QueryParams>>;
}

const Home = async ({ searchParams }: Props) => (
  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
    <header className="row-start-1 flex items-center gap-4 w-full">
      <Link className="w-12" href="/">
        <Image src="/nasa.png" alt="Logo" width={48} height={48} />
      </Link>
      <h1 className="w-full text-2xl text-center font-bold">Welcome to NASA</h1>
    </header>
    <main className="flex flex-col gap-8 w-full h-full">
      <Search />

      <Suspense fallback={<CollectionSkeleton />}>
        <ImageCollection searchParams={searchParams} />
      </Suspense>
    </main>
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
  </div>
);

export default Home;

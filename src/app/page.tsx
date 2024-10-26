import { Suspense } from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';

import { QueryParams } from '@/lib/types';
import { buildQuery } from '@/lib/buildQuery';
import ImageCollection from './components/ImageCollection';
import Search from './components/Search';
import CollectionSkeleton from './components/CollectionSkeleton';

interface Props {
  searchParams: Promise<Partial<QueryParams>>;
}

const Home = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const query = buildQuery(params);

  return (
    <>
      <header className="row-start-1 flex items-center gap-4 w-full">
        <Link className="w-12" href="/">
          <Image src="/nasa.png" alt="Logo" width={48} height={48} />
        </Link>
      </header>
      <main className="flex flex-col gap-8 w-full h-full">
        <div>
          <h1 className="w-full text-2xl text-center font-bold">
            Welcome to NASA media search app
          </h1>
          <p className="text-center">
            Search for images from NASA&apos;s media library and explore the universe
          </p>
        </div>

        <Suspense fallback={null}>
          <Search />
        </Suspense>

        {query && (
          <Suspense key={query} fallback={<CollectionSkeleton />}>
            <ImageCollection query={query} page={params.page ? Number(params.page) : 1} />
          </Suspense>
        )}
      </main>
    </>
  );
};

export default Home;

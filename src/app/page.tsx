import Image from 'next/legacy/image';
import { buildQuery } from '@/lib/buildQuery';
import { SEARCH_ENDPOINT } from '@/lib/constants';
import { QueryParams, SearchImageResult } from '@/lib/types';
import ImageCollection from './components/ImageCollection';
import Search from './components/Search';

interface Props {
  searchParams: Promise<Partial<QueryParams>>;
}

const Home = async ({ searchParams }: Props) => {
  const query = buildQuery(await searchParams);

  let result: SearchImageResult | null = null;

  if (query) {
    const data = await fetch(`${SEARCH_ENDPOINT}${query}`);
    result = await data.json();
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="row-start-1 flex items-center justify-center gap-4">
        <Image src="/nasa.png" alt="Logo" width={48} height={48} />
        <h1 className="text-2xl font-bold">Welcome to NASA</h1>
      </header>
      <main className="flex flex-col gap-8 w-full h-full">
        <Search />

        <p>Total hits: {result?.collection.metadata.total_hits}</p>
        {result?.collection && result.collection.items.length > 0 ? (
          <ImageCollection collection={result.collection} />
        ) : (
          <p className="text-lg text-center">No results found</p>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
};

export default Home;

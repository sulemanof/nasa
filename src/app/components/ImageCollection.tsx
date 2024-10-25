import Image from 'next/legacy/image';
import Link from 'next/link';

import { QueryParams, SearchImageResult } from '@/lib/types';
import { DEFAULT_PAGE_SIZE, SEARCH_ENDPOINT } from '@/lib/constants';
import Pagination from './Pagination';
import { buildQuery } from '@/lib/buildQuery';

interface Props {
  searchParams: Promise<Partial<QueryParams>>;
}

const ImageCollection: React.FC<Props> = async ({ searchParams }) => {
  const params = await searchParams;
  const query = buildQuery(params);

  if (!query) {
    return <p className="text-lg text-center">No search query</p>;
  }

  const page = params.page ? Number(params.page) : 1;

  let result: SearchImageResult | null = null;
  const data = await fetch(`${SEARCH_ENDPOINT}${query}`);
  result = await data.json();

  if (!result?.collection.items.length) {
    return <p className="text-lg text-center">No results found</p>;
  }

  const firstItemIndex = DEFAULT_PAGE_SIZE * (page - 1) + 1;
  const lastItemIndex = firstItemIndex + result.collection.items.length - 1;

  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {result.collection.items.map((item) => (
          <li
            key={item.href}
            className="p-4 border rounded-md shadow-md hover:bg-gray-100 transition-colors"
          >
            <Link className="flex flex-col gap-2" href={`/asset/${item.data[0].nasa_id}`}>
              <div className="relative h-48 bg-gray-300">
                <Image
                  src={item.links?.[0].href || '/nasa.png'}
                  alt={`${item.data[0].title}`}
                  layout="fill"
                  objectFit={item.links?.[0].href ? 'cover' : 'contain'}
                  objectPosition="top"
                />
              </div>
              <h2 className="text-lg font-bold">{item.data[0].title}</h2>
              <p className="text-sm">Center: {item.data[0].center}</p>
              {item.data[0].secondary_creator && (
                <p className="text-sm">Author: {item.data[0].secondary_creator}</p>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-lg text-center">
        Showing {firstItemIndex}-{lastItemIndex} of {result.collection.metadata.total_hits} results
      </p>

      {result.collection.links && <Pagination links={result.collection.links} page={page} />}
    </div>
  );
};

export default ImageCollection;

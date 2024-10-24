import Image from 'next/image';
import Link from 'next/link';

import { SearchImageResult } from '@/lib/types';

interface Props {
  collection: SearchImageResult['collection'];
}
const ImageCollection: React.FC<Props> = ({ collection }) => {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {collection.items.map((item) => (
        <Link key={item.href} href={`/asset/${item.data[0].nasa_id}`}>
          <li className="flex flex-col gap-2 p-4 border rounded-md shadow-md">
            <div className="relative flex-shrink-0 w-full h-48 bg-gray-300">
              <Image
                src={item.links?.[0].href || '/nasa.png'}
                alt={`${item.data[0].title}`}
                layout="fill"
                objectFit={item.links?.[0].href ? 'cover' : 'contain'}
                objectPosition="top"
              />
            </div>
            <h2 className="text-lg font-bold">{item.data[0].title}</h2>
            <p className="text-sm">{item.data[0].secondary_creator}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ImageCollection;

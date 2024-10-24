import Image from 'next/legacy/image';

import { SearchImageItem } from '@/lib/types';

const AssetView: React.FC<SearchImageItem> = ({ data, links }) => (
  <div className="max-w-4xl mx-auto p-4">
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative flex-shrink-0 w-full h-48 bg-gray-300">
        <Image
          src={links?.[0].href || '/nasa.png'}
          alt={`${data[0].title}`}
          layout="fill"
          objectFit={links?.[0].href ? 'cover' : 'contain'}
          objectPosition="top"
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{data[0].title}</h2>
        {/* <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-gray-500 text-sm">By: {author}</p> */}
      </div>
    </div>
  </div>
);

export default AssetView;

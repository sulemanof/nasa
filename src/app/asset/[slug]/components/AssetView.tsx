import Image from 'next/legacy/image';

import { SearchImageItem } from '@/lib/types';

const AssetView: React.FC<SearchImageItem> = ({ data, links }) => (
  <div className="max-w-4xl mx-auto p-4">
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative flex-shrink-0 w-full h-96 bg-gray-300">
        <a href={links?.[0].href} target="_blank" rel="noreferrer">
          <Image
            src={links?.[0].href || '/nasa.png'}
            alt={`${data[0].title}`}
            layout="fill"
            objectFit="contain"
            objectPosition="top"
          />
        </a>
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">{data[0].title}</h1>
        <p className="text-gray-700 mb-4">{data[0].description}</p>
        <p className="text-gray-500 text-sm">
          Date: {new Date(data[0].date_created).toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm">By: {data[0].secondary_creator}</p>
        <p className="text-gray-500 text-sm">Keywords: {data[0].keywords.join(', ')}</p>
      </div>
    </div>
  </div>
);

export default AssetView;

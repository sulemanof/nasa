import { ASSET_ENDPOINT } from '@/lib/constants';
import { SearchImageResult } from '@/lib/types';
import AssetView from './components/AssetView';
import Header from './components/Header';

interface Props {
  params: Promise<{ slug: string }>;
}

const ImagePage = async ({ params }: Props) => {
  const { slug } = await params;
  const data = await fetch(`${ASSET_ENDPOINT}${slug}`);
  const result: SearchImageResult = await data.json();

  return (
    <div>
      <Header />
      <AssetView {...result.collection.items[0]} />
    </div>
  );
};

export default ImagePage;

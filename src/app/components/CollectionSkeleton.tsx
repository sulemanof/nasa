import { Skeleton } from '@/components/ui/skeleton';

const CollectionSkeleton = () => (
  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(6)].map((_, i) => (
      <li key={i} className="flex flex-col gap-2 p-4 border rounded-md shadow-md">
        <div className="relative h-48 bg-gray-300">
          <Skeleton className="h-full w-full rounded-md" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </li>
    ))}
  </ul>
);

export default CollectionSkeleton;

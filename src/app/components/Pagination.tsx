import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationLink } from '@/lib/types';

interface Props {
  links: PaginationLink[];
}

const Pagination: React.FC<Props> = ({ links }) => {
  let nextLink, prevLink;
  if (links.length === 2) {
    [prevLink, nextLink] = links;
  } else {
    [nextLink] = links;
  }

  const nextHref = nextLink.href.split('?')[1];
  const prevHref = prevLink?.href.split('?')[1];

  return (
    <PaginationBase>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`?${prevHref}` || ''}
            className={!prevHref ? 'pointer-events-none text-gray-400' : undefined}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`?${nextHref}`} />
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  );
};

export default Pagination;

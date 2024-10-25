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
  page: number;
}

const Pagination: React.FC<Props> = ({ links, page }) => {
  let nextLink, prevLink;
  if (links.length === 2) {
    [prevLink, nextLink] = links;
  } else if (page > 1 && links.length === 1) {
    [prevLink] = links;
  } else {
    [nextLink] = links;
  }

  const nextHref = nextLink?.href.split('?')[1];
  const prevHref = prevLink?.href.split('?')[1];

  return (
    <PaginationBase>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={!prevHref ? 'pointer-events-none text-gray-400' : undefined}
            href={`?${prevHref}` || ''}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            className={!nextHref ? 'pointer-events-none text-gray-400' : undefined}
            href={`?${nextHref}`}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  );
};

export default Pagination;

import { DEFAULT_PAGE_SIZE, SEARCH_TERM_KEY, YEAR_END_KEY, YEAR_START_KEY } from './constants';
import { QueryParams } from './types';

export const buildQuery = ({ q, year_start, year_end, page }: Partial<QueryParams>) => {
  if (!q) {
    return '';
  }

  let query = `?${SEARCH_TERM_KEY}=${q}&media_type=image&page_size=${DEFAULT_PAGE_SIZE}`;

  if (year_start) {
    query += `&${YEAR_START_KEY}=${year_start}`;
  }

  if (year_end) {
    query += `&${YEAR_END_KEY}=${year_end}`;
  }

  if (page) {
    query += `&page=${page}`;
  }

  return query;
};

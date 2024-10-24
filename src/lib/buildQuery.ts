import { SEARCH_TERM_KEY, YEAR_END_KEY, YEAR_START_KEY } from './constants';
import { QueryParams } from './types';

export const buildQuery = ({ q, yearStart, yearEnd }: Partial<QueryParams>) => {
  if (!q) {
    return '';
  }

  let query = `?${SEARCH_TERM_KEY}=${q}`;

  if (yearStart) {
    query += `&${YEAR_START_KEY}=${yearStart}`;
  }

  if (yearEnd) {
    query += `&${YEAR_END_KEY}=${yearEnd}`;
  }

  return query;
};

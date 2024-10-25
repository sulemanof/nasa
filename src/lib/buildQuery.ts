import { SEARCH_TERM_KEY, YEAR_END_KEY, YEAR_START_KEY } from './constants';
import { QueryParams } from './types';

export const buildQuery = ({ q, year_start, year_end }: Partial<QueryParams>) => {
  if (!q) {
    return '';
  }

  let query = `?${SEARCH_TERM_KEY}=${q}&media_type=image`;

  if (year_start) {
    query += `&${YEAR_START_KEY}=${year_start}`;
  }

  if (year_end) {
    query += `&${YEAR_END_KEY}=${year_end}`;
  }

  return query;
};

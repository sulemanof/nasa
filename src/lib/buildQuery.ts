import { SEARCH_TERM_KEY, YEAR_END_KEY, YEAR_START_KEY } from './constants';

export const buildQuery = (searchText: string, yearStart: string, yearEnd: string) => {
  let query = `?${SEARCH_TERM_KEY}=${searchText}`;

  if (yearStart) {
    query += `&${YEAR_START_KEY}=${yearStart}`;
  }

  if (yearEnd) {
    query += `&${YEAR_END_KEY}=${yearEnd}`;
  }

  return query;
};

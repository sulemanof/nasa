import { buildQuery } from './buildQuery';
import { DEFAULT_PAGE_SIZE, SEARCH_TERM_KEY, YEAR_END_KEY, YEAR_START_KEY } from './constants';

describe('buildQuery', () => {
  test('returns an empty string when search term is missing', () => {
    const query = buildQuery({});
    expect(query).toBe('');
  });

  test('builds query with only required search term', () => {
    const query = buildQuery({ q: 'Mars' });
    expect(query).toBe(`?${SEARCH_TERM_KEY}=Mars&media_type=image&page_size=${DEFAULT_PAGE_SIZE}`);
  });

  test('builds query with search term and year start', () => {
    const query = buildQuery({ q: 'Mars', year_start: '2000' });
    expect(query).toBe(
      `?${SEARCH_TERM_KEY}=Mars&media_type=image&page_size=${DEFAULT_PAGE_SIZE}&${YEAR_START_KEY}=2000`
    );
  });

  test('builds query with search term, year start, and year end', () => {
    const query = buildQuery({ q: 'Mars', year_start: '2000', year_end: '2020' });
    expect(query).toBe(
      `?${SEARCH_TERM_KEY}=Mars&media_type=image&page_size=${DEFAULT_PAGE_SIZE}&${YEAR_START_KEY}=2000&${YEAR_END_KEY}=2020`
    );
  });

  test('builds query with search term, year start, year end, and page', () => {
    const query = buildQuery({
      q: 'Mars',
      year_start: '2000',
      year_end: '2020',
      page: '2',
    });
    expect(query).toBe(
      `?${SEARCH_TERM_KEY}=Mars&media_type=image&page_size=${DEFAULT_PAGE_SIZE}&${YEAR_START_KEY}=2000&${YEAR_END_KEY}=2020&page=2`
    );
  });

  test('builds query with search term and page only', () => {
    const query = buildQuery({ q: 'Mars', page: '3' });
    expect(query).toBe(
      `?${SEARCH_TERM_KEY}=Mars&media_type=image&page_size=${DEFAULT_PAGE_SIZE}&page=3`
    );
  });
});

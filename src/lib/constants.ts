export const API_ROOT = 'https://images-api.nasa.gov';
export const SEARCH_ENDPOINT = `${API_ROOT}/search`;

export const SEARCH_TERM_KEY = 'q';
export const YEAR_START_KEY = 'year_start';
export const YEAR_END_KEY = 'year_end';
export const NASA_ID_KEY = 'nasa_id';

export const ASSET_ENDPOINT = `${SEARCH_ENDPOINT}?${NASA_ID_KEY}=`;

export const DEFAULT_PAGE_SIZE = 24;

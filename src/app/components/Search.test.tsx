import { afterEach, beforeEach, describe, expect, test, vi, Mock } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Search from './Search';
import { SEARCH_TERM_KEY, YEAR_START_KEY, YEAR_END_KEY } from '@/lib/constants';

// Mock next/navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('Search Component', () => {
  let pushMock: Mock;

  beforeEach(() => {
    pushMock = vi.fn();
    (useRouter as Mock).mockReturnValue({ push: pushMock });

    // Default mock values for search params
    (useSearchParams as Mock).mockReturnValue({
      get: (key: string) => {
        switch (key) {
          case SEARCH_TERM_KEY:
            return 'initial search';
          case YEAR_START_KEY:
            return '2000';
          case YEAR_END_KEY:
            return '2020';
          default:
            return '';
        }
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders input fields and button', () => {
    render(<Search />);

    expect(screen.getByPlaceholderText('Search Term')).toBeDefined();
    expect(screen.getByPlaceholderText('Year Start')).toBeDefined();
    expect(screen.getByPlaceholderText('Year End')).toBeDefined();
    expect(screen.getByRole('button', { name: /search/i })).toBeDefined();
  });

  test('populates input fields from search params', () => {
    render(<Search />);

    expect(screen.getByPlaceholderText('Search Term').getAttribute('value')).toBe('initial search');
    expect(screen.getByPlaceholderText('Year Start').getAttribute('value')).toBe('2000');
    expect(screen.getByPlaceholderText('Year End').getAttribute('value')).toBe('2020');
  });

  test('updates input fields on user input', () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Search Term');
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    expect(searchInput.getAttribute('value')).toBe('new search');

    const yearStartInput = screen.getByPlaceholderText('Year Start');
    fireEvent.change(yearStartInput, { target: { value: '1990' } });
    expect(yearStartInput.getAttribute('value')).toBe('1990');

    const yearEndInput = screen.getByPlaceholderText('Year End');
    fireEvent.change(yearEndInput, { target: { value: '2000' } });
    expect(yearEndInput.getAttribute('value')).toBe('2000');
  });

  test('trims whitespace from search input on submit', async () => {
    render(<Search />);

    const searchInput = screen.getByPlaceholderText('Search Term');
    fireEvent.change(searchInput, { target: { value: '   spaced search   ' } });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    await waitFor(() => {
      expect(searchInput.getAttribute('value')).toBe('spaced search');
    });
  });

  test('calls router.push with correct query on submit', async () => {
    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('Search Term'), {
      target: { value: 'test query' },
    });
    fireEvent.change(screen.getByPlaceholderText('Year Start'), { target: { value: '2010' } });
    fireEvent.change(screen.getByPlaceholderText('Year End'), { target: { value: '2020' } });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(expect.stringContaining(`q=test query`));
      expect(pushMock).toHaveBeenCalledWith(expect.stringContaining(`year_start=2010`));
      expect(pushMock).toHaveBeenCalledWith(expect.stringContaining(`year_end=2020`));
    });
  });

  test('does not call router.push when search term is empty', async () => {
    render(<Search />);

    fireEvent.change(screen.getByPlaceholderText('Search Term'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(pushMock).not.toHaveBeenCalled();
    });
  });
});

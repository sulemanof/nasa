import { Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { buildQuery } from '@/lib/buildQuery';
import { SearchImageResult } from '@/lib/types';
import { SEARCH_ENDPOINT } from '@/lib/constants';
import ImageCollection from './ImageCollection';

global.fetch = vi.fn();

vi.mock('@/lib/buildQuery', () => ({
  buildQuery: vi.fn(),
}));

describe('ImageCollection Component', () => {
  const mockQuery = `?q=Mars`;
  const mockSearchResults: SearchImageResult = {
    collection: {
      items: [
        {
          href: '/some-image',
          data: [
            {
              date_created: '1969-07-21T00:00:00Z',
              description: 'A photo of Mars',
              media_type: 'image',
              nasa_id: '123',
              title: 'Mars Rover',
              center: 'JPL',
              secondary_creator: 'NASA',
            },
          ],
          links: [{ href: '/image.jpg', rel: 'preview', render: 'image' }],
        },
      ],
      metadata: { total_hits: 1 },
      links: [],
      href: '/search?q=Mars',
      version: '1.0',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders "No results found" message when API returns no items', async () => {
    (buildQuery as Mock).mockReturnValue(mockQuery);
    (global.fetch as Mock).mockResolvedValue({
      json: async () => ({
        collection: { items: [], metadata: { total_hits: 0 } },
      }),
    });

    render(await ImageCollection({ query: mockQuery, page: 1 }));

    expect(screen.findByText('No results found')).toBeDefined();
  });

  test('fetches and displays search results correctly', async () => {
    (buildQuery as Mock).mockReturnValue(mockQuery);
    (global.fetch as Mock).mockResolvedValue({
      json: async () => mockSearchResults,
    });

    render(await ImageCollection({ query: mockQuery, page: 1 }));

    expect(global.fetch).toHaveBeenCalledWith(`${SEARCH_ENDPOINT}?q=Mars`);

    expect(screen.findByText('Mars Rover')).toBeDefined();
    expect(screen.getByText('Center: JPL')).toBeDefined();
    expect(screen.getByText('Author: NASA')).toBeDefined();
  });

  test('displays item count and pagination details correctly', async () => {
    (buildQuery as Mock).mockReturnValue(mockQuery);
    (global.fetch as Mock).mockResolvedValue({
      json: async () => ({
        collection: {
          items: Array(10).map(() => ({
            ...mockSearchResults.collection.items[0],
            href: '/some-image' + Math.random(), // Ensure unique hrefs to avoid key collisions
          })),
          metadata: { total_hits: 30 },
          links: [],
        },
      }),
    });

    render(await ImageCollection({ query: mockQuery, page: 1 }));

    expect(screen.findByText('Showing 1-10 of 30 results')).toBeDefined();
  });

  test('displays pagination component when links are present in the API response', async () => {
    (buildQuery as Mock).mockReturnValue(mockQuery);
    (global.fetch as Mock).mockResolvedValue({
      json: async () => ({
        collection: {
          items: [mockSearchResults.collection.items[0]],
          metadata: { total_hits: 1 },
          links: [{ rel: 'next', href: '/page=2' }],
        },
      }),
    });

    render(await ImageCollection({ query: mockQuery, page: 1 }));

    expect(screen.findByText('Showing 1-1 of 1 results')).toBeDefined();
    expect(screen.getByRole('navigation')).toBeDefined();
  });
});

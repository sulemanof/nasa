import { render, screen } from '@testing-library/react';
import CollectionSkeleton from './CollectionSkeleton';

test('CollectionSkeleton', () => {
  render(<CollectionSkeleton />);

  expect(screen.getByRole('list')).toBeDefined();
  expect(screen.getAllByRole('listitem')).toHaveLength(6);
});

import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Footer', () => {
  render(<Footer />);

  expect(screen.getByRole('link', { name: /GitHub/ })).toBeDefined();
  expect(screen.getByRole('link', { name: /LinkedIn/ })).toBeDefined();
});

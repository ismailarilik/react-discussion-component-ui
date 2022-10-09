import { render, screen } from '@testing-library/react';
import App from './App';

test('renders loading text in the beginning', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});

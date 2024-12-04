import { render, screen } from '@testing-library/react';

function DiscoverPage() {
  const travelOptions = ['Backpacking', 'Solo Travelling', 'Family Travel'];
  return (
    <div>
      <h1>Discover Travel Options</h1>
      <ul>
        {travelOptions.map((option) => (
          <li key={option}>{option}</li>
        ))}
      </ul>
    </div>
  );
}

test('renders travel options on the Discover page', () => {
  render(<DiscoverPage />);

  expect(screen.getByText('Discover Travel Options')).toBeInTheDocument();
  expect(screen.getByText('Backpacking')).toBeInTheDocument();
  expect(screen.getByText('Solo Travelling')).toBeInTheDocument();
  expect(screen.getByText('Family Travel')).toBeInTheDocument();
});

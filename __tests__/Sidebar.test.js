import { render, screen } from '@testing-library/react';

function Sidebar() {
  return (
    <nav>
      <ul>
        <li>Home</li>
        <li>Discover</li>
        <li>Contact Us</li>
      </ul>
    </nav>
  );
}

test('renders the sidebar navigation', () => {
  render(<Sidebar />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('Discover')).toBeInTheDocument();
  expect(screen.getByText('Contact Us')).toBeInTheDocument();
});

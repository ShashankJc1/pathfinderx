import { render, screen } from '@testing-library/react';

function SampleComponent() {
  return <h1>Welcome to PathfinderX</h1>;
}

test('renders the component', () => {
  render(<SampleComponent />);
  expect(screen.getByText('Welcome to PathfinderX')).toBeInTheDocument();
});

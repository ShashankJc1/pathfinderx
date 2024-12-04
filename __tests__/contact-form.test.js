import { render, screen, fireEvent } from '@testing-library/react';

function ContactForm() {
  return (
    <form>
      <label htmlFor="name">Name</label>
      <input id="name" type="text" placeholder="Enter your name" />
      
      <label htmlFor="email">Email</label>
      <input id="email" type="email" placeholder="Enter your email" />
      
      <button type="submit">Submit</button>
    </form>
  );
}

test('renders the Contact Us form and checks inputs', () => {
  render(<ContactForm />);

  // Check if elements are rendered
  expect(screen.getByLabelText('Name')).toBeInTheDocument();
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByText('Submit')).toBeInTheDocument();
  
  // Simulate user interaction
  fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
  fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'john@example.com' } });

  expect(screen.getByPlaceholderText('Enter your name').value).toBe('John Doe');
  expect(screen.getByPlaceholderText('Enter your email').value).toBe('john@example.com');
});

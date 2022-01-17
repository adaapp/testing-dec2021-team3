import { render, screen } from '@testing-library/react';
import App from './App';

it('should display keyboard keys', () => {
  render(<App />);
  let linkElement = screen.getByText(/1/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/h/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/3/i);
  expect(linkElement).toBeInTheDocument();
});

it('should display the app name', () => {
  render(<App />);
  let linkElement = screen.getByText(/mélodie/i);
  expect(linkElement).toBeInTheDocument();
});

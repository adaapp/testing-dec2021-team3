import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

it('should display the flash screen when rendered', async () => {
  render(<App />);

  expect(screen.getByTestId('splashWrap')).toBeInTheDocument();
  expect(screen.getByTestId('screen')).toBeInTheDocument();

  expect(screen.getByTestId('screen').className).toBe('');
  fireEvent.click(screen.getByTestId('screen'));
  expect(screen.getByTestId('screen').className).toBe('removed');
  
  // await new Promise((r) => setTimeout(r, 1000));

  // expect(screen.getByText('click to continue...')).toBeNull;
  // expect(screen.getByTestId('screen')).toBeNull;
});

it('should display the name of the app ', () => {
  render(<App />);
  
  expect(screen.getByTestId('app-text')).toHaveTextContent('mélodie');
  expect(screen.getByTestId('app-text')).toBeInstanceOf(HTMLSpanElement);
});

it('should display the app logo at the top of the page', () => {
  render(<App />);

  expect(screen.getByAltText('Header Logo')).toBeInTheDocument;
  expect(screen.getByAltText('Header Logo')).toBeInstanceOf(Image);

  expect(screen.getByAltText('Header Logo')).toBeVisible();
  expect(screen.getByAltText('Header Logo').id).toBe('logo');
  expect(screen.getByAltText('Header Logo').src).toBe('http://localhost/svg/logo.svg');
});

it('should display every animated shape', () => {
  render(<App />);

  expect(screen.getByAltText('Visual Effect 1')).toBeVisible();
  expect(screen.getByAltText('Visual Effect 1')).toBeInstanceOf(Image);

  expect(screen.getByAltText('Visual Effect 2')).toBeVisible();
  expect(screen.getByAltText('Visual Effect 2')).toBeInstanceOf(Image);

  expect(screen.getByAltText('Visual Effect 3')).toBeVisible();
  expect(screen.getByAltText('Visual Effect 3')).toBeInstanceOf(Image);
});


// it('should display keyboard keys', () => {
//   render(<App />);

//   let linkElement = screen.getByText(/1/i);
//   expect(linkElement).toBeInTheDocument();
//   linkElement = screen.getByText(/f/i);
//   expect(linkElement).toBeInTheDocument();
//   linkElement = screen.getByText(/3/i);
//   expect(linkElement).toBeInTheDocument();
// });

// it('should display the app name', () => {
//   render(<App />);
  
//   let linkElement = screen.getByText(/mélodie/i);
//   expect(linkElement).toBeInTheDocument();
// });

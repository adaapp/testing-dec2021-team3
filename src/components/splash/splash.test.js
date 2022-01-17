import { render, screen, fireEvent } from '@testing-library/react';
import Splash from './splash';

describe('Testing the clearSplash() function', () => {
    it('should set fade to true when the user clicks on the splash screen', () => {
        render(<Splash />);

        expect(screen.getByTestId('screen').className).toBe('');
        fireEvent.click(screen.getByTestId('screen'));
        expect(screen.getByTestId('screen').className).toBe('removed');
    });
});

it('should display welcome text ', () => {
  render(<Splash />);
  
  expect(screen.getByTestId('welcome')).toHaveTextContent('Welcome to the next generation of music creation');
  expect(screen.getByText(/mélodie/i)).toBeInTheDocument();
});

it('should display the app logo', () => {
    render(<Splash />);

    expect(screen.getByAltText('Logo')).toBeVisible();
    expect(screen.getByAltText('Logo').id).toBe('splashLogo');
    expect(screen.getByAltText('Logo').src).toBe('http://localhost/svg/logo.svg');
    expect(screen.getByAltText('Logo')).toBeInTheDocument;
    expect(screen.getByAltText('Logo')).toBeInstanceOf(Image);
});

it('should display the click message and material icon', () => {
    render(<Splash />);

    expect(screen.getByTestId('click')).toHaveTextContent('click to continue...');
    expect(screen.getByTestId('material-click')).toHaveTextContent('touch_app');
});


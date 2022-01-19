import { render, screen, fireEvent, getByText, getByTestId, waitFor } from '@testing-library/react';
import App from './App';

describe ('Test Splash screen functionality', () => {
  it('should display the Splash screen when rendered', async () => {
    render(<App />);
  
    expect(screen.getByTestId('splashWrap')).toBeInTheDocument();
    expect(screen.getByTestId('screen')).toBeInTheDocument();
  
    expect(screen.getByTestId('screen').className).toBe('');
    fireEvent.click(screen.getByTestId('screen'));
    expect(screen.getByTestId('screen').className).toBe('removed');
  });
  
  it('should not display the Splash screen if screen has been clicked', async () => {
    render(<App />);
  
    fireEvent.click(screen.getByTestId('screen'));
  
    await waitFor(() => {
      expect(screen.queryByText('click to continue...')).not.toBeInTheDocument();
      expect(screen.queryByText('Play the virtual keys using your keyboard, or by clicking on them!')).not.toBeInTheDocument();
    });
  });
});

describe('Test that elements are rendered correctly on the screen', () => {
  it('should display the name of the app ', () => {
    render(<App />);
    
    expect(screen.getByTestId('appText')).toBeInTheDocument();
    expect(screen.getByTestId('appText')).toHaveTextContent('mélodie');
    expect(screen.getByTestId('appText')).toBeInstanceOf(HTMLSpanElement);
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
});

describe('Test the note bubble', () => {
  it('should render the note bubble', () => {
    render(<App />);
    expect(screen.getByTestId('noteBubble')).toBeInTheDocument();
    expect(screen.getByTestId('noteBubble')).toHaveTextContent('🎹');
    expect(screen.getByTestId('noteBubble')).toBeInstanceOf(HTMLSpanElement);
    expect(screen.getByTestId('noteBubble').id).toBe('current');
  });

  it('should display the equivalent note when a key is clicked', () => {
    render(<App />);

    fireEvent.mouseDown(screen.getByTestId('keyTest1'));
    expect(screen.getByTestId('noteBubble')).toHaveTextContent('C2');

    fireEvent.mouseDown(screen.getByTestId('keyTest0'));
    expect(screen.getByTestId('noteBubble')).toHaveTextContent('E3');

    fireEvent.mouseDown(screen.getByTestId('keyTestP'));
    expect(screen.getByTestId('noteBubble')).toHaveTextContent('A#4');

    fireEvent.mouseDown(screen.getByTestId('keyTestZ'));
    expect(screen.getByTestId('noteBubble')).toHaveTextContent('D#6');

    fireEvent.mouseDown(screen.getByTestId('keyTestv'));
    expect(screen.getByTestId('noteBubble')).toHaveTextContent('G6');
  });
});
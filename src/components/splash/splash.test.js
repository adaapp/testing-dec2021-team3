import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Splash from './splash';

describe('Testing that Splash page elements are rendered correctly', () => {
    it('should render the name of the app', () => {
        render(<Splash />);

        expect(screen.getByTestId('appName')).toBeInTheDocument();
        expect(screen.getByTestId('appName')).toHaveTextContent('mélodie');
        expect(screen.getByText(/mélodie/i)).toBeInTheDocument();
    });

    it('should display help instructions ', () => {
        render(<Splash />);

        expect(screen.getByTestId('helper')).toBeInTheDocument();
        expect(screen.getByTestId('helper')).toBeInstanceOf(HTMLSpanElement);
        expect(screen.getByTestId('helper')).toHaveTextContent('Play the virtual keys using your keyboard, or by clicking on them!');
    });

    it('should display the app logo', () => {
        render(<Splash />);

        expect(screen.getByAltText('Logo')).toBeVisible();
        expect(screen.getByAltText('Logo').id).toBe('splashLogo');
        expect(screen.getByAltText('Logo').src).toBe('http://localhost/svg/logo.svg');
        expect(screen.getByAltText('Logo')).toBeInTheDocument;
        expect(screen.getByAltText('Logo')).toBeInstanceOf(Image);
    });

    it('should display the piano illustration', () => {
        render(<Splash />);

        expect(screen.getByAltText('Piano Illustration')).toBeVisible();
        expect(screen.getByAltText('Piano Illustration').id).toBe('pianoImage');
        expect(screen.getByAltText('Piano Illustration').src).toBe('http://localhost/piano.png');
        expect(screen.getByAltText('Piano Illustration')).toBeInTheDocument;
        expect(screen.getByAltText('Piano Illustration')).toBeInstanceOf(Image);
    });

    it('should display the click message and material icon', () => {
        render(<Splash />);

        expect(screen.getByTestId('click')).toHaveTextContent('click to continue...');
        expect(screen.getByTestId('material-click')).toHaveTextContent('touch_app');
        expect(screen.getByTestId('material-click').className).toBe('material');
    });
});

describe('Testing the clearSplash() functionality', () => {
    it('should set fade to true when the user clicks on the splash screen', () => {
        render(<Splash />);

        expect(screen.getByTestId('screen').className).toBe('');
        fireEvent.click(screen.getByTestId('screen'));
        expect(screen.getByTestId('screen').className).toBe('removed');
    });

    it('should not call the setSplash() function if screen hasn not been clicked', async () => {
        const setSplash = jest.fn();
        render(<Splash setSplash={setSplash} />);

        await waitFor(() => expect(setSplash).toHaveBeenCalledTimes(0));
    });
});
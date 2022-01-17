import { render, screen } from '@testing-library/react';
import Keyboard from './keyboard';

describe('Test that keyboard keys are rendered correctly', () => {
    it('should display white keyboard keys with numbers', () => {
        render(<Keyboard />);
    
        expect(screen.getByTestId('white-1')).toHaveTextContent('1');
        expect(screen.getByTestId('white-2')).toHaveTextContent('2');
        expect(screen.getByTestId('white-3')).toHaveTextContent('3');
        expect(screen.getByTestId('white-4')).toHaveTextContent('4');
    });
    
    it('should display white keyboard keys with letters', () => {
        render(<Keyboard />);
    
        expect(screen.getByTestId('white-w')).toHaveTextContent('w');
        expect(screen.getByTestId('white-r')).toHaveTextContent('r');
        expect(screen.getByTestId('white-t')).toHaveTextContent('t');
        expect(screen.getByTestId('white-y')).toHaveTextContent('y');
    });
    
    it('should display black keyboard keys with symbols', () => {
        render(<Keyboard />);
    
        expect(screen.getByTestId('black-!')).toHaveTextContent('!');
        expect(screen.getByTestId('black-@')).toHaveTextContent('@');
        expect(screen.getByTestId('black-$')).toHaveTextContent('$');
        expect(screen.getByTestId('black-%')).toHaveTextContent('%');
    });
    
    it('should display black keyboard keys with uppercase letters', () => {
        render(<Keyboard />);
    
        expect(screen.getByTestId('black-S')).toHaveTextContent('S');
        expect(screen.getByTestId('black-D')).toHaveTextContent('D');
        expect(screen.getByTestId('black-J')).toHaveTextContent('J');
        expect(screen.getByTestId('black-H')).toHaveTextContent('H');
    });
});
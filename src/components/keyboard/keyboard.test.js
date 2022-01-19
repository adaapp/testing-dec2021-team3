import { render, screen, fireEvent } from '@testing-library/react';
import Keyboard from './keyboard';

describe('Test that keyboard keys are rendered correctly', () => {
    it('should display white keyboard keys with numbers', () => {
        render(<Keyboard />);
    
        expect(screen.getByTestId('keyTest1')).toBeInTheDocument();
        expect(screen.getByTestId('white-1')).toHaveTextContent('1');
        expect(screen.getByTestId('keyTest1').className).toBe('key');

        expect(screen.getByTestId('keyTest2')).toBeInTheDocument();
        expect(screen.getByTestId('white-2')).toHaveTextContent('2');
        expect(screen.getByTestId('keyTest2').className).toBe('key');

        expect(screen.getByTestId('keyTest3')).toBeInTheDocument();
        expect(screen.getByTestId('white-3')).toHaveTextContent('3');
        expect(screen.getByTestId('keyTest3').className).toBe('key');

        expect(screen.getByTestId('keyTest4')).toBeInTheDocument();
        expect(screen.getByTestId('white-4')).toHaveTextContent('4');
        expect(screen.getByTestId('keyTest4').className).toBe('key');
    });
    
    it('should display white keyboard keys with letters', () => {
        render(<Keyboard />);
    
        expect(screen.getByTestId('keyTestw')).toBeInTheDocument();
        expect(screen.getByTestId('white-w')).toHaveTextContent('w');
        expect(screen.getByTestId('keyTestw').className).toBe('key');

        expect(screen.getByTestId('keyTestr')).toBeInTheDocument();
        expect(screen.getByTestId('white-r')).toHaveTextContent('r')
        expect(screen.getByTestId('keyTestr').className).toBe('key');
        
        expect(screen.getByTestId('keyTestt')).toBeInTheDocument();;
        expect(screen.getByTestId('white-t')).toHaveTextContent('t');
        expect(screen.getByTestId('keyTestt').className).toBe('key');

        expect(screen.getByTestId('keyTesty')).toBeInTheDocument();
        expect(screen.getByTestId('white-y')).toHaveTextContent('y');
        expect(screen.getByTestId('keyTesty').className).toBe('key');
    });
    
    it('should display black keyboard keys with symbols', () => {
        render(<Keyboard />);
    
        expect(screen.getByTestId('keyTest!')).toBeInTheDocument();
        expect(screen.getByTestId('black-!')).toHaveTextContent('!');
        expect(screen.getByTestId('keyTest!').className).toBe('black_key');

        expect(screen.getByTestId('keyTest@')).toBeInTheDocument();
        expect(screen.getByTestId('black-@')).toHaveTextContent('@');
        expect(screen.getByTestId('keyTest@').className).toBe('black_key');

        expect(screen.getByTestId('keyTest$')).toBeInTheDocument();
        expect(screen.getByTestId('black-$')).toHaveTextContent('$');
        expect(screen.getByTestId('keyTest$').className).toBe('black_key');

        expect(screen.getByTestId('keyTest%')).toBeInTheDocument();
        expect(screen.getByTestId('black-%')).toHaveTextContent('%');
        expect(screen.getByTestId('keyTest%').className).toBe('black_key');
    });
    
    it('should display black keyboard keys with uppercase letters', () => {
        render(<Keyboard />);
        
        expect(screen.getByTestId('keyTestS')).toBeInTheDocument();
        expect(screen.getByTestId('black-S')).toHaveTextContent('S');
        expect(screen.getByTestId('keyTestS').className).toBe('black_key');

        expect(screen.getByTestId('keyTestD')).toBeInTheDocument();
        expect(screen.getByTestId('black-D')).toHaveTextContent('D');
        expect(screen.getByTestId('keyTestD').className).toBe('black_key');

        expect(screen.getByTestId('keyTestJ')).toBeInTheDocument();
        expect(screen.getByTestId('black-J')).toHaveTextContent('J');
        expect(screen.getByTestId('keyTestJ').className).toBe('black_key');

        expect(screen.getByTestId('keyTestH')).toBeInTheDocument();
        expect(screen.getByTestId('black-H')).toHaveTextContent('H');
        expect(screen.getByTestId('keyTestH').className).toBe('black_key');
    });

    it('should call the play and setKey functions if a black key is clicked', () => {
        const play = jest.fn();
        const setKey = jest.fn();

        render(<Keyboard play={play} setKey={setKey}/>);

        fireEvent.mouseDown(screen.getByTestId('keyTestQ'));

        expect(play).toBeCalledWith({ id: 'Q' });
        expect(play).toHaveBeenCalledTimes(1);

        expect(setKey).toBeCalledWith('Q');
        expect(setKey).toHaveBeenCalledTimes(1);

        fireEvent.mouseDown(screen.getByTestId('keyTest$'));

        expect(play).toBeCalledWith({ id: '$' });
        expect(play).toHaveBeenCalledTimes(2);

        expect(setKey).toBeCalledWith('$');
        expect(setKey).toHaveBeenCalledTimes(2);

        fireEvent.mouseDown(screen.getByTestId('keyTest*'));

        expect(play).toBeCalledWith({ id: '*' });
        expect(play).toHaveBeenCalledTimes(3);

        expect(setKey).toBeCalledWith('*');
        expect(setKey).toHaveBeenCalledTimes(3);
    });

    it('should append the blackPressed class to a black key when keyboard is pressed', async () => {
        const play = jest.fn();
        const setKey = jest.fn();

        render(<Keyboard play={play} setKey={setKey}/>);

        // Key Q
        
        expect(screen.getByTestId('keyTestQ').classList.contains('blackPressed')).toBeFalsy();
        fireEvent.keyDown(screen.getByTestId('keyTestQ'), {
            key: "Q",
            code: "KeyQ"
        });
        expect(screen.getByTestId('keyTestQ').classList.contains('blackPressed')).toBeTruthy();

        // Key !

        expect(screen.getByTestId('keyTest!').classList.contains('blackPressed')).toBeFalsy();
        fireEvent.keyDown(screen.getByTestId('keyTest!'), {
            key: "!",
            code: "Digit1"
        });
        expect(screen.getByTestId('keyTest!').classList.contains('blackPressed')).toBeTruthy();

        // Key C

        expect(screen.getByTestId('keyTestC').classList.contains('blackPressed')).toBeFalsy();
        fireEvent.keyDown(screen.getByTestId('keyTestC'), {
            key: "C",
            code: "KeyC"
        });
        expect(screen.getByTestId('keyTestC').classList.contains('blackPressed')).toBeTruthy();
    });

    it('should append the keyPressed class to a white key when keyboard is pressed', () => {
        const play = jest.fn();
        const setKey = jest.fn();

        render(<Keyboard play={play} setKey={setKey}/>);

        // Key 1
        
        expect(screen.getByTestId('keyTest1').classList.contains('keyPressed')).toBeFalsy();
        fireEvent.keyDown(screen.getByTestId('keyTest1'), {
            key: "1",
            code: "Digit1"
        });
        expect(screen.getByTestId('keyTest1').classList.contains('keyPressed')).toBeTruthy();

        // Key a
        
        expect(screen.getByTestId('keyTesta').classList.contains('keyPressed')).toBeFalsy();
        fireEvent.keyDown(screen.getByTestId('keyTesta'), {
            key: "a",
            code: "KeyA"
        });
        expect(screen.getByTestId('keyTesta').classList.contains('keyPressed')).toBeTruthy();
    });
});
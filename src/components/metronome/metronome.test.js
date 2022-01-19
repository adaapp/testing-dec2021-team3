import { render, screen, fireEvent } from '@testing-library/react';
import Metronome from './metronome';

describe('Test that elements are rendered correctly on the page', () => {
    it('should render the play/pause button', () => {
        render(<Metronome />);
    
        expect(screen.getByTestId('playIcon')).toBeInTheDocument();
        expect(screen.getByTestId('playIcon').className).toBe('noselect material');
        expect(screen.getByTestId('playIcon')).toHaveTextContent('play_arrow');
        fireEvent.click(screen.getByTestId('playButton'));
        expect(screen.getByTestId('playIcon')).toHaveTextContent('pause');
    });

    it('should display the metronome image', () => {
        render(<Metronome />);
    
        expect(screen.getByAltText('Metronome Icon')).toBeInTheDocument;
        expect(screen.getByAltText('Metronome Icon')).toBeInstanceOf(Image);
        expect(screen.getByAltText('Metronome Icon')).toBeVisible();
        expect(screen.getByAltText('Metronome Icon').id).toBe('metroIcon');
        expect(screen.getByAltText('Metronome Icon').src).toBe('http://localhost/svg/metronome.svg');
    });

    it('should render the bpm input', () => {
        render(<Metronome />);

        expect(screen.getByTestId('bpmText')).toBeInTheDocument();
        expect(screen.getByTestId('bpmText')).toBeVisible();
        expect(screen.getByTestId('bpmText')).toBeInstanceOf(HTMLInputElement);
    });

    it('should render the beats text indicator', () => {
        render(<Metronome />);
    
        expect(screen.getByText('beats')).toBeInTheDocument();
        expect(screen.getByTestId('beatText')).toBeInTheDocument();
        expect(screen.getByTestId('beatText')).toHaveTextContent('beats');
        expect(screen.getByTestId('beatText').id).toBe('beats');
    });
});

describe('Test the bpm input', () => {
    it('should have a default bpm of 50', () => {
        render(<Metronome />);

        expect(screen.getByTestId('bpmText')).toBeInTheDocument();
        expect(screen.getByTestId('bpmText').value).toBe('50');
    });

    it('should change bpm when the user inputs a value above 0 and under (or equal) to 1000', () => {
        render(<Metronome />);
    
        expect(screen.getByTestId('bpmText').value).toBe('50');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '400'}});
        expect(screen.getByTestId('bpmText').value).toBe('400');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '6'}});
        expect(screen.getByTestId('bpmText').value).toBe('6');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '1'}});
        expect(screen.getByTestId('bpmText').value).toBe('1');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '999'}});
        expect(screen.getByTestId('bpmText').value).toBe('999');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '1000'}});
        expect(screen.getByTestId('bpmText').value).toBe('1000');
    });

    it('should set the bpm to the previous value if the enters 0 or a number higher than 1000', () => {
        render(<Metronome />);

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '0'}});
        expect(screen.getByTestId('bpmText').value).toBe('50');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '1001'}});
        expect(screen.getByTestId('bpmText').value).toBe('50');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '2000'}});
        expect(screen.getByTestId('bpmText').value).toBe('50');

        // Change value correctly to 1
        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '1'}});

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '1050'}});
        expect(screen.getByTestId('bpmText').value).toBe('1');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '1999'}});
        expect(screen.getByTestId('bpmText').value).toBe('1');
    });

    it('should remove the subtraction (minus) symbol if the value changes', () => {
        render(<Metronome />);

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '-60'}});
        expect(screen.getByTestId('bpmText').value).toBe('60');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '-9'}});
        expect(screen.getByTestId('bpmText').value).toBe('9');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '-100'}});
        expect(screen.getByTestId('bpmText').value).toBe('100');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '-1'}});
        expect(screen.getByTestId('bpmText').value).toBe('1');
    });

    it('should still display the beats text when the user changes the bpm', () => {
        render(<Metronome />);

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '50'}});
        expect(screen.getByTestId('beatText')).toHaveTextContent('beats');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '1000'}});
        expect(screen.getByTestId('beatText')).toHaveTextContent('beats');

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '0'}});
        expect(screen.getByTestId('beatText')).toHaveTextContent('beats');
    });

    it('should change an empty string to a 1 when focus changes away from input', () => {
        render(<Metronome />);

        fireEvent.focusIn(screen.getByTestId('bpmText'));
        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: ''}});
        fireEvent.focusOut(screen.getByTestId('bpmText'));
        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '1'}});
    });

    it('should increase its width if the amount of numbers in the input increases', () => {
        render(<Metronome/>);

        expect(screen.getByTestId('bpmText')).toHaveStyle({width: '27px'});

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '500'}});
        expect(screen.getByTestId('bpmText')).toHaveStyle({width: '40.5px'});

        fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '5'}});
        expect(screen.getByTestId('bpmText')).toHaveStyle({width: '13.5px'});
    });
});

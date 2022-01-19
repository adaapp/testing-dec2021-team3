import { render, screen, fireEvent } from '@testing-library/react';
import Metronome from './metronome';

it('should render the play/pause button', () => {
    render(<Metronome />);

    expect(screen.getByTestId('playIcon')).toBeInTheDocument();
    expect(screen.getByTestId('playIcon').className).toBe('noselect material');
    expect(screen.getByTestId('playIcon')).toHaveTextContent('play_arrow');
    fireEvent.click(screen.getByTestId('playButton'));
    expect(screen.getByTestId('playIcon')).toHaveTextContent('pause');
});

it('should change bpm when the user inputs a different value', () => {
    render(<Metronome />);

    expect(screen.getByTestId('bpmText')).toBeInTheDocument();
    expect(screen.getByTestId('bpmText').value).toBe('50');
    fireEvent.change(screen.getByTestId('bpmText'), {target: { value: '400'}});
    expect(screen.getByTestId('bpmText').value).toBe('400');
    expect(screen.getByTestId('beatText')).toHaveTextContent('beats');
});

it('should display the metronome image', () => {
    render(<Metronome />);

    expect(screen.getByAltText('Metronome Icon')).toBeInTheDocument;
    expect(screen.getByAltText('Metronome Icon')).toBeInstanceOf(Image);
    expect(screen.getByAltText('Metronome Icon')).toBeVisible();
    expect(screen.getByAltText('Metronome Icon').id).toBe('metroIcon');
    expect(screen.getByAltText('Metronome Icon').src).toBe('http://localhost/svg/metronome.svg');
});

it('should render the beats text indicator', () => {
    render(<Metronome />);

    expect(screen.getByText('beats')).toBeInTheDocument();
    expect(screen.getByTestId('beatText')).toBeInTheDocument();
    expect(screen.getByTestId('beatText')).toHaveTextContent('beats');
    expect(screen.getByTestId('beatText').id).toBe('beats');
});


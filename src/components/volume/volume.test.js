import { render, screen, fireEvent } from '@testing-library/react';
import Volume from './volume';

it('should render a Material sound icon', () => {
    render(<Volume />);

    expect(screen.getByTestId('volumeMaterial')).toBeInTheDocument();
    expect(screen.getByTestId('volumeMaterial').className).toBe('material');
    expect(screen.getByTestId('volumeMaterial').id).toBe('volumeIcon');
    expect(screen.getByTestId('volumeMaterial')).toBeInstanceOf(HTMLSpanElement);
    expect(screen.getByTestId('volumeMaterial')).toHaveTextContent('volume_up');
});

describe('Testing the functionality of the slider', () => {
    it('should render a slider with the correct min and max attributes', () => {
        render(<Volume />);
    
        expect(screen.getByTestId('sliderItem')).toBeInTheDocument();
        expect(screen.getByTestId('sliderItem').className).toBe('slider');
        expect(screen.getByTestId('sliderItem').id).toBe('volume');
       
        expect(screen.getByTestId('sliderItem').type).toBe('range');
        expect(screen.getByTestId('sliderItem').min).toBe('1');
        expect(screen.getByTestId('sliderItem').max).toBe('100');
    });

    it('should have a default value from the inherited prop', () => {
        render(<Volume volume={50}/>);
        expect(screen.getByTestId('sliderItem').value).toBe('50');
    });
    
    it('should move the slider if input value is changed', () => {
        const setVolume = jest.fn();
        render(<Volume volume={100} data={() => {}} setVolume={setVolume} />);

        fireEvent.change(screen.getByTestId('sliderItem'), {target: { value: '20'}});
        expect(setVolume).toBeCalledWith('20');
        expect(setVolume).toHaveBeenCalledTimes(1);
    });
});
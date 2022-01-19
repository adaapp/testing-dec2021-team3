import { render, screen, fireEvent } from '@testing-library/react';
import Volume from './volume';

describe('Testing that elements have been rendered correctly', () => {
    it('should render a Material sound icon', () => {
        render(<Volume />);
    
        expect(screen.getByTestId('volumeMaterial')).toBeInTheDocument();
        expect(screen.getByTestId('volumeMaterial').className).toBe('material noselect');
        expect(screen.getByTestId('volumeMaterial').id).toBe('volumeIcon');
        expect(screen.getByTestId('volumeMaterial')).toBeInstanceOf(HTMLSpanElement);
        expect(screen.getByTestId('volumeMaterial')).toHaveTextContent('volume_up');
    });

    it('should render a slider with the correct min and max attributes', () => {
        render(<Volume />);
    
        expect(screen.getByTestId('sliderItem')).toBeInTheDocument();
        expect(screen.getByTestId('sliderItem').className).toBe('slider');
        expect(screen.getByTestId('sliderItem').id).toBe('volume');
       
        expect(screen.getByTestId('sliderItem').type).toBe('range');
        expect(screen.getByTestId('sliderItem').min).toBe('1');
        expect(screen.getByTestId('sliderItem').max).toBe('100');
    });
});

describe('Testing the functionality of the slider', () => {
    it('should have a default value from the inherited prop', () => {
        render(<Volume volume={50}/>);
        expect(screen.getByTestId('sliderItem').value).toBe('50');
    });
    
    it('should move the slider if input value is changed', () => {
        const setVolume = jest.fn();
        const data = {
            sound : {
                volume: jest.fn()
            }
        };

        render(<Volume volume={100} data={data} setVolume={setVolume} />);

        fireEvent.change(screen.getByTestId('sliderItem'), {target: { value: '20'}});
        expect(setVolume).toBeCalledWith('20');
        expect(setVolume).toHaveBeenCalledTimes(1);
        expect(data.sound.volume).toHaveBeenCalledTimes(1);
        expect(data.sound.volume).toBeCalledWith(0.2);

        fireEvent.change(screen.getByTestId('sliderItem'), {target: { value: '1'}});
        expect(setVolume).toBeCalledWith('1');
        expect(setVolume).toHaveBeenCalledTimes(2);
        expect(data.sound.volume).toHaveBeenCalledTimes(2);
        expect(data.sound.volume).toBeCalledWith(0.01);

        fireEvent.change(screen.getByTestId('sliderItem'), {target: { value: '99'}});
        expect(setVolume).toBeCalledWith('99');
        expect(setVolume).toHaveBeenCalledTimes(3);
        expect(data.sound.volume).toHaveBeenCalledTimes(3);
        expect(data.sound.volume).toBeCalledWith(0.99);
    });

    it('should not set the Howler.js sound if it has not been loaded', () => {
        const setVolume = jest.fn();
        const data = {};

        render(<Volume volume={50} data={data} setVolume={setVolume}/>);
    
        fireEvent.change(screen.getByTestId('sliderItem'), {target: { value: '60'}});
        expect(setVolume).toBeCalled();
    });
});
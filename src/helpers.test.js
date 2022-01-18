import { convertToNote } from './helpers';

describe('Testing the convertToNote function', () => {

    it('should return a string', () => {
        expect(typeof convertToNote('t')).toBe('string');
        expect(typeof convertToNote('u')).not.toBe('number');
        expect(typeof convertToNote('y')).not.toBe('boolean');
        expect(typeof convertToNote('o')).not.toBe('undefined');
    });

    it('should convert a valid keyboard key given as a string to a note', () => {
        expect(convertToNote('q')).toBe('F3');
    });

    it('should throw an error if a string or a number is not given as an argument', () => {
        expect(() => convertToNote(null)).toThrowError('You must enter a string or a number!');
        expect(() => convertToNote([])).toThrowError('You must enter a string or a number!');
        expect(() => convertToNote({})).toThrowError('You must enter a string or a number!');
        expect(() => convertToNote()).toThrowError('You must enter a string or a number!');
        expect(() => convertToNote(() => {})).toThrowError('You must enter a string or a number!');
    });
});
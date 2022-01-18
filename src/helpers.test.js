import { convertToNote, 
         sanitiseBeat, 
         createSprite, 
         isKeyBlack } from './helpers';

// More tests available for individual components at src/components

describe('Testing the convertToNote function', () => {
    it('should return a string', () => {
        expect(typeof convertToNote('t')).toBe('string');
        expect(typeof convertToNote('u')).not.toBe('number');
        expect(typeof convertToNote('y')).not.toBe('boolean');
        expect(typeof convertToNote('o')).not.toBe('undefined');
    });

    it('should convert a valid white keyboard key given as a string to a note', () => {
        expect(convertToNote('q')).toBe('F3');
        expect(convertToNote('w')).toBe('G3');
        expect(convertToNote('e')).toBe('A3');
        expect(convertToNote('r')).toBe('B3');
        expect(convertToNote('t')).toBe('C4');
        expect(convertToNote('y')).toBe('D4');
    });

    it('should convert a valid white keyboard key given as a number to a note', () => {
        expect(convertToNote(1)).toBe('C2');
        expect(convertToNote(6)).toBe('A2');
        expect(convertToNote(2)).toBe('D2');
        expect(convertToNote(4)).toBe('F2');
        expect(convertToNote(5)).toBe('G2');
        expect(convertToNote(3)).toBe('E2');
    });

    it('should convert a valid black keyboard key given as a string to a note', () => {
        expect(convertToNote('!')).toBe('C#2');
        expect(convertToNote('@')).toBe('D#2');
        expect(convertToNote('$')).toBe('F#2');
        expect(convertToNote('%')).toBe('G#2');
        expect(convertToNote('^')).toBe('A#2');
        expect(convertToNote('*')).toBe('C#3');
    });

    it('should throw an error if a string or a number is not given as an argument', () => {
        expect(() => convertToNote(null)).toThrowError('You must enter a string or a number!');
        expect(() => convertToNote([])).toThrowError('You must enter a string or a number!');
        expect(() => convertToNote({})).toThrowError('You must enter a string or a number!');
        expect(() => convertToNote()).toThrowError('You must enter a string or a number!');
        expect(() => convertToNote(() => {})).toThrowError('You must enter a string or a number!');
    });
});

describe('Testing the sanitiseBeat function', () => {
    it('should return a string', () => {
        expect(typeof sanitiseBeat('50', '55')).toBe('string');
        expect(typeof sanitiseBeat('25', '26')).not.toBe('number');
        expect(typeof sanitiseBeat('1', '2')).not.toBe('boolean');
        expect(typeof sanitiseBeat('3', '3')).not.toBe('undefined');
    });

    it('should remove any non-numeric characters from the second argument', () => {
        expect(sanitiseBeat('20', '44$!£^6')).toBe('446');
        expect(sanitiseBeat('12', '()1fbd99**£')).toBe('199');
        expect(sanitiseBeat('99', '1{9}9')).toBe('199');

        expect(sanitiseBeat('100', '-2')).toBe('2');
        expect(sanitiseBeat('0', '-30')).toBe('30');
        expect(sanitiseBeat('12', '-94')).toBe('94');
        expect(sanitiseBeat('200', '-1')).toBe('1');

        expect(sanitiseBeat('83', '5.4')).toBe('54');
    });

    it('should return an empty string if the second argument does not contain numbers', () => {
        expect(sanitiseBeat('20', '()')).toBe('');
        expect(sanitiseBeat('', '')).toBe('');
        expect(sanitiseBeat('500', '*(&£^')).toBe('');
        expect(sanitiseBeat('0f32f', 'katia')).toBe('');
        expect(sanitiseBeat('0', 'donald')).toBe('');
    });

    it('should return the first argument if the second is higher than 1000', () => {
        expect(sanitiseBeat('65', '2134')).toBe('65');
        expect(sanitiseBeat('521', '402374509')).toBe('521');
        expect(sanitiseBeat('33', '1001')).toBe('33');
        expect(sanitiseBeat('41', '-40000')).toBe('41');
    });

    it('should throw an error if the first or second argument is not a string', () => {
        expect(() => sanitiseBeat(null, '20')).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat([], {})).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat(undefined, undefined)).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat('0', false)).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat(true, true)).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat(false, null)).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat(null, null)).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat(()=> {}, ()=> {})).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat()).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat(0)).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat(23, 52)).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat(1)).toThrowError('You must enter two strings!');
        expect(() => sanitiseBeat(10)).toThrowError('You must enter two strings!');
    });
});

// describe('Testing the createSprite function', () => {
//     it('should return a string', () => {
//         expect(typeof convertToNote('t')).toBe('string');
//         expect(typeof convertToNote('u')).not.toBe('number');
//         expect(typeof convertToNote('y')).not.toBe('boolean');
//         expect(typeof convertToNote('o')).not.toBe('undefined');
//     });
// });

// describe('Testing the isKeyBlack function', () => {
//     it('should return a string', () => {
//         expect(typeof convertToNote('t')).toBe('string');
//         expect(typeof convertToNote('u')).not.toBe('number');
//         expect(typeof convertToNote('y')).not.toBe('boolean');
//         expect(typeof convertToNote('o')).not.toBe('undefined');
//     });
// });
import { convertToNote, 
         sanitiseBeat, 
         createSprite, 
         isKeyBlack } from './helpers';

// More tests available for individual components at src/components

describe('Testing the convertToNote() function', () => {
    it('should return a string', () => {
        expect(typeof convertToNote('t')).toBe('string');
        expect(typeof convertToNote('u')).not.toBe('number');
        expect(typeof convertToNote('y')).not.toBe('boolean');
        expect(typeof convertToNote('o')).not.toBe('undefined');
    });

    it('should return null if the key entered does not exist in the midi object', () => {
        expect(convertToNote('-')).toBeNull();
        expect(convertToNote('#')).toBeNull();
        expect(convertToNote('`')).toBeNull();
        expect(convertToNote('{')).toBeNull();
        expect(convertToNote('')).toBeNull();
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

describe('Testing the sanitiseBeat() function', () => {
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

describe('Testing the createSprite() function', () => {
    it('should return an object', () => {
        expect(createSprite([], 50)).toBeInstanceOf(Object);
        expect(createSprite([], 22)).not.toBeInstanceOf(Number);
        expect(createSprite([], 20)).not.toBeInstanceOf(Array);
        expect(createSprite([], 90)).not.toBeInstanceOf(Error);
        expect(createSprite([], 23)).not.toBeInstanceOf(Function);
        expect(createSprite([], 91)).not.toBeInstanceOf(String);
    });

    it('should return an object with the sprite property', () => {
        expect(createSprite(['test'], 25)).toHaveProperty('sprite');
        expect(createSprite([], 10)).toHaveProperty('sprite');
        expect(createSprite([0, 2, 'g'], 96)).toHaveProperty('sprite');
        expect(createSprite([false, true, true], 77)).toHaveProperty('sprite');
    });

    it('should throw an error if the first argument is not a list', () => {
        expect(() => createSprite(null, 20)).toThrowError('You must enter a list as the first argument!');
        expect(() => createSprite(false, 50)).toThrowError('You must enter a list as the first argument!');
        expect(() => createSprite(true, 73)).toThrowError('You must enter a list as the first argument!');
        expect(() => createSprite({}, 61)).toThrowError('You must enter a list as the first argument!');
        expect(() => createSprite(undefined, 94)).toThrowError('You must enter a list as the first argument!');
    });

    it('should return the correct values for the sprite property', () => {
        expect(createSprite(['d', 'a', 0], 10)).toHaveProperty('sprite.d', [0,7648]);
        expect(createSprite(['d', 'a', 0], 10)).toHaveProperty('sprite.a', [7652,7648]);
        expect(createSprite(['d', 'a', 0], 10)).toHaveProperty('sprite.0', [15304,7648]);

        expect(createSprite(['%'], 98)).toHaveProperty('sprite.%', [0,7648]);

        expect(createSprite(['88', 'bruno', 'k', '()'], 1)).toHaveProperty('sprite.()', [22956,7648]);
        expect(createSprite(['88', 'bruno', 'k', '()'], 1)).toHaveProperty('sprite.k', [15304,7648]);
    });

    it('should always return 7648 as the second element for each sprite value list', () => {
        expect(createSprite(['m'], 54).sprite['m'][1]).toBe(7648);
        expect(createSprite(['know', 'faces'], 54).sprite['faces'][1]).toBe(7648);
        expect(createSprite(['shadow', 'jail', 'p'], 54).sprite['jail'][1]).toBe(7648);
        expect(createSprite([0, 22, 1002, -1], 54).sprite['-1'][1]).toBe(7648);
    });

    it('should throw an error if the second argument (volume) is not a number', () => {
        expect(() => createSprite([6, 1, 8, 3], null)).toThrowError('The volume must be an number between 0 and 100!');
        expect(() => createSprite([40, 1, 92, 33], '51')).toThrowError('The volume must be an number between 0 and 100!');
        expect(() => createSprite(['g', '2', 5, '1'], false)).toThrowError('The volume must be an number between 0 and 100!');
        expect(() => createSprite([0, 0, 'j', 1], [0])).toThrowError('The volume must be an number between 0 and 100!');
        expect(() => createSprite(['p', '2', 'n', 2], undefined)).toThrowError('The volume must be an number between 0 and 100!');
        
    });

});

describe('Testing the isKeyBlack function', () => {
    it('should return a boolean value', () => {
        expect(typeof isKeyBlack(['a'], 0)).toBe('boolean');
        expect(typeof isKeyBlack(['k', 'l'], 0)).not.toBe('number');
        expect(typeof isKeyBlack(['n', 'm', 'f'], 1)).not.toBe('string');
        expect(typeof isKeyBlack([9, 1, 4, 2], 3)).not.toBe('undefined');
    });

    it('should return true if the list item selected is in all uppercase letters', () => {
        expect(isKeyBlack([4, 'W', 'o', 'v'], 1)).toBeTruthy();
        expect(isKeyBlack(['D', 'Q', 'a', 'S'], 3)).toBeTruthy();
        expect(isKeyBlack([7, 1, 2, 9, 'D'], 4)).toBeTruthy();
        expect(isKeyBlack(['**', 'T', '', null], 1)).toBeTruthy();
        expect(isKeyBlack(['W', false, false, false], 0)).toBeTruthy();
        expect(isKeyBlack(['SCHOOL', 'ARIANA', 'GITHUB', 'MP', 'OOP'], 4)).toBeTruthy();
    });

    it('should return false if the list item selected has lowercase letters', () => {
        expect(isKeyBlack(['b', 'w', 'u'], 2)).toBeFalsy();
        expect(isKeyBlack([200, 'o', -2, 'T', 'B', 0], 2)).toBeFalsy();
        expect(isKeyBlack(['w'], 0)).toBeFalsy();
        expect(isKeyBlack(['pOlice', 'GooD', 'j', '()'], 1)).toBeFalsy();
        expect(isKeyBlack(['lOOl', 'TRy', false, true], 0)).toBeFalsy();
    });

    it('should return false if the second argument has a higher value than the length of the first', () => {
        expect(isKeyBlack(['o'], 2)).toBeFalsy();
        expect(isKeyBlack([9, '@', 1, 5, 'pv'], 10)).toBeFalsy();
        expect(isKeyBlack([], 1)).toBeFalsy();
        expect(isKeyBlack(['o'], -1)).toBeFalsy();
    });

    it('should throw an error if the first argument is not a list', () => {
        expect(() => isKeyBlack(null, 1)).toThrowError('You must enter a list and a number!');
        expect(() => isKeyBlack(undefined, 4)).toThrowError('You must enter a list and a number!');
        expect(() => isKeyBlack(false, 0)).toThrowError('You must enter a list and a number!');
        expect(() => isKeyBlack({}, 3)).toThrowError('You must enter a list and a number!');
        expect(() => isKeyBlack(true, 10)).toThrowError('You must enter a list and a number!');
    });

    it('should throw an error if the second argument is not an integer', () => {
        expect(() => isKeyBlack(['a'], null)).toThrowError('You must enter a list and a number!');
        expect(() => isKeyBlack([0, 10], 's')).toThrowError('You must enter a list and a number!');
        expect(() => isKeyBlack(['b', 'd', 9, 4], undefined)).toThrowError('You must enter a list and a number!');
        expect(() => isKeyBlack(['c', 'k', 'l'], {})).toThrowError('You must enter a list and a number!');
        expect(() => isKeyBlack(['u', 'l'])).toThrowError('You must enter a list and a number!');
        expect(() => isKeyBlack(['v', 'b', 'i'], false)).toThrowError('You must enter a list and a number!');
    });
});
const convertToNote = (key) => {
    const midi = {
        1: 'C2', '!': 'C#2', 2: 'D2', '@': 'D#2',
        3: 'E2', 4: 'F2', '$': 'F#2', '5': 'G2', '%': 'G#2',
        6: 'A2', '^': 'A#2', 7: 'B2', 8: 'C3', '*': 'C#3',
        9: 'D3', '(': 'D#3', '0': 'E3', 'q': 'F3', 'Q': 'F#3',
        'w': 'G3', 'W': 'G#3', 'e': 'A3', 'E': 'A#3', 'r': 'B3',
        't': 'C4', 'T': 'C#4', 'y': 'D4', 'Y': 'D#4', 'u': 'E4',
        'i': 'F4', 'I': 'F#4', 'o': 'G4', 'O': 'G#4', 'p': 'A4',
        'P': 'A#4', 'a': 'B4', 's': 'C5', 'S': 'C#5', 'd': 'D5',
        'D': 'D#5', 'f': 'E5', 'g': 'F5', 'G': 'F#5', 'h': 'G5',
        'H': 'G#5', 'j': 'A5', 'J': 'A#5', 'k': 'B5', 'l': 'C6',
        'L': 'C#6', 'z': 'D6', 'Z': 'D#6', 'x': 'E6', 'c': 'F6',
        'C': 'F#6', 'v': 'G6', 'V': 'G#6', 'b': 'A6', 'B': 'A#6',
        'n': 'B6', 'm': 'C7'
    };

    if ((typeof key === 'string' || typeof key === 'number')) {
        return key in midi ? midi[key] : null;
    } else {
        throw new Error('You must enter a string or a number!');
    }
};

const sanitiseBeat = (oldBeat, newBeat) => {

    let clean = newBeat.replace(/\D/g, '');

    if (typeof oldBeat === 'string' && typeof clean === 'string'
        && !isNaN(clean) && !isNaN(oldBeat)) {
        const intValue = parseInt(clean);

        if (clean === '') {
            return ''
        } else {
            return intValue > 0 && intValue <= 1000 ? clean : oldBeat;
        }

    } else {
        throw new Error('You must enter an integer as a string!');
    }
};

const createSprite = (values, volume) => {
    const map = { sprite: {}, volume: volume / 100 };

    values.forEach((item, index) => {
        map.sprite[item] = [(index * 7652), 7648];
    });

    return map;
};

const isKeyBlack = (keyboard, current) => {
    let item = keyboard[current];

    if (Array.isArray(keyboard) && typeof (current) === 'number') {
        return (current + 1 < keyboard.length
            && isNaN(item) && item === item.toUpperCase());
    } else {
        throw new Error('You must enter a list and a number!');
    };
}

export {
    convertToNote,
    sanitiseBeat,
    createSprite,
    isKeyBlack
};
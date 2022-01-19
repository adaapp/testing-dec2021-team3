
// Converts a keyboard key into a Piano note
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
    }; // Key-value pair for each keyboard key and respective note

    // Checks if the argument given is a tring or a number
    if ((typeof key === 'string' || typeof key === 'number')) {
        // If the key is present in the midi object, return the respective note
        // Return null if the key is not present
        return key in midi ? midi[key] : null;
    } else {
        // Throw an error if the argument given is not a string or a number
        throw new Error('You must enter a string or a number!');
    }
};

// Ensure that the number of beats per minute is valid
const sanitiseBeat = (oldBeat, newBeat) => {
    // Check if the arguments entered are strings
    if (typeof oldBeat === 'string' && typeof newBeat === 'string') {
        // Get rid of any character which is not a number
        let clean = newBeat.replace(/\D/g, '');
        // Convert the string value to an integer
        const intValue = parseInt(clean);

        if (clean === '') {
            // If the string doesn't contain any characters, return an empty string
            return ''
        } else {
            // Otherwise, check if the value is greater than 0 and less than 1000
            // Return the new, clean value if it is, or the old value if it's false
            return intValue > 0 && intValue <= 1000 ? clean : oldBeat;
        }
    } else {
        // Throw an error if the user has not entered two strings as arguments
        throw new Error('You must enter two strings!');
    }
};

/* Creates a Howl-compatible object to map starting and
ending points for the keyboard samples */

const createSprite = (values, volume) => {
    // Check if the first argument is an array
    if (Array.isArray(values)) {
        // Check if the volume is a number
        // Check if the volume is higher than 0 and less than 100
        if (typeof (volume) === 'number' && volume >= 0 && volume <= 100) {
            // Initial map with an empty sprite property and a volume property
            let map = { sprite: {}, volume: volume / 100 };

            // Loop through each item in the given array
            values.forEach((item, index) => {
                // The duration of every sample is around 7648
                // The value is cut down to ensure responsiveness
                map.sprite[item] = [(index * 7652), 7648];
            });

            return map;
        } else {
            // Throw an error if the second argument is not a number
            throw new Error('The volume must be an number between 0 and 100!');
        }
    } else {
        // Throw an error if the first argument is not an array
        throw new Error('You must enter a list as the first argument!');
    }
};

// Check if a keyboard key should be a black or white key
const isKeyBlack = (keyboard, current) => {
    // Check if the first argument is an array
    // Check if the second argument is an integer
    if (Array.isArray(keyboard)
        && typeof (current) === 'number'
        && Number.isInteger(current)) {

        // If the second argument is a negative number, return false
        if(current < 0) return false;

        let item = keyboard[current]; // Reference to the keyboard array

        /* If the index given + 1 is less than or equal to the length of the list
        and the value pointed to that index in the list is not a number and
        its characters are all uppercase, return true */

        return (current + 1 <= keyboard.length
            && isNaN(item) && item === item.toUpperCase());
    } else {
        // Throw an error if a list and a number are not given as arguments
        throw new Error('You must enter a list and a number!');
    };
}

export {
    convertToNote,
    sanitiseBeat,
    createSprite,
    isKeyBlack
};
import { useEffect } from 'react';
import './keyboard.css';

// Import helper function:
import { isKeyBlack } from '../../helpers';

const useKeyboardBindings = (play, setKey, splash, keys) => {
  useEffect(() => {
    if (!splash) {
      const keyHandler = e => {
        // Check if the bpm input is not selected or the pressed key is in the keys list
        if (document.activeElement.id !== 'bpmInput' && keys.includes(e.key)) {
          play({ id: e.key }); // Play the keyboard sound
          setKey(e.key); // Set the variable 'key' as the keyboard key pressed

          let element;

          // Check if the key exists and is a black or white key
          document.getElementById('key-' + e.key) ?
            element = [document.getElementById('key-' + e.key), 0]
            : element = [document.getElementById('black-' + e.key), 1];

          // If the key has been pressed before, reset the animation
          if (element[0].classList.contains('keyPressed')
            || element[0].classList.contains('blackPressed')) {
            element[0].style.animation = 'none';

            setTimeout(function () {
              element[0].style.animation = '';
            }, 1); // Allow for the animation to start after 1 second when pressed again
          } else {

            // Add the blackPressed or keyPressed class depending on the colour of the key
            element[1] ? element[0].classList.add('blackPressed')
              : element[0].classList.add('keyPressed');

          }
        }
      }

      // Event listener for when a key has been pressed down
      window.addEventListener('keydown', keyHandler);

      return () => {
        // Remove event listener so that the sample is not played more than once
        window.removeEventListener('keydown', keyHandler);
      };
    }
  }, [play, setKey, splash, keys]);
};

function Keyboard(props) {
  // An ordered list of all of the keys (used to display the right keys on the screen)
  const keyboard = ['1', '!', '2', '@', '3', '4', '$', '5', '%', '6', '^', '7', '8',
    '*', '9', '(', '0', 'q', 'Q', 'w', 'W', 'e', 'E', 'r', 't', 'T', 'y', 'Y', 'u',
    'i', 'I', 'o', 'O', 'p', 'P', 'a', 's', 'S', 'd', 'D', 'f', 'g', 'G', 'h', 'H',
    'j', 'J', 'k', 'l', 'L', 'z', 'Z', 'x', 'c', 'C', 'v', 'V', 'b', 'B', 'n', 'm'];

  // Function which listens for keyboard key presses
  useKeyboardBindings(props.play, props.setKey, props.splash, keyboard);

  // Play keyboard sound if the key is clicked with the mouse
  const clickPlay = (key) => {
    props.setKey(key); // Sets the variable 'key' as the key that was clicked
    props.play({ id: key });
  };

  return (
    <div id='keyboard'>
      {keyboard.map((d, i) =>
        !isKeyBlack(keyboard, i) ?
          <div id={'section-' + d.toString()} key={'list-' + d.toString()} className='section'>
            <div onMouseDown={() => clickPlay(d.toString())} id={'key-' + d.toString()} className='key' data-testid={'keyTest' + d.toString()}>
              <span data-testid={'white-' + d} className='noselect'>{d}</span>
            </div>

            {(() => {
              if (isKeyBlack(keyboard, i + 1)) {
                return <div onMouseDown={() => clickPlay(keyboard[i + 1].toString())} id={'black-' + keyboard[i + 1].toString()}
                  data-testid={'keyTest' + keyboard[i + 1].toString()} className='black_key'>
                  <span data-testid={'black-' + keyboard[i + 1]} className='noselect'>{keyboard[i + 1]}</span>
                </div>
              }
            })()}
          </div>
          : null
      )}
    </div>
  );
};

export default Keyboard;